# TutorAI piano di sviluppo e verifica

Sequenza proposta da aggiornare con le prove tecniche e i vincoli del team. Tempi e dimensioni del gruppo non sono già concordati. [Architettura](ARCHITETTURA.md) e [Contratti e dati](CONTRATTI_E_DATI.md) definiscono la base tecnica. Il [mockup](../index.html) usa dati e operazioni simulate: non rappresenta il superamento degli scenari di accettazione.

## 1 Fasi proposte

| Fase | Risultato | Condizione per procedere |
| --- | --- | --- |
| 0 Decisione e prove | Scelta T01–T12 e prove sui rischi di editor, fonti e merge | Assunzioni esplicite e principali rischi dimostrati o circoscritti |
| 1 Ciclo integrato di una lezione | Fonte reale, spiegazione citata, appunti, revisione, diff, ripresa e prima verifica | Il flusso completo funziona con persistenza e AI reale; eventuali componenti simulati sono dichiarati |
| 2 MVP a due percorsi | Ingresso rapido e ingresso esame, diagnosi, piano, più fonti, ripasso e progresso | Scenari essenziali sotto completati anche in caso di errore |
| 3 Pilota | Uso di studenti e materiali di più corsi con osservazione dei problemi | Feedback di usabilità e risultati di prove senza aiuti, senza promesse premature di efficacia |
| 4 Estensioni motivate | Formati avanzati, calendario, orale, scheduler evoluto o diagrammi | Priorità giustificate dalle evidenze del pilota |

Una fase 1 gradevole ma priva di revisione ancorata o diff approvato non prova il nucleo distintivo. Una fase 1 completa su una lezione non equivale ancora all'MVP a due percorsi.

## 2 Scenari di accettazione

Gli scenari sono criteri di comportamento da realizzare e verificare. Non sono test già eseguiti su TutorAI, che al momento di questa consegna non è implementato.

| ID | Requisiti | Scenario e risultato atteso |
| --- | --- | --- |
| AC01 | F01–F05 | Scelgo Lezione per lezione e carico un PDF leggibile. Vedo lo stato del file, una struttura modificabile e una prima unità utile senza completare una diagnosi d'esame obbligatoria |
| AC02 | F01–F05, F15 | Scelgo Preparazione esame con programma, disponibilità e data. Ottengo una diagnosi rappresentativa e un piano modificabile. Un argomento non testato resta non verificato |
| AC03 | F05–F07 | Seleziono una frase della spiegazione e chiedo un esempio. La risposta rimane collegata al passaggio; la bozza a destra non cambia e resta nel punto in cui scrivevo |
| AC04 | F07–F08 | Scrivo titoli, una formula, un blocco di codice e un elenco; attendo lo stato di salvataggio completato, chiudo e riapro. Ritrovo il contenuto e l'unità. La politica di recupero dell'eventuale testo non ancora salvato è esplicita |
| AC05 | F09–F10 | Inserisco una deduzione concettuale errata e invio la bozza. Ricevo una domanda ancorata al punto rilevante, non una riscrittura automatica o una serie di interruzioni durante la digitazione |
| AC06 | F05, F10 | Dichiaro di non aver mai studiato un concetto o resto bloccato. Il tutor fornisce una spiegazione ed eventualmente un esempio svolto, senza obbligarmi a indovinare materiale nuovo |
| AC07 | F11 | Dopo il feedback vedo testo precedente, proposto, motivo e fonte. Accetto una modifica e ne rifiuto un'altra. Il documento conserva entrambe le decisioni e la versione originale è recuperabile |
| AC08 | F08–F11 | Genero una proposta, modifico nel frattempo lo stesso passaggio e tento di accettarla. Il sistema segnala il conflitto e preserva la versione nuova; la patch non si applica in silenzio |
| AC09 | F12–F14 | Accetto il merge. Il concetto non diventa automaticamente dimostrato senza aiuti. Eseguo poi un richiamo senza aiuti nell'app: tentativo, condizioni e valutazione sono collegati al concetto |
| AC10 | F03, F17 | Apro una citazione. Raggiungo il file e la pagina/slide/sezione corretti. Un'integrazione esterna e un esempio AI hanno indicazioni diverse dal materiale del docente |
| AC11 | F03, F08 | Carico un file illeggibile insieme a uno valido o interrompo una chiamata AI. Capisco quale operazione è fallita, posso ritentare e continuo a scrivere. Una bozza salvata resta disponibile |
| AC12 | F08–F11 | Riapro un chiarimento dopo una modifica. Il sistema trova il passaggio corretto oppure lo segnala da ricollegare, senza spostare la domanda su testo non pertinente |
| AC13 | F14–F15 | Salto una sessione prevista. Le attività sono ripianificate con priorità e carico gestibile. I ripassi restano motivati dalle lacune e dagli esiti disponibili |
| AC14 | F13 | Avvio una verifica senza aiuti. Le risposte e gli appunti di supporto dell'app sono nascosti fino alla consegna. Un tentativo aiutato non è registrato come indipendente |
| AC15 | F06–F11 | Uso tastiera e zoom al 200% nei viewport dichiarati. Raggiungo azioni essenziali, chiudo popup e ritrovo il focus, senza comandi coperti o testo perso |
| AC16 | F16 | Esporto gli appunti nel formato dichiarato e ne controllo formule e riferimenti. La cancellazione rimuove dati e derivati secondo la politica esplicitata per il deployment |
| AC17 | F03, F17 | Le fonti discordano o il recupero non trova un passaggio sufficiente. Il tutor presenta il contrasto o la mancanza di fondamento senza inventare una citazione |
| AC18 | F07, F11–F12 | Una richiesta viene ritentata dopo un errore di rete o una risposta duplicata. Non si creano doppie patch applicate o doppie evidenze; lo stato finale resta comprensibile |

