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

---

## 6. Aggiornamento successivo: Visual Reference, feedback utente e piano UI/UX

> Le sezioni 1–5 fotografano lo stato iniziale al passaggio di consegna (prima dei restyling su `index.html`). Le sezioni 6–8 integrano le **visual reference** in `assets/Visual identity/`, le idee e le valutazioni raccolte da Luca sito alla mano (sia sul prototipo iniziale sia dopo la prima passata UI) e la **checklist operativa** da seguire punto per punto senza tralasciare richieste.

### Stato osservato nella working tree (sola lettura)
- In `assets/course-covers/` sono presenti **5** copertine: `algebra.webp`, `algoritmi.webp`, `crypto.webp`, `fisica.webp`, `sistemi.webp` (in `index.html`, `COURSE_COVERS` mappa 6 chiavi: `nodes`, `wave`, `db`, `lock`, `matrix`, `atom`, con `db` e `lock` che condividono `crypto.webp`).
- In `assets/profile-avatars/` sono presenti **5** avatar: `avatar-1.webp`–`avatar-5.webp`.
- In `assets/Visual identity/` risultano presenti **17** file (13 immagini + 4 video `.mp4`); il vecchio file `3e2bffa710df968f4d188ed8f17af7e4.jpg` risulta rimosso.
- `index.html` presenta modifiche locali in corso (tra cui `#fileFinder`/`Archivio`, `showStudioSources`, `.recall-hero.has-errors`, `.profile-settings-trigger`, `openAccountPage('login')`, `PROFILE_AVATARS`): tutti i requisiti seguenti vanno verificati sull'interfaccia reale al termine delle modifiche.

---

## 7. Mappa delle Visual Reference (`assets/Visual identity/`)

> **Nota sull'ordinamento:** Luca ha commentato i file aprendo la cartella ordinata per **nome crescente con ordinamento naturale di Windows** (i numeri iniziali vengono confrontati per valore numerico: `1…` < `2…` < `4…` < `8…` < `225…`, poi ordine alfabetico). Di seguito la corrispondenza esatta di tutti i **17** asset.

