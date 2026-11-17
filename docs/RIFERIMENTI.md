# TutorAI riferimenti di progetto

La base condivisa è costituita da [Specifica](SPECIFICA.md), [Architettura](ARCHITETTURA.md), [Interfaccia](INTERFACCIA.md), [Contratti e dati](CONTRATTI_E_DATI.md) e [Piano](PIANO.md). Le proposte tecniche rimangono da validare su materiali e condizioni reali.

## Identità visiva

Il [logo](../assets/logo.png) è il file fornito dall'autore, copiato senza modifiche ai pixel. È usato nel README, nel mockup e nella copertina della presentazione. La scelta del logo non equivale all'approvazione integrale dell'interfaccia esplorativa.

## Interfaccia

| Riferimento | Uso |
| --- | --- |
| [Mockup interattivo](../index.html) | Studio, corso, ripasso e stati dimostrativi |
| [Presentazione](riferimenti/presentazione.html) | Sei slide; usare le frecce per navigare |
| [Spazio di studio](riferimenti/studio.svg) | Spiegazione a sinistra e appunti personali a destra |
| [Revisione degli appunti](riferimenti/revisione.svg) | Domanda sul passaggio, proposta di modifica e ripasso |

REVISION2000 è stato indicato dall'autore come riferimento per rail, superfici, popup e revisione sul documento. I pattern utili sono sintetizzati nella guida all'interfaccia; non servono il suo codice o la raccolta di immagini di terzi per lavorare a TutorAI.

Gli SVG sono illustrazioni del flusso. La presentazione contiene anche numeri raccolti durante l'ideazione: non sono risultati verificati di TutorAI né soglie da codificare. Il mockup usa dati e operazioni simulate.

## Valutazione tecnica

Le scelte sono state confrontate con il supporto di GPT-6 Astra e di una successiva revisione High su contesto ridotto. Il confronto ha favorito una base più semplice: web e dominio TypeScript, ricerca testuale iniziale, Python e vettori subordinati alle prove, Mermaid per i primi schemi. Il documento di architettura collega le affermazioni tecniche alle fonti ufficiali consultate.

Prima di adottare una dipendenza, fissarne la versione e verificare compatibilità e condizioni d'uso nella combinazione reale. Le fonti consultate non dimostrano da sole accuratezza dell'estrazione, qualità didattica o recupero dagli errori.

## Esempi condivisi

- [Sessione di studio](../esempi/sessione_lamport.json): bozza, feedback, patch, evidenza guidata e ripasso.
- [Strumenti visuali](../esempi/harness_visuale.json): regione, chiamata di ritaglio, specifica di schema e budget di contesto.

File del corso, identificatori e coordinate sono fittizi. Gli esempi illustrano relazioni e contratti, senza rappresentare chiamate API o rendering già eseguiti.
