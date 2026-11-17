# TutorAI specifica di prodotto

Stato: base di progetto, con proposte e scelte aperte distinte di seguito.

Per le scelte tecniche leggere [Architettura](ARCHITETTURA.md) e [Contratti e dati](CONTRATTI_E_DATI.md). Il [mockup](../index.html) resta esplorativo e non approvato integralmente.

TutorAI accompagna uno studente universitario STEM dalla prima comprensione alla preparazione dell'esame. Organizza i materiali, fornisce spiegazioni collegate alle fonti e chiede allo studente di elaborare i concetti nei propri appunti. La revisione individua possibili incomprensioni, propone domande e produce modifiche accettabili o rifiutabili. Le verifiche successive registrano ciò che lo studente riesce a fare senza aiuti nell'app.

La misura di successo è la capacità di comprendere, ricordare e applicare autonomamente, da valutare nel tempo. La quantità di testo generato e la bellezza degli appunti non bastano a dimostrarla.

## 1 Stato dei requisiti

| Livello | Significato |
| --- | --- |
| V Visione | Indicato nelle idee dell'autore, nelle slide o nella richiesta attuale |
| C Consolidato | Requisito consolidato e coerente con la visione; mantenuto come base di lavoro |
| P Proposta | Dettaglio operativo introdotto in questa revisione per rendere realizzabile e verificabile il prodotto |
| A Aperto | Scelta da motivare e concordare nel team di progetto |

V e C costituiscono la base di progetto. P è una proposta modificabile: non equivale a una nuova approvazione dell'autore. Il team deve evidenziare gli eventuali cambiamenti a V e C. Le scelte tecniche non discendono automaticamente dai nomi di strumenti citati negli appunti.

## 2 Utente e contesto

**V/C.** Lo studente prepara corsi universitari STEM con slide, PDF, trascrizioni, appunti, programma, esercizi del docente e temi d'esame. Servono formule, notazione LaTeX, codice leggibile, figure e dimostrazioni. Si parte da un ambiente desktop con spazio sufficiente per leggere e scrivere insieme; l'adattamento a schermi piccoli mantiene lo stesso processo.

Il prodotto deve aiutare sia chi incontra un argomento per la prima volta sia chi lo ha già studiato. Il percorso scelto non prova il livello di conoscenza: anche durante la preparazione d'esame un concetto può richiedere una spiegazione completa.

## 3 Due percorsi di ingresso

### Lezione per lezione

**V/C.** Avvio breve: scegliere il percorso, identificare il corso, aggiungere il materiale disponibile e aprire una prima unità utile. La mappa del corso è inizialmente modificabile e può essere completata durante lo studio. Le domande sui prerequisiti compaiono quando servono a capire il contenuto, senza un lungo esame iniziale obbligatorio.

Il materiale può essere parziale o mancare. In quel caso si richiede almeno un argomento e, se disponibile, il programma. Le ricostruzioni basate su conoscenze esterne o generate dall'AI sono mostrate come provvisorie e non attribuite al docente.

### Preparazione esame

**V/C.** Ingresso più approfondito: programma, data se nota, modalità dell'esame, tempo disponibile e materiali. Una diagnosi rappresentativa tramite domande o problemi distingue conoscenze dichiarate, non verificate e dimostrate. Il sistema propone priorità, lacune e piano di studio modificabile.

I dati sconosciuti restano sconosciuti. Un argomento saltato nella diagnosi non diventa “conosciuto”. La pianificazione può essere ricalcolata quando lo studente aggiunge la data o cambia disponibilità.

## 4 Ciclo di studio comune

| Fase | Esperienza dello studente | Risultato conservato |
| --- | --- | --- |
| Preparazione | Vede obiettivo, posizione nel corso e prerequisiti rilevanti | Unità e riferimenti alle fonti |
| Spiegazione | Legge a sinistra e seleziona passaggi per chiedere chiarimenti | Spiegazione, fonti e chiarimenti contestuali |
| Elaborazione | Scrive e struttura gli appunti a destra | Bozza personale con revisioni |
| Revisione | Preme “Verifica i miei appunti” e risponde alle domande pertinenti | Problemi rilevati, risposte e aiuti usati |
| Merge | Esamina e accetta, rifiuta o modifica le proposte | Nuova revisione dell'appunto e decisioni sulle modifiche |
| Verifica e ripasso | Ricorda, spiega o risolve senza risposte visibili nell'app | Evidenze, stato del concetto e attività successive |