Per AC16, in un servizio con account verificare anche che un utente non possa recuperare passaggi, file o revisioni di un altro. In una distribuzione locale verificare i confini equivalenti stabiliti dall'architettura.

## 3 Esempio concreto delle slide

Il materiale originale mostra una spiegazione sugli orologi logici e una bozza che inverte un'implicazione. La dimostrazione del prodotto deve mostrare questi passaggi:

1. La spiegazione chiarisce che la relazione happened-before implica un ordine dei timestamp di Lamport, mentre i soli timestamp non provano la relazione causale.
2. Lo studente scrive una frase che usa erroneamente l'implicazione inversa.
3. Il tutor lega una domanda a quella frase e propone di ragionare su eventi privi di un percorso causale.
4. La risposta dello studente entra nella revisione e motiva una correzione limitata alla frase.
5. L'accettazione aggiorna l'appunto e conserva la versione precedente.
6. Il concetto resta da verificare; un'attività successiva aperta chiede di ricostruire la distinzione senza aiuti nell'app.

La verifica aperta è preferibile come prova del ragionamento. La domanda a scelta multipla mostrata nella slide 6 è un esempio visivo possibile, non l'unico tipo di esercizio richiesto.

## 4 Materiali di prova da raccogliere

| Campione | Cosa verifica |
| --- | --- |
| PDF testuale semplice | Importazione, citazioni e primo flusso |
| Slide con formula e diagramma | Conservazione di notazione, figure e pagina |
| Dimostrazione lunga | Unità semanticamente completa senza limite rigido di parole |
| Codice con indentazione | Rendering, selezione, copia ed esportazione |
| Scansione o documento degradato | Limiti dichiarati, errore o percorso OCR se supportato |
| Due fonti in disaccordo | Provenienza e gestione del contrasto |
| Bozza corretta e bozza con errore | Feedback utile e falsi positivi |
| Fonte con istruzioni estranee allo studio | Separazione tra contenuto importato e azioni autorizzate dell'app |

Usare materiali propri o autorizzati. L'esempio JSON allegato serve a illustrare i dati e non sostituisce questi campioni.

## 5 Come verificare la qualità

**Funzionamento.** Automatizzare i controlli che proteggono revisioni, autorizzazioni, patch, operazioni ripetute e serializzazione dell'editor. Verificare il flusso completo nei browser o sistemi scelti. La sola corrispondenza di uno screenshot non prova il salvataggio o il merge.

**Contenuti AI.** Confrontare risposte e citazioni con i materiali di riferimento; annotare errori, omissioni, falsi positivi e domande inutili. Ripetere un piccolo insieme stabile di casi quando cambiano modello, prompt o pipeline. La valutazione AI di un concetto è rivedibile e deve restare collegata alla risposta originale.

**Esperienza.** Osservare se lo studente capisce dove scrivere, come chiedere chiarimenti, quando iniziare la revisione e cosa sta accettando. Registrare abbandoni, perdita del punto, difficoltà con formule e recupero dagli errori.

**Apprendimento.** Raccogliere prove senza aiuti e richiami differiti su concetti definiti. Per un confronto di efficacia occorre un protocollo adeguato; soddisfazione e qualità apparente degli appunti non lo sostituiscono. Non dedurre attenzione o apprendimento dal solo tempo trascorso nella schermata.

**Prestazioni e costo.** Misurare importazione, prima unità, chiarimenti e revisione con ambiente e campioni dichiarati. Il team propone soglie iniziali in base alla soluzione, poi le verifica. Fissare un budget di chiamate e una politica di ritentativo prima di un pilota esteso.

## 6 Cosa documentare dopo la decisione

La prima consegna di sviluppo dovrà includere istruzioni di avvio, configurazione delle credenziali, formati supportati, limiti dei file, test pertinenti, modalità di ripresa e recupero, posizione dei dati e costi misurati. Ogni funzione simulata deve essere riconoscibile per chi valuta il prototipo.
