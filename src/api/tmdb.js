

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const fetchTMDB = async (endpoint, params = {}) => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'it-IT', // Risultati in italiano
    include_adult: false,
    ...params,
  });

  try {
    const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
    if (!response.ok) {
      throw new Error('Errore nella richiesta a TMDB');
    }
    const data = await response.json();

    if (data.results) {
      return data.results.filter(movie => !movie.adult);
    }
    return data; // Ritorna l'oggetto intero se non c'è .results (es. nei dettagli del film)
  } catch (error) {
    console.error("Errore TMDB API:", error);
    return null;
  }
};

export const getPopularMovies = (page = 1) => {
  return fetchTMDB('/movie/popular', { page });
};

export const searchMovies = (query, page = 1) => {
  return fetchTMDB('/search/movie', { query, page });
};

export const getMoviesByGenre = (genreId, page = 1) => {
  return fetchTMDB('/discover/movie', { with_genres: genreId, page });
};

export const getTopRatedMovies = (page = 1) => {
  return fetchTMDB('/movie/top_rated', { page });
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getMovieDetails = async (movieId) => {
  const queryParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'it-IT',
    append_to_response: 'credits' // Per ottenere cast e registi in una singola chiamata
  });
  
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?${queryParams}`);
    if (!response.ok) throw new Error('Errore nel recupero dettagli film');
    return await response.json();
  } catch (error) {
    console.error("Errore Dettagli:", error);
    return null;
  }
};
