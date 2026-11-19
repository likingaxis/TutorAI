# TutorAI contratti e dati

Stato: **versione finale consolidata (v3)** coerente con [Specifica](SPECIFICA.md) e [Architettura](ARCHITETTURA.md). Definisce i contratti applicativi e le invarianti di integrità che proteggono bozze, citazioni, privacy delle fonti, evidenze didattiche e budget.

## Documento canonico, nodi STEM e provenienza

Il documento degli appunti è un albero JSON strutturato compatibile con **Tiptap / ProseMirror** (validato via **Zod**): paragrafi, titoli, elenchi, evidenziati multicolore, blocchi di codice, formule atomiche, blocchi **`Dubbio`**, asset trasferiti dalla spiegazione/slide e blocchi **schizzo Excalidraw**. Ogni blocco ha un `blockId` persistente (`@tiptap/extension-unique-id`, MIT). La sorgente LaTeX delle formule è autorevole; il rendering KaTeX/MathLive è derivato.

```json
{
  "schemaVersion": 3,
  "documentId": "nota-demo",
  "revisionId": "rev-1",
  "content": {
    "type": "doc",
    "content": [
      {
        "type": "paragraph",
        "attrs": {"blockId": "blocco-1", "origin": "student"},
        "content": [{"type": "text", "text": "Una spiegazione scritta dallo studente."}]
      },
      {
        "type": "doubtBlock",
        "attrs": {"blockId": "dubbio-1", "status": "open"},
        "content": [{"type": "text", "text": "Non mi è chiaro perché C(a) < C(b) non basti per la causalità."}]
      },
      {
        "type": "studyFormulaBlock",
        "attrs": {
          "blockId": "asset-1",
          "origin": "curated_from_explanation",
          "latex": "C_j \\leftarrow \\max(C_j, t_m) + 1",
          "sourceRef": {"explanationVersionId": "spiegazione-1", "citationIds": ["passaggio-14"]}
        }
      },
      {
        "type": "sketchBlock",
        "attrs": {
          "blockId": "schizzo-1",
          "engine": "excalidraw",
          "sceneAssetId": "asset-excalidraw-1",
          "sceneBinaryAssetIds": ["asset-bin-1"],
          "sceneHash": "sha256-scena-v1",
          "deterministicSvgAssetId": "asset-svg-det-1",
          "aiCleanedVariant": {
            "sourceSceneHash": "sha256-scena-v1",
            "svgAssetId": "asset-svg-ai-1",
            "operationsAssetId": "asset-ops-1"
          },
          "activeView": "original"
        }
      }
    ]
  }
}
```

**Regole sui nodi:**
* **Provenienza (`origin`):** ogni blocco dichiara `student`, `curated_from_explanation` o `curated_from_slide`. In revisione il Context Composer dà priorità ai `doubtBlock` aperti, valuta i blocchi `student` e non tratta gli asset importati come elaborazione autonoma.
* **Schizzi Excalidraw (`sketchBlock`):** ogni versione della scena include esplicitamente la scena JSON (`sceneAssetId`), **tutti gli asset binari referenziati** (`sceneBinaryAssetIds`), il suo `sceneHash` e l'export SVG deterministico. L'eventuale variante pulita AI (Fase 2) è agganciata a `sourceSceneHash`: se lo studente modifica lo schizzo durante la generazione, la variante resta associata alla versione precedente senza sovrascrivere il nuovo disegno.
* **Invarianti sugli ID:** split conserva `blockId` nella prima parte e crea un nuovo ID nella seconda; merge registra gli ID assorbiti; copia/incolla genera ID nuovi; spostamento interno conserva l'identità; undo/redo preservano coerenza.

## Salvataggio ottimistico (Dexie), conflitti e revisione didattica

In Fase 1–2 l'unico stato autorevole del documento è **PostgreSQL** (nessun CRDT concorrente in parallelo alle transazioni di merge).

