# TutorAI piano di sviluppo e verifica

Stato: **versione finale consolidata (v3)** coerente con [Specifica](SPECIFICA.md), [Architettura](ARCHITETTURA.md), [Contratti e dati](CONTRATTI_E_DATI.md) e [Decisioni e perimetro](domande.md). Il [mockup](../index.html) usa dati e operazioni simulate e non sostituisce questi criteri.

## 1 Fasi di sviluppo e gate di uscita

| Fase | Perimetro operativo | Gate di uscita verificabile |
| --- | --- | --- |
| **0 Prove e chiusura parametri** | Benchmark OCR su pagine STEM annotate (+ audit licenze per `(codice, checkpoint, dipendenze)`), compilazione matrice `provider×endpoint×regione×retention`, spike Dexie/merge `409` con interruzione server, confronto `8k/20k/40k` cache vs recupero + ricerca simbolica, test SymPy sandboxed server (dominio `x/x` vs `1`) e stima costi media/p95 | Scelta del singolo motore OCR Managed, endpoint conformi confermati, zero perdita lavoro nello scenario tablet–PC, sostenibilità economica verificata |
| **1 Prima lezione integrata** | Accesso persistente (Email+Password + 1 OAuth), 1 lezione multifonte (PDF + trascrizione + Markdown) con 1 OCR Managed (`verified_region` / `text_ok_region_uncertain`), badge fonti nascosti di default + toggle `Mostra fonti`, editor Tiptap + `MathLive` + `Dubbio` + trasferimento 1 formula/ritaglio + Excalidraw editabile/SVG deterministico, Dexie + salvataggio ottimistico + diff `409`, 1 provider AI (Vercel AI SDK) con budget atomico e telemetria metadati, verifica senza aiuti (MCQ + aperta con oracolo server 3 esiti) e 1 richiamo `ts-fsrs` su telefono | **Gate Fase 1:** una lezione multifonte completata da uno studente su due dispositivi (PC + telefono) in cui il team spiega con tracciabilità esatta *quali fonti hanno sostenuto la risposta, quale testo è cambiato, perché è cambiato il progresso e quanto è costata l'intera sessione* |
| **2 MVP completo a due percorsi** | Percorso *Preparazione esame* + analisi `temi_esame`, pulizia AI Excalidraw (variante su `sourceSceneHash`), foto esercizi a 2 stadi (trascrizione modificabile → verifica 3 esiti), modalità Feynman, calibrazione metacognitiva (solo su esiti non `indeterminato`), Knowledge Brain con prerequisiti, Ospite blindato migrabile (corso demo + tetto globale) + Passkey, OCR BYOK/Locale dietro `DocumentParserProvider`, Archivio `Ctrl+K`, mobilità PWA (appunti + esercitazioni offline), export personale (Markdown, Typst WASM, Anki) + condivisione sanitizzata priva di asset del docente | Tutti gli scenari `AC01–AC18` + controlli sicurezza (limiti ZIP/PDF, copyright share, quiz offline, trace senza PII/contenuti, rettifica trascrizione foto) superati e costi media/p95 entro target |
| **3 Pilota universitario** | Uso reale su più corsi STEM (desktop, tablet, smartphone Android in mobilità) con telemetria costi ed eval pedagogici | Affidabilità multi-dispositivo, costi per studente sostenibili e miglioramento verificato su prove senza aiuti |
| **4 Estensioni post-pilota** | Valutazione Yjs (solo se editing simultaneo reale), Pyodide Web Worker isolato (Python), PGlite (SQL), Visual RAG (`ColQwen2.5`), audio lezioni (`WhisperX`/`Deepgram Nova-3`) + allineamento slide, simulatore orale (`LiveKit`/`Pipecat`), SSO Ateneo (`IDEM GARR` SAML), Capacitor/Tauri, plugin Obsidian separato | Attivate singolarmente solo su evidenza misurata del pilota |

## 2 Scenari di accettazione

Gli scenari restano criteri comportamentali vincolanti da realizzare e testare sul prodotto reale.

