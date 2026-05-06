import { useState, useEffect } from 'react';
import { searchMovies, discoverMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import FilterPanel from '../components/FilterPanel';
import { Loader2 } from 'lucide-react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    searchQuery: '',
    with_genres: '',
    sort_by: 'popularity.desc',
    primary_release_year: '',
    'vote_average.gte': '',
    with_original_language: ''
  });

  const fetchMovies = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    let results = [];
    
    if (filters.searchQuery.trim() !== '') {
      results = await searchMovies(filters.searchQuery, pageNum);
    } else {
      results = await discoverMovies(filters, pageNum);
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
  }, [filters]);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-red-500 uppercase tracking-tight">
          Esplora Film
        </h1>
      </div>

      <FilterPanel filters={filters} onFilterChange={setFilters} />

      
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