1. **Persistenza locale (Dexie):** il client conserva la bozza corrente e la coda delle mutazioni pendenti in IndexedDB (separate per `accountId`).
2. **Protocollo di salvataggio (`PUT /notes/:id/draft`):** ogni invio trasporta `clientId`, `clientSequence`, `clientMutationId`, `baseRevisionId` e il documento JSON.
   * Il server aggiorna la testa della nota in transazione **solo se `baseRevisionId` coincide** con la testa corrente.
   * Un `clientMutationId` già processato restituisce in modo idempotente la revisione già creata.
   * L'ACK server restituisce `acknowledgedSequence` e `revisionId`: una risposta arrivata tardi non può marcare sincronizzate modifiche più recenti.
   * Se `baseRevisionId` diverge (es. modifica fatta su PC mentre il tablet era offline), il server restituisce **`409 DRAFT_CONFLICT`** conservando la versione server e consentendo al client di preservare entrambe le versioni e aprire un confronto esplicito (mai sovrascrittura silenziosa).
3. **Revisione su snapshot confermato:** “Verifica i miei appunti” attende l'ACK della bozza visibile e avvia la revisione didattica su quel `revisionId` immutabile.

## Ancoraggi e patch atomiche

Tenere distinti tre sistemi di coordinate: posizioni ProseMirror, proiezione testuale UTF-16 `[inizio, fine)` per ricerca/AI e coordinate normalizzate delle fonti PDF (`regionId`). Formule, diagrammi e schizzi usano l'identificatore del nodo atomico e la sorgente canonica.

Un ancoraggio conserva `documentId`, `revisionId`, `blockId`, intervallo UTF-16, citazione esatta, contesto adiacente e hash di precondizione. Stati di risoluzione: `exact`, `mapped`, `ambiguous`, `missing`. Un ancoraggio ambiguo o mancante mostra il passaggio originale come *da ricollegare*.

```json
{
  "patchId": "patch-demo",
  "noteId": "nota-demo",
  "baseRevisionId": "rev-1",
  "anchorId": "ancoraggio-demo",
  "operation": "replaceBlock",
  "expectedBlockHash": "hash-del-blocco-di-base",
  "replacement": {"type": "paragraph", "content": [{"type": "text", "text": "Correzione proposta"}]},
  "reason": "Motivazione verificabile rispetto alla fonte e alla risposta dello studente",
  "citationIds": ["passaggio-demo"],
  "reviewAnswerIds": ["risposta-demo"],
  "status": "pending"
}
```

**Applicazione transazionale della patch (`POST /patches/:id/decision`):**
1. Autorizza utente, corso e nota; riceve `decision` (`accept`, `reject`, `manual_edit`), `expectedHeadRevisionId` e `idempotencyKey`.
2. In transazione serializzata in PostgreSQL blocca la riga della nota e verifica stato della patch, `baseRevisionId` e `expectedBlockHash`.
3. Se la base o il blocco bersaglio sono cambiati nel frattempo, restituisce **`409 PATCH_CONFLICT`** con confronto fra base, testo corrente e proposta.
4. Se valido, valida il nuovo documento con Zod e aggiorna testa, nuova revisione, decisione e risultato idempotente **nella stessa transazione ACID**.

Il merge non promuove mai la conoscenza dimostrata. Annullare una modifica crea una nuova revisione compensativa senza cancellare la storia.

## Contratto `DocumentParserProvider` e limiti di import

* **Limiti cumulativi anti-abuso (`ZIP` / `PDF` / raster):** prima e durante estrazione/rendering il worker impone tetti su numero massimo file, byte espansi (bloccando *zip bomb* e *Zip Slip* path traversal), numero pagine, megapixel totali e tempo CPU per singolo job. Un import fuori soglia fallisce in isolamento senza bloccare altri corsi.
* **Output `SourceManifest`:** albero gerarchico (`sections`), pagine (`pageIndex`, `pageLabel`, rotazione, dimensioni), `passages` con testo/LaTeX + campo simbolico normalizzato ricercabile, e `regions` con stato esplicito di affidabilità spaziale:
  * `verified_region`: rettangolo validato, utilizzabile per ritagli automatici e “Mostra nella slide”;
  * `text_ok_region_uncertain`: testo/formula utilizzabili per ricerca e spiegazione, ma il comando “Mostra nella slide” apre esplicitamente la pagina intera;
  * `page_only`: contenuto non estratto o scansione degradata, consultabile come pagina originale.
* **Modalità operative:** 1 percorso gestito (`Managed`) in Fase 1; estensione opzionale in Fase 2 a `BYOK` (chiave cifrata con revoca, limiti spesa e disclaimer termini provider esterno) e `Locale` (pairing autenticato worker↔account e validazione rigorosa del manifest).

