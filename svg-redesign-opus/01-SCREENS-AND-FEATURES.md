# App Screens & Required Functional Elements (Keep Feature Parity)

## Shared Navigation Chrome
- **Left Flowing Wave Rail:** Brand logo top -> 3 primary tabs (`Corsi`, `Studio`, `Ripasso` with active due dot) -> theme switcher (`Light`, `Sepia`, `Dark`) -> student avatar (`Luca`).

## The 8 Screens (`../screenshot/01` .. `08`)
1. **Home & Corsi (`01-home-corsi.png`):**
   - Greeting (`Bentornato, Luca`) + shortcut to **Archivio Vault**.
   - Clear **Continue Last Lesson** hero card (`1.3 Orologi Logici di Lamport`, `Riprendi lezione →`) clearly distinct from course list below.
   - Active course cards (*Sistemi Distribuiti*, *Algoritmi*, *Crittografia* with verified counts / *"Da ripassare"* badge, search & `+ Nuovo corso`) + compact **Ultimo appunto** preview card.
2. **Nuovo Corso Wizard (`02-wizard-stile.png`):**
   - Stepper (`1 Obiettivo · 2 Materiali · 3 Mappa`), course name + quick presets, 2 paths (*Lezione per lezione* vs *Prepara un esame*), **6 STEM icon picker + color swatches**, live course card preview.
3. **Studio Split View (`03-studio-spiegazione.png`):**
   - **Left (AI Sources):** `Spiegazione / Slide` toggle, `Dettaglio` menu, theorem/formula callout, **interactive timeline diagram** (`P₁/P₂/P₃` messages & clickable timestamp nodes), paragraphs with subtle text-selection highlight + **floating Ask-Tutor popover** anchored right at the selected phrase (`Approfondisci`, `Semplifica`, `Esempio`, `+ Negli appunti`, custom question input).
   - **Right (Personal Sheet):** Editable Craft/Notion/Obsidian-style paper notes (`Orologi Logici di Lamport`), inline caution callout, floating formatting dock (`B I S U Σ +`), `"Rivedi i miei appunti →"`.
4. **Archivio Vault (`04-archivio-vault.png`):**
   - Obsidian-compatible folder finder modal/panel: course folders left, 3 nested folders (*I miei appunti*, *Note generate*, *Slide e allegati*), search bar, note preview & `.md` Obsidian export.
5. **Ripasso Lobby (`05-ripasso-lobby.png`):**
   - Priority today session hero (`1.2 Relazione Happened-Before`, `Inizia sessione →` / `Risposta scritta`), custom course review picker, **5-day recall calendar + checklist**, recent test scores.
6. **Ripasso Quiz Session (`06-ripasso-quiz-svg.png`):**
   - Distraction-free question stage with progress segments, **visual timeline diagram** (`P₁ C(A)=3` vs `P₂ C(B)=5`, `0 messaggi scambiati`), crisp `A/B/C` option cards.
7. **Profilo & Knowledge Brain (Dark Mode showcase, `07-profilo-dark.png`):**
   - Student identity (`Luca · Ingegneria Informatica`), streak/verified metrics, 7-day rhythm visual, **Knowledge Brain** visual centerpiece (anatomical neural brain showing `4/9` verified mastery), chronological study timeline.
8. **Login / Auth Portal (`08-auth-portal.png`):**
   - Split card: wave showcase side (product value pills + saved avatar preview strip) + clean `Accedi / Registrati` form with quick-enter Luca & University SSO buttons.
