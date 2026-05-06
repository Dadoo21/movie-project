import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getMovieDetails, getImageUrl } from '../api/tmdb';
import { X, Star, Clock, Globe, Loader2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuthAction } from '../context/AuthContext';
import { getMoviePricing } from '../utils/pricing';

const MovieModal = ({ movieId, isOpen, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const executeAuthAction = useAuthAction();

  useEffect(() => {
    if (isOpen && movieId) {
      const fetchDetails = async () => {
        setLoading(true);
        const data = await getMovieDetails(movieId);
        setDetails(data);
        setLoading(false);
      };
      fetchDetails();
    }
  }, [isOpen, movieId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.id === 'modal-overlay') onClose();
  };

  return createPortal(
    <div 
      id="modal-overlay"
      onClick={handleOverlayClick}
      className="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-4 backdrop-blur-sm"
    >
      <div className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative animate-fade-in flex flex-col md:flex-row">
        
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-darker p-2 rounded-full text-gray-400 hover:text-white hover:bg-primary z-10 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : details ? (
          <>
            
            <div className="w-full md:w-2/5 p-6 flex flex-col gap-4">
              <img 
                src={getImageUrl(details.poster_path, 'w500')} 
                alt={details.title}
                className="w-full rounded-xl shadow-lg border border-gray-800"
              />
              
              
              <div className="flex flex-col gap-3 mt-4">
                <button 
                  onClick={() => executeAuthAction(() => { addToCart(details, 'acquisto'); onClose(); }, 'Devi accedere per acquistare un film.')}
                  className="bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-5 h-5" /> 
                  Acquista a €{getMoviePricing(details).finalPurchasePrice.toFixed(2)}
                </button>
                <button 
                  onClick={() => executeAuthAction(() => { addToCart(details, 'noleggio'); onClose(); }, 'Devi accedere per noleggiare un film.')}
                  className="bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-lg font-bold transition-all border border-gray-600"
                >
                  {getMoviePricing(details).isDiscounted ? (
                    <>
                      Noleggia a <span className="line-through text-gray-400 text-sm mx-1">€{getMoviePricing(details).rentPrice.toFixed(2)}</span> €{getMoviePricing(details).finalRentPrice.toFixed(2)}
                    </>
                  ) : (
                    `Noleggia a €${getMoviePricing(details).rentPrice.toFixed(2)}`
                  )}
                </button>
              </div>
            </div>

            
            <div className="w-full md:w-3/5 p-6 md:pl-0 flex flex-col justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-light mb-2">{details.title}</h2>
                <p className="text-gray-400 italic mb-4">{details.tagline}</p>
                
                
                <div className="flex flex-wrap items-center gap-4 text-sm font-medium mb-6">
                  <span className="bg-gray-800 px-3 py-1 rounded-full text-light">
                    {new Date(details.release_date).getFullYear()}
                  </span>
                  <span className="flex items-center gap-1 text-gray-300">
                    <Clock className="w-4 h-4" /> {details.runtime} min
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500 font-bold bg-yellow-500/10 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 fill-yellow-500" /> {details.vote_average.toFixed(1)} / 10
                  </span>
                </div>

                
                <div className="flex flex-wrap gap-2 mb-6">
                  {details.genres?.map(g => (
                    <span key={g.id} className="text-xs font-bold uppercase tracking-wider border border-primary text-primary px-2 py-1 rounded">
                      {g.name}
                    </span>
                  ))}
                </div>

                
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Trama</h3>
                  <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {details.overview || "Nessuna trama disponibile per questo film."}
                  </p>
                </div>

                
                <div className="space-y-3 mb-6 bg-darker p-4 rounded-xl border border-gray-800">
                  <div>
                    <span className="font-bold text-gray-400">Regia: </span>
                    <span className="text-light">
                      {details.credits?.crew?.find(c => c.job === 'Director')?.name || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-400">Cast Principale: </span>
                    <span className="text-light">
                      {details.credits?.cast?.slice(0, 5).map(a => a.name).join(', ') || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-400"><Globe className="w-4 h-4 inline" /> Lingue: </span>
                    <span className="text-light">
                      {details.spoken_languages?.map(l => l.name).join(', ') || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="w-full p-10 text-center text-red-500">Errore nel caricamento dei dati</div>
        )}

      </div>
    </div>,
    document.body
  );
};

export default MovieModal;