**V/C.** La spiegazione sta a sinistra; gli appunti dello studente a destra. Non si inserisce automaticamente una prima stesura AI negli appunti. La struttura del documento appartiene allo studente. I chiarimenti restano legati al passaggio che li ha originati.

La revisione ordinaria inizia su richiesta al termine dell'unità. Non interrompe la scrittura con continue domande automatiche. Se lo studente è bloccato o la pagina è vuota, il tutor offre una spiegazione e uno spunto per iniziare; una soglia di parole non può diventare una barriera arbitraria.

Le domande affrontano errori o omissioni importanti. Sugli argomenti nuovi si forniscono spiegazioni esplicite ed esempi svolti. Negli esercizi già tentati si possono offrire indizi progressivi; se non bastano, una spiegazione completa. Una prova dichiarata senza aiuti rende indisponibili nell'app gli aiuti fino alla consegna.

## 5 Requisiti funzionali

Gli ID servono a collegare progettazione, sviluppo e scenari di accettazione.

| ID | Livello | Comportamento richiesto |
| --- | --- | --- |
| F01 | V/C | Creare un corso, scegliere uno dei due percorsi e riprendere una sessione |
| F02 | V/C | Differenziare onboarding breve e diagnosi d'esame approfondita |
| F03 | C | Importare più fonti, mostrare lo stato di elaborazione e conservare nome e posizione di provenienza |
| F04 | V/C | Organizzare corso, moduli, lezioni, unità concettuali e prerequisiti in una mappa correggibile |
| F05 | V/C | Fornire spiegazioni coerenti con le fonti e con il livello del singolo argomento |
| F06 | V | Selezionare testo a sinistra e chiedere approfondimento, riformulazione, esempio o fonte |
| F07 | V/C | Scrivere appunti liberi a destra con titoli, elenchi, formule, blocchi di codice e immagini pertinenti |
| F08 | V/C | Salvare bozze, revisioni, posizione di lettura e unità attiva; ripristinarle alla riapertura |
| F09 | V/C | Avviare una revisione esplicita e ancorare le domande ai punti pertinenti della bozza |
| F10 | V/C | Registrare risposte e aiuti; adattare il feedback evitando una legenda di categorie da imparare |
| F11 | V/C | Mostrare correzioni come diff con motivo e fonte; consentire accettazione, rifiuto e modifica manuale |
| F12 | V/C | Conservare separatamente gli appunti consolidati e le evidenze di apprendimento |
| F13 | V/C | Proporre verifiche aperte, problemi e almeno una verifica senza aiuti nell'app |
| F14 | V/C | Usare le lacune per ripassi e attività, dando priorità agli esercizi del docente disponibili |
| F15 | V/C | Mostrare obiettivi settimanali e attività gestibili; aggiornare il piano in base al progresso e al tempo disponibile |
| F16 | C | Esportare appunti e consentire cancellazione dei dati di studio secondo il modello di distribuzione scelto |
| F17 | V/C | Distinguere fonti del corso, integrazioni esterne ed esempi AI; rendere visibili i disaccordi rilevanti |

### Formati e contenuti

**C.** Il perimetro generale comprende PDF, slide, testi, trascrizioni e programma. Per figure, formule e codice l'estrazione non deve fingere una qualità che non possiede: conservare il file e la posizione originali permette di controllare il passaggio.

**P/A.** Per il primo rilascio si propone PDF con testo selezionabile, slide esportate in PDF, TXT/Markdown e testo incollato. Il team deve decidere se il PPTX nativo entra subito, esplicitando il costo della scelta. Scansioni con OCR, registrazioni audio e video sono estensioni da valutare; non dichiararle supportate attraverso una semplice estensione di file.

**V/C.** La spiegazione può incorporare ritagli delle slide, figure originali e schemi. La sezione 11.5 propone di provare già nella prima lezione una figura generata e un'interazione scientifica circoscritta. Visualizzare codice e formule non richiede esecuzione arbitraria del codice o compilazione di progetti LaTeX.

