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

**V/C.** La spiegazione può incorporare ritagli delle slide, figure originali e schemi. La generazione automatica di schemi avanzati è successiva al nucleo del prodotto. Visualizzare codice e formule non richiede esecuzione arbitraria del codice o compilazione di progetti LaTeX.

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

**P.** La prima dimostrazione integrata può concentrarsi su una lezione e un errore concettuale: importa un PDF, spiega, lascia scrivere, interroga la bozza, propone una correzione e registra un richiamo successivo. Questa tappa non sostituisce l'MVP a due percorsi.

Successivamente: OCR esteso, audio/video, simulazione orale completa, sincronizzazione dei calendari, ottimizzazione FSRS, collaborazione tra studenti, generazione avanzata di diagrammi e personalizzazione delle pause basata sul comportamento. Pagamenti, portale docenti, voti ufficiali e addestramento di un modello dedicato non sono necessari per validare il ciclo iniziale.

## 10 Qualità e scelte ancora aperte

Il prodotto conserva le bozze durante gli errori, rende leggibili le formule, permette di controllare le fonti e non richiede una tassonomia di feedback da imparare. Le proposte tecniche di accessibilità, prestazioni e recupero sono nel documento di interfaccia e nel piano di verifica.

Restano **A**: distribuzione web/desktop/locale, modello dei dati e autenticazione, elaborazione locale o cloud, fornitori e modelli AI, editor e formato canonico, formati iniziali di importazione, budget e scala, soglie di valutazione dell'apprendimento. Le proposte di architettura e i contratti del repository descrivono motivazioni e condizioni che farebbero cambiare scelta.
