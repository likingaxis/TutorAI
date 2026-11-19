# TutorAI specifica di prodotto

Stato: **versione finale consolidata (v3)** — chiusa a seguito di progettazione tecnica, revisione critica dual-model (Gemini 4 Neon + GPT 6.2 Astra) e allineamento con le decisioni dell'autore.

Per l'architettura implementativa, i contratti di integrità e il piano di verifica leggere [Architettura](ARCHITETTURA.md), [Contratti e dati](CONTRATTI_E_DATI.md), [Piano di sviluppo](PIANO.md) e [Decisioni e perimetro](domande.md). Il [mockup](../index.html) e [auth.js](../auth.js) restano riferimenti interattivi esplorativi con backend simulato.

TutorAI accompagna uno studente universitario STEM dalla prima comprensione alla preparazione dell'esame in un'applicazione **autonoma e multi-dispositivo** (desktop, tablet e telefono). Organizza i materiali del corso, fornisce spiegazioni collegate alle fonti, lascia allo studente la proprietà dei propri appunti e individua incomprensioni tramite domande mirate, correzioni verificabili, verifiche senza aiuti e ripassi cadenzati.

La misura di successo è la capacità di comprendere, ricordare e applicare autonomamente nel tempo. La quantità di testo generato e l'estetica degli appunti non bastano a dimostrarla.

## 1 Stato dei requisiti

| Livello | Significato |
| --- | --- |
| V Visione | Obiettivo di prodotto indicato dall'autore, nelle slide o nel mockup interattivo |
| C Consolidato | Comportamento di prodotto o vincolo di integrità approvato e vincolante |
| P Proposta | Scelta implementativa/tecnologica adottata come baseline di fase, verificabile e sostituibile tramite prove di Fase 0 |
| A Aperto | Parametro operativo o di business da fissare prima del pilota (campioni reali, budget/margine, dispositivi) |

Regola di separazione: **V e C fissano il comportamento richiesto**, mai una libreria specifica. Le librerie, i motori OCR e le strategie infrastrutturali restano **P** e si congelano per ogni fase al superamento delle prove di verifica.

## 2 Utente, contesto e mobilità

**V/C.** Lo studente prepara corsi universitari STEM con slide, PDF, trascrizioni, appunti, programma, esercizi del docente e temi d'esame. Servono formule, notazione LaTeX, codice leggibile, figure, diagrammi interattivi, schizzi rapidi e dimostrazioni.

