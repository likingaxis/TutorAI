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

Le scelte architetturali v3 consolidano il confronto tecnico dual-model tra **Gemini 4 Neon** (proposta architetturale v2 e integrazione delle meccaniche del mockup) e **GPT 6.2 Astra** (revisione avversaria su atomicità sync/merge, autorità della verifica matematica, licenze OCR, ricerca simbolica oltre `pg_trgm`, conflitto ZDR/Batch, limiti di sicurezza e perimetro snello di Fase 1).

Prima di adottare una dipendenza o un modello, fissarne la versione esatta, verificare la licenza di codice/checkpoint/dipendenze e compilare la matrice `provider×endpoint×regione×retention`. Le fonti consultate non sostituiscono i 4 benchmark di Fase 0.

## Esempi condivisi

- [Sessione di studio](../esempi/sessione_lamport.json): bozza, feedback, patch, evidenza guidata e ripasso.
- [Strumenti visuali](../esempi/harness_visuale.json): regione, chiamata di ritaglio, specifica di schema e budget di contesto.

File del corso, identificatori e coordinate sono fittizi. Gli esempi illustrano relazioni e contratti, senza rappresentare chiamate API o rendering già eseguiti.
