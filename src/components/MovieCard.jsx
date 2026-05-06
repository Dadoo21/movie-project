import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Info } from 'lucide-react';
import { getImageUrl } from '../api/tmdb';
import { useCart } from '../context/CartContext';
import { useAuthAction } from '../context/AuthContext';
import MovieModal from './MovieModal';
import { getMoviePricing } from '../utils/pricing';

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false);
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const executeAuthAction = useAuthAction();
  
  const inWishlist = isInWishlist(movie.id);
  const { purchasePrice, rentPrice, finalRentPrice, isDiscounted, discountPercentage, finalPurchasePrice } = getMoviePricing(movie);

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg group relative flex flex-col h-full transform transition duration-300 hover:scale-105 hover:shadow-primary/50 hover:shadow-2xl">
      
      
      {isDiscounted && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-md transform -rotate-2">
          SCONTO {discountPercentage}%
        </div>
      )}

      
      <button 
        onClick={() => executeAuthAction(() => toggleWishlist(movie), 'Devi accedere per aggiungere i film ai preferiti.')}
        className="absolute top-2 right-2 p-2 rounded-full bg-black/50 hover:bg-primary/80 transition-colors z-10 backdrop-blur-sm"
        title="Aggiungi/Rimuovi Wishlist"
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-primary text-primary' : 'text-white'}`} />
      </button>

      
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          className="w-full h-full object-cover group-hover:opacity-80 transition-opacity duration-300"
          loading="lazy"
        />
        
        
        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center gap-3">
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-full font-bold transition-colors mb-2"
          >
            <Info className="w-4 h-4" /> Dettagli
          </button>
          
          <button 
            onClick={() => executeAuthAction(() => addToCart(movie, 'acquisto'), 'Devi accedere per acquistare un film.')}
            className="flex items-center gap-2 bg-primary hover:bg-red-700 text-white px-4 py-2 rounded-full font-semibold transition-colors"
          >
            <ShoppingBag className="w-4 h-4" /> Acquista
          </button>
          <button 
            onClick={() => executeAuthAction(() => addToCart(movie, 'noleggio'), 'Devi accedere per noleggiare un film.')}
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-full font-semibold transition-colors border border-gray-500 text-sm"
          >
            {isDiscounted ? (
              <>Noleggia a <span className="line-through text-gray-400 text-xs mx-1">€{rentPrice.toFixed(2)}</span> €{finalRentPrice.toFixed(2)}</>
            ) : (
              `Noleggia a €${rentPrice.toFixed(2)}`
            )}
          </button>
        </div>
      </div>

      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-light line-clamp-1 mb-1">{movie.title}</h3>
          <p className="text-sm text-gray-400 mb-3">{new Date(movie.release_date).getFullYear() || 'N/A'}</p>
        </div>
        
        <div className="flex justify-between items-center mt-auto">
          
          <div className="flex items-center gap-1 text-yellow-500 font-bold">
            <Star className="h-4 w-4 fill-yellow-500" />
            <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</span>
          </div>
          
          
          <div className="text-right">
            {isDiscounted ? (
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-400 line-through">€{purchasePrice.toFixed(2)}</span>
                <span className="text-primary font-bold text-lg">€{finalPurchasePrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-light font-bold text-lg">€{purchasePrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
      
      
      <MovieModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        movieId={movie.id} 
      />
    </div>
  );
};

export default MovieCard;