| ID | Requisiti | Scenario e risultato atteso |
| --- | --- | --- |
| AC01 | F01–F05 | Scelgo Lezione per lezione e carico un PDF leggibile (o `.zip` entro i limiti di sicurezza). Vedo stato per file/pagina, struttura modificabile e prima unità utile senza diagnosi obbligatoria |
| AC02 | F01–F05, F15 | Scelgo Preparazione esame con programma, temi d'esame passati, disponibilità e data. Ottengo diagnosi rappresentativa e piano modificabile pesato sui temi d'esame; un argomento saltato resta non verificato |
| AC03 | F05–F07 | Seleziono una frase della spiegazione e chiedo un esempio, oppure trasferisco una formula/ritaglio negli appunti. La risposta resta ancorata; l'asset importato mantiene `origin` distinto senza alterare il resto della bozza |
| AC04 | F07–F08 | Scrivo titoli, formula (`MathLive`/LaTeX), codice, evidenziati, blocco `Dubbio` e schizzo Excalidraw (con eventuali asset); dopo ACK riapro su un altro dispositivo e ritrovo contenuto, stato e unità |
| AC05 | F09–F10 | Inserisco una deduzione concettuale errata e un `Dubbio` aperto, poi avvio la revisione. Il tutor affronta prima il dubbio e ancora domande pertinenti senza riscrivere automaticamente o interrompere la digitazione |
| AC06 | F05, F10 | Dichiaro di non aver mai studiato un concetto o resto bloccato. Il tutor fornisce spiegazione ed esempio svolto senza obbligarmi a indovinare materiale nuovo |
| AC07 | F11 | Dopo il feedback vedo testo precedente, proposto, motivo e fonte. Accetto una modifica e ne rifiuto un'altra; entrambe le decisioni sono conservate e la revisione originale è recuperabile |
| AC08 | F08–F11 | Tablet offline con modifica pendente, PC accetta una patch AI (o modifica il passaggio), poi il tablet si riconnette (anche interrompendo il server prima/dopo commit). Restano ricostruibili testo approvato, testo offline e `409` con confronto esplicito |
| AC09 | F12–F14 | Accetto il merge: il concetto non diventa `Dimostrato senza aiuti`. Eseguo poi una verifica senza aiuti: solo un esito autorevole server (`corretto`/`errato`/`indeterminato`, rispettando il dominio matematico) aggiorna progresso e `ts-fsrs` |
| AC10 | F03, F17 | Con badge fonti nascosti di default, attivo `Mostra fonti` oppure apro `Fonte`/`Vedi fonte`. Una regione `verified_region` apre pagina e riquadro corretti; `text_ok_region_uncertain` apre esplicitamente la pagina intera; contrasti o mancanze restano visibili |
| AC11 | F03, F08 | Carico un file illeggibile o un archivio fuori limiti (`ZIP`/`PDF` bomb) insieme a un file valido, oppure interrompo una chiamata AI/OCR. Il singolo job fallisce in isolamento, posso ritentare e la bozza salvata resta integra |
| AC12 | F08–F11 | Riapro un chiarimento dopo una modifica al testo. Il sistema rimappa il passaggio corretto oppure lo segnala come *da ricollegare*, senza agganciarlo a testo non pertinente |
| AC13 | F14–F15 | Salto una sessione prevista o sposto un richiamo nel calendario. Scheduler `ts-fsrs` e agenda manuale si riallineano con carico gestibile motivato da lacune, confidenza confermata e prerequisiti |
| AC14 | F13 | Avvio una verifica senza aiuti (MCQ, scritta, mista o foto esercizio). Appunti/aiuti restano nascosti; cliccare un indizio registra `withoutAid = false` sul server; una prova svolta offline non attestabile viene salvata come `practice_unverified` con al massimo 1 aggiornamento coerente |
| AC15 | F06–F11 | Uso tastiera, touch (tablet/telefono) e zoom 200% nei viewport dichiarati. Tutte le azioni (incluso trasferimento asset senza drag) restano raggiungibili e il focus torna correttamente alla chiusura dei popup |
| AC16 | F16 | Verifico una nota mista (testo studente + ritaglio slide docente + schizzo): `personal_export` (Markdown/Typst/Anki) funziona per il proprietario, mentre `public_share` rimuove/sostituisce gli asset del docente. La cancellazione del corso rimuove DB, R2, indici e invalida la cache offline |
| AC17 | F03, F17 | Le fonti discordano o il recupero non trova fondamento sufficiente (o una foto esercizio ha un segno illeggibile). Il tutor presenta contrasto, limite o esito `indeterminato` senza inventare citazioni o false lacune |
| AC18 | F07, F11–F12 | Una richiesta viene ritentata dopo errore di rete o timeout a esito sconosciuto. Non si creano doppie patch, doppie evidenze o doppi aggiornamenti FSRS; ogni `providerAttempt` è tracciato sotto lo stesso `operationId` e verificato sul budget |