## 6 Fonti e comportamento del tutor

Il materiale del corso definisce programma, terminologia e aspettative del docente. Le integrazioni esterne chiariscono e verificano, ma non sostituiscono silenziosamente quel contesto. Un contrasto sostanziale viene mostrato con i due riferimenti e una spiegazione dell'incertezza.

**P.** Ogni citazione verificabile collega un contenuto a un file e a una pagina, slide o sezione identificata. Per un PDF, distinguere l'indice fisico della pagina dal numero stampato sul foglio. L'AI può citare solo posizioni effettivamente presenti nel materiale recuperato. Se manca una fonte adeguata, lo indica e non inventa un riferimento.

**A.** Stabilire se la ricerca sul web sia automatica, su richiesta o assente nel primo rilascio. Resta obbligatoria la distinzione tra corso, integrazione ed esempio generato. Una ricerca esterna non deve bloccare ogni apertura di unità.

**C/P.** Le istruzioni trovate dentro file caricati sono contenuto del corso, non comandi per il tutor o per l'applicazione. Nessun file può autorizzare l'accesso ad altri corsi, l'invio di dati o la modifica degli appunti. Le azioni sugli appunti seguono il flusso di revisione dell'app.

## 7 Stati e regole di integrità proposti

Questa sezione è **P**, salvo la separazione tra appunti ed evidenze, che è V/C. Descrive comportamenti richiesti ai componenti; Il team sceglierà come implementarli.

### Sessione e revisione

Stati principali: preparazione, studio, revisione, proposta di merge, verifica senza aiuti, pausa e conclusione. Una bozza può continuare a essere salvata durante attese o errori dell'AI. La conclusione di una sessione non certifica tutti i concetti.

Il comando di revisione crea una fotografia della bozza. Domande e proposte di modifica si riferiscono a quella revisione. Se lo studente cambia successivamente il passaggio, il sistema verifica la compatibilità: una proposta obsoleta non viene applicata sopra il testo nuovo.

Per il merge conservare: revisione di base, passaggio originale, testo proposto, motivo, fonti e decisione. L'accettazione produce una nuova revisione. Rifiutare una proposta preserva l'appunto; annullare una modifica non cancella la cronologia. Operazioni ritentate non devono duplicare domande, patch o evidenze.

### Ancoraggi al testo

Un popup deve poter ritrovare il passaggio dopo una riapertura. Conservare un riferimento alla revisione del documento, all'unità o al blocco e al testo selezionato con un contesto sufficiente. Non dipendere solo dalle coordinate sullo schermo. Se il passaggio non si ritrova in modo univoco, mostrare il collegamento come da ricontrollare, senza attribuirlo a una frase diversa.

### Stato di conoscenza

| Stato | Significato |
| --- | --- |
| Non studiato | Nessuna attività di studio registrata |
| In corso | Unità avviata e attività non conclusa |
| Studiato da verificare | Lavoro svolto, senza evidenza indipendente sufficiente |
| Da ripassare | Errore, incertezza o richiamo successivo da affrontare |
| Dimostrato senza aiuti | Evidenza registrata in una verifica priva di aiuti nell'app |

Conservare autore della risposta, momento, concetti coinvolti, domanda o problema, risposta, valutazione e aiuti usati. “Dimostrato senza aiuti” riguarda le condizioni osservabili nell'app, non certifica l'assenza di strumenti esterni. Una risposta aiutata o l'accettazione di un merge non produce automaticamente questo stato.

## 8 Modello logico dei dati proposto

Nomi descrittivi, indipendenti dal database. Le relazioni possono essere implementate senza un database a grafo.

