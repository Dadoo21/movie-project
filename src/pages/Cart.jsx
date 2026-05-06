import { useState } from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { ShoppingCart, CreditCard, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, cartTotalPrice, cartTotalItems, clearCartAndCheckout, clearCart } = useCart();
  const [isCheckoutMode, setIsCheckoutMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [expiry, setExpiry] = useState('');

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/\D/g, ''); 
    if (val.length >= 3) {
      val = val.slice(0, 2) + '/' + val.slice(2, 4);
    }
    setExpiry(val);
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    clearCartAndCheckout();
    setIsCheckoutMode(false);
    setExpiry('');
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingCart className="text-primary w-8 h-8" /> 
          Il Tuo Carrello
        </h1>
        {cart.length > 0 && (
          <button 
            onClick={clearCart}
            className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 px-5 py-2.5 rounded-xl transition-all font-bold shadow-sm hover:shadow-red-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            Svuota Carrello
          </button>
        )}
      </div>

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
              <form onSubmit={handleCheckoutSubmit} autoComplete="off" className="space-y-4 animate-fade-in mt-4 border-t border-gray-700 pt-4">
                <h3 className="font-bold text-lg mb-3 text-light">Dati Pagamento (Test)</h3>
                <input 
                  type="text" name="dummy_field_a" required minLength="3" placeholder="Nome Intestatario" autoComplete="new-password"
                  className="w-full bg-darker border border-gray-700 rounded p-3 text-sm text-light outline-none transition-colors focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 valid:border-green-500 valid:ring-1 valid:ring-green-500"
                />
                <input 
                  type="text" name="dummy_field_b" required placeholder="Codice a 16 cifre (es. 1234567812345678)" 
                  pattern="\d{16}" title="Inserisci 16 numeri" autoComplete="new-password"
                  className="w-full bg-darker border border-gray-700 rounded p-3 text-sm text-light outline-none transition-colors focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 valid:border-green-500 valid:ring-1 valid:ring-green-500"
                />
                <div className="flex gap-3">
                  <input 
                    type="text" name="dummy_field_c" required placeholder="Mese / Anno (MM/YY)" 
                    value={expiry} onChange={handleExpiryChange} maxLength="5"
                    pattern="(0[1-9]|1[0-2])\/\d{2}" title="Formato MM/YY (es. 12/25)" autoComplete="new-password"
                    className="w-1/2 bg-darker border border-gray-700 rounded p-3 text-sm text-light outline-none transition-colors focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 valid:border-green-500 valid:ring-1 valid:ring-green-500"
                  />
                  <input 
                    type="text" name="dummy_field_d" required placeholder="Cod. Sicurezza" 
                    pattern="\d{3,4}" title="3 o 4 cifre" autoComplete="new-password"
                    className="w-1/2 bg-darker border border-gray-700 rounded p-3 text-sm text-light outline-none transition-colors focus:invalid:border-red-500 focus:invalid:ring-1 focus:invalid:ring-red-500 valid:border-green-500 valid:ring-1 valid:ring-green-500"
                  />
                </div>
                <div className="flex gap-3 pt-3">
                  <button 
                    type="button" onClick={() => { setIsCheckoutMode(false); setExpiry(''); }}
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
