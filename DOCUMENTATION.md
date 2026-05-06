# Documentazione Progetto: Movie Web App

## 1. Scopo del Progetto
L'obiettivo di questa applicazione è fornire un'interfaccia utente moderna, veloce e completamente responsiva per l'esplorazione, l'acquisto simulato e il noleggio di film. Il progetto mira a dimostrare le best practice dello sviluppo frontend moderno, implementando funzionalità complesse come l'autenticazione lato client, la gestione globale dello stato (carrello e lista desideri), il routing protetto e l'integrazione asincrona con API esterne, il tutto racchiuso in una UI curata e accattivante.

## 2. Struttura del Progetto
Il codice è organizzato secondo una struttura modulare feature-based, tipica delle applicazioni React scalabili:

```text
src/
├── api/             # Interfacciamento con API esterne (TMDB)
├── assets/          # File statici (immagini, icone vettoriali)
├── components/      # Componenti UI riutilizzabili (Navbar, MovieCard, Modali)
├── context/         # Gestione dello stato globale (AuthContext, CartContext)
├── pages/           # Viste principali mappate sulle rotte (Home, Offers, Cart, ecc.)
├── utils/           # Funzioni di utilità pure (es. logiche di calcolo prezzi)
├── App.jsx          # Entry point del routing e aggregatore dei provider
└── index.css        # Entry point globale per Tailwind e custom CSS
```

## 3. Tecnologie Utilizzate
- **React.js (v18)**: Libreria core per la costruzione dell'interfaccia a componenti.
- **Vite**: Build tool ultrarapido utilizzato per lo scaffolding e il ricaricamento a caldo (HMR) durante lo sviluppo.
- **Tailwind CSS**: Framework CSS utility-first utilizzato per la prototipazione rapida e la creazione di un design system coerente senza la necessità di file CSS separati.
- **React Router DOM (v6)**: Gestione della navigazione single-page, inclusa la protezione delle rotte.
- **Lucide React**: Libreria di icone SVG altamente personalizzabili e leggere.
- **TMDB API**: Sorgente dati esterna per popolare dinamicamente il catalogo dei film.

## 4. Architettura e Scelte Implementative

### Gestione dello Stato Globale
Invece di utilizzare librerie esterne pesanti come Redux, lo stato globale è gestito nativamente tramite la Context API di React (`AuthContext` e `CartContext`). Questa scelta riduce il boilerplate e mantiene l'applicazione leggera.
I dati del carrello, della lista desideri e della sessione utente vengono costantemente sincronizzati con il `localStorage` tramite `useEffect`. Questo garantisce la persistenza dei dati anche dopo il ricaricamento della pagina, offrendo un'esperienza fluida.

### Autenticazione e Guest Mode
L'autenticazione è simulata lato client. È stato implementato un sistema ibrido che permette all'utente di navigare liberamente il catalogo o scegliere la modalità ospite (`isGuest`). Tuttavia, le azioni transazionali (aggiunta al carrello o ai preferiti) sono intercettate da un custom hook (`useAuthAction`). 
Invece di bloccare brutalmente l'utente o nascondere i bottoni, l'hook permette il clic ma esegue un redirect condizionale verso la pagina di login, passando il messaggio di errore appropriato tramite lo state del router. Questo pattern migliora notevolmente la User Experience.

### Pricing Dinamico e Deterministico
Poiché l'API pubblica non fornisce prezzi di listino commerciali, i costi vengono generati lato client. Per evitare che i prezzi cambino ad ogni re-render (il che comprometterebbe la credibilità dell'e-commerce), è stata implementata in `src/utils/pricing.js` una funzione di *seeded random generation*. 
Passando l'ID del film come seed, otteniamo fattori di sconto e prezzi variabili (basati anche sull'età della pellicola) che restano sempre coerenti nel tempo per ciascun titolo.

## 5. Dettagli sul Codice

### Intercettazione Sicura degli Eventi (Modale)
Il componente `MovieModal.jsx` fa uso di `createPortal` per renderizzare il modale all'esterno del normale albero DOM, evitando problemi di z-index e stack context con gli elementi circostanti (es. le griglie CSS).
La gestione del blocco dello scroll (`document.body.style.overflow`) è incapsulata in un hook `useEffect` con relativa funzione di cleanup:
```javascript
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
  return () => { document.body.style.overflow = ''; };
}, [isOpen]);
```
Questo assicura che in caso di smontaggio improvviso del componente, le impostazioni globali del DOM non vengano corrotte.

### Gestione Checkout Unificata
Nel `CartContext`, la logica del checkout (`clearCartAndCheckout`) effettua un aggiornamento incrociato degli stati:
```javascript
const clearCartAndCheckout = () => {
  const cartMovieIds = new Set(cart.map(item => item.id));
  setWishlist(prev => prev.filter(item => !cartMovieIds.has(item.id)));
  setCart([]);
};
```
Sfruttando l'oggetto `Set`, la lookup dei film acquistati avviene in tempo costante `O(1)`. Questo garantisce che, all'avvenuto acquisto, gli articoli appena posseduti vengano defalcati in maniera selettiva e performante dalla lista dei desideri.

## 6. Chiamate API (TMDB)
Il modulo `src/api/tmdb.js` astrae tutte le interazioni con il server backend.
È stato configurato un singolo metodo generico `fetchTMDB` che automatizza l'inserimento dell'API key e dei parametri comuni (es. `language=it-IT`).

Una particolarità dell'implementazione è il filtro di sicurezza lato client:
```javascript
if (data.results) {
  return data.results.filter(movie => !movie.adult);
}
```
Poiché determinati endpoint di TMDB (come le ricerche per popolarità o trend) tendono a ignorare il parametro `include_adult=false` nelle stringhe di query in alcune condizioni, il livello API scarta attivamente i risultati inappropriati prima ancora che raggiungano il livello UI, garantendo una visualizzazione *safe for work*. Inoltre, l'endpoint per i dettagli esegue una query arricchita (`append_to_response: 'credits'`) per limitare il numero di richieste HTTP necessarie per caricare cast e crew.
