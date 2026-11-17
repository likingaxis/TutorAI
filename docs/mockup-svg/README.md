# TutorAI · Proposta SVG (Revisione Argon High)

Undici tavole desktop (`1600 × 1000`) e tre tavole di flusso: sei viste principali e cinque stati di dettaglio. Sono proposte di interfaccia vettoriali con dati illustrativi coerenti; non introducono requisiti approvati.

Aprire la [panoramica vettoriale](00-panoramica.svg) o la sua [anteprima PNG](anteprime/00-panoramica.png).

Due tavole mostrano le sequenze complete: [flusso di studio e revisione](00-flusso-studio.svg) ([PNG](anteprime/00-flusso-studio.png)) e [ripasso e risultati](00-flusso-ripasso.svg) ([PNG](anteprime/00-flusso-ripasso.png)).

| Vista | Contenuto |
| --- | --- |
| [01 · Corsi](01-corsi.svg) | Saluto con serie attiva, hero card *Ultima lezione* con percorso visivo e griglia dei corsi con tessera `+ Nuovo corso` integrata |
| [02 · Corso](02-corso.svg) | Percorso delle unità (`1.1`–`1.4`), pulsante `+ Aggiungi lezione` nell'intestazione delle lezioni, materiali e ripasso del corso |
| [03 · Studio](03-studio.svg) | Pulsante `Indice` in alto a sinistra accanto al breadcrumb, selettore visivo di dettaglio (`● ● ○`), foglio appunti su micro-griglia stile Obsidian e barra di formattazione flottante in basso |
| [04 · Ripasso](04-ripasso.svg) | Spotlight *Da ripassare oggi*, prossimi richiami, *Padronanza per materia* con anelli di progresso e *Verifiche recenti* cliccabili |
| [05 · Sessione](05-sessione-ripasso.svg) | Focus senza barra laterale, pillola modalità `Scelta rapida \| Risposta scritta`, diagramma P₁/P₂ con `0 messaggi scambiati` e opzioni A/B/C |
| [06 · Attività](06-attivita.svg) | Banner profilo con metriche sintetiche, cronologia filtrabile (`Tutto \| Studio \| Appunti \| Verifiche`) e schede di riepilogo per corso |
| [07 · Revisione degli appunti](07-revisione-appunti.svg) | Domanda del tutor ancorata direttamente al dubbio evidenziato nella bozza dello studente |
| [08 · Proposta di modifica](08-proposta-modifica.svg) | Diff inline tra testo attuale (`v1`) e integrazione proposta (`v2`), motivazione, fonte (`Slide p. 12`) e controlli espliciti |
| [09 · Appunti consolidati](09-appunti-consolidati.svg) | Foglio appunti su griglia aggiornato a `v2` con sezione integrata, barra di formattazione flottante e completamento unità |
| [10 · Esito del ripasso](10-esito-ripasso.svg) | Esito della sessione (`2/3`), spiegazione sul caso `A ∥ B`, rimando alla `Slide p. 12` e collegamento diretto allo Studio |
| [11 · Verifica storica](11-verifica-storica.svg) | Dettaglio della verifica senza aiuti del 15 novembre alle `18:32` (`2/2`), aperto dalla cronologia o da Ripasso |

## Navigazione e identità visiva

- **Rail laterale (`88 px`)**: texture blu profonda a onde morbide con logo TutorAI esclusivamente in cima alla barra laterale, tre destinazioni principali (`Corsi`, `Studio`, `Ripasso` con indicatore di richiamo), selettore tema a 3 punti (`Chiaro / Seppia / Scuro`) e avatar `Profilo` con indicatore orologio collegato a `06-attivita.svg`.
- **Corsi → Corso → Studio**: la home (`01-corsi.svg`) consente di riprendere subito l'ultima lezione (`1.3 Orologi logici di Lamport`) o aprire il corso (`02-corso.svg`), dove si trova l'azione `+ Aggiungi lezione`.
- **Studio e scrittura su micro-griglia (`03`, `07`, `08`, `09`)**: il comando `Indice` è collocato in alto a sinistra accanto al breadcrumb; a sinistra sono presenti lo switch `Spiegazione | Slide`, i tre pallini di profondità (`● ● ○`) e l'azione contestuale sul testo evidenziato; a destra il foglio appunti adotta una micro-griglia tecnica con dock di formattazione flottante centrato in basso (`B I S U | x² x₂ | </> ∑ formula ”`).
- **Ripasso e verifiche (`04`, `05`, `10`, `11`)**: la lobby di ripasso bilancia la sessione del giorno e i prossimi richiami a sinistra con la padronanza per materia e le verifiche recenti a destra; la sessione (`05`) mostra chiaramente l'assenza di messaggi tra `P₁` e `P₂` e lo switch `Scelta rapida | Risposta scritta`.

## Coerenza dei dati illustrativi

Sistemi Distribuiti contiene quattro unità: `1.1` e `1.2` completate, `1.3 Orologi logici di Lamport` in corso, `1.4 Orologi vettoriali` da iniziare. Il richiamo del giorno riguarda `1.2 Relazione happened-before`, già verificata senza aiuti il 15 novembre alle `18:32`.

## Revisione Argon High

Le modifiche principali applicate rispetto alla versione precedente sono:

- rimozione completa di frasi didascaliche, avvisi meta-esplicativi e paragrafi riempitivi;
- restyling della rail laterale con onde blu stratificate, ritorno della voce `Studio`, selettore tema compatto e icona profilo con badge cronologia;
- pulizia della Home (`01-corsi.svg`) senza pulsanti `+ Aggiungi lezione` o `Storico lezioni`, con tessera `+ Nuovo corso` allineata nella griglia;
- posizionamento di `+ Aggiungi lezione` dentro `02-corso.svg` e del pulsante `Indice` in alto a sinistra in `03-studio.svg`;
- sostituzione della toolbar pesante con un foglio su micro-griglia in stile Obsidian e dock flottante in basso;
- bilanciamento di `04-ripasso.svg` con gli anelli di *Padronanza per materia* e le *Verifiche recenti* cliccabili;
- aggiunta del selettore `Scelta rapida | Risposta scritta` e dell'indicatore `0 messaggi scambiati` in `05-sessione-ripasso.svg`.

## File e rigenerazione

Ogni schermata misura `1600 × 1000`. Testi, icone, diagrammi e forme sono elementi SVG vettoriali modificabili; il logo originale è incorporato in base64 per rendere le tavole autonome. Le anteprime raster si trovano in `anteprime/`.

Il generatore usa soltanto Node.js e i file del repository:

```sh
node scripts/generate_svg_mockups.mjs
```

Il comando rigenera gli SVG; le anteprime PNG in `docs/mockup-svg/anteprime/` vengono renderizzate a risoluzione nativa (`1600 × 1000` per `01`–`11`, dimensioni proporzionali per le tavole `00-*`). Il mockup interattivo `index.html` non è modificato da questo generatore.
