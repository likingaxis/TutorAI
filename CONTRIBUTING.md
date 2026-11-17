# Collaborare a TutorAI

Partire da [Specifica](docs/SPECIFICA.md) e [Architettura](docs/ARCHITETTURA.md). Il mockup serve a discutere l'esperienza: non rende automaticamente approvati layout, soglie o funzionalità dimostrative.

## Scegliere un'attività

Aprire un'issue con problema, risultato atteso e criteri di verifica. Collegare, quando pertinente, un requisito `Fxx`, una decisione tecnica `Txx` o uno scenario `ACxx`. Distinguere le attività di progettazione dalle funzioni già implementate.

Le prime attività dovrebbero produrre prove piccole e complete:

- Editor con formule, selezioni, salvataggio e conflitto fra revisioni.
- Importazione di un PDF reale con citazione e ritaglio della pagina corretta.
- Una spiegazione e una revisione AI misurate per qualità, costo e attesa.
- Uno schema semplice da JSON controllato, senza codice libero generato dal modello.

## Branch e pull request

Usare un branch per attività, per esempio `feature/editor-notes`, `fix/selection-anchor` o `docs/source-formats`. Tenere le pull request abbastanza piccole da poterle controllare.

Nella descrizione indicare:

1. Il problema e il comportamento risultante.
2. Le scelte o i compromessi che il gruppo deve valutare.
3. Come è stata verificata la modifica e gli eventuali limiti ancora aperti.

Per modifiche dell'interfaccia aggiungere un'immagine o una breve registrazione quando aiutano il confronto. Aggiornare la documentazione se cambia un requisito, un contratto o una decisione tecnica. Test e prove devono verificare comportamenti significativi, soprattutto perdita di testo, conflitti, provenienza e distinzione degli aiuti.

## File e materiali

Il logo comune è [assets/logo.png](assets/logo.png); usarlo senza introdurre copie divergenti. Gli esempi in `esempi/` sono fittizi e possono essere condivisi. Materiali personali dei corsi, credenziali e dati di studio restano nei percorsi locali esclusi da Git.

Il riordino ha conservato una copia della directory precedente in `.local-backup/`, esclusa dal repository. Non serve per sviluppare: documenti correnti, riferimenti ed esempi necessari sono già nelle cartelle condivise.

## Verifica della documentazione

Eseguire dalla radice:

```sh
python scripts/check_docs.py
```

Richiede soltanto la libreria standard di Python 3.10 o successivo. Quando esisteranno i moduli applicativi, aggiungere qui i comandi reali di installazione, avvio e test, evitando istruzioni che presuppongano file non ancora presenti.