| # | File (`assets/Visual identity/`) | Cosa mostra l'asset | Indicazioni e priorità di Luca |
| :-: | --- | --- | --- |
| 1 | `1ee15873cbfdbdf4d0a812538a2ae05b.jpg` | UI *Knowledge Base*: sidebar icone a sinistra, albero `Folders` / `Tags` con contatori, anteprime cartelle e lista file sotto. | **Gestione cartelle stile Obsidian / File Finder:** integrare una vista a cartelle interna (e idealmente un vault compatibile Obsidian dietro le quinte) per rivedere appunti scritti, appunti generati, slide e file caricati in un flusso continuo, evitando solo Markdown scaricabili. |
| 2 | `2e7336d7c39412f45182401a0307917c.jpg` | App mobile *Kidory*: libreria illustrata e vista lettura (`Chapter 1`) con slider luminosità, 3 temi caldo/scuro, dimensione font `- 24 +` e allineamento. | **Identità visiva e lettura:** cura di font, impaginazione delle spiegazioni, accessibilità, controllo luminosità/illuminazione, formato testuale e pulizia estetica. |
| 3 | `4b3eea22e3967711f384ba0b776baa73.jpg` | App mobile *E-LearnUp*: schermata hero illustrata, `Featured courses` a card colorate, `Ongoing` con progress bar essenziali, `Calendar` orario a blocchi. | **Pulizia ed esperienza *driven*:** niente muri di testo a schermo; l'utente viene guidato a cliccare poche icone chiare invece di dover gestire mille elementi contemporaneamente. |
| 4 | `8dc13e750684a9e4a2595374e9c63852.jpg` | Editor desktop *Scribe*: foglio centrale pulito, popup AI contestuale su selezione (`Actions` / `Rewrite AI`), pannello destro **`Theme Style`** (`Aa` colorati) + `Text Editor` + `Others`. | **Riferimento principale per le note** (*"l'esempio più lampante, quella che bisogna prendere più da riferimento"*): ottimo il concetto di `Theme Style`, lo stile di scrittura, la scelta dei font e la pulizia dell'editor appunti. |
| 5 | `225e42639927623c588b3922a5b2d486.jpg` | Workspace desktop *Docs*: griglia card documenti, barra `Shortcut` a cartelle rapide e statistiche in basso (`Documentation Engagement Trend`, `Views & Edits by Week`). | **Documenti e statistiche:** buona organizzazione rapida dei documenti e apprezzate le statistiche visive nella parte inferiore. |
| 6 | `a2671e517bb39a29c7482e0af14fff9c.jpg` | Workspace *LeaderForge*: topbar con profilo a destra, lista cronologica `History of reflection` a sinistra, editor con tag e domanda AI contestuale. | **Note + Profilo (con riserva sul testo):** molto puliti editor, gestione lista a sinistra e profilo in alto, ma contiene **un po' troppo testo/scritte** rispetto alle altre reference (quindi piace un po' meno). |
| 7 | `b6bdd1d9acb4d561e97b6780a2be7ffa.jpg` | App studenti illustrata (*Hello, Jacob*): trofeo e tocco accademico illustrati, chip materie con icone illustrate, card corsi pulite e grafico `Progress` a barre. | **Focus su espressione creativa e poche scritte:** tante icone, immagini e illustrazioni di stile; l'icona deve comunicare la funzione senza spiegazioni testuali eccessive; pochi elementi per schermata, flusso molto *driven*. |
| 8 | `c312292dbaf33a1c1f6b936cb5731e48.jpg` | App note visive a card colorate (anche con tracce audio) + editor rapido con selettore `Note color`, tag e dock a 4 azioni (`Copy link`, `Share`, `Draw`, `Save`). | **Note utente:** ulteriore spunto visivo su come gestire e rendere immediate le note scritte dallo studente. |
| 9 | `craft.do_-1024x416.webp` | Interfaccia desktop *Craft.do*: sidebar con `Starred` e `Folders` colorate, griglia `All Docs` con card dai bordi colorati e anteprime pulite. | **Stile Notion / Craft:** riferimento molto pulito e ordinato per raccogliere e mostrare note/documenti. |
| 10 | `d0ad1c582dabb350633a72610ae6bc2e.jpg` | Header con pulsante **`Share +`**, avatar illustrato/3D e menu a tendina (`Profile`, `Community`, `Subscription`, `Settings`, `Help center`, `Sign out`). | **Profilo, Impostazioni, Login e Sharing:** evidenzia la necessità di mockup completi per Login, Impostazioni e Profilo, oltre all'idea di poter condividere le note (`Share +`). |
| 11 | `e4c256f000b1ae82abb568692610e1c6.jpg` | Browser cartelle *Kintsugi*: navigazione a sinistra, griglia cartelle con contatori e pannello destro `Info` (`Properties`, `Tags`, spazio occupato). | **Pulizia e responsività:** buon riferimento per organizzazione gerarchica e visualizzazione responsiva di cartelle e note. |
| 12 | `ebcff175d43e41e033926d4362bab944.jpg` | App *Lao Note*: splash scuro minimale, lista note a card con categoria, editor con **popup flottante colorato per evidenziare** + **dock nera compatta** in basso e griglia `Categories` colorata. | **Reference pinnata di merito preferita** (*"davvero di merito perché mi piace molto, quindi te la pinno ancora di più"*): modello ideale per gestione, evidenziazione e lettura/scrittura pulita delle note. |
| 13 | `fdc095a248a3306d2a30a9ef6e327df0.jpg` | Interfaccia *Refund Assistant* su canvas a puntini: pannello sinistro e diagramma verticale a blocchi puliti con rami `Yes / No`. | **Schemi e spiegazioni AI:** nonostante il dominio diverso, piacciono molto il linguaggio a blocchi per spiegazioni/schemi AI, il font e lo **sfondo a puntini**. |
| 14 | `From Klickpin.com- Daily strong woman quotes with charm and useful ideas with easy charm for modern quote boards-pin-id-1001347298394578137.mp4` | Griglia *200 Animated Icons* su sfondo nero con micro-animazioni lineari sui simboli UI. | **Icone animate e giocose:** micro-animazioni fluide sulle icone per rendere l'app viva e accattivante per uno studente. |
| 15 | `From Klickpin.com- Meal prep lunch ideas that bring together comfort beauty and useful ideas you will actually try for women who love classy Pinte.mp4` | Bottone `+ Create New` che si espande fluidamente con effetto morphing in una card di scelta (`Project`, `Task`, `Note`, `Goal`, `Milestone`, `Reminder`). | **Creazione fluida:** animazione morbida per apertura creazione note/elementi. |
| 16 | `From Klickpin.com- Pin these beautiful ways to style your focus routine that turn ordinary ideas into scroll-stopping inspiration with beginner-fr.mp4` | Sfera/globo blu rotante formato da matrice di caratteri/cerchietti in stile **ASCII**. | **Idea extra opzionale (Profilo):** visualizzare la mappa della conoscenza (*knowledge*) dello studente in stile grafico ASCII (funzione accessoria, non prioritaria rispetto ai flussi core). |
| 17 | `From Klickpin.com- Quiet leafy home mood boards with charm and useful ideas this season for peaceful pin collections-pin-id-841891724129192521.mp4` | Dock flottante inferiore (`Style`, `Upsells`, `Content`, `Customize`) con transizioni morbide di ridimensionamento e cambio pannello. | **Micro-interazioni UI:** conferma il livello di fluidità, pulizia e animazione desiderato per dock e controlli contestuali. |

