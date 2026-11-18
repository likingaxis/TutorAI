# TutorAI · Guida allo stile visivo

TutorAI ha il ritmo di un quaderno di studio. Il blu cobalto e le onde danno energia ai punti di partenza. Le superfici di carta e la tipografia editoriale danno spazio alla lettura, alle formule e al lavoro dello studente. La barra di navigazione con il logo e il motivo a onde è il riferimento che collega le schermate.

Il [mockup HTML](../index.html) è il riferimento per interazioni, contenuti e responsive. Per confrontare la composizione desktop, aprire gli SVG di [Home](../svg-redesign-opus/mockups/01-home-corsi.svg), [Studio](../svg-redesign-opus/mockups/03-studio-spiegazione.svg) e [Ripasso](../svg-redesign-opus/mockups/05-ripasso-lobby.svg).

## Gli elementi che rendono riconoscibile TutorAI

| Elemento | Come usarlo |
| --- | --- |
| Banner cobalto | Una superficie ampia, un titolo serif, pochi dati leggibili e un’azione primaria. Le onde scorrono in basso. L’illustrazione sta sul lato libero e lascia al testo la parte più uniforme del gradiente. Usare una fascia più bassa per wizard e dialoghi. |
| Schede a due toni | Il fondo colorato identifica il corso. L’icona rialzata anticipa l’argomento e l’inserto neutro contiene titolo, unità verificate e stato. Riservare questo trattamento a oggetti riconoscibili come corsi, cartelle ed esiti. |
| Carta e cartelle | Dare agli appunti un fondo caldo, un angolo piegato e qualche riga del testo reale. Le cartelle possono mostrare il bordo di un foglio. Nell’editor e nell’anteprima aperta, aumentare i margini e usare il fondo carta come area continua. |
| Puntinatura fine | Usarla per orientare l’occhio su diagrammi, illustrazioni tecniche e aree di caricamento. Tenerla poco contrastata e limitarla alla superficie che serve. |
| Icone e pillole | Icone duotono su un piccolo fondo morbido per i contenuti. Pillole per un’azione breve, una scelta o uno stato. Le icone azionabili hanno un nome accessibile. |
| Diario e risultati | Le date organizzano la cronologia. Gli esiti numerici hanno un’etichetta chiara e possono usare un anello che rappresenta il punteggio reale. Una lacuna resta riconoscibile anche dal testo. |

Le illustrazioni spiegano dove si è. Il diagramma di Lamport richiama la lezione in corso, il quaderno identifica Ripasso e le copertine colorano la pagina del singolo corso. Riutilizzare le illustrazioni dei corsi nelle anteprime del wizard e nei banner corrispondenti. [Copertine del mockup](../assets/course-covers)

## Tipografia e scala

- **Newsreader** per i titoli principali e il testo di lettura. Dare ai titoli delle pagine circa 40–49 px quando lo spazio lo permette. Per sottosezioni, schede e dialoghi usare in genere 20–30 px. Georgia è una riserva per la lettura.
- **Inter** per pulsanti, campi, messaggi e navigazione. L’interfaccia compatta può usare 12–14 px. Aumentare la dimensione o il peso per l’azione su cui si basa il passaggio successivo.
- **JetBrains Mono** per date brevi, numeri di lezione, versioni, conteggi e codice. Lasciare la prosa e i nomi delle azioni in Inter. Le formule nel mockup sono composte con KaTeX.

Nelle pagine panoramiche, usare una larghezza interna fino a circa 1176 px. Distanze di 24–32 px fra gruppi stabiliscono la gerarchia. Gli angoli dei banner possono arrivare a 26–28 px, quelli dei pannelli a 16–24 px. Usare ombre diffuse su elementi rialzati e bordi sottili per campi, righe e divisori.

## Colore, temi e stato

| Ruolo | Riferimento nel mockup |
| --- | --- |
| Cobalto | `#1565f2` nei banner e negli elementi di marca. Le variabili `--atlas-g0`, `--atlas-g1` e `--atlas-ink` adattano le fasce al tema e al contrasto del titolo. |
| Blu funzionale | `--blue`, `--blue-i` e `--blue-s` per selezioni, focus, azioni e sfondi leggeri della stessa famiglia. |
| Verde e menta | `#48c788` e la famiglia `--green*` per avanzamento verificato, conferme e indicatori di completamento. |
| Ambra e rosso | La famiglia `--amber*` segnala richiami o materiale da controllare. La famiglia `--red*` segnala errori o risposte da rivedere. Abbinare sempre un’etichetta o un’icona. |
| Fondo e carta | `--surface` e `--card` per lo spazio di lavoro, `--paper` per i documenti, `--ink` per il testo e `--line` per le separazioni. |

In seppia, scaldare il grande fondo e ridurre la saturazione delle fasce. In scuro, passare a carta antracite e blu più profondi, mantenendo leggibili testo, focus e stati. In Studio, tono, trama e carattere del foglio sono scelte indipendenti.

## Composizione per flusso

- **Home e corso** · Separare la ripresa della lezione dall’indice. Affiancare appunto e Archivio quando c’è spazio. Nel corso, la copertina appartiene al banner e la lezione da riprendere emerge nella lista con una sola evidenza.
- **Creazione corso** · Mostrare il passo corrente e una CTA per procedere. La copertina risponde a nome, simbolo e colore. Caricamento, stato dei file e mappa procedono in ordine e mantengono riconoscibile il punto in cui ci si trova.
- **Studio** · La spiegazione mostra presto la formula o il diagramma. Gli appunti hanno una pagina distinta. Le azioni sulla selezione stanno vicino al testo e la barra di formattazione è a portata di mano. Slide, revisione e conclusione mantengono la stessa struttura visiva e usano i colori di stato per ciò che è cambiato.
- **Ripasso** · La sessione di oggi viene prima. La scelta del corso e il calendario conducono a un quiz con una domanda alla volta. L’esito separa errore, risposta corretta e azione successiva. Calcolare numeri, precisione e indicatori dai dati effettivamente presenti nel mockup.
- **Profilo e account** · Il diario mette in primo piano attività e date. Le impostazioni raggruppano tema e azioni dell’account in sezioni leggibili. Accesso e registrazione possono usare una scena cobalto a fianco del modulo, con i campi raccolti su un’unica superficie.

## Movimento e adattamento

Usare un movimento breve per aprire un pannello, cambiare passo o sollevare l’icona sotto il puntatore. Il caricamento dei materiali ha una firma propria, il giro d’inchiostro con schizzo e una barra che rappresenta lo stato dell’operazione. Con `prefers-reduced-motion`, mostrare l’indicatore statico e conservare l’annuncio e il valore di avanzamento.

Su telefono, partire dall’ordine delle azioni. Le schede dei corsi possono diventare righe, Studio passa da due colonne a due schede e il calendario viene subito dopo la sessione di oggi. Verificare che i controlli restino raggiungibili a 320 px, che il focus sia visibile e che ogni stato sia comprensibile anche senza affidarsi al colore.

Prima di estendere il mockup, confrontare la nuova schermata con una delle tre principali. Controllare gerarchia, tipografia, spaziatura, temi e funzionamento dei controlli. Le regole base sono in [index.html](../index.html) e le varianti sono nei fogli di [Corsi e Archivio](../tab-corsi-archivio.css), [Studio](../tab-studio-tutor.css), [Ripasso e Profilo](../tab-ripasso-profilo.css) e [Accesso](../auth.css).
