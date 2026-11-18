# TutorAI interfaccia e interazioni

La direzione visiva deriva dalle slide e dal riferimento REVISION2000. Il comportamento didattico segue la [specifica](SPECIFICA.md). Dimensioni e adattamenti sono proposte da verificare. Il logo corrente è in [assets/logo.png](../assets/logo.png).

Il [mockup HTML](../index.html) illustra il flusso, ma non è approvato integralmente e usa operazioni simulate.

Per l’identità visiva del mockup corrente, usare la [guida allo stile](STILE_VISIVO.md). Questa pagina conserva le indicazioni sul comportamento e i riferimenti visivi originari.

## 1 Riferimenti da aprire

| Riferimento | Cosa osservare |
| --- | --- |
| [Slide HTML](riferimenti/presentazione.html) | Slide 4: lettura e scrittura. Slide 5: domanda sull'appunto e diff. Slide 6: ripasso e progresso |
| [SVG dello spazio di studio](riferimenti/studio.svg) | Barra scura, spiegazione a sinistra, note a destra, popup sulla selezione e azione di fine blocco |
| [SVG della revisione](riferimenti/revisione.svg) | Domanda sul punto preciso dell'appunto, integrazione nella stessa struttura, ripasso delle lacune |
| [Guida a REVISION2000](RIFERIMENTI.md) | Materiali copiati dal progetto di riferimento e loro uso |

Gli SVG sono disegni dimostrativi; le slide sono una presentazione e non un'applicazione funzionante. Le scritte su titoli, contatori, file e prerequisiti rappresentano esempi, non valori da codificare nell'app.

## 2 Composizione dello spazio di studio

**V/C.** L'interfaccia deve sembrare uno strumento di lettura e scrittura, con poche azioni visibili e continuità tra spiegazione, appunti e revisione. La barra laterale scura contiene navigazione e funzioni globali. Due superfici ampie occupano lo spazio principale.

```text
┌─────────┬────────────────────────────────┬────────────────────────────────┐
│ Corso   │ Corso / Lezione / Unità        │ Nome appunto       Salvato     │
│         ├────────────────────────────────┼────────────────────────────────┤
│ Studio  │ SPIEGAZIONE                    │ I MIEI APPUNTI                 │
│         │ Titolo, obiettivo, fonti       │ Pagina libera                  │
│ Ripasso │ Testo, formule, figure         │ Titoli e parole dello studente │
│         │                                │                                │
│         │ Selezione → popup contestuale  │                                │
│         │                                │                                │
│ Tema    │ Navigazione dell'unità         │ [Verifica i miei appunti]      │
└─────────┴────────────────────────────────┴────────────────────────────────┘
```

**P.** Navigazione principale: Corso, Studio e Ripasso. Fonti e piano si aprono dal corso o dal contesto, con possibilità di tornare allo stesso punto. Non richiedono un terzo pannello permanente. La separazione tra le due aree può essere ridimensionata; posizione di lettura e modifica restano indipendenti.

Il lato destro resta il documento dello studente. Un richiamo a “Obsidian” descrive pagina pulita, scrittura e struttura libera: non prescrive un plugin Obsidian, un vault sul filesystem o una libreria editor specifica.

## 3 Linguaggio visivo

I valori sotto sono **rilevati nei file sorgente**, non inventati come identità grafica nuova. Le slide riprendono già numerosi token di REVISION2000.

