# TutorAI contratti e dati

Proposta di implementazione coerente con [Specifica](SPECIFICA.md) e [Architettura](ARCHITETTURA.md). Definisce i confini che proteggono il lavoro dello studente. Gli esempi sono descrittivi: il backend non è ancora implementato.

## Documento canonico e versioni

Il documento degli appunti è un albero JSON strutturato: paragrafi, titoli, elenchi, citazioni, codice, formule e immagini autorizzate. Ogni blocco ha un ID persistente; formule e immagini sono nodi atomici con ID proprio. La sorgente LaTeX è autorevole, il rendering è derivato. Markdown è un formato di scambio, con limiti dichiarati.

```json
{
  "schemaVersion": 1,
  "documentId": "nota-demo",
  "revisionId": "rev-1",
  "content": {
    "type": "doc",
    "content": [{
      "type": "paragraph",
      "attrs": {"blockId": "blocco-1"},
      "content": [{"type": "text", "text": "Una spiegazione scritta dallo studente."}]
    }]
  }
}
```

Lo schema fisico dell'editor va dichiarato e migrato esplicitamente. L'adapter delle formule può usare nomi diversi da quelli del dominio. Validare dimensioni, profondità, ID univoci, nodi ammessi e appartenenza degli asset al corso.

Regole da provare: dividere un blocco conserva l'ID nella prima parte e ne crea uno nella seconda; unire blocchi registra gli ID assorbiti; copia/incolla genera ID nuovi; spostare nello stesso documento conserva l'identità. Undo e redo devono mantenere coerenti identità e contenuti.

## Salvataggio e revisione didattica

La bozza è modificabile; ogni salvataggio confermato produce una revisione immutabile con parent, autore, data, versione dello schema e hash. Raggruppare la digitazione in salvataggi, senza una revisione per tasto.

Una richiesta di salvataggio porta `clientId`, `clientSequence`, `clientMutationId`, revisione di base e documento. Il server applica autorizzazione e controllo della versione. L'ACK identifica la sequenza esatta e la revisione creata: una risposta vecchia non può marcare sincronizzate modifiche più recenti.

Conservare la coda di recupero locale fino all'ACK. Distinguere “salvato sul dispositivo” e “sincronizzato”; una copia del browser non è un backup. Una seconda scheda o una riconnessione con base cambiata produce confronto o copia recuperata, senza sovrascrittura silenziosa.

“Verifica i miei appunti” prima salva la bozza visibile, poi crea una revisione didattica riferita allo snapshot. Lo studente può continuare a scrivere, ma domande e proposte mantengono il riferimento alla versione analizzata. Non iniziare il controllo su una copia vecchia fingendo che sia quella corrente.

## Ancoraggi e operazioni editoriali

Tenere distinti tre sistemi: posizioni dell'editor, proiezione testuale per ricerca/AI e coordinate delle fonti. Per il testo dichiarare offset UTF-16 e intervalli `[inizio, fine)`; una selezione su più blocchi conserva segmenti ordinati. Per le formule usare la selezione del nodo o della sorgente canonica, non i glifi del rendering.

Un ancoraggio conserva documento, revisione, blocco/nodo, intervallo, citazione esatta, contesto e precondizione sul contenuto. Le coordinate sullo schermo servono solo a disporre il popup. Le omissioni possono essere ancorate a una sezione o unità con tipo `missing_content`.

Durante l'editing mappare le selezioni attraverso le transazioni. Alla riapertura controllare revisione originale, identità e contenuto; il contesto restringe i candidati ma non autorizza a scegliere una prima occorrenza arbitraria. Stati previsti: `exact`, `mapped`, `ambiguous`, `missing`. Se ambiguo, mostrare il passaggio originale e richiedere ricollegamento.

Gli strumenti dell'editor aiutano a implementare questo protocollo, senza garantirlo automaticamente. [Persistenza Tiptap](https://tiptap.dev/docs/editor/core-concepts/persistence), [guida ProseMirror](https://prosemirror.net/docs/guide/).

## Patch e decisioni dello studente

La patch è un comando limitato, per esempio `replaceInlineRange`, `replaceBlock` o `insertBlockAfter`. Nel primo rilascio restringerla a un blocco; modifiche più complesse diventano proposte separate o guida alla modifica manuale.

```json
{
  "patchId": "patch-demo",
  "noteId": "nota-demo",
  "baseRevisionId": "rev-1",
  "anchorId": "ancoraggio-demo",
  "operation": "replaceBlock",
  "expectedBlockHash": "hash-del-blocco-di-base",
  "replacement": {"type": "paragraph", "content": [{"type": "text", "text": "Correzione proposta"}]},
  "reason": "Motivazione da verificare rispetto alla fonte e alla risposta",
  "citationIds": ["passaggio-demo"],
  "reviewAnswerIds": ["risposta-demo"],
  "status": "pending"
}
```

ID autorevoli, hash e riferimenti sono assegnati o validati dall'applicazione. L'AI propone contenuto e motivo, senza ottenere un comando di scrittura libero.

Applicazione proposta:

