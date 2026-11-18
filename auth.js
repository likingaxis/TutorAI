/* ============================================================================
   TUTORAI — SIMULATED LOGIN & REGISTRATION MODULE (auth.js)
   Classic browser JS (compatible with file:// and http://), exposes window.TutorAuth
   Always resolves back into Luca's persistent student profile without mutating data.
   ============================================================================ */
(function (window, document) {
  'use strict';

  var GATE_ID = 'tutorAuthGate';
  var TOAST_ID = 'tutorAuthToast';
  var THEMES = [
    { id: 'light', label: 'Chiaro', pos: 0 },
    { id: 'sepia', label: 'Seppia', pos: 1 },
    { id: 'dark', label: 'Scuro', pos: 2 }
  ];

  var DEFAULT_PROFILE = {
    name: 'Luca',
    programme: 'Ingegneria Informatica',
    email: 'luca@studenti.unipa.it',
    avatarChoice: 'initial'
  };

  var state = {
    mounted: false,
    open: false,
    mode: 'login',
    authenticating: false,
    options: {},
    lastFocused: null,
    authTimer: null,
    toastTimer: null,
    resizeObserver: null,
    delegatedBound: false
  };

  /* --------------------------------------------------------------------------
     UTILITIES
     -------------------------------------------------------------------------- */
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[ch];
    });
  }

  function avatarImagePath(choice) {
    if (!choice || choice === 'initial') return '';
    return 'assets/profile-avatars/avatar-' + encodeURIComponent(String(choice)) + '.webp';
  }

  function profileInitial(name) {
    var trimmed = String(name || 'Luca').trim();
    var first = trimmed ? Array.from(trimmed)[0] : 'L';
    return (first || 'L').toLocaleUpperCase('it');
  }

  function resolveProfile(explicitProfile) {
    var raw = explicitProfile;
    if (!raw && typeof state.options.getProfile === 'function') {
      try {
        raw = state.options.getProfile();
      } catch (_) {
        raw = null;
      }
    }
    if (!raw && window.app && typeof window.app === 'object') {
      raw = window.app;
    }
    raw = raw || {};
    return {
      name: String(raw.name || raw.profileName || DEFAULT_PROFILE.name).trim() || DEFAULT_PROFILE.name,
      programme: String(
        raw.programme != null
          ? raw.programme
          : raw.profileProgramme != null
            ? raw.profileProgramme
            : DEFAULT_PROFILE.programme
      ).trim(),
      email: String(raw.email || raw.profileEmail || DEFAULT_PROFILE.email).trim() || DEFAULT_PROFILE.email,
      avatarChoice: String(raw.avatarChoice || raw.profileAvatarChoice || DEFAULT_PROFILE.avatarChoice)
    };
  }

  function currentTheme() {
    var attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'sepia' || attr === 'dark' || attr === 'light') return attr;
    if (window.app && (window.app.theme === 'sepia' || window.app.theme === 'dark' || window.app.theme === 'light')) {
      return window.app.theme;
    }
    return 'light';
  }

  function prefersReducedMotion() {
    return Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(val || '').trim());
  }

  function evaluatePasswordStrength(pw) {
    var value = String(pw || '');
    if (!value.length) {
      return { level: 0, label: 'Usa almeno 4 caratteri' };
    }
    if (value.length < 4) {
      return { level: 1, label: 'Debole' };
    }
    var classes = 0;
    if (/[a-z]/.test(value)) classes += 1;
    if (/[A-Z]/.test(value)) classes += 1;
    if (/\d/.test(value)) classes += 1;
    if (/[^A-Za-z0-9]/.test(value)) classes += 1;

    if (value.length >= 10 && classes >= 3) {
      return { level: 4, label: 'Forte' };
    }
    if (value.length >= 7 && classes >= 2) {
      return { level: 3, label: 'Buona' };
    }
    if (value.length >= 4 && classes >= 2) {
      return { level: 3, label: 'Buona' };
    }
    return { level: 2, label: 'Discreta' };
  }

  function notifyToast(message) {
    if (typeof window.showToast === 'function' && document.getElementById('toast')) {
      window.showToast(message);
      return;
    }
    var toast = document.getElementById(TOAST_ID);
    if (!toast && document.body) {
      toast = document.createElement('div');
      toast.id = TOAST_ID;
      toast.className = 'tutor-auth-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('is-visible');
    void toast.offsetWidth;
    toast.classList.add('is-visible');
    window.clearTimeout(state.toastTimer);
    state.toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
    }, 2700);
  }

  /* --------------------------------------------------------------------------
     SVG ICONS (Self-contained so auth.js has zero dependency on sprite IDs)
     -------------------------------------------------------------------------- */
  function eyeSvg(visible) {
    if (visible) {
      return (
        '<svg viewBox="0 0 24 24" aria-hidden="true">' +
        '<path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1.73 12 1.73 12a20.4 20.4 0 0 1 5.08-6.17"/>' +
        '<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 10.27 8 10.27 8a20.7 20.7 0 0 1-2.16 3.19"/>' +
        '<line x1="1" y1="1" x2="23" y2="23"/>' +
        '</svg>'
      );
    }
    return (
      '<svg viewBox="0 0 24 24" aria-hidden="true">' +
      '<path d="M1.5 12S5 4.5 12 4.5 22.5 12 22.5 12 19 19.5 12 19.5 1.5 12 1.5 12z"/>' +
      '<circle cx="12" cy="12" r="3"/>' +
      '</svg>'
    );
  }

  function renderAvatarInnerHtml(profile) {
    var initial = escapeHtml(profileInitial(profile.name));
    var imgSrc = avatarImagePath(profile.avatarChoice);
    if (!imgSrc) return initial;
    return (
      '<span>' + initial + '</span>' +
      '<img src="' + escapeHtml(imgSrc) + '" alt="" onerror="this.remove()">'
    );
  }

  /* --------------------------------------------------------------------------
     TEMPLATE BUILDER
     -------------------------------------------------------------------------- */
  function buildGateMarkup(profile) {
    var safeName = escapeHtml(profile.name);
    var safeProgramme = escapeHtml(profile.programme || 'Corso di laurea');
    var safeEmail = escapeHtml(profile.email);
    var mailIcon = '<svg class="tutor-auth-leading-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/></svg>';
    var lockIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>';

    var avatarStackHtml =
      '<span class="tutor-auth-avatar-chip tutor-auth-avatar-main" id="tutorAuthSavedAvatar">' + renderAvatarInnerHtml(profile) + '</span>' +
      '<span class="tutor-auth-avatar-chip tutor-auth-emblem is-blue"><svg viewBox="0 0 24 24"><path d="M5 17 12 5l7 12H5Z"/><circle cx="5" cy="17" r="2.7"/><circle cx="12" cy="5" r="2.7"/><circle cx="19" cy="17" r="2.7"/></svg></span>' +
      '<span class="tutor-auth-avatar-chip tutor-auth-emblem is-amber"><svg viewBox="0 0 24 24"><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-2-13-4 16"/></svg></span>' +
      '<span class="tutor-auth-avatar-chip tutor-auth-emblem is-mint"><svg viewBox="0 0 24 24"><path d="M6 19c1-7 3-11 12-14 2 7-1 14-12 14Zm0 0L15 9"/></svg></span>';

    var themeButtonsHtml = THEMES.map(function (t) {
      return (
        '<button type="button" class="tutor-auth-theme-btn" data-auth-theme="' + t.id + '" data-auth-theme-pos="' + t.pos + '" aria-pressed="false">' +
        '<span class="tutor-auth-theme-dot ' + t.id + '" aria-hidden="true"></span>' +
        '<span>' + t.label + '</span>' +
        '</button>'
      );
    }).join('');

    return (
      '<div class="tutor-auth-stage">' +
        '<div class="tutor-auth-card" role="document">' +
          /* LEFT SHOWCASE PANEL */
          '<section class="tutor-auth-showcase" aria-label="Presentazione TutorAI">' +
            '<div class="tutor-auth-wave-bg" aria-hidden="true">' +
              '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580 760" preserveAspectRatio="xMidYMid slice">' +
                '<defs>' +
                  '<linearGradient id="ta-rw-base" x1="0" y1="0" x2="0.85" y2="1">' +
                    '<stop offset="0%" style="stop-color:var(--auth-wave-start)"/>' +
                    '<stop offset="58%" style="stop-color:var(--auth-wave-mid)"/>' +
                    '<stop offset="100%" style="stop-color:var(--auth-wave-end)"/>' +
                  '</linearGradient>' +
                '</defs>' +
                '<rect width="580" height="760" fill="url(#ta-rw-base)"/>' +
                '<circle cx="570" cy="10" r="126" fill="white" fill-opacity=".075"/>' +
                '<path d="M0 610C180 564 360 644 580 582V760H0Z" fill="white" fill-opacity=".06"/>' +
                '<path d="M0 347C140 305 310 387 580 323" fill="none" stroke="white" stroke-opacity=".23" stroke-width="1.4"/>' +
                '<path d="M0 365C160 323 320 407 580 343" fill="none" style="stroke:var(--auth-wave-spark)" stroke-opacity=".44" stroke-width="1.4"/>' +
              '</svg>' +
            '</div>' +

            '<div class="tutor-auth-showcase-top">' +
              '<div class="tutor-auth-brand">' +
                '<span class="tutor-auth-brand-logo">' +
                  '<img src="assets/logo.png" alt="Logo TutorAI" width="34" height="34" onerror="this.style.display=\'none\'">' +
                '</span>' +
                '<div class="tutor-auth-brand-text">' +
                  '<span class="tutor-auth-brand-name">TutorAI</span>' +
                  '<span class="tutor-auth-brand-pill">Università</span>' +
                '</div>' +
              '</div>' +

              '<div class="tutor-auth-theme-pill" role="group" aria-label="Tema dell\'interfaccia">' +
                themeButtonsHtml +
              '</div>' +
            '</div>' +

            '<div class="tutor-auth-book-preview" aria-hidden="true">' +
              '<img src="assets/auth-notebook.svg" alt="" width="500" height="240">' +
              '<span class="tutor-auth-scene-card tutor-auth-scene-mastery"><span class="tutor-auth-scene-icon"><svg viewBox="0 0 24 24"><path d="M11 5a3 3 0 0 0-5 2 3 3 0 0 0-2 5 4 4 0 0 0 3 6 3 3 0 0 0 4 1V5Zm2 0a3 3 0 0 1 5 2 3 3 0 0 1 2 5 4 4 0 0 1-3 6 3 3 0 0 1-4 1V5Z"/><path d="M6 11q3-1 4 2m4 1q2-2 4-1"/></svg></span><span><b id="tutorAuthSceneMastery">Unità verificate</b><small>Knowledge Brain</small></span></span>' +
              '<span class="tutor-auth-scene-card tutor-auth-scene-result"><span class="tutor-auth-scene-icon"><svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg></span><span><b id="tutorAuthSceneResult">Risultati</b><small>Ultima verifica</small></span></span>' +
              '<span class="tutor-auth-scene-formula">C(e)+1</span>' +
            '</div>' +

            '<div class="tutor-auth-showcase-hero">' +
              '<h1>Il tuo studio universitario,<br class="tutor-auth-title-break"> in un unico spazio</h1>' +
              '<p class="tutor-auth-showcase-lead">Lezioni dalle tue dispense, appunti in stile quaderno e ripasso attivo guidato.</p>' +
              '<div class="tutor-auth-feature-pills" aria-label="Funzionalità principali">' +
                '<span class="tutor-auth-feature-pill">' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>' +
                  'Appunti in stile quaderno' +
                '</span>' +
                '<span class="tutor-auth-feature-pill">' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>' +
                  'Spiegazioni dalle fonti' +
                '</span>' +
                '<span class="tutor-auth-feature-pill">' +
                  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 12l2 2 4-4"/></svg>' +
                  'Ripasso attivo' +
                '</span>' +
              '</div>' +
            '</div>' +

            '<div class="tutor-auth-avatar-card">' +
              '<div class="tutor-auth-avatar-row">' +
                '<div class="tutor-auth-avatar-stack" aria-hidden="true">' +
                  avatarStackHtml +
                '</div>' +
                '<div class="tutor-auth-saved-meta">' +
                  '<strong id="tutorAuthSavedName">' + safeName + ' · Profilo salvato</strong>' +
                  '<span id="tutorAuthSavedProgramme">' + safeProgramme + '</span>' +
                '</div>' +
                '<button class="tutor-auth-avatar-return" type="button" data-auth-enter-profile aria-label="Rientra nel profilo salvato">→</button>' +
              '</div>' +
              '<small class="tutor-auth-avatar-caption">Ritrova corsi, appunti e verifiche al tuo rientro.</small>' +
            '</div>' +
          '</section>' +

          /* RIGHT INTERACTIVE FORM PANEL */
          '<section class="tutor-auth-panel">' +
            '<div class="tutor-auth-panel-top">' +
              '<button type="button" class="tutor-auth-back-btn" data-auth-dismiss="back">' +
                '<span aria-hidden="true">←</span> Torna all\'anteprima' +
              '</button>' +
              '<span class="tutor-auth-proto-pill">' +
                '<span class="tutor-auth-proto-dot" aria-hidden="true"></span>' +
                'Demo locale' +
              '</span>' +
            '</div>' +

            '<div class="tutor-auth-seg" role="tablist" aria-label="Modalità di accesso">' +
              '<span class="tutor-auth-seg-knob" id="tutorAuthSegKnob" aria-hidden="true"></span>' +
              '<button type="button" class="tutor-auth-seg-tab" id="tutorAuthTabLogin" role="tab" aria-selected="true" aria-controls="tutorAuthLoginPanel" data-auth-tab="login" tabindex="0">Accedi</button>' +
              '<button type="button" class="tutor-auth-seg-tab" id="tutorAuthTabRegister" role="tab" aria-selected="false" aria-controls="tutorAuthRegisterPanel" data-auth-tab="register" tabindex="-1">Registrati</button>' +
            '</div>' +

            /* LOGIN TAB PANEL */
            '<div class="tutor-auth-tabpanel" id="tutorAuthLoginPanel" role="tabpanel" aria-labelledby="tutorAuthTabLogin">' +
              '<div class="tutor-auth-form-head">' +
                '<h2 id="tutorAuthDialogTitle" tabindex="-1">Bentornato su TutorAI</h2>' +
                '<p>Riprendi corsi, appunti e quiz da dove li hai lasciati.</p>' +
              '</div>' +

              '<div class="tutor-auth-quick-stack">' +
                '<button type="button" class="tutor-auth-quick-btn tutor-auth-quick-primary" id="tutorAuthQuickLucaBtn">' +
                  '<span class="tutor-auth-quick-left">' +
                    '<span class="tutor-auth-quick-av" id="tutorAuthQuickLucaAv">' + renderAvatarInnerHtml(profile) + '</span>' +
                    '<span class="tutor-auth-quick-copy">' +
                      '<b id="tutorAuthQuickLucaTitle">Entra subito come ' + safeName + '</b>' +
                      '<small id="tutorAuthQuickLucaSub">' + safeProgramme + ' · Profilo salvato</small>' +
                    '</span>' +
                  '</span>' +
                  '<span class="tutor-auth-quick-arrow" aria-hidden="true">→</span>' +
                '</button>' +

                '<button type="button" class="tutor-auth-quick-btn" id="tutorAuthQuickSsoBtn">' +
                  '<span class="tutor-auth-quick-left">' +
                    '<span class="tutor-auth-quick-ic" aria-hidden="true">' +
                      '<svg viewBox="0 0 24 24"><path d="M3 10l9-6 9 6"/><path d="M5 10v8M9 10v8M15 10v8M19 10v8M3 18h18"/></svg>' +
                    '</span>' +
                    '<span class="tutor-auth-quick-copy">' +
                      '<b>Accesso con SSO Ateneo</b>' +
                      '<small>Simulazione dell’accesso universitario</small>' +
                    '</span>' +
                  '</span>' +
                  '<span class="tutor-auth-quick-badge">IDP</span>' +
                '</button>' +
              '</div>' +

              '<div class="tutor-auth-divider"><span>oppure con email</span></div>' +

              '<form class="tutor-auth-form" id="tutorAuthLoginForm" novalidate>' +
                '<div class="tutor-auth-field">' +
                  '<label for="tutorAuthLoginEmail">Email universitaria</label>' +
                  '<div class="tutor-auth-input-wrap has-leading-icon">' +
                    mailIcon +
                    '<input class="tutor-auth-input" id="tutorAuthLoginEmail" name="email" type="email" autocomplete="email" placeholder="luca@studenti.unipa.it" value="' + safeEmail + '" maxlength="128">' +
                    '<span class="tutor-auth-email-format" id="tutorAuthEmailFormat" title="Formato email valido" aria-hidden="true" hidden><svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-9"/></svg></span>' +
                  '</div>' +
                  '<p class="tutor-auth-error" id="tutorAuthLoginEmailErr" role="alert"></p>' +
                '</div>' +

                '<div class="tutor-auth-field">' +
                  '<label for="tutorAuthLoginPassword">Password</label>' +
                  '<div class="tutor-auth-input-wrap has-leading-icon">' +
                    lockIcon +
                    '<input class="tutor-auth-input has-toggle" id="tutorAuthLoginPassword" name="password" type="password" autocomplete="current-password" placeholder="Qualsiasi password di prova" maxlength="128">' +
                    '<button type="button" class="tutor-auth-eye-btn" data-auth-toggle-pw="tutorAuthLoginPassword" aria-label="Mostra password" aria-pressed="false">' +
                      eyeSvg(false) +
                    '</button>' +
                  '</div>' +
                  '<p class="tutor-auth-error" id="tutorAuthLoginPwErr" role="alert"></p>' +
                '</div>' +

                '<div class="tutor-auth-row-between">' +
                  '<label class="tutor-auth-check">' +
                    '<input type="checkbox" id="tutorAuthRemember" name="remember" checked>' +
                    '<span>Resta connesso</span>' +
                  '</label>' +
                  '<button type="button" class="tutor-auth-link-btn" id="tutorAuthForgotBtn">Password dimenticata?</button>' +
                '</div>' +

                '<button type="submit" class="tutor-auth-submit tutor-auth-submit-secondary" id="tutorAuthLoginSubmit">' +
                  '<span>Accedi con email →</span>' +
                '</button>' +
              '</form>' +
            '</div>' +

            /* REGISTER TAB PANEL */
            '<div class="tutor-auth-tabpanel" id="tutorAuthRegisterPanel" role="tabpanel" aria-labelledby="tutorAuthTabRegister" hidden>' +
              '<div class="tutor-auth-form-head">' +
                '<h2 id="tutorAuthRegisterTitle" tabindex="-1">Crea il tuo spazio di studio</h2>' +
                '<p>Con i dati di prova puoi aprire il profilo salvato di <span id="tutorAuthRegProfileName">' + safeName + '</span>.</p>' +
              '</div>' +

              '<form class="tutor-auth-form" id="tutorAuthRegisterForm" novalidate>' +
                '<div class="tutor-auth-fields-row">' +
                  '<div class="tutor-auth-field">' +
                    '<label for="tutorAuthRegName">Nome e Cognome</label>' +
                    '<div class="tutor-auth-input-wrap">' +
                      '<input class="tutor-auth-input" id="tutorAuthRegName" name="fullName" type="text" autocomplete="name" placeholder="es. Marco Rossi" maxlength="64">' +
                    '</div>' +
                    '<p class="tutor-auth-error" id="tutorAuthRegNameErr" role="alert"></p>' +
                  '</div>' +

                  '<div class="tutor-auth-field">' +
                    '<label for="tutorAuthRegDegree">Corso di studi / Ateneo <span class="tutor-auth-field-opt">(facolt.)</span></label>' +
                    '<div class="tutor-auth-input-wrap">' +
                      '<input class="tutor-auth-input" id="tutorAuthRegDegree" name="degree" type="text" autocomplete="organization-title" placeholder="es. Ingegneria · UniPA" maxlength="80">' +
                    '</div>' +
                  '</div>' +
                '</div>' +

                '<div class="tutor-auth-field">' +
                  '<label for="tutorAuthRegEmail">Email universitaria</label>' +
                  '<div class="tutor-auth-input-wrap has-leading-icon">' +
                    mailIcon +
                    '<input class="tutor-auth-input" id="tutorAuthRegEmail" name="email" type="email" autocomplete="email" placeholder="es. marco@studenti.unipa.it" maxlength="128">' +
                  '</div>' +
                  '<p class="tutor-auth-error" id="tutorAuthRegEmailErr" role="alert"></p>' +
                '</div>' +

                '<div class="tutor-auth-field">' +
                  '<label for="tutorAuthRegPassword">Password</label>' +
                  '<div class="tutor-auth-input-wrap has-leading-icon">' +
                    lockIcon +
                    '<input class="tutor-auth-input has-toggle" id="tutorAuthRegPassword" name="password" type="password" autocomplete="new-password" placeholder="Crea una password" maxlength="128">' +
                    '<button type="button" class="tutor-auth-eye-btn" data-auth-toggle-pw="tutorAuthRegPassword" aria-label="Mostra password" aria-pressed="false">' +
                      eyeSvg(false) +
                    '</button>' +
                  '</div>' +
                  '<div class="tutor-auth-strength" id="tutorAuthStrength" data-level="0" aria-live="polite">' +
                    '<div class="tutor-auth-strength-bars" aria-hidden="true">' +
                      '<span class="tutor-auth-strength-bar"></span>' +
                      '<span class="tutor-auth-strength-bar"></span>' +
                      '<span class="tutor-auth-strength-bar"></span>' +
                      '<span class="tutor-auth-strength-bar"></span>' +
                    '</div>' +
                    '<div class="tutor-auth-strength-label">' +
                      '<span>Sicurezza password</span>' +
                      '<span class="tutor-auth-strength-text" id="tutorAuthStrengthText">Usa almeno 4 caratteri</span>' +
                    '</div>' +
                  '</div>' +
                  '<p class="tutor-auth-error" id="tutorAuthRegPwErr" role="alert"></p>' +
                '</div>' +

                '<div class="tutor-auth-field">' +
                  '<label class="tutor-auth-check">' +
                    '<input type="checkbox" id="tutorAuthRegTerms" name="terms" checked>' +
                    '<span>Accetto i termini della demo locale</span>' +
                  '</label>' +
                  '<p class="tutor-auth-error" id="tutorAuthRegTermsErr" role="alert"></p>' +
                '</div>' +

                '<button type="submit" class="tutor-auth-submit" id="tutorAuthRegisterSubmit">' +
                  '<span>Crea account e continua →</span>' +
                '</button>' +
              '</form>' +
            '</div>' +

            '<div class="tutor-auth-panel-foot">' +
              '<span class="tutor-auth-storage-note">' + lockIcon + ' Dati salvati localmente nel prototipo</span>' +
              '<button type="button" class="tutor-auth-guest-btn" data-auth-dismiss="guest">' +
                'Continua come ospite →' +
              '</button>' +
            '</div>' +
          '</section>' +
        '</div>' +
      '</div>'
    );
  }

  /* --------------------------------------------------------------------------
     UI SYNCHRONIZATION HELPERS
     -------------------------------------------------------------------------- */
  function syncThemeButtons() {
    var gate = document.getElementById(GATE_ID);
    if (!gate) return;
    var active = currentTheme();
    gate.querySelectorAll('[data-auth-theme]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-auth-theme') === active));
    });
  }

  function syncProfileBindings() {
    var gate = document.getElementById(GATE_ID);
    if (!gate) return;
    var profile = resolveProfile();

    var savedName = document.getElementById('tutorAuthSavedName');
    if (savedName) savedName.textContent = profile.name + ' · Profilo salvato';

    var savedProg = document.getElementById('tutorAuthSavedProgramme');
    if (savedProg) {
      savedProg.textContent = profile.programme || 'Spazio di studio personale';
    }

    var savedAvatar = document.getElementById('tutorAuthSavedAvatar');
    if (savedAvatar) savedAvatar.innerHTML = renderAvatarInnerHtml(profile);

    var regProfileName = document.getElementById('tutorAuthRegProfileName');
    if (regProfileName) regProfileName.textContent = profile.name;

    var quickTitle = document.getElementById('tutorAuthQuickLucaTitle');
    if (quickTitle) quickTitle.textContent = 'Entra subito come ' + profile.name;

    var quickSub = document.getElementById('tutorAuthQuickLucaSub');
    if (quickSub) {
      quickSub.textContent = (profile.programme ? profile.programme + ' · ' : '') + 'Profilo salvato';
    }

    var quickAv = document.getElementById('tutorAuthQuickLucaAv');
    if (quickAv) {
      quickAv.innerHTML = renderAvatarInnerHtml(profile);
    }

    var loginEmail = document.getElementById('tutorAuthLoginEmail');
    if (loginEmail && !loginEmail.value.trim()) {
      loginEmail.value = profile.email;
    }
    if (loginEmail) syncLoginEmailFormat(loginEmail);

    if (typeof state.options.getStudySummary === 'function') {
      var summary = state.options.getStudySummary();
      var mastery = document.getElementById('tutorAuthSceneMastery');
      var result = document.getElementById('tutorAuthSceneResult');
      if (mastery) mastery.textContent = summary.verified + '/' + summary.units + ' verificate';
      if (result) {
        var latest = summary.latest;
        result.textContent = latest && Number.isFinite(latest.correct) && latest.total > 0
          ? latest.correct + '/' + latest.total + ' corrette'
          : 'Risultati';
      }
    }
  }

  function syncLoginEmailFormat(input) {
    var badge = document.getElementById('tutorAuthEmailFormat');
    if (badge) badge.hidden = !isValidEmail(input.value);
  }

  function syncSegmentedKnob() {
    var gate = document.getElementById(GATE_ID);
    if (!gate) return;
    var knob = document.getElementById('tutorAuthSegKnob');
    var activeTab = gate.querySelector('.tutor-auth-seg-tab[aria-selected="true"]');
    if (!knob || !activeTab || !activeTab.offsetWidth) return;
    knob.style.width = activeTab.offsetWidth + 'px';
    knob.style.transform = 'translateX(' + activeTab.offsetLeft + 'px)';
  }

  function setMode(mode, shouldFocusTab) {
    var nextMode = mode === 'register' ? 'register' : 'login';
    state.mode = nextMode;

    var gate = document.getElementById(GATE_ID);
    var loginTab = document.getElementById('tutorAuthTabLogin');
    var regTab = document.getElementById('tutorAuthTabRegister');
    var loginPanel = document.getElementById('tutorAuthLoginPanel');
    var regPanel = document.getElementById('tutorAuthRegisterPanel');

    if (loginTab && regTab && loginPanel && regPanel) {
      var isLogin = nextMode === 'login';
      loginTab.setAttribute('aria-selected', String(isLogin));
      loginTab.setAttribute('tabindex', isLogin ? '0' : '-1');
      regTab.setAttribute('aria-selected', String(!isLogin));
      regTab.setAttribute('tabindex', !isLogin ? '0' : '-1');

      loginPanel.hidden = !isLogin;
      regPanel.hidden = isLogin;

      if (gate) {
        gate.setAttribute('aria-labelledby', isLogin ? 'tutorAuthDialogTitle' : 'tutorAuthRegisterTitle');
      }
      if (shouldFocusTab) {
        (isLogin ? loginTab : regTab).focus({ preventScroll: true });
      }
    }

    clearAllValidation();
    window.requestAnimationFrame(syncSegmentedKnob);
  }

  function setFieldError(inputEl, errorEl, message) {
    if (errorEl) errorEl.textContent = message || '';
    if (inputEl) {
      inputEl.classList.toggle('is-invalid', Boolean(message));
      if (message) {
        inputEl.setAttribute('aria-invalid', 'true');
      } else {
        inputEl.removeAttribute('aria-invalid');
      }
    }
  }

  function clearAllValidation() {
    var pairs = [
      ['tutorAuthLoginEmail', 'tutorAuthLoginEmailErr'],
      ['tutorAuthLoginPassword', 'tutorAuthLoginPwErr'],
      ['tutorAuthRegName', 'tutorAuthRegNameErr'],
      ['tutorAuthRegEmail', 'tutorAuthRegEmailErr'],
      ['tutorAuthRegPassword', 'tutorAuthRegPwErr'],
      ['tutorAuthRegTerms', 'tutorAuthRegTermsErr']
    ];
    pairs.forEach(function (pair) {
      setFieldError(document.getElementById(pair[0]), document.getElementById(pair[1]), '');
    });
  }

  function updateStrengthMeter() {
    var pwInput = document.getElementById('tutorAuthRegPassword');
    var meter = document.getElementById('tutorAuthStrength');
    var text = document.getElementById('tutorAuthStrengthText');
    if (!pwInput || !meter || !text) return;
    var result = evaluatePasswordStrength(pwInput.value);
    meter.setAttribute('data-level', String(result.level));
    text.textContent = result.label;
  }

  function setAuthenticatingUI(active, triggerBtn, phase) {
    state.authenticating = active;
    var gate = document.getElementById(GATE_ID);
    if (!gate) return;

    var controls = gate.querySelectorAll(
      '#tutorAuthLoginSubmit, #tutorAuthRegisterSubmit, #tutorAuthQuickLucaBtn, #tutorAuthQuickSsoBtn, [data-auth-tab]'
    );
    controls.forEach(function (btn) {
      btn.disabled = active;
    });

    var loginSubmit = document.getElementById('tutorAuthLoginSubmit');
    var regSubmit = document.getElementById('tutorAuthRegisterSubmit');

    if (!active) {
      if (loginSubmit) {
        loginSubmit.classList.remove('is-success');
        loginSubmit.innerHTML = '<span>Accedi con email →</span>';
      }
      if (regSubmit) {
        regSubmit.classList.remove('is-success');
        regSubmit.innerHTML = '<span>Crea account e continua →</span>';
      }
      return;
    }

    var target = triggerBtn || (state.mode === 'register' ? regSubmit : loginSubmit);
    if (!target) return;

    if (target === loginSubmit || target === regSubmit) {
      if (phase === 'done') {
        target.classList.add('is-success');
        target.innerHTML = '<span>✓ Profilo di ' + escapeHtml(resolveProfile().name) + ' pronto</span>';
      } else {
        target.classList.remove('is-success');
        target.innerHTML = '<span class="tutor-auth-spinner" aria-hidden="true"></span><span>Accesso al profilo...</span>';
      }
    }
  }

  /* --------------------------------------------------------------------------
     AUTHENTICATION FLOW (Always resolves to Luca's persistent profile)
     -------------------------------------------------------------------------- */
  function completeAuth(payload, triggerBtn) {
    if (state.authenticating) return;
    window.clearTimeout(state.authTimer);
    setAuthenticatingUI(true, triggerBtn, 'loading');

    var step1Delay = prefersReducedMotion() ? 20 : 155;
    var step2Delay = prefersReducedMotion() ? 10 : 105;

    state.authTimer = window.setTimeout(function () {
      setAuthenticatingUI(true, triggerBtn, 'done');
      state.authTimer = window.setTimeout(function () {
        var onAuth = state.options.onAuthenticated;
        close();
        if (typeof onAuth === 'function') {
          onAuth(payload);
        } else {
          if (window.app && typeof window.app === 'object') {
            window.app.demoSessionOpen = true;
          }
          notifyToast('Accesso eseguito · Bentornato nel profilo di ' + resolveProfile().name);
        }
      }, step2Delay);
    }, step1Delay);
  }

  function handleLoginSubmit(event) {
    event.preventDefault();
    if (state.authenticating) return;

    var emailEl = document.getElementById('tutorAuthLoginEmail');
    var emailErr = document.getElementById('tutorAuthLoginEmailErr');
    var pwEl = document.getElementById('tutorAuthLoginPassword');
    var pwErr = document.getElementById('tutorAuthLoginPwErr');
    var rememberEl = document.getElementById('tutorAuthRemember');
    var submitBtn = document.getElementById('tutorAuthLoginSubmit');

    var emailVal = emailEl ? emailEl.value.trim() : '';
    var pwVal = pwEl ? pwEl.value : '';
    var firstInvalid = null;

    if (!emailVal) {
      setFieldError(emailEl, emailErr, 'Inserisci un indirizzo email (es. luca@studenti.unipa.it).');
      firstInvalid = firstInvalid || emailEl;
    } else if (!isValidEmail(emailVal)) {
      setFieldError(emailEl, emailErr, 'Inserisci un indirizzo email valido.');
      firstInvalid = firstInvalid || emailEl;
    } else {
      setFieldError(emailEl, emailErr, '');
    }

    if (!pwVal.trim()) {
      setFieldError(pwEl, pwErr, 'Inserisci una password qualsiasi per accedere alla demo.');
      firstInvalid = firstInvalid || pwEl;
    } else {
      setFieldError(pwEl, pwErr, '');
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    completeAuth(
      {
        mode: 'login',
        method: 'form',
        enteredEmail: emailVal,
        enteredName: '',
        enteredProgramme: '',
        staySignedIn: Boolean(rememberEl && rememberEl.checked)
      },
      submitBtn
    );
  }

  function handleRegisterSubmit(event) {
    event.preventDefault();
    if (state.authenticating) return;

    var nameEl = document.getElementById('tutorAuthRegName');
    var nameErr = document.getElementById('tutorAuthRegNameErr');
    var degreeEl = document.getElementById('tutorAuthRegDegree');
    var emailEl = document.getElementById('tutorAuthRegEmail');
    var emailErr = document.getElementById('tutorAuthRegEmailErr');
    var pwEl = document.getElementById('tutorAuthRegPassword');
    var pwErr = document.getElementById('tutorAuthRegPwErr');
    var termsEl = document.getElementById('tutorAuthRegTerms');
    var termsErr = document.getElementById('tutorAuthRegTermsErr');
    var submitBtn = document.getElementById('tutorAuthRegisterSubmit');

    var nameVal = nameEl ? nameEl.value.trim() : '';
    var degreeVal = degreeEl ? degreeEl.value.trim() : '';
    var emailVal = emailEl ? emailEl.value.trim() : '';
    var pwVal = pwEl ? pwEl.value : '';
    var termsOk = Boolean(termsEl && termsEl.checked);
    var firstInvalid = null;

    if (!nameVal) {
      setFieldError(nameEl, nameErr, 'Inserisci nome e cognome.');
      firstInvalid = firstInvalid || nameEl;
    } else {
      setFieldError(nameEl, nameErr, '');
    }

    if (!emailVal) {
      setFieldError(emailEl, emailErr, 'Inserisci un indirizzo email universitaria.');
      firstInvalid = firstInvalid || emailEl;
    } else if (!isValidEmail(emailVal)) {
      setFieldError(emailEl, emailErr, 'Inserisci un indirizzo email valido.');
      firstInvalid = firstInvalid || emailEl;
    } else {
      setFieldError(emailEl, emailErr, '');
    }

    if (!pwVal.trim()) {
      setFieldError(pwEl, pwErr, 'Inserisci una password qualsiasi per continuare.');
      firstInvalid = firstInvalid || pwEl;
    } else {
      setFieldError(pwEl, pwErr, '');
    }

    if (!termsOk) {
      setFieldError(termsEl, termsErr, 'Conferma i termini della demo locale per continuare.');
      firstInvalid = firstInvalid || termsEl;
    } else {
      setFieldError(termsEl, termsErr, '');
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    completeAuth(
      {
        mode: 'register',
        method: 'form',
        enteredEmail: emailVal,
        enteredName: nameVal,
        enteredProgramme: degreeVal,
        staySignedIn: true
      },
      submitBtn
    );
  }

  function handleQuickEntry(kind, triggerBtn) {
    if (state.authenticating) return;
    var profile = resolveProfile();
    completeAuth(
      {
        mode: 'login',
        method: kind === 'sso' ? 'sso' : 'quick-luca',
        enteredEmail: profile.email,
        enteredName: profile.name,
        enteredProgramme: profile.programme,
        staySignedIn: true
      },
      triggerBtn
    );
  }

  function handleDismiss(reason) {
    if (state.authenticating) return;
    close();
    if (typeof state.options.onDismiss === 'function') {
      state.options.onDismiss({ reason: reason || 'dismiss' });
    }
  }

  /* --------------------------------------------------------------------------
     FOCUS TRAP & KEYBOARD NAVIGATION
     -------------------------------------------------------------------------- */
  function resetPasswordVisibility(gate) {
    if (!gate) return;
    gate.querySelectorAll('[data-auth-toggle-pw]').forEach(function (btn) {
      var targetId = btn.getAttribute('data-auth-toggle-pw');
      var input = document.getElementById(targetId);
      if (input) input.type = 'password';
      btn.setAttribute('aria-pressed', 'false');
      btn.setAttribute('aria-label', 'Mostra password');
      btn.innerHTML = eyeSvg(false);
    });
  }

  function getFocusableElements(container) {
    if (!container) return [];
    var selector =
      'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), ' +
      'select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.prototype.slice.call(container.querySelectorAll(selector)).filter(function (el) {
      return !el.closest('[hidden]') && el.getClientRects().length > 0;
    });
  }

  function handleGlobalKeydown(event) {
    if (!isOpen()) return;
    var gate = document.getElementById(GATE_ID);
    if (!gate) return;

    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      handleDismiss('escape');
      return;
    }

    if (event.key === 'Tab') {
      var focusables = getFocusableElements(gate);
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey) {
        if (document.activeElement === first || !gate.contains(document.activeElement)) {
          event.preventDefault();
          last.focus();
        }
      } else if (document.activeElement === last || !gate.contains(document.activeElement)) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  /* --------------------------------------------------------------------------
     DOM EVENT WIRING
     -------------------------------------------------------------------------- */
  function bindGateEvents(gate) {
    gate.querySelectorAll('[data-auth-tab]').forEach(function (tab) {
      tab.addEventListener('click', function () {
        setMode(tab.getAttribute('data-auth-tab'), false);
      });
      tab.addEventListener('keydown', function (event) {
        var tabs = Array.prototype.slice.call(gate.querySelectorAll('[data-auth-tab]'));
        var idx = tabs.indexOf(tab);
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
          event.preventDefault();
          var nextIdx = event.key === 'ArrowRight' ? (idx + 1) % tabs.length : (idx - 1 + tabs.length) % tabs.length;
          setMode(tabs[nextIdx].getAttribute('data-auth-tab'), true);
        } else if (event.key === 'Home') {
          event.preventDefault();
          setMode(tabs[0].getAttribute('data-auth-tab'), true);
        } else if (event.key === 'End') {
          event.preventDefault();
          setMode(tabs[tabs.length - 1].getAttribute('data-auth-tab'), true);
        }
      });
    });

    gate.querySelectorAll('[data-auth-theme]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var theme = btn.getAttribute('data-auth-theme');
        var pos = Number(btn.getAttribute('data-auth-theme-pos') || 0);
        if (typeof state.options.onThemeChange === 'function') {
          state.options.onThemeChange(theme, pos);
        } else if (typeof window.setTheme === 'function') {
          window.setTheme(theme, pos);
        } else {
          document.documentElement.setAttribute('data-theme', theme);
        }
        if (document.documentElement.getAttribute('data-theme') !== theme) {
          document.documentElement.setAttribute('data-theme', theme);
        }
        syncThemeButtons();
      });
    });

    gate.querySelectorAll('[data-auth-toggle-pw]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-auth-toggle-pw');
        var input = document.getElementById(targetId);
        if (!input) return;
        var reveal = input.type === 'password';
        input.type = reveal ? 'text' : 'password';
        btn.setAttribute('aria-pressed', String(reveal));
        btn.setAttribute('aria-label', reveal ? 'Nascondi password' : 'Mostra password');
        btn.innerHTML = eyeSvg(reveal);
      });
    });

    gate.querySelectorAll('[data-auth-dismiss]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        handleDismiss(btn.getAttribute('data-auth-dismiss'));
      });
    });

    var forgotBtn = document.getElementById('tutorAuthForgotBtn');
    if (forgotBtn) {
      forgotBtn.addEventListener('click', function () {
        notifyToast('Demo locale: usa qualsiasi password per accedere al profilo');
      });
    }

    var loginForm = document.getElementById('tutorAuthLoginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLoginSubmit);
    var loginEmail = document.getElementById('tutorAuthLoginEmail');
    if (loginEmail) {
      loginEmail.addEventListener('input', function () { syncLoginEmailFormat(loginEmail); });
    }

    var regForm = document.getElementById('tutorAuthRegisterForm');
    if (regForm) regForm.addEventListener('submit', handleRegisterSubmit);

    var regPw = document.getElementById('tutorAuthRegPassword');
    if (regPw) {
      regPw.addEventListener('input', function () {
        updateStrengthMeter();
        setFieldError(regPw, document.getElementById('tutorAuthRegPwErr'), '');
      });
    }

    var liveClears = [
      ['tutorAuthLoginEmail', 'tutorAuthLoginEmailErr'],
      ['tutorAuthLoginPassword', 'tutorAuthLoginPwErr'],
      ['tutorAuthRegName', 'tutorAuthRegNameErr'],
      ['tutorAuthRegEmail', 'tutorAuthRegEmailErr'],
      ['tutorAuthRegTerms', 'tutorAuthRegTermsErr']
    ];
    liveClears.forEach(function (pair) {
      var input = document.getElementById(pair[0]);
      var err = document.getElementById(pair[1]);
      if (!input) return;
      var evt = input.type === 'checkbox' ? 'change' : 'input';
      input.addEventListener(evt, function () {
        setFieldError(input, err, '');
      });
    });

    var quickLucaBtn = document.getElementById('tutorAuthQuickLucaBtn');
    if (quickLucaBtn) {
      quickLucaBtn.addEventListener('click', function () {
        handleQuickEntry('quick-luca', quickLucaBtn);
      });
    }
    var avatarReturn = gate.querySelector('[data-auth-enter-profile]');
    if (avatarReturn) {
      avatarReturn.addEventListener('click', function () {
        handleQuickEntry('quick-luca', avatarReturn);
      });
    }

    var quickSsoBtn = document.getElementById('tutorAuthQuickSsoBtn');
    if (quickSsoBtn) {
      quickSsoBtn.addEventListener('click', function () {
        handleQuickEntry('sso', quickSsoBtn);
      });
    }

    if (typeof window.ResizeObserver === 'function') {
      state.resizeObserver = new window.ResizeObserver(function () {
        if (isOpen()) syncSegmentedKnob();
      });
      var seg = gate.querySelector('.tutor-auth-seg');
      if (seg) state.resizeObserver.observe(seg);
    }
  }

  function bindDelegatedTriggers() {
    if (state.delegatedBound) return;
    state.delegatedBound = true;

    if (typeof window.addEventListener === 'function') {
      window.addEventListener('resize', function () {
        if (isOpen()) window.requestAnimationFrame(syncSegmentedKnob);
      });
    }

    document.addEventListener('keydown', handleGlobalKeydown, true);

    document.addEventListener('click', function (event) {
      var openTrigger = event.target && event.target.closest ? event.target.closest('[data-tutor-auth-open]') : null;
      if (openTrigger) {
        event.preventDefault();
        open(openTrigger.getAttribute('data-tutor-auth-open') || 'login');
        return;
      }

      var quickTrigger = event.target && event.target.closest ? event.target.closest('[data-tutor-auth-quick]') : null;
      if (quickTrigger) {
        event.preventDefault();
        mount(state.options);
        var profile = resolveProfile();
        var onAuth = state.options.onAuthenticated;
        if (typeof onAuth === 'function') {
          onAuth({
            mode: 'login',
            method: 'embedded-quick',
            enteredEmail: profile.email,
            enteredName: profile.name,
            enteredProgramme: profile.programme,
            staySignedIn: true
          });
        } else {
          open('login');
        }
      }
    });
  }

  /* --------------------------------------------------------------------------
     PUBLIC API
     -------------------------------------------------------------------------- */
  function ensureMounted() {
    var existing = document.getElementById(GATE_ID);
    if (existing) {
      if (!existing.dataset.tutorAuthBound) {
        bindGateEvents(existing);
        existing.dataset.tutorAuthBound = '1';
      }
      state.mounted = true;
      return existing;
    }

    if (!document.body) return null;

    var profile = resolveProfile();
    var gate = document.createElement('div');
    gate.id = GATE_ID;
    gate.setAttribute('role', 'dialog');
    gate.setAttribute('aria-modal', 'true');
    gate.setAttribute('aria-labelledby', 'tutorAuthDialogTitle');
    gate.setAttribute('aria-hidden', 'true');
    gate.innerHTML = buildGateMarkup(profile);
    document.body.appendChild(gate);

    bindGateEvents(gate);
    gate.dataset.tutorAuthBound = '1';
    state.mounted = true;
    syncThemeButtons();
    syncProfileBindings();
    return gate;
  }

  function mount(options) {
    if (options && typeof options === 'object') {
      state.options = Object.assign({}, state.options, options);
    }
    bindDelegatedTriggers();

    if (!document.body) {
      document.addEventListener('DOMContentLoaded', function onReady() {
        ensureMounted();
      }, { once: true });
      return window.TutorAuth;
    }

    ensureMounted();
    syncThemeButtons();
    syncProfileBindings();
    return window.TutorAuth;
  }

  function open(initialMode) {
    var mode = initialMode === 'register' ? 'register' : 'login';
    var gate = ensureMounted();
    if (!gate) {
      document.addEventListener('DOMContentLoaded', function () {
        open(mode);
      }, { once: true });
      return;
    }

    bindDelegatedTriggers();
    window.clearTimeout(state.authTimer);
    setAuthenticatingUI(false);

    if (document.activeElement && !gate.contains(document.activeElement)) {
      state.lastFocused = document.activeElement;
    }

    syncThemeButtons();
    syncProfileBindings();
    resetPasswordVisibility(gate);
    var loginPw = document.getElementById('tutorAuthLoginPassword');
    if (loginPw) loginPw.value = '';
    var regPw = document.getElementById('tutorAuthRegPassword');
    if (regPw) regPw.value = '';
    updateStrengthMeter();
    setMode(mode, false);

    gate.setAttribute('aria-hidden', 'false');
    gate.scrollTop = 0;
    gate.classList.add('is-open');
    state.open = true;

    window.requestAnimationFrame(function () {
      syncSegmentedKnob();
      var focusId = mode === 'register' ? 'tutorAuthRegisterTitle' : 'tutorAuthDialogTitle';
      var target = document.getElementById(focusId);
      if (target) {
        target.focus({ preventScroll: true });
      }
    });
  }

  function close() {
    window.clearTimeout(state.authTimer);
    setAuthenticatingUI(false);

    var gate = document.getElementById(GATE_ID);
    if (gate) {
      gate.classList.remove('is-open');
      gate.setAttribute('aria-hidden', 'true');
    }
    state.open = false;

    if (state.lastFocused && typeof state.lastFocused.focus === 'function' && document.contains(state.lastFocused)) {
      try {
        state.lastFocused.focus({ preventScroll: true });
      } catch (_) {}
    }
    state.lastFocused = null;
  }

  function isOpen() {
    var gate = document.getElementById(GATE_ID);
    return Boolean(state.open && gate && gate.classList.contains('is-open'));
  }

  function renderEmbeddedLoginCard(profile) {
    var resolved = resolveProfile(profile);
    var safeName = escapeHtml(resolved.name);
    var safeProgramme = escapeHtml(resolved.programme || 'Profilo studente');
    var safeEmail = escapeHtml(resolved.email);

    return (
      '<section class="tutor-auth-embedded" aria-labelledby="tutorAuthEmbeddedHeading">' +
        '<div class="tutor-auth-embedded-art">' +
          '<div class="tutor-auth-embedded-user">' +
            '<span class="tutor-auth-embedded-av" aria-hidden="true">' + renderAvatarInnerHtml(resolved) + '</span>' +
            '<div>' +
              '<strong>' + safeName + '</strong>' +
              '<span>' + safeProgramme + '</span>' +
            '</div>' +
          '</div>' +
          '<img class="tutor-auth-embedded-notebook" src="assets/auth-notebook.svg" alt="" width="500" height="240">' +
          '<small class="tutor-auth-embedded-session">' + safeEmail + '</small>' +
        '</div>' +
        '<div class="tutor-auth-embedded-body">' +
          '<span class="tutor-auth-embedded-mode">Demo locale</span>' +
          '<h1 id="tutorAuthEmbeddedHeading" tabindex="-1">Rientra in TutorAI</h1>' +
          '<p>Riprendi lezioni, appunti e quiz dal tuo profilo salvato.</p>' +
          '<div class="tutor-auth-embedded-actions">' +
            '<button type="button" class="btn blue-pri" data-tutor-auth-quick="luca">Entra subito come ' + safeName + ' →</button>' +
            '<button type="button" class="btn" data-tutor-auth-open="login">Accedi con email</button>' +
            '<button type="button" class="btn ghost" data-tutor-auth-open="register">Registrati</button>' +
          '</div>' +
        '</div>' +
      '</section>'
    );
  }

  window.TutorAuth = {
    mount: mount,
    open: open,
    close: close,
    isOpen: isOpen,
    renderEmbeddedLoginCard: renderEmbeddedLoginCard
  };
})(window, document);