| Elemento | Valore di riferimento | Uso in TutorAI |
| --- | --- | --- |
| Sfondo generale | `#e6e6e9` | Superficie esterna neutra |
| Pannello secondario | `#f6f6f7` | Contenitore della spiegazione e controlli secondari |
| Foglio | `#ffffff` | Spiegazione e appunti leggibili |
| Testo principale | `#141416` | Titoli e testo ad alta priorità |
| Testo secondario | `#4b4b52` | Testo di supporto |
| Testo attenuato | `#8a8a92` | Metadati; contrasto da verificare prima dell'uso in testo piccolo |
| Bordo | `#e2e2e6` | Separazioni leggere |
| Barra laterale | `#161618` | Navigazione globale |
| Blu | `#3b6fd9` | Selezione, citazioni e azioni contestuali |
| Verde | `#2e9e6a` | Aggiunte del diff e completamenti con etichetta |
| Rosso | `#d9534f` | Rimozioni ed errori con etichetta |
| Ambra | `#cf9a12` | Punto da discutere o ripassare |
| Font testo | Inter, poi font di sistema | Lettura e interfaccia |
| Font monospazio | JetBrains Mono, poi Consolas/monospace | Codice, formule testuali e identificatori |

Pannelli ampi con angoli arrotondati di circa 20–28 px, pulsanti compatti a pillola, ombre morbide e icone lineari sono coerenti con le fonti. Le misure sono riferimenti visivi, non un vincolo al pixel. Nel prodotto il testo deve ridistribuirsi con lo spazio disponibile: le slide usano un canvas 1600 × 900 scalato, che non è un modello responsive da copiare.

**P.** Base a spaziatura regolare, corpo di testo comodo per lo studio, una sola azione primaria per fase, movimenti brevi e disattivabili. La barra di navigazione non deve competere con le formule o il documento.

REVISION2000 include temi chiaro, seppia e scuro. **P/A.** Portare subito il tema chiaro delle slide e valutare un tema scuro per lo studio prolungato; il seppia può seguire. Qualsiasi tema richiede verifica di contrasto, selezioni e diff. Trascinare la barra tra i lati, come in REVISION2000, è un'opzione futura e non un requisito del ciclo di studio.

## 4 Schermate e azioni principali

| Schermata o stato | Contenuto essenziale | Azione principale |
| --- | --- | --- |
| Corsi | Corsi disponibili, ripresa e scelta del percorso per un nuovo corso | Crea o riprendi corso |
| Ingresso lezione | Nome, materiale disponibile, prima unità proposta | Inizia a studiare |
| Ingresso esame | Programma, data/formato, disponibilità e diagnosi | Conferma piano |
| Materiali in elaborazione | Fonti, stato per file, errori e unità già utilizzabili | Apri unità disponibile |
| Corso e piano | Struttura modificabile, fonti, obiettivi settimanali e lacune | Continua attività |
| Studio | Spiegazione a sinistra, bozza personale a destra | Verifica i miei appunti |
| Revisione | Bozza e domanda ancorata, risposta e possibilità di chiarire | Rispondi |
| Merge | Modifiche proposte, motivo, fonte e decisioni | Accetta modifiche selezionate |
| Ripasso | Attività motivate dalle lacune e risultati precedenti | Avvia verifica |
| Verifica senza aiuti | Consegna e risposta; spiegazioni e appunti di supporto nascosti | Consegna risposta |
| Esito | Feedback, condizioni della prova e attività successiva | Torna al percorso |

La tabella è una proposta di organizzazione P: alcune schermate possono essere stati della stessa superficie anziché pagine separate. Il requisito V/C è conservare orientamento, documento e flusso.

## 5 Popup sul testo della spiegazione

**V.** La selezione di una frase rende disponibili Approfondisci, Spiega diversamente, Esempio e Mostra fonte. “Poco chiaro” può attivare la riformulazione. L'utente può scrivere una domanda sul passaggio selezionato.

**P.** Il popup compare vicino alla selezione senza coprire il passaggio essenziale, mostra un breve richiamo al testo e mantiene il contesto dell'unità. La risposta resta recuperabile come annotazione comprimibile. Chiudere il popup restituisce il punto di lettura. Una risposta lunga si apre in un'area contestuale leggibile, senza generare una serie di finestre sovrapposte.

