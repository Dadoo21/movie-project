import { useState, useEffect } from 'react';
import { searchMovies, discoverMovies } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import FilterPanel from '../components/FilterPanel';
import { Loader2, Tag } from 'lucide-react';
import { getMoviePricing } from '../utils/pricing';

const Offers = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    searchQuery: '',
    with_genres: '',
    sort_by: 'popularity.desc',
    primary_release_year: '',
    'vote_average.gte': '',
    with_original_language: ''
  });

  const fetchOffers = async (pageNum = 1) => {
    if (pageNum === 1) setLoading(true);
    else setLoadingMore(true);

    let results = [];

    if (filters.searchQuery.trim() !== '') {
      results = await searchMovies(filters.searchQuery, pageNum);
    } else {
      // Nelle offerte, forziamo sempre un minimo di 7.5 anche se l'utente non lo seleziona
      const userMinVote = filters['vote_average.gte'] ? parseFloat(filters['vote_average.gte']) : 7.5;
      const minVote = Math.max(7.5, userMinVote);
      
      results = await discoverMovies({ ...filters, 'vote_average.gte': minVote }, pageNum);
    }

    const discounted = results.filter(m => getMoviePricing(m).isDiscounted);
    
    if (pageNum === 1) {
      setMovies(discounted);
    } else {
      setMovies(prev => {

        const existingIds = new Set(prev.map(m => m.id));
        const newMovies = discounted.filter(m => !existingIds.has(m.id));
        return [...prev, ...newMovies];
      });
    }
    
    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    setPage(1);
    const delayDebounceFn = setTimeout(() => {
      fetchOffers(1);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters]);

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    await fetchOffers(nextPage);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
        <div className="flex items-center gap-4">
          <Tag className="w-10 h-10 text-yellow-500" />
          <h1 className="text-3xl md:text-5xl font-extrabold text-light uppercase tracking-tight">
            Offerte Speciali
          </h1>
        </div>
      </div>
      
      <p className="text-gray-400 mb-8 max-w-2xl text-lg">
        Tutti i film acclamati dalla critica (voto superiore a 7.5) sono ora disponibili con fantastici sconti fino al 40% sul prezzo di acquisto. Approfittane subito!
      </p>

      <FilterPanel filters={filters} onFilterChange={setFilters} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      ) : movies.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p className="text-xl">Nessuna offerta trovata. Prova a cambiare i filtri oppure premi 'Carica Altri'.</p>
          <button 
              onClick={loadMore}
              disabled={loadingMore}
              className="mt-6 bg-gray-800 hover:bg-gray-700 text-light px-8 py-3 rounded-full font-bold transition-colors border border-gray-700 shadow-lg inline-flex items-center gap-2 disabled:opacity-50"
            >
              Cerca Altre Offerte <Loader2 className={`w-4 h-4 ${loadingMore ? 'animate-spin' : 'hidden'}`} />
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button 
              onClick={loadMore}
              disabled={loadingMore}
              className="bg-gray-800 hover:bg-gray-700 text-light px-8 py-3 rounded-full font-bold transition-colors border border-gray-700 shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              Carica Altri <Loader2 className={`w-4 h-4 ${loadingMore ? 'animate-spin' : 'hidden'}`} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Offers;
