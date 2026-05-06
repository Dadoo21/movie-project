import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, cartTotalPrice, cartTotalItems, clearCartAndCheckout } = useCart();
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    clearCartAndCheckout();
    setIsCheckoutMode(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="bg-gray-900 p-10 rounded-2xl border border-gray-800 shadow-2xl max-w-lg mx-auto mt-10">
          <CheckCircle className="w-24 h-24 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-extrabold text-light mb-4">Acquisto Confermato!</h2>
          <p className="text-gray-400 mb-8 text-lg">
            Grazie per il tuo ordine! I film sono stati aggiunti alla tua libreria e rimossi dalla lista desideri (se vi erano presenti). Buona visione!
          </p>
          <Link to="/" className="bg-primary hover:bg-red-700 text-white px-8 py-3 rounded-full font-bold transition-colors inline-block">
            Torna alla Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
        <ShoppingCart className="text-primary w-8 h-8" /> 
        Il Tuo Carrello
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800 shadow-lg">
          <ShoppingCart className="w-20 h-20 text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Il carrello è vuoto</h2>
          <p className="text-gray-400 mb-6">Non hai ancora aggiunto nessun film al carrello.</p>
          <Link to="/" className="bg-primary hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold transition-colors inline-block">
            Inizia a Esplorare
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => (
              <CartItem key={`${item.id}-${item.type}`} item={item} />
            ))}
          </div>

          
          <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-xl h-fit sticky top-24">
            <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-4">Riepilogo Ordine</h2>
            
            <div className="flex justify-between mb-4 text-gray-300">
              <span>Articoli Totali:</span>
              <span className="font-bold">{cartTotalItems}</span>
            </div>
            
            <div className="flex justify-between mb-6 text-xl">
              <span className="font-bold">Totale:</span>
              <span className="text-primary font-extrabold">€{cartTotalPrice.toFixed(2)}</span>
            </div>
            
            {!isCheckoutMode ? (
              <>
                <button 
                  onClick={() => setIsCheckoutMode(true)}
                  className="w-full bg-primary hover:bg-red-700 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
                >
                  <CreditCard className="w-5 h-5" />
                  Procedi al Pagamento
                </button>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Questo è un progetto didattico, non verrà addebitato alcun costo.
                </p>
              </>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-fade-in mt-4 border-t border-gray-700 pt-4">
                <h3 className="font-bold text-lg mb-3 text-light">Dati Pagamento (Test)</h3>
                <input 
                  type="text" required placeholder="Nome sulla carta" 
                  className="w-full bg-darker border border-gray-700 rounded p-3 text-sm text-light focus:border-primary focus:outline-none"
                />
                <input 
                  type="text" required placeholder="Numero Carta (es. 1234567812345678)" 
                  pattern="\d{16}" title="Inserisci 16 numeri"
                  className="w-full bg-darker border border-gray-700 rounded p-3 text-sm text-light focus:border-primary focus:outline-none"
                />
                <div className="flex gap-3">
                  <input 
                    type="text" required placeholder="Scadenza MM/YY" 
                    pattern="(0[1-9]|1[0-2])\/\d{2}" title="Formato MM/YY (es. 12/25)"
                    className="w-1/2 bg-darker border border-gray-700 rounded p-3 text-sm text-light focus:border-primary focus:outline-none"
                  />
                  <input 
                    type="text" required placeholder="CVV" 
                    pattern="\d{3,4}" title="3 o 4 cifre"
                    className="w-1/2 bg-darker border border-gray-700 rounded p-3 text-sm text-light focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <button 
                    type="button" onClick={() => setIsCheckoutMode(false)}
                    className="w-1/3 bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold transition-colors text-sm"
                  >
                    Annulla
                  </button>
                  <button 
                    type="submit" 
                    className="w-2/3 bg-green-600 hover:bg-green-500 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-green-500/30"
                  >
                    Conferma Ordine
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;
