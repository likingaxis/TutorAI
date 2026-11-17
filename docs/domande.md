# Decisioni per la valutazione di TutorAI

Le proposte di riferimento sono nella [specifica tecnica](SPECIFICA.md). Le risposte servono a fissare perimetro, soglie e condizioni del pilota.

| Decisione | Domanda per il team | Base proposta e conseguenza |
| --- | --- | --- |
| Materiali reali | Quali due lezioni autorizzate possiamo usare e chi indica pagine, figure, risposte corrette e omissioni attese? | Scegliere una lezione con diagrammi e una con formule su più pagine. Servono per valutare estrazione, retrieval e accuratezza prima della scelta dei modelli. |
| Formati | Gli studenti hanno trascrizioni pronte, registrazioni, scansioni, PPTX con note del relatore o slide esportate in PDF? | PDF digitale, trascrizioni testuali e Markdown con allegati nella prima prova. Audio, OCR e PPTX richiedono pipeline e campioni distinti. |
| Dispositivi | Quali tablet, telefoni e versioni Android usano i primi studenti? Sono essenziali penna a mano libera o distribuzione su Play Store? | Proporre PWA e test su dispositivi reali. La penna con tratti modificabili implica un modello dei dati dedicato. Il requisito store apre la valutazione di Capacitor. |
| Offline | Serve solo leggere e scrivere offline, oppure anche interrogare il tutor e sostenere prove? I dispositivi possono essere condivisi? | Lezione scaricabile e scrittura locale con sincronizzazione. Inferenza offline, protezione dei download e prove offline richiedono decisioni ulteriori. |
| Dati | Quali materiali e risposte possono essere inviati al provider? Quali regione, conservazione, cancellazione e gestione dei backup sono ammesse? | Originali privati e invio dei soli passaggi o ritagli necessari. Confermare condizioni contrattuali e impostazioni prima del pilota con dati reali. |
| Budget | Quanti studenti, lezioni al mese, pagine per corso e operazioni simultanee? Quale costo per lezione e quale attesa sono accettabili? | Misurare costo e latenza per attività e per sessione. Le risposte fissano quote, modello, parallelismo dei worker e capacità necessaria. |
| Visuali | Quali tre figure devono riuscire particolarmente bene e cosa deve poter fare lo studente con ciascuna? | Confrontare ritaglio, SVG composto e componente interattivo sugli stessi obiettivi. Individuare chi valuta correttezza scientifica e leggibilità. |
| Valutazione | Quali errori impediscono il rilascio e chi decide le soglie didattiche? | Proporre come bloccanti una patch applicata alla revisione sbagliata, la perdita di una bozza confermata e una citazione che apre un'altra pagina. Concordare soglie di recupero, falsi positivi e correttezza con i valutatori. |
| Fonti esterne | Il tutor può cercare sul web quando i materiali sono insufficienti? | Partire da integrazioni esplicitamente richieste ed etichettate. La risposta decide strumenti disponibili, priorità delle fonti e trattamento delle domande senza evidenze. |