**V/C.** TutorAI è un prodotto **completamente autonomo** rispetto a strumenti terzi: custodisce internamente corsi, appunti, spiegazioni, allegati e storico verifiche, navigabili tramite Archivio a cartelle (`Ctrl+K`). Parte da una postazione desktop/tablet a due pannelli affiancati e garantisce un **passaggio fluido tra dispositivi** fino al **telefono in mobilità** (consultazione di appunti/spiegazioni e ripassi rapidi in autobus prima dell'esame, anche con connettività discontinua). Un eventuale plugin Obsidian è un'estensione futura separata, senza vincoli sul formato canonico interno.

Il prodotto aiuta sia chi affronta un argomento per la prima volta sia chi prepara l'esame. Il percorso scelto non certifica il livello di conoscenza: anche in preparazione d'esame un concetto può richiedere una spiegazione completa.

## 3 Due percorsi di ingresso

### Lezione per lezione

**V/C.** Avvio breve: scegliere il percorso, identificare il corso, caricare i materiali disponibili (anche più file o archivio `.zip` soggetto a limiti di sicurezza) e aprire una prima unità utile. La mappa del corso resta modificabile. I prerequisiti compaiono quando servono, senza diagnosi iniziale obbligatoria.

Se il materiale manca o è parziale, si richiede almeno un argomento e, se disponibile, il programma. Le spiegazioni non fondate su fonti del docente sono segnalate come provvisorie.

### Preparazione esame

**V/C.** Ingresso approfondito: programma, data se nota, modalità d'esame, disponibilità oraria, materiali e **temi d'esame degli appelli passati**. Una diagnosi rappresentativa distingue conoscenze dichiarate, non verificate e dimostrate, proponendo priorità, lacune e piano modificabile.

**C/P.** *Analisi dei temi d'esame (Fase 2):* caricando file con ruolo `temi_esame`, il sistema estrae mappa di frequenza dei concetti, tipologie ricorrenti e insidie tipiche del docente per pesare le priorità del piano e generare tracce coerenti con l'appello reale.

Un argomento non testato nella diagnosi resta “non verificato”. Il piano si ricalcola quando cambiano scadenza, disponibilità o esiti.

## 4 Ciclo di studio comune

| Fase | Esperienza dello studente | Risultato conservato |
| --- | --- | --- |
| Preparazione | Vede obiettivo, posizione nel corso e prerequisiti rilevanti | Unità, prerequisiti e riferimenti alle fonti |
| Spiegazione | Legge a sinistra (fonti nascoste di default con toggle rapido), adatta stile/dettaglio, esplora diagrammi/slide e chiede chiarimenti su selezione | Spiegazione versionata, fonti validate e chiarimenti ancorati |
| Elaborazione | Scrive appunti a destra, trasferisce formule/diagrammi/ritagli dalla sinistra, evidenzia, segna blocchi `Dubbio` e disegna schizzi | Bozza con salvataggio confermato, revisioni e provenienza per blocco |
| Revisione | Preme “Verifica i miei appunti”: il tutor parte dai `Dubbi` aperti e dagli errori concettuali con domande ancorate | Snapshot immutabile confermato, questioni rilevate, risposte e aiuti usati |
| Merge | Esamina proposte come diff con motivo e fonte; accetta, rifiuta o modifica manualmente | Nuova revisione dell'appunto e storico delle decisioni |
| Verifica e ripasso | Svolge quiz focus (scelta multipla, scritta, mista), invia foto di svolgimenti su carta (con trascrizione verificabile) o usa modalità Feynman | Evidenze immutabili, eventuale esito deterministico server, calibrazione e calendario FSRS |

**V/C.** La spiegazione sta a sinistra; gli appunti dello studente a destra. L'AI non inserisce automaticamente una bozza negli appunti: la struttura appartiene allo studente. È invece previsto il **trasferimento attivo curato dallo studente** (drag & drop o pulsante `+ Appunti`) di formule chiave, diagrammi interattivi, brevi estratti e ritagli di slide nel punto scelto del foglio. Ogni blocco importato conserva il proprio attributo di provenienza così che la revisione AI distingua il lavoro personale dello studente dagli asset copiati dalle fonti.

La revisione inizia su richiesta esplicita al termine dell'unità e non interrompe la digitazione. Se la pagina è vuota o lo studente è bloccato, il tutor offre spiegazione e spunto senza soglie arbitrarie di parole.

**V/C.** Durante la scrittura lo studente può inserire blocchi **`Dubbio`** dedicati (prioritari alla revisione) e blocchi **schizzo a mano libera** (scena vettoriale sempre modificabile con esportazione SVG deterministica). Nella Fase 2 può chiedere esplicitamente all'AI una **variante ripulita** dello schizzo da confrontare e accettare, conservando sempre la scena originale e i suoi asset in forma reversibile.

Sugli argomenti nuovi si forniscono spiegazioni esplicite ed esempi svolti. Sugli esercizi già tentati (nell'app o da foto su carta) si offrono indizi progressivi senza regalare subito l'intera soluzione. Una verifica dichiarata senza aiuti nasconde appunti e aiuti nell'app fino alla consegna.

## 5 Requisiti funzionali

Gli ID collegano progettazione, sviluppo e scenari di accettazione (`AC01–AC18`).

| ID | Livello | Comportamento richiesto |
| --- | --- | --- |
| F01 | V/C | Creare un corso, scegliere uno dei due percorsi, accedere (senza SSO Ateneo in MVP) e riprendere il lavoro tra desktop, tablet e telefono |
| F02 | V/C | Differenziare onboarding breve e diagnosi d'esame approfondita, includendo l'analisi dei temi d'esame passati quando disponibili |
| F03 | C | Importare più fonti (PDF, Markdown, trascrizioni, `.zip` con limiti di sicurezza), mostrare stato per file/pagina e conservare ruolo e provenienza |
| F04 | V/C | Organizzare corso, moduli, lezioni, unità concettuali e prerequisiti in una mappa correggibile, con Archivio a cartelle (`Ctrl+K`) e Knowledge Brain |
| F05 | V/C | Fornire spiegazioni coerenti con le fonti, adattabili per dettaglio/stile e adeguate al livello del singolo argomento |
| F06 | V/C | Selezionare testo a sinistra per approfondimento, semplificazione, esempio o fonte, e trasferire attivamente formule, diagrammi o ritagli negli appunti |
| F07 | V/C | Scrivere appunti liberi a destra con titoli, elenchi, evidenziatore multi-colore, formule LaTeX/visuali, codice, blocchi `Dubbio`, immagini e schizzi modificabili (con variante AI pulita in Fase 2) |
| F08 | V/C | Salvare bozze, revisioni, posizione di lettura e unità attiva con sincronizzazione affidabile tra dispositivi e recupero esplicito dei conflitti |
| F09 | V/C | Avviare una revisione esplicita su snapshot confermato, prioritizzando i `Dubbi` aperti e ancorando le domande ai punti pertinenti della bozza |
| F10 | V/C | Registrare risposte, aiuti e calibrazione di sicurezza; adattare il feedback evitando tassonomie pedagogiche da imparare |
| F11 | V/C | Mostrare correzioni come diff con motivo e fonte; consentire accettazione, rifiuto e modifica manuale senza sovrascritture silenziose |
| F12 | V/C | Conservare separatamente appunti consolidati ed evidenze immutabili di apprendimento, con storico delle verifiche consultabile |
| F13 | V/C | Proporre verifiche focus (scelta multipla, scritta, mista, foto di esercizi con trascrizione verificabile e modalità Feynman) con almeno una verifica senza aiuti nell'app |
| F14 | V/C | Usare lacune, calibrazione di sicurezza e prerequisiti per guidare ripassi e dare priorità agli esercizi del docente disponibili |
| F15 | V/C | Mostrare obiettivi, calendario interattivo dei richiami (scheduler FSRS + agenda manuale) e attività aggiornate a progresso e scadenza |
| F16 | C | Esportare gli appunti (distinguendo export personale da condivisione sicura priva di materiali protetti del docente) e cancellare completamente dati, indici, derivati e copie gestite |
| F17 | V/C | Tracciare e validare sempre fonti del corso, integrazioni esterne ed esempi AI; nascondere i badge inline di default con toggle rapido `Mostra fonti`, mantenendo espliciti contrasti rilevanti o assenza di fonti |

### Formati e contenuti

**C.** Il perimetro comprende PDF, slide esportate in PDF, TXT/Markdown, trascrizioni, programma, esercizi/temi d'esame e foto di svolgimenti manoscritti (Fase 2). Per figure, formule e codice l'estrazione dichiara i propri limiti: l'originale e la posizione verificata restano sempre consultabili.

**P.** Per Fase 1: PDF con testo selezionabile e PDF STEM tramite un **unico percorso OCR gestito** (con fallback a pagina originale), TXT/Markdown, trascrizioni e testo incollato. In Fase 2: archivi `.zip` protetti da limiti di espansione, foto di esercizi su carta e, dietro il medesimo contratto di parsing, eventuali modalità OCR aggiuntive (BYOK e Locale) e valutazione PPTX nativo (note del relatore). Audio lezioni e simulatore orale rientrano nelle Fasi 3–4.

## 6 Fonti, visibilità, sicurezza e copyright

**C.** *Visibilità pulita in lettura:* il backend valida e persiste ogni citazione (file, versione, `pageIndex` fisico, `pageLabel` stampato, passaggio o `regionId`). In Studio i badge inline delle fonti sono **nascosti di default** e attivabili con un **toggle rapido `Mostra fonti`** (menu lettura, scorciatoia o Impostazioni). Le fonti restano sempre raggiungibili dal popup di selezione (`Fonte`), dai diff e dagli esiti delle verifiche (`Vedi fonte`). Contrasti sostanziali tra fonti o unità provvisorie senza materiali restano comunque segnalati in modo discreto (`F17`).

**C.** *Protezione del copyright delle slide in export e condivisione:* i materiali caricati dal docente sono **strettamente privati per account**. Poiché un appunto personale può incorporare ritagli delle slide (`curated_from_slide`), il sistema **distingue rigidamente**:
* **Export personale privato** (solo per il proprietario dell'account): può includere i ritagli e i riferimenti collegati;
* **Condivisione esterna (`Share` / link nota):** applica la policy per singolo asset incorporato ed **esclude o sostituisce con riferimento testuale** qualunque ritaglio o file appartenente alle slide del docente, condividendo solo testo, formule e schizzi originali dello studente.

**C/P.** *Sicurezza anti-prompt-injection e limiti di import:* ogni contenuto nei file caricati è dato non fidato, mai comando eseguibile. L'import di PDF e `.zip` applica limiti cumulativi durante estrazione e rendering (numero file, byte espansi, controllo path traversal *Zip Slip*, numero pagine, pixel totali e tempo CPU) isolando il singolo job fallito.

## 7 Stati, integrità ed evidenze

Questa sezione definisce le invarianti vincolanti di integrità (**C** salvo dettagli tecnici **P**).

### Bozza, sincronizzazione sequenziale e merge atomico

Stati principali della sessione: preparazione, studio, revisione, proposta di merge, verifica senza aiuti, pausa e conclusione. La bozza rimane editabile anche durante attese AI o cadute di rete.

**C/P.** *Scelta Fase 1–2 (Dexie + protocollo server ottimistico):* per garantire atomicità reale su revisioni e merge senza introdurre ambiguità di ordinamento tra database SQL e CRDT live, la persistenza locale usa **Dexie (IndexedDB)** con coda mutazioni (`baseRevisionId`, `clientMutationId`, `clientSequence`). Il server aggiorna la testa della nota **solo se `baseRevisionId` coincide**, gestisce duplicati in modo idempotente e su base divergente conserva entrambe le versioni presentando un confronto esplicito (mai sovrascrittura silenziosa). “Verifica i miei appunti” parte solo dopo conferma della bozza visibile, creando uno snapshot immutabile (`revisionId`). L'adozione di Yjs è rinviata solo se il pilota mostrerà reale necessità di editing simultaneo multi-device o collaborazione tra studenti.

Ogni merge registra: `baseRevisionId`, ancoraggio, `expectedBlockHash`, contenuto precedente/proposto, motivo, fonti e decisione. Una modifica concorrente sullo stesso passaggio produce **`409 PATCH_CONFLICT`** con confronto fra base, corrente e proposta. Il merge non promuove mai automaticamente la conoscenza dimostrata.

### Ancoraggi al testo

Conservare documento, `revisionId`, `blockId` (o nodo atomico), intervallo UTF-16 `[inizio, fine)`, citazione esatta, contesto adiacente e hash di precondizione, senza dipendere dalle coordinate a schermo. Stati: `exact`, `mapped`, `ambiguous`, `missing`. Se ambiguo o mancante, mostrare il passaggio originale come *da ricollegare*.

### Stato di conoscenza, autorità della verifica e foto esercizi

| Stato | Significato |
| --- | --- |
| Non studiato | Nessuna attività di studio registrata |
| In corso | Unità avviata e attività non conclusa |
| Studiato da verificare | Studio o revisione svolti, senza evidenza indipendente sufficiente |
| Da ripassare | Errore, misconception ad alta sicurezza o richiamo scaduto |
| Dimostrato senza aiuti | Evidenza registrata in una verifica priva di aiuti attestabile lato server |

**C.** *Autorità della valutazione ed esito ternario:*
* Il browser fornisce feedback locale immediato (`MathLive` + `CortexJS Compute Engine`), ma **non è mai fonte autorevole per promuovere un concetto o aggiornare FSRS**.
* Le verifiche persistenti usano validazione **ripetibile lato server** su tracce versionate con **dominio matematico dichiarato** (es. `x/x` e `1` differiscono per `x = 0`) e **tre esiti espliciti: `corretto`, `errato`, `indeterminato`**.
* *Foto di esercizi su carta (Fase 2):* il flusso separa obbligatoriamente **(1) trascrizione visiva riga-per-riga** (esposta e **correggibile dallo studente** in caso di errore OCR) da **(2) verifica matematica e feedback**. Un segno illeggibile produce esito **`indeterminato`**; ogni rettifica ricalcola evidenza, progresso e richiamo FSRS evitando che errori di lettura diventino false lacune.
* *Calibrazione metacognitiva:* il livello di sicurezza dichiarato (`low`, `medium`, `high`) amplifica la priorità **solo** su esiti confermati (`corretto` o `errato`), mai su esiti `indeterminato`.
* *Quiz offline e mobilità (scenario autobus):* una sessione svolta offline su telefono ha `attemptId` stabile e traccia versionata; se la condizione *senza aiuti* non è attestabile in modo sincronizzato col server (o se un aiuto è stato aperto su un altro dispositivo), al rientro online l'attività viene salvata come **esercitazione / ripasso guidato** con al massimo un singolo aggiornamento logico coerente dello scheduler, senza corrompere le verifiche certificate `Dimostrato senza aiuti`.

## 8 Modello logico dei dati

Implementabile integralmente in PostgreSQL relazionale (senza database a grafo).

| Entità | Informazioni essenziali e relazioni |
| --- | --- |
| Utente e profilo | Identità (email/password, OAuth, Passkey in Fase 2, sessione Ospite con budget tracciato), preferenze tema/lettura |
| Corso | Nome, percorso, programma, copertina/icona, scadenza esame e impostazioni |
| Fonte e versione | File/testo, formato, ruolo didattico (`slide`, `trascrizione`, `dispensa`, `appunti`, `esercizi`, `temi_esame`), hash, versione, limiti import e stato per pagina |
| Albero, passaggi e regioni | Nodi gerarchici (sezione/teorema/slide), passaggi con testo + rappresentazione simbolica ricercabile, `pageIndex`/`pageLabel`, `regionId` con stato confidenza (`verified`, `uncertain`, `page_only`) |
| Profilo d'esame | Frequenza concetti, tipologie d'esercizio e insidie estratti dai `temi_esame` (Fase 2) |
| Concetto | Obiettivi e relazioni `prerequisito_ids` |
| Modulo, lezione e unità | Struttura ordinata e modificabile del corso con spiegazioni versionate e fonti |
| Sessione e stato di lettura | Percorso, unità, fase, posizione nei pannelli e ripresa sequenziale tra dispositivi |
| Appunto e revisione | Revisioni JSON canoniche immutabili con `blockId`, `origin`, blocchi `Dubbio`, evidenziati, formule, asset trascinati e `sketchBlock` (scena Excalidraw + asset binari + variante AI legata a `sourceSceneHash`) |
| Revisione didattica e patch | Snapshot base, `Dubbi` prioritari, domande, risposte, aiuti, proposte con hash/citazioni e decisioni |
| Verifica ed evidenza | `attemptId`, versione traccia, stato indipendenza server (`withoutAid`), trascrizione foto modificabile, esito ternario (`corretto`/`errato`/`indeterminato`), confidenza, valutazione rivedibile |
| Progresso, stato FSRS e agenda | Stato per concetto, parametri `ts-fsrs`, richiami automatici/manuali e `completedBy` (`quiz` vs `manual`) |
| Operazioni, tentativi e budget | `operationId`, `providerAttempts` separati per contabilizzazione retry, prenotazione atomica budget per account/globale, export e richieste di cancellazione |

## 9 Perimetro delle fasi di prodotto

### Fase 1 — Prima lezione integrata (uscita strettamente verificabile)
* **Ingresso e continuità:** accesso persistente (Email+Password + 1 OAuth), ripresa sequenziale PC ↔ telefono e **Dexie + salvataggio ottimistico server** con recupero bozza e gestione conflitti.
* **Materiali e fonti:** 1 lezione multifonte reale (PDF slide, trascrizione, Markdown) tramite **1 percorso OCR gestito** dietro contratto `DocumentParserProvider` (con stato `testo ok / regione incerta` e fallback pagina originale); badge fonti nascosti di default + toggle `Mostra fonti`.
* **Studio e appunti:** spiegazione a sinistra, editor Tiptap a destra con `MathLive`, blocco `Dubbio`, evidenziatore, trasferimento curato di 1 formula/ritaglio con provenienza, **Excalidraw editabile + export SVG deterministico**, revisione ancorata su snapshot e diff con `409 PATCH_CONFLICT`.
* **Verifica, ripasso e controllo costi:** 1 provider AI (via Vercel AI SDK) con prenotazione atomica del budget, telemetria metadati (senza contenuti sensibili di default), verifica senza aiuti (MCQ + risposta aperta su regole/dominio espliciti a 3 esiti) e 1 richiamo **`ts-fsrs`** fruibile su telefono.
* **Criterio di uscita Fase 1:** una lezione multifonte completata da uno studente su due dispositivi (PC + telefono) in cui il team ricostruisce con precisione *quali fonti hanno sostenuto la risposta, quale testo è cambiato, perché è cambiato il progresso e quanto è costata l'intera sessione*.

### Fase 2 — MVP completo a due percorsi
* Percorso *Preparazione esame* completo con diagnosi e **analisi dei `temi_esame`**;
* **Pulizia AI degli schizzi Excalidraw** (variante separata legata a `sourceSceneHash` con operazioni controllate + verifica preservazione pedici/frecce);
* **Foto esercizi su carta** con flusso a 2 stadi (*trascrizione correggibile* → *verifica a 3 esiti*);
* **Modalità Feynman**, **calibrazione metacognitiva**, formato quiz misto e **Knowledge Brain** con root-cause sui prerequisiti;
* **Modalità Ospite sicura** (corso demo pre-elaborato + 3 chiarimenti Tier 1 + tetto globale giornaliero + migrazione account che conserva il consumo già maturato) e **Passkey**;
* Estensione del contratto `DocumentParserProvider` a **OCR BYOK** (con cifratura, revoca e limiti) e **OCR Locale** (pairing sicuro + validazione manifest), più eventuale PPTX nativo;
* **Archivio `Ctrl+K`**, cache PWA per appunti/esercitazioni in mobilità, export personale (**Markdown**, **Typst WASM PDF**, **Anki `.apkg`**) e condivisione sicura priva di asset protetti del docente.

### Fasi 3–4 — Estensioni post-pilota (solo su evidenza)
* Editing simultaneo real-time (**Yjs**) se il pilota dimostra modifiche concorrenti frequenti o collaborazione fra studenti;
* Esecuzione codice **Pyodide** in Web Worker isolato (per corsi Python) e **PGlite** (per Basi di Dati);
* **Visual RAG** cross-corso (`ColQwen2.5` + Qdrant) se il recupero su grandi archivi di slide grafiche lo giustifica;
* **Audio lezioni** (`WhisperX` / `Deepgram Nova-3`) + allineamento audio ↔ slide e **simulatore orale real-time** (`LiveKit Agents` / `Pipecat`);
* **SSO Ateneo federato** (`IDEM GARR` SAML 2.0), packaging **Capacitor** / **Tauri 2** e plugin separato per **Obsidian**.

## 10 Qualità, conformità dati e parametri operativi aperti

**C/P (Privacy, Retention e GDPR):**
* Distinzione netta tra **residenza dati UE**, **esclusione dall'addestramento** e **Zero Data Retention (ZDR)**. Prima dell'attivazione di qualsiasi endpoint AI (inclusi eventuali endpoint Batch, che presso alcuni provider non supportano ZDR), il team compila e approva la **matrice `provider × endpoint × modello × regione × retention`**; le stime economiche usano esclusivamente endpoint conformi.
* **Telemetria privacy-by-design:** i trace di produzione (Langfuse/log) memorizzano di default **solo ID, versioni, tempi, token e costi**, non testo di slide, foto o risposte dello studente. Eventuali campioni diagnostici richiedono dataset autorizzati/anonimizzati e TTL esplicito.
* **Cancellazione e dispositivi condivisi:** la cancellazione di un corso/account copre database, R2, indici e derivati; logout, cambio account e riconnessione di un dispositivo offline dopo cancellazione invalidano e ripuliscono la cache locale.

Restano **A** (raccolti in [domande.md](domande.md)): selezione delle 2–3 lezioni reali autorizzate per Fase 0, target economico/margine mensile per studente (media e p95 tra uso ordinario e pre-esame), dispositivi Android di test e inclusione di PPTX/ricerca web in Fase 2.

## 11 Progetto tecnico consolidato (baseline di Fase 0–2)

**P.** Stack unificato TypeScript: PWA **React + TypeScript + Vite**, **TanStack Query**, **Tiptap/ProseMirror** (estensioni MIT + **MathLive** + **Excalidraw**), **Dexie** (Fase 1–2), **Fastify** (o **Hono**) + **Zod** + **Drizzle ORM**, **PostgreSQL** (`FTS` + campo simbolico dedicato + `pg_trgm` + `pgvector`), **`pg-boss`**, **Better Auth**, **Cloudflare R2** (o Supabase), **Vercel AI SDK** e **Langfuse** (metadati di default).

### 11.1 Materiali, sicurezza import e OCR gestito (Fase 1) → pluggable (Fase 2)

1. **Upload sicuro con limiti cumulativi:** validazione autorizzazione, MIME reale e limiti su numero file, byte espansi (protezione *Zip Slip* / *zip bomb*), pagine massime, pixel totali e timeout CPU per job.
2. **Rendering server-side (`pypdfium2`):** rasterizzazione veloce e fedele di pagine e ritagli in WebP/PNG (Apache 2.0/BSD); `PDF.js` resta il visualizzatore interattivo lato client.
3. **Contratto `DocumentParserProvider`:** estrazione digitale nativa su testi/PDF puliti + **1 percorso OCR gestito** in Fase 1 sulle pagine complesse/scansionate. L'output distingue per ogni blocco/figura: `verified_region`, `text_ok_region_uncertain` (utile alla ricerca, non a un ritaglio automatico) e `page_only` (mostra esplicitamente la pagina originale).
4. **Audit obbligatorio delle licenze:** nessuna assunzione generica: per ogni motore candidato (Docling, MinerU, `allenai/olmOCR-2-7B-1025`, VLM gestito) si registra la licenza esatta di **codice, singolo checkpoint e dipendenze** (es. catalogo modelli misto di Docling, obblighi di attribuzione online/soglie di MinerU, Apache-2.0 dello specifico checkpoint olmOCR).
5. **Estensione Fase 2 (`BYOK` e `Locale`):** aggiunte dietro lo stesso contratto solo dopo aver chiuso cifratura/revoca/limiti delle chiavi esterne (BYOK) e pairing sicuro worker↔account con validazione rigorosa dei manifest (Locale).

### 11.2 Recupero del contesto per attività e ricerca simbolica

Il recupero è governato dall'**attività**, non da una soglia fissa di token, e applica sempre prima i filtri di utente, corso, versioni autorizzate e fase (escludendo soluzioni/aiuti non consentiti dal prefisso cachato):

1. **Riferimento diretto:** se lo studente seleziona un passaggio o richiede una slide/figura nota (`regionId`), carica direttamente quel blocco con il suo intorno minimo (costo recupero quasi nullo).
2. **Sezione completa con premesse:** per spiegazioni o dimostrazioni legate a un teorema/unità, naviga l'**albero strutturale** del documento (modello ispirato a `PageIndex`) mantenendo integre premesse e definizioni.
3. **Ricerca ibrida tra sezioni:** combina `FTS` PostgreSQL, **`pg_trgm` per nomi/termini testuali** (non per operatori, poiché `pg_trgm` ignora i caratteri non alfanumerici), una **rappresentazione simbolica normalizzata dedicata** per formule/codice (che preserva operatori come `<`, `>`, `→`, `∥`, così `C(a) < C(b)` resta distinto da `C(a) > C(b)`) e **`pgvector`**. Nessun reranker in Fase 1 salvo evidenza sul benchmark che i passaggi giusti siano presenti nei top-20 ma scartati dal contesto finale.
4. **Lezione intera (con Prompt Caching):** usata quando serve copertura globale (revisione ampia o sintesi) e confermata vantaggiosa dal benchmark `8k / 20k / 40k` a freddo e a caldo.

### 11.3 Esempio completo: dalla slide alla spiegazione fino agli appunti

| Passo | Responsabilità e dati |
| --- | --- |
| Catalogazione | `fonte-v1`, `pageIndex = 13`, `pageLabel = "14"`. `passaggio-14` e `regione-demo-14` sono registrati con stato `verified_region`. Se il parser non certifica il riquadro, registra `text_ok_region_uncertain` e apre la pagina intera. |
| Richiesta “slide 14” | Risoluzione deterministica nel manifest (**0 chiamate AI**). |
| Contesto e risposta | Il modello riceve catalogo ID + testo (e raster WebP della regione solo se servono dettagli visivi) e produce JSON validato da Zod. I badge inline restano nascosti in Studio salvo toggle `Mostra fonti`. |
| Trasferimento curato | Drag & drop (`Pragmatic Drag and Drop` + `Dropcursor`) o click `+ Appunti` inserisce un nodo atomico con `origin: "curated_from_explanation"` o `"curated_from_slide"`. |
| Export vs Condivisione | L'export personale conserva il riferimento; la condivisione esterna rimuove/sostituisce gli asset del docente tutelando il copyright. |

Esempio di output applicativo strutturato con identificatori illustrativi:

```json
{
  "blocks": [
    {
      "kind": "paragraph",
      "text": "La relazione causale implica un ordine dei timestamp. Dai soli timestamp non si ricava il percorso causale.",
      "citationIds": ["passaggio-14"]
    },
    {
      "kind": "sourceFigure",
      "regionId": "regione-demo-14",
      "citationIds": ["passaggio-14"],
      "caption": "Passaggio della slide sugli orologi logici."
    }
  ]
}
```

### 11.4 Harness, oracolo server, budget atomico e telemetria

* **SDK agnostico:** **Vercel AI SDK** (Apache 2.0) con schemi **Zod** condivisi. In Fase 1 si parte con **1 provider e 1 profilo principale** più escalation controllata per dimostrazioni/revisioni difficili, evitando routing multilivello complesso prima dei benchmark.
* **Controllo economico e retry:** prenotazione atomica del **costo massimo stimato** prima di accodare ogni job (tetto per account + **tetto globale giornaliero**), riconciliazione a consuntivo, e tracciamento di ogni singolo `providerAttemptId` sotto lo stesso `operationId` (distinguendo timeout a esito sconosciuto da fallimento certo prima di ritentare).
* **Oracolo matematico autorevole:** feedback immediato client-side con `CortexJS Compute Engine`, verifica autorevole **server-side** su esercizi a dominio dichiarato con esito ternario (`corretto`, `errato`, `indeterminato`) tramite micro-servizio **SymPy sandboxed** (espressioni strutturate, allowlist operazioni, limiti rigidi di CPU/RAM/timeout). Eventuale esecuzione Python in browser tramite **Pyodide** solo in **Web Worker isolato** (separato da credenziali/stato app) nelle fasi successive.
* **Telemetria ed eval (Langfuse):** metadati di default (ID, versioni, token, cache, tempi, costi); eval offline su dataset autorizzati per *Grounded Citation Precision*, *No-Spoiling Rate*, *Socratic Precision* e *Adversarial Prompt-Injection Resistance*.

### 11.5 Schizzi Excalidraw, figure e visuali scientifiche

1. **Ritaglio verificato della fonte originale** (`pypdfium2` → WebP).
2. **Schizzo Excalidraw (MIT):** in Fase 1 lo studente disegna/modifica liberamente e il nodo conserva la scena originale + tutti gli asset binari referenziati + export SVG deterministico. In Fase 2 la pulizia AI produce una **variante separata** agganciata a `sourceSceneHash` (proponendo preferibilmente operazioni strutturate di riallineamento/etichettatura o SVG pulito) con verifica su schemi STEM che pedici, nodi e versi delle frecce restino intatti.
3. **SVG validato e componenti tipizzati:** parser XML stretto con allowlist per SVG generati; componenti interattivi deterministici introdotti gradualmente (**React Flow + ELK.js** / **Mafs** / **Mermaid o D2** solo dove giustificati dal corso, senza OpenUI in MVP).

### 11.6 Mobilità, accesso e continuità tra dispositivi

* **Desktop, Tablet e Telefono:** split-view su schermi ampi; viste rapide e diff verticale su telefono; `MathLive` e pulsante `+ Appunti` per usabilità touch completa; **cache PWA selettiva** per appunti, spiegazioni ed esercitazioni rapide in autobus.
* **Accesso (Better Auth, senza SSO Ateneo in MVP):** Fase 1 con Email+Password + 1 OAuth e ripresa sequenziale PC↔telefono; Fase 2 con **Passkey (WebAuthn)** e **Modalità Ospite** (corso demo già elaborato, tetto rigido chiarimenti Tier 1, 1 job concorrente, tetto giornaliero globale e migrazione del consumo all'account registrato; nessuno stato residuo esposto dopo logout su PC condivisi).

### 11.7 Decisioni chiuse dalla revisione dual-model (sintesi)

La revisione comparativa (Gemini 4 Neon + GPT 6.2 Astra) ha chiuso tutti e 6 i nodi architetturali v2:

| Nodo v2 | Decisione finale consolidata (v3) |
| --- | --- |
| 1. Sync (Yjs vs Dexie) | **Dexie + protocollo ottimistico server** (`baseRevisionId`, `mutationId`, `clientSequence`) in Fase 1–2 per atomicità reale con merge `409`; Yjs rinviato solo se emergerà editing simultaneo reale. |
| 2. Oracolo STEM (Pyodide vs Server) | **CortexJS** locale solo per UX; **verifica autorevole server-side** con dominio esplicito ed esito ternario (`corretto`/`errato`/`indeterminato`) + SymPy sandboxed server; Pyodide solo in Web Worker isolato opzionale (Fase 3+). |
| 3. OCR (3 modalità + licenze) | Contratto unico `DocumentParserProvider` + **1 solo percorso Managed** in Fase 1 (con stato `text_ok_region_uncertain`); **BYOK e Locale** in Fase 2; audit di licenza obbligatorio per `(codice, checkpoint, dipendenze)`. |
| 4. Cache vs RAG e `pg_trgm` | Strategia **per attività** (diretto → sezione → ibrido → lezione intera) misurata a `8k/20k/40k`; reranker solo su evidenza; **campo simbolico dedicato** per operatori matematici accanto a `pg_trgm` (solo termini testuali). |
| 5. Excalidraw → SVG | **Originale editabile + asset binari + SVG deterministico** in Fase 1; pulizia AI come variante separata su `sourceSceneHash` in Fase 2 con verifica semantica su pedici/frecce. |
| 6. ZDR/Batch, Costi e Ospite | **Matrice `provider×endpoint×regione×retention`** obbligatoria prima di contare su Batch; stima media + p95 (ordinario vs pre-esame); **prenotazione atomica budget** + tetto globale; Ospite su corso demo + max 3 chiarimenti Tier 1. |