---

## 8. Idee, critiche "sito alla mano" e checklist operativa UI/UX

Questa sezione unifica sia le osservazioni iniziali di Luca sul prototipo sia il secondo giro di feedback dopo le prime modifiche ChatGPT/asset generati, organizzato per vista e trasformato in piano di controllo esplicito.

### 8.1 Principi generali e stile
- **Poche scritte, UI *driven*:** evitare sovraccarico testuale e troppe opzioni contemporanee a schermo; preferire icone chiare, illustrazioni di qualità e percorsi lineari passo-passo.
- **Animazioni fluide e carattere student-friendly:** introdurre micro-animazioni curate su icone, aperture modali/creazione e dock flottanti (senza appesantire la leggibilità).
- **Continuità file / appunti (stile Obsidian / File Finder):** l'utente deve poter sfogliare dentro un file finder ordinato a cartelle i propri appunti scritti, le note generate, le slide e gli allegati caricati (in prospettiva compatibile con un vault Obsidian), invece di interrompere il flusso con soli export `.md`.

### 8.2 Checklist per vista (da verificare e spuntare punto per punto)

1. **Rail laterale sinistra (confermata):**
   - [ ] Mantenere la rail laterale sinistra con trama/sfondo, stile delle icone, selettore temi (`Chiaro`, `Seppia`, `Scuro`) e accesso profilo in basso.

2. **Home (`#view-corso`) & Copertine / Nuovo corso:**
   - [ ] Curare sfumature visive e pulizia generale tra hero `Ultima lezione` in alto e griglia corsi sotto.
   - [ ] Garantire coerenza cromatica e semantica di badge/avanzamenti sui corsi (niente cambi incoerenti tra verde/blu poco leggibili).
   - [ ] Verificare che tutti i simboli/materie dei corsi abbiano **icone e illustrazioni/copertine coerenti e complete** (inclusa eventuale distinzione tra `db` e `lock`, oggi mappati entrambi su `crypto.webp`, e qualità grafica in stile generabile anche in one-shot con GPT Image).
   - [ ] Valutare il posizionamento/ruolo di `Archivio` in alto a destra (tenibile se coerente con il File Finder a cartelle).
   - [ ] **Critico:** verificare e testare da capo a fondo il flusso **`+ Nuovo corso`** (in precedenza segnalato come buggato / non sistemato alla pressione del pulsante e nella gestione pagina corsi).

