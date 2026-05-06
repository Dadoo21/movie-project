# 🎬 MovieProject

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Benvenuto in **MovieProject**, una piattaforma web moderna per l'esplorazione, il noleggio e l'acquisto simulato di film. 
Costruita con React e Tailwind CSS, l'applicazione punta a offrire un'esperienza utente premium, dinamica e altamente responsiva, ispirata ai grandi colossi dello streaming.

## ✨ Funzionalità Principali

- 🎨 **Interfaccia Premium & UX Avanzata**: Design moderno con Glassmorphism, animazioni fluide e notifiche **Toast** intelligenti a comparsa per fornire un feedback visivo immediato su ogni singola azione.
- 🔐 **Multi-User Storage e Sicurezza**: L'architettura simula un vero backend. I dati del carrello, della wishlist e dello storico acquisti sono completamente isolati nel browser in base all'account connesso. Include un form di checkout professionale con validazione visiva dinamica (colori rosso/verde sui bordi) e formattazione istantanea.
- 🎮 **Gamification & Profilo Utente**: Sistema di progressione a livelli (Novizio, Appassionato, Cinefilo Senior) basato sui film effettivamente acquistati, con barre di avanzamento grafiche e storicizzazione permanente degli ordini effettuati.
- 🛒 **Interazioni Intelligenti e Badge Dinamici**: Indicatori numerici reattivi sulla barra di navigazione che tengono il conto in tempo reale di carrello e preferiti. Ecosistema cross-collegato: quando si finalizza un acquisto, i film comprati vengono defalcati automaticamente e silenziosamente dalla lista desideri per evitare doppioni futuri.
- 🔍 **Ricerca, Filtri e Offerte (TMDB)**: Integrazione asincrona profonda con il database di TMDB. Possibilità di cercare e applicare filtri complessi multipli, accoppiata a un algoritmo personalizzato che calcola in modo "deterministico" sconti e prezzi definitivi in base al prestigio del film.

## 🚀 Come avviare il progetto localmente

Segui questi passaggi per testare il progetto sul tuo computer:

1. **Clona la repository**
   ```bash
   git clone https://github.com/Dadoo21/movie-project.git
   cd movie-project
   ```

2. **Installa le dipendenze**
   ```bash
   npm install
   ```

3. **Configura le variabili d'ambiente**
   Crea un file chiamato `.env` nella directory principale del progetto e inserisci la tua API Key di TMDB:
   ```env
   VITE_TMDB_API_KEY=inserisci_qui_la_tua_api_key
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

4. **Avvia il server di sviluppo**
   ```bash
   npm run dev
   ```
   L'applicazione sarà disponibile all'indirizzo `http://localhost:5173`.

## 📚 Documentazione

Per un approfondimento sui flussi logici e sul funzionamento lato utente dell'applicazione, consulta il file [DOCUMENTATION.md](./DOCUMENTATION.md) aggiornato.