| Entità | Informazioni essenziali e relazioni |
| --- | --- |
| Corso | Nome, percorso scelto, programma e impostazioni; contiene fonti, struttura e piano |
| Fonte e versione | File o testo, tipo, stato di estrazione, impronta/versione; appartiene al corso |
| Passaggio della fonte | Testo o figura, fonte e versione, pagina/slide/sezione, eventuale area della figura |
| Concetto | Obiettivi e relazioni di prerequisito; collegato a unità ed evidenze |
| Modulo e lezione | Struttura ordinata e modificabile del corso; contengono unità |
| Unità | Obiettivo coerente, concetti, spiegazioni e riferimenti; non un numero fisso di minuti |
| Piano e attività | Disponibilità dichiarata, scadenza eventuale, priorità e attività settimanali |
| Sessione | Percorso, unità, fase, posizione nei pannelli e ripresa |
| Spiegazione e chiarimento | Contenuto, versione, citazioni; chiarimento ancorato al passaggio |
| Appunto e revisione | Documento dello studente, versioni e stato di salvataggio; può coprire più unità |
| Revisione didattica | Fotografia della bozza, questioni rilevate, domande, risposte e aiuti |
| Proposta di modifica | Base, ancoraggio, testo precedente/successivo, motivazione, fonti e decisione |
| Evidenza | Compito, risposta, concetti, valutazione, aiuti e data; separata dall'appunto |
| Progresso e lacuna | Stato per concetto, evidenze collegate e problemi ricorrenti |
| Attività di ripasso | Concetti, ragione, priorità, finestra proposta ed esito |

Il formato in `esempi/sessione_lamport.json` illustra i collegamenti, senza imporre API, schema fisico o linguaggio di programmazione.

## 9 Perimetro del primo prodotto

**C.** L'MVP completo comprende entrambi i percorsi, importazione di più fonti, struttura navigabile, spiegazioni con provenienza, spazio a due pannelli, salvataggio e ripresa, revisione mirata, diff approvato dallo studente, progresso per concetto, verifica senza aiuti e un piano/ripasso di base.

**P.** La prima dimostrazione integrata può concentrarsi su una lezione e un errore concettuale: incrocia slide PDF, trascrizione e Markdown, spiega con un ritaglio citato, lascia scrivere, interroga la bozza, propone una correzione e registra un richiamo successivo. Questa tappa non sostituisce l'MVP a due percorsi.

Successivamente: OCR esteso, audio/video, simulazione orale completa, sincronizzazione dei calendari, ottimizzazione FSRS, collaborazione tra studenti, ampi cataloghi di diagrammi scientifici specialistici e personalizzazione delle pause basata sul comportamento. Pagamenti, portale docenti, voti ufficiali e addestramento di un modello dedicato non sono necessari per validare il ciclo iniziale.

## 10 Qualità e scelte ancora aperte

Il prodotto conserva le bozze durante gli errori, rende leggibili le formule, permette di controllare le fonti e non richiede una tassonomia di feedback da imparare. Le proposte tecniche di accessibilità, prestazioni e recupero sono nel documento di interfaccia e nel piano di verifica.

Restano **A**: distribuzione web/desktop/locale, modello dei dati e autenticazione, elaborazione locale o cloud, fornitori e modelli AI, editor e formato canonico, formati iniziali di importazione, budget e scala, soglie di valutazione dell'apprendimento. Le proposte di architettura e i contratti del repository descrivono motivazioni e condizioni che farebbero cambiare scelta.

## 11 Progetto tecnico proposto per la valutazione

**P.** La configurazione candidata è una web app installabile, con client React/TypeScript, editor Tiptap, API Fastify, PostgreSQL con pgvector, storage privato degli originali e worker per i lavori persistenti. Il client serve desktop, tablet Android e telefono. Il server custodisce le credenziali AI e decide accesso alle fonti, condizioni della prova e applicazione delle patch. Il prototipo dovrà dimostrare una lezione completa con slide, trascrizione e due Markdown con ruoli diversi. Le decisioni da approvare sono in [domande.md](domande.md).

### 11.1 Dal caricamento al materiale citabile