3. **Dettaglio Corso (`#view-dettaglio`):**
   - [ ] Ridurre scritte superflue e rimandi duplicati sparsi (`Continua`, `Riprendi`, `Vai al ripasso`), sostituendoli con un percorso chiaro e predisposto.
   - [ ] Non esporre i `Materiali` in grande al centro della vista: gestirli in modo discreto (menu a tendina / cassetto / pannello apribile su richiesta).

4. **Studio (`#view-studio`):**
   - [ ] Semplificare l'angolo in alto a sinistra: togliere l'etichetta/freccia ridondante con scritto `Corso` e garantire comunque un ritorno naturale e immediato alla pagina del corso.
   - [ ] Spostare o alleggerire il selettore di dettaglio (`Sintesi / Guidata / Completa`): valutare di gestirlo dalle **Impostazioni**, lasciando in Studio soprattutto lo switch pulito `Spiegazione | Slide`.
   - [ ] **Critico — Citazioni fonti:** **non** mostrare di default i badge/citazioni sulla fonte accanto alle spiegazioni (aggiungono rumore per lo studente); mantenerli al massimo nascosti dietro un controllo opzionale esplicito (`Mostra fonti` disattivato di default).
   - [ ] Allineare estetica di spiegazioni e schemi AI alle reference preferite: leggibilità/accessibilità tipo *Kidory* (`2e7336...`) e blocchi/diagrammi su sfondo a puntini stile `fdc095...`.
   - [ ] **Appunti a destra:** mantenere l'attuale pulizia ispirandosi a **Scribe** (`8dc13e...` — `Theme Style` e tipografia) e **Lao Note** (`ebcff1...` — evidenziatore flottante su selezione e barra compatta); oltre al menu `...`, consentire di mostrare i comandi in una barra superiore e prevedere un'azione/concetto di **condivisione nota (`Share`)**.
   - [ ] Confermare buon funzionamento di `Chiedi al tutor`, `Indice`, `Rivedi i miei appunti` e assicurare a fine studio sia il ritorno al corso sia il passaggio diretto al **quiz di verifica**.

5. **Ripasso & Quiz (`#view-ripasso`):**
   - [ ] Assicurarsi che non siano presenti filtri corsi superflui in alto a destra; tenere l'avvio sessione pulito in alto a sinistra.
   - [ ] Rendere la lobby molto più guidata e intuitiva: percorso lineare `scegli corso → scegli lezione → ripassa` + oltre ai `Prossimi richiami` valutare un **calendario interattivo con checklist** dei ripassi nei giorni successivi.
   - [ ] Semplificare i quiz con meno testo e meno opzioni dispersive, puntando a un flusso singolo guidato.
   - [ ] **Critico — Evidenza errori nell'esito (`0 su 3 corrette`):** le risposte sbagliate devono essere chiaramente marcate in **rosso** e la schermata finale deve riportare gli errori e le correzioni in modo inequivocabile (mai una schermata neutra priva di segnalazione errori).

6. **Profilo, Impostazioni, Login & Avatar (`#view-attivita`):**
   - [ ] Mantenere pulita la barra statistiche in alto evitando sotto un eccesso di dati/elenchi confusi; considerare opzionalmente una visualizzazione creativa della knowledge (es. globo ASCII stile reference #16).
   - [ ] Usare una vera **icona Impostazioni** (ingranaggio) anziché il solo testo "Impostazioni".
   - [ ] Garantire il ciclo completo **Login / Logout simulato** con pagina mockup di accesso dedicata e pulsante di uscita.
   - [ ] Consentire la scelta/cambio dell'**avatar profilo** tra più icone generate (es. 5 varianti create one-shot con GPT Image — verificare qualità e selezione attiva delle 5 già presenti in `assets/profile-avatars/`).
