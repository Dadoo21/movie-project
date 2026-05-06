# 🎬 MovieProject

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Benvenuto in **MovieProject**, una piattaforma web moderna per l'esplorazione, il noleggio e l'acquisto simulato di film. 
Costruita con React e Tailwind CSS, l'applicazione punta a offrire un'esperienza utente premium, dinamica e altamente responsiva, ispirata ai grandi colossi dello streaming.

## ✨ Funzionalità Principali

- 🎨 **Interfaccia Premium (Glassmorphism)**: Design moderno con effetti di sfocatura, gradienti radiali, micro-animazioni fluide e palette di colori ottimizzata.
- 🔍 **Ricerca e Filtri Avanzati**: Integrazione profonda con l'API di TMDB. Possibilità di cercare film per titolo o utilizzare filtri avanzati combinati (Genere, Anno, Voto Minimo, Lingua) e ordinamenti dinamici.
- 💸 **Sistema di Pricing Dinamico e Offerte**: Algoritmo personalizzato che calcola in modo deterministico i prezzi di acquisto e noleggio. Sezione speciale "Offerte" con sconti generati in base alla valutazione della critica (film con voto > 7.5).
- 🔐 **Autenticazione Simulata e Modalità Ospite**: Flusso di accesso/registrazione protetto. I non loggati possono esplorare liberamente il catalogo, ma le azioni transazionali (Wishlist, Carrello) sono bloccate e richiedono il login.
- 🛒 **Gestione Stato Globale**: Carrello e Wishlist sincronizzati in tutta l'applicazione tramite Context API e persistenza locale. Sincronizzazione intelligente post-acquisto (i film comprati vengono rimossi automaticamente dalla wishlist).

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

## 📚 Documentazione Tecnica

Per un approfondimento completo sull'architettura del software, le scelte implementative e la logica dietro le quinte, consulta il file [DOCUMENTATION.md](./DOCUMENTATION.md) incluso in questa repository.
