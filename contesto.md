# Contesto TutorAI · Passaggio a nuova chat

Repository locale: `c:\Users\Luca\Desktop\TUTORAI` · Branch attivo: `UNI` (`HEAD`: `d1ccfd7`) · Aggiornato: `2026-11-18 23:35`

## 1. Stato attuale del lavoro (SVG Redesign + Prototipo Live)

Il redesign visivo è stato progettato su mockup standalone `1440×900` in `svg-redesign-opus/mockups/` (con brief leggeri `00–02` e baseline in `screenshot/01–08`) ed è stato poi tradotto nel prototipo web (`index.html`, `auth.js`, `auth.css`, `tab-corsi-archivio.css`, `tab-studio-tutor.css`, `tab-ripasso-profilo.css`, `docs/STILE_VISIVO.md`):

- **Mockup SVG completati (`svg-redesign-opus/mockups/`, 7/7 validati XML + verificati visivamente a `1440×900`):**
  - *Batch 1 (Claude Opus 5.5 High):*
    - `01-home-corsi.svg` — Home con saluto, `Ultima lezione`, card corsi **Craft a doppia cornice**, ricerca e `+ Nuovo corso`.
    - `03-studio-spiegazione.svg` — Split view Studio con selettore fonti/slide, diagramma interattivo, popup tutor su selezione testo e foglio appunti con dock flottante.
    - `05-ripasso-lobby.svg` — Lobby Ripasso con sessione prioritaria del giorno, selettore corso e calendario 5 giorni.
  - *Batch 2 (`07`, `02`, `04` da Claude Opus 5.5 High; `08` rifinito da Gemini 4 Neon High con contesto esteso):*
    - `07-profilo-dark.svg` — Dark mode (`Diario di studio`), `Attività recenti` + `PROSSIMO RICHIAMO`, **Knowledge Brain** anatomico a due emisferi + percorsi sinaptici (`4/9 verificate`), `Ultimi 7 giorni`, `Unità verificate` (nessun tasto `Pausa`).
    - `02-wizard-stile.svg` — Wizard passo 1 (`Obiettivo`): input corso (`0/90`), 2 percorsi affiancati, 6 icone STEM + 6 swatch colore e `ANTEPRIMA DAL VIVO` con card Craft a doppia cornice.
    - `04-archivio-vault.svg` — Modale `Archivio · VAULT OBSIDIAN` (`Ctrl K`, `Chiudi`), albero corsi + `#etichette`, export `.md`, 3 cartelle colorate (`I miei appunti`, `Note generate`, `Slide e allegati`), schede e allegati.
    - `08-auth-portal.svg` — Portale split-screen editoriale su carta calda `#f6f4ef`, lato cobalto con quaderno `Lamport` + badge `Knowledge Brain 4/9 verificate` + strip `Luca · Profilo salvato`; lato destro con pill `Torna all'anteprima`, `Accedi / Registrati`, `Entra subito come Luca`, `Accesso con SSO Ateneo`, form con icone busta/lucchetto e `Continua come ospite`.
- **Nuovi asset SVG integrati nel prototipo:** `assets/auth-notebook.svg` e `assets/profile-brain.svg`.
- **Documentazione allineata:** `docs/STILE_VISIVO.md` aggiornato con la tabella dei 7 mockup di riferimento (`01, 02, 03, 04, 05, 07, 08`) e le regole per ogni flusso (inclusi `Archivio`, `Profilo e impostazioni`, `Accesso`). *(Nota storica: i vecchi mockup generati `docs/mockup-svg/` + `scripts/generate_svg_mockups.mjs` sono stati sostituiti come riferimento visivo da `svg-redesign-opus/mockups/`.)*

## 2. Traduzione già applicata nel prototipo (stato al `23:35`, non committata)

Oltre al passaggio precedente su Batch 1 (`Home`, `Studio`, `Ripasso`), risultano già applicate modifiche locali nei file `index.html` (`488,778` byte), `auth.js`, `auth.css`, `tab-corsi-archivio.css`, `tab-ripasso-profilo.css`, `tab-studio-tutor.css`:

- **Accesso (`auth.js`, `auth.css`, `assets/auth-notebook.svg`):** integrazione quaderno `auth-notebook.svg`, icone `tutor-auth-leading-icon` (mail/lucchetto) negli input, `Rientra nel profilo salvato`, caption di rientro, rimozione proto-banner superfluo, gerarchia `Entra subito come Luca` / `SSO Ateneo` / `Email` / `Ospite`.
- **Wizard Nuovo Corso (`index.html`, `tab-corsi-archivio.css`):** griglia `.wizard-config`, contatore `wizardNameLength` (`0/90`), 2 percorsi affiancati, picker icone/colori con didascalie, suggerimento abbinamento icona e anteprima live `.wizard-preview-stage` / `.wizard-preview-card-paper`.
- **Archivio Vault (`index.html`, `tab-corsi-archivio.css`):** modale `#fileFinder` con ricerca (`Ctrl+K`/`Meta+K`), filtro tipo `Tutti / Appunti / Spiegazioni` (`setFinderType`), switch griglia/lista (`setFinderLayout`), export `.md` singola unità (`exportFinderMarkdown`) o corso (`exportFinderCourseNotes`), righe allegati `.finder-attachment`.
- **Profilo & Knowledge Brain (`index.html`, `tab-ripasso-profilo.css`, `assets/profile-brain.svg`):** `renderProfileBrain` con filtro per corso, paginazione nodi sopra `assets/profile-brain.svg`, collegamenti SVG dinamici (`.profile-brain-links`), legenda stati e azioni contestuali (`Apri lezione`, `Appunti`, `Ripassa`).

