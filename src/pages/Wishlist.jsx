import { useCart } from '../context/CartContext';
import MovieCard from '../components/MovieCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, clearWishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Heart className="text-primary w-8 h-8 fill-primary" /> 
          La Tua Wishlist
        </h1>
        {wishlist.length > 0 && (
          <button 
            onClick={clearWishlist}
            className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-5 py-2.5 rounded-xl transition-all font-bold shadow-sm hover:shadow-red-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            Svuota Wishlist
          </button>
        )}
      </div>

      {wishlist.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
          <Heart className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Nessun film salvato</h2>
          <p className="text-gray-400 mb-6">Usa il cuoricino per salvare i film che vuoi guardare in futuro.</p>
          <Link to="/" className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors inline-block">
            Torna alla Home
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {wishlist.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