## Contratti di verifica, foto esercizi, offline e FSRS

1. **Autorità lato server:** il client invia la risposta dello studente (espressione LaTeX/testo/opzione/foto), **mai** un verdetto autorevole dell'oracolo locale.
2. **Esito ternario e dominio matematico:** la verifica lato server su esercizi a regole/dominio espliciti (via micro-servizio SymPy sandboxed con espressioni strutturate, allowlist e timeout/RAM limitati) restituisce **`corretto`**, **`errato`** oppure **`indeterminato`** (includendo verifiche di dominio, es. `x/x` vs `1` con `x ≠ 0`).
3. **Foto esercizi a 2 stadi (Fase 2):** `POST /attempts/:id/photo-transcribe` restituisce la trascrizione riga-per-riga con confidenza e segni dubbi; lo studente può **correggere la trascrizione** prima o dopo la valutazione (`PATCH /attempts/:id/transcription`), innescando il ricalcolo di evidenza, progresso e richiamo FSRS. Segni illeggibili producono `indeterminato`; la confidenza metacognitiva non amplifica mai un esito `indeterminato`.
4. **Quiz offline e integrità FSRS:** ogni tentativo ha `attemptId` stabile e versione della traccia. Gli indizi passano da `POST /attempts/:id/hint` (`withoutAid = false` irreversibile). Se un tentativo viene svolto offline senza possibilità di attestare l'assenza di aiuti (o se un aiuto viene aperto su un altro dispositivo), alla sincronizzazione viene archiviato come **`practice_unverified`** (esercitazione utile in mobilità) applicando al massimo un singolo aggiornamento logico coerente dello scheduler senza certificare `Dimostrato senza aiuti`.

## Export personale vs Condivisione (tutela copyright)

Poiché un appunto può contenere ritagli delle slide del docente (`origin: "curated_from_slide"`):
* **`personal_export`** (Markdown, Typst WASM PDF, Anki `.apkg` per il solo proprietario autenticato): può includere gli asset autorizzati del corso dell'utente.
* **`public_share`** (link di sola lettura o esportazione condivisibile): applica una policy per singolo nodo e **rimuove o sostituisce con riferimento testuale** qualunque ritaglio/allegato proveniente dalle fonti del docente, condividendo solo testo, formule e schizzi originali dello studente.

## API proposte (`/api/v1`)

Contratti **Zod** condivisi e validazione runtime. Le operazioni lunghe restituiscono HTTP `202` con `operationId` persistito; SSE/WebSocket trasporta solo l'anteprima in streaming.

| Comando | Precondizione o risultato |
| --- | --- |
| `POST /auth/*` | Better Auth: Email+Password, OAuth (Fase 1); Passkey e Ospite blindato migrabile (Fase 2) |
| `POST /courses` | Percorso, metadati e impostazioni; avvio rapido o esame |
| `POST /courses/:id/sources` | Upload singolo o `.zip` con limiti cumulativi; job `DocumentParserProvider` |
| `GET /search` | Ricerca `Ctrl+K` su appunti, evidenziati, spiegazioni, simboli e allegati |
| `PUT /notes/:id/draft` | Salvataggio ottimistico (`baseRevisionId`, `clientMutationId`, `clientSequence`) → ACK o `409 DRAFT_CONFLICT` |
| `POST /notes/:id/sketches/:blockId/clean` | (Fase 2) Scena compatta + `sourceSceneHash` → variante pulita legata alla versione |
| `POST /notes/:id/reviews` | Snapshot già confermato → operazione di revisione (priorità `doubtBlock` aperti) |
| `POST /explanations/:id/clarifications` | Selezione e versione validate + stile lettura |
| `POST /patches/:id/decision` | Accetta, rifiuta o modifica manuale; idempotenza e controllo `409 PATCH_CONFLICT` |
| `POST /attempts` | Crea verifica (`mcq`, `open`, `mixed`, `handwritten_photo`, `feynman`) con condizioni server |
| `POST /attempts/:id/hint` | Registra irreversibilmente `withoutAid = false` prima di mostrare l'indizio |
| `POST /attempts/:id/submit` | Risposta/foto + confidenza → verifica autorevole server (3 esiti) + 1 aggiornamento FSRS |
| `PATCH /attempts/:id/transcription` | (Fase 2) Rettifica trascrizione foto → ricalcolo evidenza, progresso e FSRS |
| `GET /operations/:id` | Stato, esito e metadati autorizzati (con `providerAttempts` per audit costi) |
| `POST /courses/:id/exports` | Export personale (`personal_export`) o link sanitizzato (`public_share`) |
| `DELETE /courses/:id` | Eliminazione osservabile di DB, originali R2, indici, derivati e invalidazione cache |

