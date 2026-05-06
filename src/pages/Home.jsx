import { useState, useEffect } from 'react';
import { getPopularMovies, searchMovies, getMoviesByGenre } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { Search, Loader2 } from 'lucide-react';

const GENRES = [
  { id: '', name: 'Tutti i Generi' },
  { id: 28, name: 'Azione' },
  { id: 35, name: 'Commedia' },
  { id: 18, name: 'Dramma' },
  { id: 27, name: 'Horror' },
  { id: 878, name: 'Fantascienza' }
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [page, setPage] = useState(1);

  const fetchMovies = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    let results = [];
    
    if (searchQuery.trim() !== '') {

      results = await searchMovies(searchQuery, pageNum);
    } else if (selectedGenre !== '') {

      results = await getMoviesByGenre(selectedGenre, pageNum);
    } else {

      results = await getPopularMovies(pageNum);
    }
    
    if (pageNum === 1) {
      setMovies(results);
    } else {

      setMovies(prev => [...prev, ...results]);
    }
    
    setLoading(false);
  };

  useEffect(() => {
    setPage(1); // Resetta la pagina quando cambiano i filtri

    const delayDebounceFn = setTimeout(() => {
      fetchMovies(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, selectedGenre]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500 uppercase tracking-tight">
          Esplora Film
        </h1>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          
          <div className="relative w-full sm:w-64">
            <input 
              type="text" 
              placeholder="Cerca un film..." 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedGenre(''); // Resetta il genere se si cerca per testo
              }}
              className="w-full bg-gray-900 border border-gray-700 text-light px-4 py-2 pl-10 rounded-full focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-inner"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          
          <select
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setSearchQuery(''); // Resetta la ricerca se si filtra per genere
            }}
            className="w-full sm:w-48 bg-gray-900 border border-gray-700 text-light px-4 py-2 rounded-full focus:outline-none focus:border-primary transition-all cursor-pointer appearance-none"
          >
            {GENRES.map(g => (
              <option key={g.id} value={g.id}>{g.name}</option>
            ))}
          </select>
        </div>
      </div>

      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">Nessun film trovato. Riprova con termini diversi.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          
          {movies.length > 0 && (
            <div className="flex justify-center mt-10">
              <button 
                onClick={loadMore}
                className="bg-gray-800 hover:bg-gray-700 text-light px-8 py-3 rounded-full font-bold transition-colors border border-gray-700 shadow-lg flex items-center gap-2"
              >
                Carica Altri <Loader2 className={`w-4 h-4 ${loading ? 'animate-spin' : 'hidden'}`} />
              </button>
            </div>
          )}
        </>
      )}

    </div>
  );
};

export default Home;