Mostra fonte porta al file e al passaggio corretto, con ritorno alla selezione. Le immagini tratte dalle slide mantengono pagina e provenienza; un diagramma illustrativo AI porta un'etichetta diversa. Modificare una spiegazione non può far apparire un chiarimento vecchio come se si riferisse alla versione nuova.

## 6 Revisione sugli appunti

**V/C.** “Verifica i miei appunti” fotografa la bozza e avvia la revisione. Le domande si ancorano alla riga o al blocco interessato. Il contenuto non viene riscritto mentre lo studente sta pensando. L'interfaccia mostra una domanda utile in linguaggio naturale, senza nomi interni di categorie pedagogiche.

**P.** Un solo quesito espanso per volta; gli altri punti hanno indicatori discreti e un contatore. Domande su omissioni possono riferirsi a una sezione o all'unità, dichiarando che manca un contenuto invece di evidenziare una frase non pertinente.

L'esempio delle slide usa una frase sugli orologi di Lamport che deduce causalità dai soli timestamp. Il tutor propone un controesempio, lo studente risponde e il sistema usa questa risposta per la correzione. L'esempio guida il comportamento, non obbliga a usare sempre quella materia o quella domanda.

## 7 Diff e decisione sulle modifiche

**V/C.** La proposta conserva struttura e voce dello studente, mostrando il testo rimosso, aggiunto, il motivo e la fonte. Sono disponibili accettazione, rifiuto e modifica manuale.

**P.** Ogni modifica ha una decisione separata. Se esistono più proposte, l'azione collettiva riguarda soltanto quelle selezionate. Prima della conferma la bozza non cambia. Il diff usa segni, etichette e testo oltre al colore. Un conflitto con una modifica recente dello studente richiede un confronto; non si sovrascrive la nuova versione.

Dopo l'accettazione sono visibili il nuovo stato di salvataggio e il collegamento alla versione precedente. Una correzione contestata può restare aperta mentre lo studente prosegue; non diventa prova di padronanza né accettazione implicita.

## 8 Stati vuoti errori e attese

| Situazione | Risposta proposta P |
| --- | --- |
| Nessun file | Chiedere argomento/programma e indicare che il percorso ricostruito è provvisorio |
| File non supportato o illeggibile | Spiegare il problema per quel file e suggerire un formato supportato |
| Formula o figura estratta male | Consentire il confronto con la pagina originale; segnalare l'incertezza |
| Bozza vuota | Offrire un punto di partenza e una spiegazione, preservando la scrittura dello studente |
| AI lenta o non disponibile | Stato comprensibile, annullamento o nuovo tentativo; editor e bozza restano disponibili |
| Salvataggio in corso o fallito | Stato esplicito; evitare un falso “Salvato”; consentire recupero/esportazione quando possibile |
| Fonte in contrasto con un'altra | Mostrare riferimenti e domanda aperta, senza correzione autoritaria |
| Ancoraggio non più valido | Presentare il punto come da ricollegare, senza evidenziare testo arbitrario |
| Ripresa dopo una pausa | Ripristinare posizione e bozza; breve richiamo all'obiettivo corrente |

## 9 Schermi piccoli e accessibilità

**C/P.** Su desktop mantenere i due pannelli. Quando lo spazio non permette la lettura affiancata, usare viste Spiegazione e Appunti con contesto e posizione conservati, navigazione compatta e ritorno immediato. La soglia esatta dipende dal prototipo; non rimpicciolire l'intero canvas delle slide.

**P.** Verificare almeno 1440 × 900, 1280 × 800, 768 × 1024 e 390 × 844, oltre allo zoom del browser al 200%. Su schermi piccoli il popup può diventare un pannello contestuale inferiore. Nessun comando essenziale deve essere disponibile solo tramite hover o selezione del mouse.