1. Lo studente assegna al file un ruolo correggibile (slide, trascrizione, dispensa, appunti personali, esercizi o soluzioni). Il ruolo didattico e il formato sono campi distinti. L'API verifica accesso al corso, tipo effettivo, dimensione e integrità dell'upload. Registra originale privato, hash, versione e job. Un duplicato nello stesso corso può riusare l'estrazione mantenendo l'associazione alla lezione.
2. Il worker PDF.js legge pagine, etichette, testo e geometria. Per pagine complesse il worker documentale candidato usa Docling per ordine di lettura, tabelle e figure. Sulle scansioni si registra la necessità di OCR e si conserva la pagina consultabile. Un testo matematico sospetto rimanda al ritaglio originale. L'interfaccia espone per file lo stato ricevuto, in elaborazione, pronto, parziale o fallito e le pagine coinvolte. [PDF.js](https://mozilla.github.io/pdf.js/examples/) · [Estrazione di figure con Docling](https://docling-project.github.io/docling/_generated/examples/export_figures/)
3. Il parser Markdown lavora sull'albero del documento e conserva percorso, titoli, codice e formule. Risolve immagini e link relativi soltanto tra gli asset importati nel corso. Il parser delle trascrizioni conserva ordine e testo dei segmenti, parlante e intervallo temporale se presenti. Una trascrizione ricevuta in PDF mantiene anche i riferimenti di pagina. La produzione della trascrizione da audio è un job distinto, subordinato alla decisione sui formati.
4. Ogni passaggio conserva corso, versione, ID, ordine, sezione superiore, ruolo e posizione. La posizione è una pagina con eventuale rettangolo, un blocco Markdown oppure un segmento con tempi facoltativi. Figure e didascalie hanno collegamenti espliciti. Il chunk per la ricerca punta a uno o più passaggi contigui. Una dimostrazione spezzata mantiene il riferimento all'intera sezione. Le associazioni tra trascrizione e slide distinguono riferimento esplicito, abbinamento inferito e conferma dello studente.
5. Il worker costruisce indice lessicale ed embedding per i blocchi cambiati. Registra hash del contenuto indicizzato, versione del parser, modello e dimensione dei vettori. Pubblica il manifest con i suoi indici in modo coerente. Un fallimento di indicizzazione semantica lascia disponibile la ricerca testuale con stato degradato. Una sostituzione crea una nuova versione, mentre le citazioni storiche aprono quella già mostrata finché è conservata. Alla cancellazione si revocano accessi e si eliminano anche indici e derivati.

### 11.2 Recupero del contesto su più fonti