1. Ricevere decisione dello studente, testa attesa e chiave di idempotenza; autorizzare tutte le entità coinvolte.
2. Nella transazione bloccare l'appunto e controllare stato della patch, base e precondizioni.
3. Se il bersaglio è valido, costruire e validare il nuovo documento.
4. Se cambia la base o il bersaglio, restituire `409 PATCH_CONFLICT` con confronto fra base, corrente e proposta. Nel primo prototipo è accettabile rifiutare ogni base cambiata; il rebase conservativo richiede prove aggiuntive.
5. Creare la revisione e aggiornare testa, decisione e risultato idempotente nella stessa transazione.

Il merge non aggiorna la conoscenza dimostrata. Rifiutare conserva il testo; una modifica manuale segue le stesse verifiche. Annullare crea una nuova revisione compatibile, senza cancellare storia. Due accettazioni concorrenti non devono sovrascriversi.

## API proposte

Prefisso `/api/v1`. Contratti JSON Schema condivisi, validazione runtime e messaggi di errore leggibili. Le operazioni lunghe restituiscono `operationId`; lo stato persistito è autorevole, lo streaming è un'anteprima.

| Comando | Precondizione o risultato |
| --- | --- |
| `POST /courses` | Percorso e dati minimi; ingresso rapido per lezione |
| `POST /courses/:id/sources` | Fonte privata autorizzata e operazione di elaborazione |
| `PUT /notes/:id/draft` | Base, sequenza e ID mutazione; nuova revisione oppure conflitto |
| `POST /notes/:id/reviews` | Snapshot già salvato; operazione di revisione |
| `POST /explanations/:id/clarifications` | Selezione e versione validate |
| `POST /patches/:id/decision` | Accetta, rifiuta o modifica manuale; idempotenza |
| `POST /attempts` | Compito, versione e condizioni degli aiuti fissati dal server |
| `POST /attempts/:id/submit` | Risposta immutabile alla consegna |
| `GET /operations/:id` | Stato ed esito autorizzati |
| `POST /courses/:id/exports` | Esportazione della versione richiesta |
| `DELETE /courses/:id` | Eliminazione osservabile di originali e derivati |

Errori distinti per validazione, formato non supportato, fonte illeggibile, ancoraggio ambiguo, conflitto, indisponibilità del provider e quota esaurita. Ogni operazione porta `requestId`, stato e indicazione sulla possibilità di ritentare.

## Modello persistente

| Gruppo | Entità e relazioni |
| --- | --- |
| Corso | Utente, corso, moduli, lezioni, unità, concetti e prerequisiti |
| Fonti | Fonte, versioni con hash, pagine, passaggi, regioni e asset |
| Studio | Sessioni, spiegazioni versionate, chiarimenti, ancoraggi, appunti e revisioni |
| Revisione | Snapshot, domande, risposte, aiuti, proposte e decisioni |
| Apprendimento | Tentativi, consegne, valutazioni, evidenze, progresso e ripassi |
| Piano | Disponibilità, priorità, obiettivi e attività |
| Operazioni | Job, idempotenza, consumo, esportazione e richieste di cancellazione |

Appunti e unità, evidenze e concetti hanno relazioni molti a molti. Le valutazioni sono rivedibili conservando il giudizio precedente; il progresso deve poter essere ricostruito dalle evidenze.

Una verifica senza aiuti è fissata dal server. Sbloccare gli aiuti registra un evento e rende il tentativo guidato. Non certifica l'assenza di strumenti esterni. Una correzione accettata o una risposta aiutata non diventa prova indipendente.

## Affidabilità e confini dei dati

L'API ricava l'identità dalla sessione validata, non da un `ownerId` del client. Query, retrieval, cache, file e URL firmati rispettano corso e utente. Ruoli dei worker e dell'applicazione sono distinti; le connessioni non devono conservare l'identità di un utente per quello successivo nel pool.

I job sono riprendibili e idempotenti rispetto al risultato applicativo. Una risposta remota persa può causare una nuova fatturazione: non promettere esecuzione esterna esattamente una volta. Un risultato tardivo non deve scrivere dopo cancellazione o annullamento.

Conservare log di ID, versioni, consumo, durata ed esito. Export, cancellazione e backup comprendono database, asset e derivati; un backup del database non sostituisce quello dei file. Le condizioni di conservazione dei provider devono essere dichiarate in base alla configurazione scelta.

## Decisioni tecniche da tracciare

Questi ID sono usati dal piano di sviluppo. La scelta corrente è descritta nell'architettura e rimane soggetta alle prove.

| ID | Area |
| --- | --- |
| T01 | Distribuzione web, desktop o locale |
| T02 | Frontend e gestione dello stato |
| T03 | Editor e formato canonico |
| T04 | Backend, contratti e API |
| T05 | Database, file e backup |
| T06 | Estrazione e rendering dei materiali |
| T07 | Recupero del contesto e ricerca |
| T08 | Provider, modelli e orchestrazione AI |
| T09 | Ancoraggi, versioni e merge |
| T10 | Job, ritentativi e operazioni |
| T11 | Identità, autorizzazione e controllo dei dati |
| T12 | Test, misure e rilascio |

Per i dati illustrativi vedere [Sessione](../esempi/sessione_lamport.json) e [Strumenti visuali](../esempi/harness_visuale.json). Per i comportamenti da dimostrare vedere [Piano e verifica](PIANO.md).
