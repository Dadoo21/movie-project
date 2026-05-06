import { useCart } from '../context/CartContext';
import MovieCard from '../components/MovieCard';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <Heart className="text-primary w-8 h-8 fill-primary" /> 
        La Tua Wishlist
      </h1>

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