Per `AC16` verificare inoltre: isolamento multi-tenant assoluto (inclusi Ospiti e future chiavi BYOK), telemetria di produzione priva di contenuti sensibili (solo metadati di default) e pulizia cache locale al logout/cambio account su dispositivi condivisi.

## 3 Esempio concreto delle slide

La prima dimostrazione integrata sugli orologi logici di Lamport verifica l'intero ciclo:
1. Spiegazione da slide + trascrizione con badge fonti nascosti di default (`Mostra fonti` apre la pagina/regione esatta) e trasferimento curato di formula e figura negli appunti.
2. Bozza dello studente con inversione dell'implicazione (più un blocco `Dubbio`), salvata via Dexie con ACK server.
3. Revisione ancorata sullo snapshot confermato, controesempio su eventi concorrenti, patch mirata accettata e conservazione della revisione precedente (il concetto resta `Studiato da verificare`).
4. Verifica senza aiuti (anche ripresa su telefono) con evidenza autorevole server, aggiornamento singolo `ts-fsrs` e ricostruzione completa di fonti, modifiche, progresso e costo della sessione.

## 4 Materiali di prova da raccogliere (Fase 0)

| Campione | Cosa verifica |
| --- | --- |
| PDF testuale semplice e trascrizione | Estrazione digitale veloce, albero e citazioni |
| Slide Beamer/PPTX con formule sottili, figure vettoriali e pagine ruotate | Benchmark OCR Managed, accuratezza `regionId` (`verified_region` vs `text_ok_region_uncertain`), `pypdfium2` |
| Dimostrazione lunga multi-pagina | Preservazione integrale delle premesse nell'albero |
| Formule con operatori simili (`C(a) < C(b)` vs `C(a) > C(b)`) ed esercizi con dominio (`x/x` vs `1`) | Ricerca simbolica normalizzata (oltre `pg_trgm`) e oracolo server SymPy a 3 esiti |
| Scansione degradata e foto di svolgimento manoscritto (1 errore di segno + 1 segno illeggibile) | Trascrizione modificabile dallo studente, esito `indeterminato` e ricalcolo FSRS dopo rettifica |
| Schemi STEM disegnati in Excalidraw (pedici, frecce, connessioni) | Export deterministico (F1) e verifica semantica della variante AI su `sourceSceneHash` (F2) |
| Archivio `.zip` / PDF anomalo (molti file / espansione elevata / path traversal) | Difesa limiti cumulativi e isolamento del job fallito |
| Raccolta di 5+ temi d'esame passati | Analisi frequenze e pesatura piano *Preparazione esame* (F2) |
| Nota mista (testo studente + ritaglio slide + schizzo) | Separazione `personal_export` vs `public_share` senza leak copyright |
| Fonte con prompt injection nascosta | Separazione stretta tra contenuto non fidato e azioni/stato autorizzati |

## 5 Come verificare la qualità

* **Integrità e sicurezza:** test automatici su scenario tablet–PC offline + interruzione server (`AC08`), `409 DRAFT_CONFLICT`/`PATCH_CONFLICT`, limiti `ZIP`/`PDF`, `public_share` senza slide docente, quiz offline `practice_unverified`, `withoutAid` server-side, prenotazione atomica budget + `providerAttempts`, logout/cancellazione su dispositivi condivisi.
* **Accuratezza matematica server-side:** test di regressione su equivalenze, restrizioni di dominio (`x/x` vs `1`), timeout/memoria sandbox SymPy ed esiti `indeterminato`.
* **Eval pedagogici offline (su dataset autorizzati/anonimizzati):** *Grounded Citation Precision*, *No-Spoiling Rate*, *Socratic Precision*, *Adversarial Prompt-Injection Resistance* e fedeltà semantica della pulizia Excalidraw (pedici/frecce).
* **Mobilità ed esperienza:** test su desktop, tablet e smartphone Android reale (incluso ripasso in autobus con cadute di rete).
* **Costi reali (Unit Economics):** misura di media e **p95** per studente attivo (uso ordinario vs settimana pre-esame) su soli endpoint conformi alla matrice `provider×endpoint×regione×retention`.

## 6 Cosa documentare al termine della Fase 0

Prima di aprire lo sviluppo esteso di Fase 1–2 consegnare: matrice di conformità `provider×endpoint×regione×retention`, audit licenze per `(codice, checkpoint, dipendenze)` del motore OCR scelto, risultati dei 4 benchmark di Fase 0, limiti numerici di import/Ospite/budget e stima del margine per studente.