## Modello persistente, budget atomico e privacy

| Gruppo | Entità e relazioni |
| --- | --- |
| Identità e quote | Utente, sessioni, credenziali/OAuth/Passkey, Ospite (con trasferimento del consumo alla migrazione), prenotazioni budget per account e tetto globale giornaliero |
| Corso e fonti | Corso, moduli, lezioni, unità, concetti, `prerequisito_ids`, `temi_esame`, fonti, versioni, nodi albero, passaggi (+ indice simbolico), `regions` con confidenza spaziale |
| Studio e revisioni | Sessioni, spiegazioni versionate, chiarimenti, revisioni JSON immutabili, `sketchBlock` (+ asset binari), revisioni didattiche, patch e decisioni |
| Apprendimento | Tentativi immutabili (`attemptId`), eventi indizio, trascrizioni foto modificabili, esiti ternari server, confidenza, valutazioni rivedibili, stato `ts-fsrs` e agenda (`quiz` vs `manual`) |
| Operazioni | Job `pg-boss`, `operationId`, `providerAttempts` separati (esito certo vs sconosciuto), export, condivisioni sanitizzate e log cancellazioni |

**Regole di sicurezza e affidabilità:**
* **Prenotazione atomica del budget e retry:** ogni operazione prenota atomicamente il costo massimo prima di accodare il job (controllando tetto account + tetto globale giornaliero), poi riconcilia sul consuntivo. Ogni invocazione remota crea un record `providerAttempt` sotto lo stesso `operationId` distinguendo timeout a esito sconosciuto da fallimento certo prima di ritentare.
* **Telemetria privacy-by-design e cancellazione:** i trace di produzione memorizzano solo ID, versioni, token, tempi e costi (nessun contenuto integrale di slide/foto/risposte). Logout, cambio account e riconnessione dopo cancellazione purgano la cache locale Dexie/PWA e revocano gli accessi.
* **Identità autorevole:** l'API ricava sempre `userId` dalla sessione validata; nessun `ownerId` client è fidato.

## Decisioni tecniche da tracciare

| ID | Area |
| --- | --- |
| T01 | Distribuzione PWA autonoma, mobilità e futuri target store/desktop |
| T02 | Frontend React/TS/Vite, stato (TanStack Query), ricerca `Ctrl+K` e accessibilità |
| T03 | Editor Tiptap (MIT), nodi STEM (`MathLive`, `Excalidraw`, `Dubbio`, asset con provenienza) e schema canonico |
| T04 | Backend Fastify/Hono, contratti Zod unificati, Drizzle ORM e API |
| T05 | Database PostgreSQL, storage Cloudflare R2/Supabase, copyright export/share e backup |
| T06 | Sicurezza import (`ZIP`/`PDF`), `pypdfium2` e `DocumentParserProvider` (Managed F1; BYOK/Locale F2; audit licenze) |
| T07 | Recupero per attività (diretto → sezione → ibrido con indice simbolico + `pg_trgm` + `pgvector` → lezione) |
| T08 | Vercel AI SDK, matrice compliance ZDR/retention, oracolo server a 3 esiti (SymPy sandboxed), budget atomico e Langfuse (metadati) |
| T09 | Persistenza Dexie + salvataggio ottimistico, ancoraggi, snapshot immutabili e merge `409` (Yjs rinviato) |
| T10 | Job `pg-boss`, `providerAttempts`, idempotenza e prenotazione/riconciliazione costi |
| T11 | Identità Better Auth (senza SSO in MVP; Ospite blindato in F2), isolamento tenant, cancellazione e sicurezza prompt injection |
| T12 | Test automatici, eval pedagogici offline, benchmark media/p95 e rilascio |

Per i dati illustrativi vedere [Sessione](../esempi/sessione_lamport.json) e [Strumenti visuali](../esempi/harness_visuale.json). Per le fasi e i criteri di accettazione vedere [Piano e verifica](PIANO.md).
