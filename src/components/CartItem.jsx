import { getImageUrl } from '../api/tmdb';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-gray-900 p-4 rounded-lg shadow-md border border-gray-800">
      
      
      <img 
        src={getImageUrl(item.poster_path, 'w200')} 
        alt={item.title} 
        className="w-24 h-36 object-cover rounded shadow-md"
      />
      
      
      <div className="flex-grow text-center sm:text-left flex flex-col justify-between h-full py-2">
        <div>
          <h3 className="text-xl font-bold text-light">{item.title}</h3>
          <p className="text-sm text-gray-400 capitalize mt-1">Tipo: <span className="text-light">{item.type}</span></p>
        </div>
        
        
        <p className="text-primary font-bold text-lg mt-2 sm:mt-0">€{item.price.toFixed(2)}</p>
      </div>

      
      <div className="flex sm:flex-col items-center gap-4 sm:gap-2 justify-between">
        
        
        <div className="flex items-center gap-3 bg-darker p-1 rounded-full">
          <button 
            onClick={() => updateQuantity(item.id, item.type, -1)}
            className="p-1 rounded-full hover:bg-gray-700 text-light transition-colors"
            title="Riduci quantità"
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
          
          <button 
            onClick={() => updateQuantity(item.id, item.type, 1)}
            className="p-1 rounded-full hover:bg-gray-700 text-light transition-colors"
            title="Aumenta quantità"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        
        <button 
          onClick={() => removeFromCart(item.id, item.type)}
          className="text-gray-400 hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors p-2"
          title="Rimuovi dal carrello"
        >
          <Trash2 className="w-5 h-5" />
          <span className="sm:hidden">Rimuovi</span>
        </button>

      </div>
    </div>
  );
};

export default CartItem;