Il RAG recupera evidenze dal corso per una singola attività. Il server applica prima i vincoli di utente, corso, versioni autorizzate e fase della sessione. Una selezione o un richiamo esplicito alla slide apre direttamente il passaggio. Per una domanda libera, il worker combina ricerca testuale PostgreSQL (titoli, lessico del corso e termini esatti) e similarità pgvector (parafrasi, anche tra registro orale e formale). Simboli e identificatori di codice hanno anche un campo letterale ricercabile. Per la prima prova si possono prendere venti candidati per ramo, fonderne le posizioni con reciprocal rank fusion, deduplicare i passaggi e ampliare i vicini solo dove servono premesse, didascalie o definizioni. Le quantità sono parametri del benchmark. [Ricerca ibrida in pgvector](https://github.com/pgvector/pgvector#hybrid-search)

Una spiegazione generale campiona le sezioni collegate agli obiettivi. Un chiarimento parte dal blocco selezionato. Una revisione confronta bozza e obiettivi per trovare anche omissioni. I materiali del docente e gli appunti personali sono presentati con il loro ruolo. In caso di disaccordo il tutor collega le due affermazioni alle rispettive fonti. Se il contesto è insufficiente, l'operazione può chiedere un recupero aggiuntivo entro il budget, quindi espone il limite. In verifica senza aiuti il backend respinge chiarimenti e accesso alle soluzioni attraverso i comandi dell'app durante il tentativo.

### 11.3 Esempio completo: mostrare la figura della slide indicata

Nel mockup la finestra della fonte riceve nome e numero, e la scheda Slide costruisce il contenuto da esempi locali. Nel prodotto la navigazione trasporta l'identità della fonte. Anche la pillola nella spiegazione e il riferimento nel diff usano la stessa risoluzione. [Mockup](../index.html) · [Contratto illustrativo delle regioni](../esempi/harness_visuale.json)

| Passo | Responsabilità e dati |
| --- | --- |
| Catalogazione | Nell'esempio fittizio la versione `fonte-v1` ha indice fisico 13 da zero ed etichetta “14”. Il passaggio `passaggio-14` e la regione `regione-demo-14` rimandano a quella pagina. Il rettangolo normalizzato si riferisce alla pagina visibile orientata e include la didascalia pertinente. La pagina intera ha un riferimento anche se manca una regione. |
| Richiesta “mostrami la slide 14” | L'app risolve documento attivo ed etichetta nel manifest. Con più documenti o numerazioni ambigue offre le corrispondenze con titolo e miniatura. L'apertura della pagina è deterministica e costa zero chiamate al modello. Un PDF con più slide per foglio richiede regioni identificate per distinguere la singola slide. |
| Contesto per una spiegazione | Il server prepara un catalogo breve con ID, titolo, testo, pagina e regioni disponibili. Se la domanda riguarda frecce, assi o colori, il worker renderizza il ritaglio e invia i pixel come input immagine associato all'ID. L'ID da solo permette di richiedere o mostrare una figura. Per interpretarne dettagli visivi il modello deve ricevere l'immagine leggibile. [Input visivi](https://developers.openai.com/api/docs/guides/images-vision) |
| Risposta | Il modello produce blocchi ordinati secondo schema, come nell'esempio sotto. Il backend risolve gli ID attraverso il catalogo di quella operazione, controlla appartenenza, versioni, abbinamento tra passaggio e regione e autorizzazioni, poi assegna gli ID persistenti dei blocchi. Un riferimento sconosciuto richiede correzione entro budget o esito incompleto. La validazione degli ID garantisce la destinazione della citazione. L'aderenza dell'affermazione alla fonte si valuta separatamente. |
| Figura nella spiegazione | Il client riceve dal server metadati e riferimento al derivato autorizzato. Mostra un'immagine con didascalia, origine e azione “Apri pagina originale”. Se manca un ritaglio valido, mostra esplicitamente la pagina intera. A risorsa indisponibile espone l'errore sul blocco interessato. |
| Apertura e ritorno | PDF.js apre la versione autorizzata con `getPage(pageIndex + 1)`, usa il viewport orientato e sovrappone la regione tenendo conto dello zoom. File e immagini sono serviti previa autorizzazione o con URL a breve scadenza, rinnovabile dopo controllo. Il client conserva blocco di provenienza, posizione di lettura e bozza. |

Esempio di output applicativo proposto, con identificatori illustrativi:

```json
{
  "blocks": [
    {"kind":"paragraph","text":"La relazione causale implica un ordine dei timestamp. Dai soli timestamp non si ricava il percorso causale.","citationIds":["passaggio-14"]},
    {"kind":"sourceFigure","regionId":"regione-demo-14","citationIds":["passaggio-14"],"caption":"Passaggio della slide sugli orologi logici."}
  ]
}
```

Il server associa i riferimenti temporanei del modello a citazioni persistenti della specifica versione della spiegazione. Titolo reale, pagina, posizione, URL e attributo di provenienza arrivano dal database. Un blocco di tipo `aiIllustration` conserva invece la specifica o l'SVG generato, le evidenze di supporto, la descrizione accessibile e la versione dell'asset.

### 11.4 Harness, modelli e chiamate API

Il backend possiede il workflow. Ogni operazione lega identità, attività, snapshot, fonti, versione di prompt/schema, modello effettivo, limiti di spesa ed esito. Candidato per il primo adattatore: SDK TypeScript ufficiale OpenAI e Responses API con output strutturati e input visivi. Prevedere un profilo economico per chiarimenti locali, uno multimodale con ragionamento per figure e revisioni difficili, e un modello di embedding versionato per l'indice. Per il benchmark del 17 novembre 2026 proporre gpt-6-luna sui chiarimenti e gpt-6.2-sol come confronto comune su chiarimenti, figure e revisioni. Valutare gpt-6.2-astra sul sottoinsieme di dimostrazioni difficili per quantificare il beneficio marginale. Più profili possono puntare allo stesso modello. Selezionare gli ID disponibili nell'account con una prova comparativa, fissarli nel deployment e registrare ogni cambio. Il confronto usa gli stessi materiali e domande. [Catalogo modelli](https://developers.openai.com/api/docs/models) · [Output strutturati](https://developers.openai.com/api/docs/guides/structured-outputs)

| Azione | Ingresso e risultato persistito | Chiamate di generazione previste |
| --- | --- | --- |
| Preparare il corso | Programma e titoli delle fonti → proposta di struttura con concetti, prerequisiti e riferimenti. Lo studente può modificarla. | Una per proposta o per modulo esplicitamente delimitato. Embedding contabilizzati a parte. |
| Spiegare o chiarire | Obiettivo, passaggi e immagini necessarie, selezione versionata per un chiarimento → blocchi citati. | Una nel percorso ordinario. Riapertura e consultazione delle fonti non richiedono generazione. |
| Rivedere la bozza | Snapshot salvato, obiettivi e materiali → domande ancorate ai blocchi o omissioni ancorate alla sezione. | Una per sezione dichiarata. Dopo la risposta dello studente una seconda operazione propone la patch mirata. |
| Verificare e ripassare | Compito, rubrica, risposta immutabile e condizioni registrate → giudizio motivato per concetto. | Una per valutare una risposta aperta. Il server calcola stato e priorità di ripasso dalle evidenze. |
| Produrre un visuale originale | Obiettivo, dati del problema e fonti → figura con versione e testo alternativo. | Budget distinto per generazione, eventuale ispezione visiva e correzione. Zoom e interazione successiva sono locali. |

Flusso API proposto: `POST /api/v1/units/:id/explanations` riceve obiettivo e chiave di idempotenza e restituisce HTTP 202 con `operationId`. Il worker carica il contesto, invoca il provider e tratta esplicitamente timeout, risposta incompleta e rifiuto. Lo streaming può mostrare stato e testo provvisorio. Solo un risultato completo e validato diventa una revisione consultabile. Alla riconnessione il client legge `GET /api/v1/operations/:id`. La lettura della spiegazione restituisce blocchi e riferimenti. `GET /api/v1/citations/:id` risolve una posizione salvata e `GET /api/v1/regions/:id/image` consegna il derivato o lo stato del job. Entrambe verificano i permessi. Il merge usa la transazione separata descritta nei [contratti](CONTRATTI_E_DATI.md).

Il context composer colloca istruzioni e schema stabili all'inizio, poi obiettivo, snapshot, passaggi e immagini selezionati. Per il benchmark valgono i tetti per attività dell'[architettura](ARCHITETTURA.md), con una variante compatta entro 2 mila token di input per i chiarimenti locali. Si contano schemi, tool, testo, immagini e riserva per output/ragionamento. Se la revisione eccede il tetto, si salva la copertura per sezione. Il modello può chiedere un approfondimento mirato. Proposta iniziale: al massimo un passaggio supplementare per attività ordinaria, condiviso fra recupero, riparazione e retry. Interruzioni transitorie usano backoff nel budget residuo. Un cambio di modello è una scelta registrata con costo massimo, mai un ciclo aperto.

Per ogni tentativo registrare uso restituito dal provider, separando input ordinario, cache e output secondo il tariffario versionato, senza contare due volte ragionamento o immagini già inclusi. Sommare anche embedding, OCR eventuale, rendering e storage con le loro unità. Confrontare costo per lezione completata, latenza p50/p95, richieste fallite e costo per revisione corretta. Per il RAG misurare la presenza dei passaggi attesi nei primi risultati e la correttezza delle citazioni finali. Il riuso di spiegazioni riguarda la versione vista dallo studente. I derivati grafici sono riutilizzabili per fonte, regione e parametri nel perimetro autorizzato.

### 11.5 Figure originali e interazione

L'harness espone tre risultati: ritaglio annotabile del docente, SVG originale composto dal modello, componente scientifico interattivo controllato dall'app. Per un disegno originale il worker riceve obiettivo, relazione da illustrare, vincoli di lettura e stile. Analizza l'SVG con parser XML, ammette soltanto elementi e attributi grafici previsti, impone limiti a dimensioni e complessità ed esclude script, eventi, HTML incorporato e risorse esterne. Renderizza in isolamento, verifica ritagli e leggibilità a larghezza tablet e telefono, consente una correzione entro il budget e salva asset e descrizione. Se il visuale fallisce, la spiegazione indica il limite e resta leggibile con testo e fonti. Per la figura statica il client usa un'immagine. Le interazioni risiedono in componenti React con azioni tipizzate. [SVG come immagine](https://developer.mozilla.org/en-US/docs/Web/SVG/Guides/SVG_as_an_image)

Esempio: per Lamport il modello propone processi, eventi ordinati e messaggi. Il componente valida riferimenti, ordine locale, direzione invio/ricezione e assenza di cicli, calcola gli orologi e la raggiungibilità sul grafo, poi disegna le linee temporali. Lo studente tocca due eventi per evidenziare un cammino causale o leggere perché sono concorrenti. Per una curva numerica il componente calcola coordinate, scala e valori a partire da un'espressione matematica ammessa. Per una spiegazione illustrativa libera l'accuratezza richiede valutazione didattica su esempi annotati. Mermaid resta un backend facoltativo per diagrammi di flusso. OpenUI può comporre un pannello usando componenti consentiti: confrontarlo con blocchi React tipizzati su identico contenuto, includendo token del catalogo e tempi di resa. Editor, prove, citazioni e comandi di merge rimangono componenti applicativi.

### 11.6 Tablet, telefono e continuità del lavoro

Il tablet è una postazione di studio completa. Due pannelli si affiancano quando consentono lettura e scrittura anche con tastiera aperta. Su una superficie stretta si passa tra spiegazione, fonte e appunti conservando blocco, cursore e scorrimento per vista. Su telefono il diff è verticale, una figura si apre a tutto schermo e i comandi contestuali sono disponibili con tocco sul blocco oltre alla selezione. Durante la rotazione una domanda in bozza e una patch pendente conservano identità.

La PWA scarica su scelta una lezione con manifest di versioni, spiegazioni e asset selezionati. Service worker per shell e risorse scaricate, IndexedDB per snapshot locali e coda delle modifiche con ID di mutazione. Separare i dati per account. Prima del logout, segnalare bozze in attesa e consentire sincronizzazione o esportazione. Eliminare le copie gestite dopo la risoluzione delle modifiche pendenti. Esporre spazio insufficiente e stato della sincronizzazione. Offline sono disponibili materiali scaricati e scrittura. Le attività AI richiedono rete. Al ritorno online l'ACK del server identifica l'ultima modifica sincronizzata. Su una base divergente si conserva la bozza e si apre un confronto. Il secondo dispositivo riprende dall'ultima revisione confermata. La verifica senza aiuti è avviabile online con stato condiviso fra dispositivi. [Quote e persistenza locale](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria)

### 11.7 Prova di accettazione integrata

Usare materiali autorizzati con risposte attese annotate: un PDF con copertina e numeri stampati diversi dagli indici, una trascrizione, un Markdown di esercizi e uno di appunti personali. Ripetere con una pagina ruotata, due documenti aventi la stessa etichetta “14” e una domanda cui i materiali non rispondono.

| Azione osservabile | Evidenza richiesta in valutazione |
| --- | --- |
| Spiegare un passaggio che richiede slide e trascrizione | Passaggi attesi recuperati e ruoli visibili. Un revisore controlla che entrambi sostengano effettivamente la spiegazione. |
| Chiedere la figura e aprire la pagina dal testo e dal diff | Lo stesso ID risolve versione, pagina e regione corrette a ogni zoom e rotazione. Sostituire il PDF conserva la destinazione storica. Un ID di altro corso è rifiutato. |
| Toccare due eventi e poi confrontare la figura con la fonte | Risultato coerente con l'ordine causale, etichette leggibili, origine della figura esplicita. Registrare tempi e costo di produzione. |
| Scrivere sul tablet con tastiera aperta, interrompere la rete, ruotare e riprendere da telefono | La bozza locale sopravvive alla riapertura. Dopo l'ACK, il telefono recupera la versione confermata. Una modifica concorrente e una patch obsoleta producono confronto. Eseguire anche su hardware Android reale. |
| Interrompere una generazione e ritentare | Editor utilizzabile, un solo risultato applicativo persistito, tentativi e consumo osservabili. Riaprire figura, fonte o spiegazione salvata produce zero chiamate di generazione. |