Tastiera: raggiungere la stessa azione contestuale da un comando sul passaggio; focus visibile; Esc chiude e restituisce il focus; ordine di tabulazione coerente; pulsanti con nomi leggibili dai lettori di schermo. Evitare scorciatoie a singolo carattere attive mentre si scrive. Formule e immagini hanno rappresentazioni accessibili adeguate. Contrasto e target tattili sono criteri da verificare sul prototipo, non qualità già dimostrate dai colori originali.

## 10 Cosa riprendere da REVISION2000

Riprendere gerarchia visiva, rail compatta, superfici, selezione con popup, annotazioni vicine al documento, diff ispezionabile e continuità del lavoro. I pattern utili sono già descritti in questa guida e nelle due illustrazioni conservate.

Le funzioni di compilazione LaTeX, SyncTeX, categorie di correzione delle tesi, esportazione per un agente esterno e installatori appartengono all'altro prodotto. Non entrano automaticamente in TutorAI. Anche il server Python e il frontend monolitico di REVISION2000 sono una realizzazione di riferimento, non una decisione sullo stack di questa app.


## Stato del mockup

Il logo fornito dall'autore è stato integrato nella barra e come favicon. Il resto del layout mantiene lo stato esplorativo. L'analisi delle simulazioni riguarda il sorgente; non è una verifica dei flussi nel browser.

| Area | Evidenza nel sorgente | Cosa serve per il prodotto reale |
| --- | --- | --- |
| Stato iniziale | `makeInitialState()` contiene corsi, appunti, risposte e progresso dimostrativi | Creazione di dati dell'utente e caricamento dallo stato persistente |
| Salvataggio | `showSaveFeedback()` passa da “Salvataggio…” a “Salvato” dopo un timer | Conferma di scrittura effettiva, coda delle modifiche e recupero dagli errori |
| Importazione | `simulateFileUpload()` aggiunge un file predefinito all'elenco | Upload reale, validazione, estrazione, stato per file e passaggi con provenienza |
| Tutor | `askTutorOnPara()` sceglie tra risposte predisposte | Recupero del contesto, chiamata al modello, citazioni controllate e gestione dei fallimenti |
| Revisione | `submitReviewAnswer()` passa al diff già predisposto | Valutazione della bozza e della risposta, quesiti pertinenti e proposte validate |
| Ancoraggio e merge | `applyDiffDecision()` individua un blocco tramite `isTargetErr` | Identificatori persistenti, revisione di base, ancoraggio verificabile e transazione di aggiornamento |
| Conflitto | `conflictSimulated` attiva un caso dimostrativo | Confronto reale con la revisione attuale, rilevamento dei cambiamenti e rifiuto delle patch obsolete |
| Diagnosi | Alcuni pulsanti impostano direttamente `dimostrato` | Un tentativo registrato e valutato con condizioni e aiuti noti |
| Verifica autonoma | `submitRecall(ok, ...)` riceve un esito booleano dal flusso dimostrativo | Risposta originale, valutazione motivata, condizioni della prova e aggiornamento verificabile del concetto |
| Piano | `skipTodaySession()` incrementa un contatore di giorni | Ripianificazione in base a disponibilità, priorità, prerequisiti e scadenze reali |


Le note, i corsi e alcune risposte iniziali sono dati dimostrativi. Il timer del salvataggio non scrive i dati su disco o su un servizio. Il caricamento delle fonti, la revisione, il conflitto e gli esiti delle prove richiedono l'implementazione descritta nei contratti.

### Decisioni di interfaccia ancora aperte

- Ingombro dell'indice laterale e scelta dei temi. La proposta per tablet e telefono, con editing touch, ripresa e limiti offline, è nella sezione 11.6 della [specifica](SPECIFICA.md).
- Profondità delle spiegazioni, numero di osservazioni e granularità delle modifiche.
- Editing e selezione di formule, codice e figure senza perdita di struttura.
- Avvisi sui prerequisiti: i blocchi rigidi mostrati nella demo non diventano automaticamente requisiti.
- Comandi dimostrativi e pannello JSON: strumenti di prototipo, da rivedere nel prodotto.