## 3. Verifiche eseguite sull'ultima versione (`2026-11-18 23:35`)

- `python scripts/check_docs.py`: **PASS** (`OK: 11 documenti Markdown, 100 riferimenti locali, 2 esempi JSON, SVG e logo PNG. ID verificati: F01-F17, T01-T12, AC01-AC18.`).
- Controllo sintattico JS (`new Function` su `auth.js` e sul `<script>` inline di `index.html`) + bilanciamento `{ }` su `auth.css`, `tab-corsi-archivio.css`, `tab-ripasso-profilo.css`, `tab-studio-tutor.css`: **PASS** (`JS_CSS_SYNTAX_OK inline_scripts=1 html_bytes=488778`).
- Validazione XML (`xml.etree.ElementTree.parse`) su `assets/auth-notebook.svg`, `assets/profile-brain.svg` e tutti e 7 i file in `svg-redesign-opus/mockups/*.svg`: **PASS** (`9/9 SVG_OK`).
- **Attenzione — Da verificare nella nuova chat:** le ultime modifiche in working tree (`23:06–23:30` su `index.html`, `auth.*`, `tab-*.css`) **non hanno ancora ricevuto un audit completo interattivo in browser** dopo la traduzione del Batch 2 (solo gli SVG statici e Batch 1 precedente erano stati ispezionati a schermo).

## 4. Stato git nel workspace (`git status --short`)

- **Modificati (`M`):** `auth.css`, `auth.js`, `docs/STILE_VISIVO.md`, `index.html`, `tab-corsi-archivio.css`, `tab-ripasso-profilo.css`, `tab-studio-tutor.css` *(più questo `contesto.md`)*.
- **Non tracciati (`??`):** `assets/auth-notebook.svg`, `assets/profile-brain.svg`, `svg-redesign-opus/mockups/02-wizard-stile.svg`, `04-archivio-vault.svg`, `07-profilo-dark.svg`, `08-auth-portal.svg`.
- **Nota quote AI (al `23:00`):** `Claude Opus 5.5` e `Claude Sonnet 5.5` allo `0%`; `Gemini 4 Neon (High)` al `90%`; `Gemini 4 Hydrogen (XHigh)` al `90%`; `Gemini 4 Argon (High)` al `67%`.

## 5. Prossimi passi consigliati nella nuova chat

1. **Audit visivo e interattivo in browser delle schermate aggiornate (Batch 1 + Batch 2):**
   - Servire in locale (es. `python -m http.server 4173 --bind 127.0.0.1`) e testare desktop `1440×900` e mobile `390×844` in **Chiaro, Seppia e Scuro** con 0 errori console:
     - **Login/Auth** (`auth.js` / `auth-notebook.svg`, SSO, Accedi/Registrati, ospite);
     - **Wizard Nuovo Corso** (`+ Nuovo corso`, nome `0/90`, icone/colori, anteprima live, passi 1→2→3);
     - **Archivio Vault (`#fileFinder`)** (`Ctrl+K`, albero corsi, cartelle, filtri griglia/lista, export `.md`);
     - **Profilo & Knowledge Brain** (`assets/profile-brain.svg`, filtro per corso, selezione nodi, dark mode senza tasto `Pausa`);
     - **Studio & Ripasso** (verifica finale di regressioni, evidenziatore/appunti, errori `0 su 3` in rosso).
2. **Spuntare la checklist UX §8.2** man mano che ogni vista viene confermata con Luca sito alla mano, poi eseguire `python scripts/check_docs.py` e fare un commit pulito su `UNI`.
3. **Fase successiva (sviluppo reale):** progettare e avviare backend, storage, ingestion PDF/Markdown e LLM seguendo `docs/ARCHITETTURA.md`, `docs/CONTRATTI_E_DATI.md` e `docs/PIANO.md`.

---

## 6. Nota sulle Visual Reference (`assets/Visual identity/`)

> Le sezioni 7–8 conservano la mappa delle **17 visual reference** in `assets/Visual identity/` (più il catalogo feedback "sito alla mano" di Luca). Tenere presenti sia queste reference sia i 7 SVG approvati in `svg-redesign-opus/mockups/` durante l'audit del prototipo.

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
