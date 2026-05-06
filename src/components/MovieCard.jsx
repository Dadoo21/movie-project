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
    <div className="bg-dark-lighter rounded-2xl overflow-hidden border border-white/5 group relative flex flex-col h-full transform transition-all duration-500 hover:-translate-y-2 hover:shadow-glow">
      
      
      {isDiscounted && (
        <div className="absolute top-2 left-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded z-10 shadow-md transform -rotate-2">
          SCONTO {discountPercentage}%
        </div>
      )}

      
      <button 
        onClick={() => executeAuthAction(() => toggleWishlist(movie), 'Devi accedere per aggiungere i film ai preferiti.')}
        className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-primary transition-colors z-20 backdrop-blur-md border border-white/10"
        title="Aggiungi/Rimuovi Wishlist"
      >
        <Heart className={`h-5 w-5 ${inWishlist ? 'fill-primary text-primary' : 'text-white'}`} />
      </button>

      
      <div className="relative aspect-[2/3] overflow-hidden">
        <img 
          src={getImageUrl(movie.poster_path)} 
          alt={movie.title} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-lighter via-dark-lighter/20 to-transparent opacity-90 pointer-events-none" />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center items-center gap-3 p-4">
          
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 w-full bg-light hover:bg-white text-black py-2.5 rounded-xl font-bold transition-transform hover:scale-105"
          >
            <Info className="w-4 h-4" /> Dettagli
          </button>
          
          <button 
            onClick={() => executeAuthAction(() => addToCart(movie, 'acquisto'), 'Devi accedere per acquistare un film.')}
            className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-primary-hover text-white py-2.5 rounded-xl font-bold transition-transform hover:scale-105 shadow-glow"
          >
            <ShoppingBag className="w-4 h-4" /> Acquista
          </button>
          <button 
            onClick={() => executeAuthAction(() => addToCart(movie, 'noleggio'), 'Devi accedere per noleggiare un film.')}
            className="flex items-center justify-center gap-2 w-full bg-dark hover:bg-gray-800 text-white py-2.5 rounded-xl font-bold transition-colors border border-white/10 text-sm"
          >
            {isDiscounted ? (
              <>Noleggia a <span className="line-through text-gray-400 text-xs mx-1">€{rentPrice.toFixed(2)}</span> €{finalRentPrice.toFixed(2)}</>
            ) : (
              `Noleggia a €${rentPrice.toFixed(2)}`
            )}
          </button>
        </div>
      </div>

      
      <div className="p-5 flex-grow flex flex-col justify-between relative z-10 bg-dark-lighter">
        <div>
          <h3 className="text-lg font-extrabold text-light line-clamp-1 mb-1 group-hover:text-primary transition-colors">{movie.title}</h3>
          <p className="text-sm text-gray-400 mb-4">{new Date(movie.release_date).getFullYear() || 'N/A'}</p>
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
