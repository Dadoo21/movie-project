# Documentazione Progetto: Movie Web App

## 1. Scopo del Progetto
L'obiettivo di questa applicazione è fornire un'interfaccia utente moderna, veloce e completamente responsiva per l'esplorazione, l'acquisto simulato e il noleggio di film. Il progetto è stato sviluppato per dimostrare le best practice dello sviluppo frontend, con un focus particolare su un'esperienza utente (UX) eccellente, logiche di gamification e architettura dati avanzata.

## 2. Struttura del Progetto
Il codice è organizzato in una struttura modulare per facilitare la manutenzione e la scalabilità:
- **api/**: Gestione delle chiamate ai server esterni (TMDB) per ottenere il catalogo film.
- **components/**: Elementi grafici riutilizzabili come la Barra di navigazione, le locandine dei film, i filtri di ricerca e i bottoni.
- **context/**: Il "cervello" dell'app, dove risiedono i dati condivisi globalmente (sessione utente, carrello, lista desideri).
- **pages/**: Le vere e proprie "schermate" del sito (Home, Offerte, Profilo, Carrello, ecc.).
- **utils/**: Funzioni matematiche o logiche pure separate dall'interfaccia (es. l'algoritmo di calcolo dei prezzi).

## 3. Come Funziona il Sito: Flussi e Logiche

### Esplorazione e Ricerca (Home e Offerte)
Appena l'utente atterra sulla **Home**, il sistema scarica dinamicamente i film di tendenza. L'utente ha a disposizione una barra di ricerca rapida e un **Pannello Filtri Avanzato**. 
Quando l'utente utilizza i filtri (selezionando Genere, Anno, Voto o Lingua), la pagina non subisce un refresh completo; il sito invia una richiesta "silenziosa" al server per aggiornare istantaneamente la griglia dei film. 
Selezionando "Offerte" nel menu, l'utente viene portato in una pagina speciale dove un algoritmo proprietario seleziona solo i film "Top Rated" (con recensioni eccellenti, voto superiore a 7.5) e applica automaticamente uno sconto visibile del 30% sia sull'acquisto che sul noleggio.

### Finestra Dettagli Film (Modale fluttuante)
Cliccando su una qualsiasi locandina, lo schermo si oscura leggermente e si apre una finestra fluttuante centrale. In questo istante, il sito blocca lo scorrimento della pagina in background, in modo che l'utente non perda mai il punto esatto in cui stava navigando. Nel modale l'utente visualizza la trama completa, il cast principale, e ha a disposizione i bottoni per interagire: "Aggiungi al Carrello" (scegliendo tra acquisto o noleggio) e il pulsante per aggiungere il film ai Preferiti.

### Autenticazione e Dati Multi-Utente
Il sito possiede un sistema account avanzato. Gli utenti non registrati ("Ospiti") possono sfogliare l'intero catalogo e usare i filtri liberamente. Tuttavia, se provano ad inserire un film nel carrello o nella wishlist, il sistema intercetta immediatamente l'azione e li accompagna con garbo alla pagina di Login o Registrazione.
Il punto di forza dell'architettura è il **Multi-User Storage**: quando un utente crea un account, tutti i suoi dati vengono salvati localmente ma "etichettati" in modo univoco con la sua email. Questo significa che se due persone diverse (es. Mario e Luigi) accedono dallo stesso computer, vedranno carrelli, preferiti e storici completamente differenti e privati.

### Carrello, Checkout e Notifiche (Toast)
Ogni azione rilevante compiuta dall'utente (aggiungere un film, accedere con successo, svuotare la lista) genera una notifica grafica detta **Toast**: un elegante popup a scomparsa che scende sotto la barra di navigazione superiore, fornendo un feedback rassicurante e immediato.
Nel **Carrello**, l'utente ha la visione globale dei costi. Può rimuovere singoli film o "Svuotare" l'intero contenitore con un click.
Selezionando di procedere al pagamento, entra in gioco il **Form di Checkout Avanzato**:
- Per evitare il fastidio degli avvisi di autocompletamento invasivi di Chrome sui moduli di carta di credito, il sistema utilizza descrizioni intelligenti che neutralizzano gli algoritmi del browser, simulando visivamente una vera carta senza far scattare allarmi.
- L'utente beneficia di una validazione cromatica in tempo reale: mentre digita i dati, i bordi dei campi si accendono di verde istantaneamente non appena il formato inserito è corretto (es. il completamento di 16 numeri per la carta), altrimenti rimangono rossi di avvertimento. La data di scadenza inoltre posiziona la barra "Mese/Anno" in via del tutto automatica.
Al termine del Checkout (fittizio), i film passano ufficialmente allo Storico Ordini, il carrello si svuota in un colpo solo, e il sistema rimuove automaticamente i film acquistati anche dalla Lista Desideri (se vi erano presenti), per impedire futuri doppioni.

### Profilo e Gamification (I Livelli)
Accedendo alla pagina **Profilo**, l'utente non solo vede i suoi dati anagrafici, ma ha a disposizione la cronologia permanente dei propri ordini. 
Per stimolare l'engagement, il sito è dotato di un motore di **Gamification**. In base al totale di pellicole acquistate storicamente, il sistema assegna un grado e un badge visivo all'utente:
- Fino a 5 film: Livello **Novizio** (Badge Bronzo).
- Dai 6 ai 15 film: Livello **Appassionato** (Badge Argento).
- Oltre 16 film: Livello **Cinefilo Senior** (Badge Oro).
Sotto l'avatar dell'utente è visibile una barra di riempimento dinamica che segnala il progresso verso il prossimo livello, motivandolo a completare la sua "collezione".

### Badge Contatori nella Navigazione
Così come accade nelle migliori applicazioni e-commerce, le icone della Wishlist e del Carrello sulla barra fissa in alto sono dotate di "Badge" (pallini rossi numerati). Se si aggiunge o si rimuove un film, questi numeretti aumentano o diminuiscono istantaneamente da soli, sia su computer desktop che all'interno del comodo menu a tendina laterale per gli smartphone.

## 4. La Logica dei Prezzi (Pricing Deterministico)
Affinché il finto "negozio" risulti assolutamente realistico, i prezzi dei film non possono cambiare in maniera casuale ad ogni aggiornamento della pagina. Dato che i server dei database cinematografici gratuiti non forniscono veri costi in Euro, il sito adotta un algoritmo matematico: prende il codice identificativo unico del film (il suo ID) e il suo anno di rilascio, e li sfrutta come coordinate base (o "seed") per calcolare un prezzo fisso.
In questo modo, un film vecchio costerà strutturalmente meno di una pellicola uscita l'anno scorso, e il prezzo di un preciso titolo di Batman sarà sempre identico ogni singola volta che il sito verrà consultato.
