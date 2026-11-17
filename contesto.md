# Contesto TutorAI · Passaggio a nuova chat

Repository locale: `c:\Users\Luca\Desktop\TUTORAI` · Branch attivo: `UNI`

## 1. Stato attuale del lavoro

In questa sessione sono stati progettati, approvati e integrati sia i mockup vettoriali sia il prototipo interattivo:

- **Mockup SVG (`docs/mockup-svg/`):** generati da `scripts/generate_svg_mockups.mjs` dopo revisione con **Gemini 4 Argon (High)** e documentati in `docs/mockup-svg/README.md`. Comprendono 11 schermate desktop (`1600×1000`, `01-corsi.svg`–`11-verifica-storica.svg`), 3 tavole riepilogative (`00-panoramica.svg`, `00-flusso-studio.svg`, `00-flusso-ripasso.svg`) e le rispettive 14 anteprime PNG in `docs/mockup-svg/anteprime/`.
- **Prototipo interattivo (`index.html`):** aggiornato integrando l'intera architettura e l'estetica dei mockup SVG approvati, mantenendo i 3 temi (`light`, `sepia`, `dark`), KaTeX, il wizard a 3 passaggi e tutti i flussi interattivi lato client.

## 2. Decisioni UI/UX e architetturali consolidate

- **Tono visivo:** eliminati testi didascalici, avvisi meta-esplicativi e disclaimer ripetitivi; gerarchia guidata da card visive, anelli/barre di avanzamento e stati chiari.
- **Rail laterale sinistra (con trama blu ondulata adattiva ai temi):**
  - Logo `assets/logo.png` presente **una sola volta** in cima alla rail (rimosso il duplicato dall'header Home).
  - Voci principali: `Corsi`, `Studio`, `Ripasso` (con indicatore di richiamo).
  - In basso: selettore tema a 3 stati (`Chiaro`, `Seppia`, `Scuro`) e avatar **`Profilo`** (`L` con badge orologio) che apre la cronologia globale `#view-attivita`.
  - L'ingranaggio di debug (`Proto · JSON` / `#demoDrawer`) è stato tolto dalla rail studente e collocato in modo discreto dentro la testata di `Profilo` (senza pulsanti fissi sovrapposti a schermo).
- **Flusso a 4 viste principali + Profilo (`Corsi → Corso → Studio → Ripasso`):**
  1. **Home (`#view-corso`):** saluto `Bentornato, Luca` con streak, filtro di ricerca corsi dal vivo, hero card `Ultima lezione` con i soli pulsanti `Continua →` e `Vai al corso` (nessun `+ Aggiungi lezione` né `Storico lezioni` in Home), griglia corsi con banner grafici per materia e tessera **`+ Nuovo corso`** integrata come 4ª card. Il wizard crea corsi con 2 percorsi (*Lezione per lezione* incrementale vs *Prepara un esame* in blocco), 5 icone STEM (`nodes`, `wave`, `db`, `matrix`, `atom`) e 6 colori.
  2. **Dettaglio Corso (`#view-dettaglio`):** schermata dedicata aperta cliccando un corso; ospita `Lezioni del corso`, il pulsante contestuale **`+ Aggiungi lezione`**, il riquadro `Ripasso del corso` e il pannello `Materiali`.
  3. **Studio (`#view-studio`):** topbar con `← Corso` e pulsante **`Indice`** in alto a sinistra accanto al breadcrumb; la sidebar `#courseSidebar` si apre **solo dentro Studio**. A sinistra `Spiegazione | Slide`, selettore `Dettaglio` (`Sintesi / Guidata / Completa`), diagramma interattivo e pop-up su selezione testo; a destra foglio appunti in stile **Obsidian** su micro-griglia tecnica con **dock flottante centrato in basso** (`B I S U | x² x₂ | </> Σ formula ”`) funzionante, revisione socratica ancorata al dubbio e diff inline `v1 → v2` prima di `Termina lo studio →`.
  4. **Ripasso (`#view-ripasso`):** nessuna sidebar corso a sinistra; flussi separati in **Lobby** (`Da ripassare oggi`, `Prossimi richiami`, `Padronanza per materia` con anelli di progresso, `Verifiche recenti`), **Sessione focus senza aiuti** (3 domande una alla volta, toggle `Scelta rapida | Risposta scritta`, diagramma `P₁/P₂` con solo `0 messaggi scambiati` senza spoiler), **Esito della sessione** e **Verifica archiviata** riapribile da `Verifiche recenti` o da `Profilo`.
  5. **Profilo e attività (`#view-attivita`):** banner statistiche calcolate dallo stato corrente, cronologia filtrabile (`Tutto | Studio | Appunti | Verifiche` + filtro per corso) e riepilogo corsi cliccabile.

## 3. Verifiche eseguite sull'ultima versione

- `python scripts/check_docs.py`: esito `0` (`OK: 10 documenti Markdown, 79 riferimenti locali, 2 esempi JSON, SVG e logo PNG. ID verificati: F01-F17, T01-T12, AC01-AC18.`).
- Validazione sintattica del `<script>` in `index.html` con Node (`new Function`): `JS_SYNTAX_OK 170229`.
- Validazione XML su tutti i 14 file in `docs/mockup-svg/*.svg`: `XML_OK 14`.
- Verifica interattiva su browser locale (`1440×900` desktop e `390×844` mobile) su Home, Dettaglio Corso, modale `+ Aggiungi lezione`, Studio nei temi Light/Seppia/Dark, Ripasso Lobby/Session/Esito, Profilo/Archivio e Wizard: **0 errori console**, modali opachi, nessuna sovrapposizione in Studio e zero overflow orizzontale su mobile.

## 4. Stato git e file presenti nel workspace

Al passaggio alla nuova chat, oltre ai file di questa attività (`index.html`, `docs/mockup-svg/`, `scripts/generate_svg_mockups.mjs`, `contesto.md`), risultano modificati o non tracciati nel working tree:

- Modificati: `CONTRIBUTING.md`, `README.md`, `docs/ARCHITETTURA.md`, `docs/INTERFACCIA.md`, `docs/PIANO.md`, `docs/SPECIFICA.md`, `index.html`.
- Non tracciati: `assets/Visual identity/`, `docs/domande.md`, `docs/mockup-svg/`, `scripts/generate_svg_mockups.mjs`, `contesto.md`.

*(Nota: i file `CONTRIBUTING.md`, `README.md`, `docs/*.md` e `assets/Visual identity/` sono stati aggiornati separatamente nel repository rispetto al lavoro sugli SVG e su `index.html`: controllarne il contenuto prima di intervenire su specifica o documentazione.)*

## 5. Comandi utili e prossimi passi suggeriti

- Rigenerare i mockup SVG dopo eventuali modifiche al generatore: `node scripts/generate_svg_mockups.mjs` (le PNG in `docs/mockup-svg/anteprime/` vanno poi ri-renderizzate separatamente).
- Controllo integrità documentazione e riferimenti: `python scripts/check_docs.py`.
- **Prossimi passi nella nuova chat:**
  1. Verificare con l'utente eventuali rifiniture su `index.html` o allineare `docs/domande.md` / `docs/SPECIFICA.md` / `docs/INTERFACCIA.md`.
  2. Progettare e avviare l'implementazione applicativa reale (persistenza dati, ingestion documenti PDF/Markdown, backend LLM con citazioni e motore verifiche) seguendo `docs/ARCHITETTURA.md`, `docs/CONTRATTI_E_DATI.md` e `docs/PIANO.md`.
