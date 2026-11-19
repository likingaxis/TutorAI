# Decisioni consolidate e parametri operativi aperti

La revisione tecnica dual-model (Gemini 4 Neon + GPT 6.2 Astra) ha chiuso l'architettura descritta in [Specifica v3](SPECIFICA.md), [Architettura v3](ARCHITETTURA.md), [Contratti e dati v3](CONTRATTI_E_DATI.md) e [Piano di sviluppo v3](PIANO.md). Restano da fissare soltanto i **parametri operativi e di business** per avviare Fase 0 e pilota.

## 1. Decisioni di prodotto e architettura chiuse

| Area | Decisione finale consolidata (v3) |
| --- | --- |
| Autonomia e mobilità | App web (PWA) 100% autonoma per PC, tablet e telefono in mobilità (appunti/quiz in autobus). Eventuale plugin Obsidian solo come estensione separata futura. |
| Visibilità fonti | Badge inline **nascosti di default** con toggle rapido `Mostra fonti` (menu/shortcut/Impostazioni). Citazioni sempre tracciate server-side e accessibili da selezione, diff ed esiti; contrasti/mancanze sempre visibili. |
| Sync multi-dispositivo | **Dexie (IndexedDB) + protocollo ottimistico server** (`baseRevisionId`, `clientMutationId`, `clientSequence`, `409` con confronto esplicito) in Fase 1–2 per atomicità reale sul merge. Yjs rinviato a Fasi 3–4 solo se serve editing simultaneo o collaborazione. |
| Verifica matematica e codice | `MathLive` + `CortexJS` solo per UX locale; **verifica autorevole server-side** su esercizi a dominio dichiarato con **3 esiti (`corretto`, `errato`, `indeterminato`)** e micro-servizio **SymPy sandboxed**. Pyodide solo in Web Worker isolato opzionale (Fase 3+). |
| OCR e import | Limiti cumulativi anti-abuse su `ZIP`/`PDF`/raster, **`pypdfium2`** server-side, contratto **`DocumentParserProvider`** con **1 percorso OCR Managed** in Fase 1 (distinguendo `verified_region`, `text_ok_region_uncertain`, `page_only`). BYOK e Locale in Fase 2. Audit licenze obbligatorio per `(codice, checkpoint, dipendenze)`. |
| Recupero e ricerca | Recupero **per attività** (diretto → sezione/albero → ibrido → lezione intera) misurato a `8k/20k/40k`; reranker solo su evidenza. **Indice simbolico dedicato** per operatori matematici (`<`, `>`, `→`, `∥`) accanto a `pg_trgm` (solo termini testuali). |
| Schizzi Excalidraw | Scena originale **sempre modificabile** (+ asset binari referenziati + SVG deterministico) in Fase 1; pulizia AI come **variante separata su `sourceSceneHash`** in Fase 2 con verifica semantica su pedici/frecce. |
| Foto esercizi e calibrazione | Flusso a 2 stadi in Fase 2: **trascrizione riga-per-riga correggibile** → verifica a 3 esiti (segni illeggibili = `indeterminato`, rettifica ricalcola FSRS). La confidenza metacognitiva non amplifica mai esiti `indeterminato`. |
| Accesso, Ospite e privacy | **Niente SSO Ateneo in MVP** (Better Auth pronto per futuro IDEM SAML). Fase 1: Email+Password + 1 OAuth. Fase 2: Passkey + **Ospite blindato** (corso demo + max 3 chiarimenti Tier 1 + tetto giornaliero globale + migrazione consumo). **Matrice compliance `provider×endpoint×regione×retention`** obbligatoria; telemetria Langfuse di soli metadati di default; `public_share` rimuove asset protetti del docente. |

## 2. Parametri operativi ancora da fissare prima del pilota

| Parametro | Domanda operativa | Cosa sblocca |
| --- | --- | --- |
| Campioni reali Fase 0 | Quali 2–3 lezioni reali autorizzate (slide con formule sottili/figure/rotazioni, trascrizione, dispensa, 5+ temi d'esame, foto esercizio manoscritto) usiamo come ground truth? | Avvia subito i 4 benchmark di Fase 0 (OCR, recupero `8k/20k/40k`, ricerca simbolica, SymPy). |
| Target economico e margine | Quanti studenti pilota prevediamo e qual è il budget/ricavo netto target per studente attivo/mese (coprendo **p95** in settimana pre-esame e quota ospiti)? | Chiude la sostenibilità unitaria sulla matrice degli endpoint conformi e fissa il tetto globale giornaliero. |
| Dispositivi di riferimento | Su quali tablet e smartphone Android di fascia media verifichiamo Fase 1–2 (input `MathLive`, `Excalidraw`, PDF, PWA in mobilità)? | Definisce la matrice minima di test reali su hardware. |
| Estensioni opzionali Fase 2 | Il **PPTX nativo** (note del relatore) e la **ricerca web esterna su richiesta** entrano in Fase 2 o slittano dopo il pilota? | Congela il perimetro operativo della Fase 2 senza scope creep. |
