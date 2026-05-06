import { createContext, useState, useEffect, useContext } from 'react';
import { getMoviePricing } from '../utils/pricing';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  
  // Chiavi dinamiche basate sull'utente loggato. Se non c'è, usa 'guest'
  const cartKey = user ? `cart_${user.email}` : 'cart_guest';
  const wishlistKey = user ? `wishlist_${user.email}` : 'wishlist_guest';
  const orderHistoryKey = user ? `orderHistory_${user.email}` : 'orderHistory_guest';

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Caricamento dati: Viene eseguito al mount e ogni volta che cambia utente
  useEffect(() => {
    const savedCart = localStorage.getItem(cartKey);
    setCart(savedCart ? JSON.parse(savedCart) : []);

    const savedWishlist = localStorage.getItem(wishlistKey);
    setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);

    const savedOrderHistory = localStorage.getItem(orderHistoryKey);
    setOrderHistory(savedOrderHistory ? JSON.parse(savedOrderHistory) : []);
    
    setIsInitialized(true);
  }, [user, cartKey, wishlistKey, orderHistoryKey]);

  // 2. Salvataggi automatici (eseguiti solo se inizializzato, per non sovrascrivere al primo render)
  useEffect(() => {
    if (isInitialized) localStorage.setItem(cartKey, JSON.stringify(cart));
  }, [cart, cartKey, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  }, [wishlist, wishlistKey, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem(orderHistoryKey, JSON.stringify(orderHistory));
  }, [orderHistory, orderHistoryKey, isInitialized]);


  const addToCart = (movie, type = 'acquisto') => {
    const existing = cart.find(item => item.id === movie.id && item.type === type);
    
    if (existing) {
      toast('Quantità aggiornata!', { icon: '🛒', id: 'cart-update' });
      setCart((prev) => prev.map(item =>
        item.id === movie.id && item.type === type
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      toast('Film aggiunto al carrello!', { icon: '🛒', id: 'cart-add' });
      const { finalPurchasePrice, finalRentPrice } = getMoviePricing(movie);
      const price = type === 'acquisto' ? finalPurchasePrice : finalRentPrice;
      
      setCart((prev) => [...prev, { ...movie, quantity: 1, type, price }]);
    }
  };

  const removeFromCart = (id, type) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  const updateQuantity = (id, type, amount) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.type === type) {
        const newQuantity = item.quantity + amount;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const clearCartAndCheckout = () => {
    const cartMovieIds = new Set(cart.map(item => item.id));

    // Salva l'ordine nella cronologia
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cart],
      total: cartTotalPrice
    };
    
    setOrderHistory(prev => [newOrder, ...prev]);

    // Elimina i film acquistati dalla wishlist
    setWishlist(prev => prev.filter(item => !cartMovieIds.has(item.id)));

    // Svuota il carrello
    setCart([]);
    toast.success('Pagamento completato! Grazie per l\'acquisto 🎬');
  };

  const toggleWishlist = (movie) => {
    const exists = wishlist.find(item => item.id === movie.id);
    
    if (exists) {
      toast('Rimosso dai preferiti', { icon: '💔', id: 'wishlist-remove' });
      setWishlist(prev => prev.filter(item => item.id !== movie.id));
    } else {
      toast('Aggiunto ai preferiti!', { icon: '❤️', id: 'wishlist-add' });
      setWishlist(prev => [...prev, movie]);
    }
  };

  const clearCart = () => {
    setCart([]);
    toast('Carrello svuotato', { icon: '🗑️', id: 'cart-clear' });
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast('Lista desideri svuotata', { icon: '🗑️', id: 'wishlist-clear' });
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const clearOrderHistory = () => {
    setOrderHistory([]);
  };

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCartAndCheckout, clearCart, cartTotalItems, cartTotalPrice,
      wishlist, toggleWishlist, isInWishlist, clearWishlist,
      orderHistory, clearOrderHistory
    }}>
      {children}
    </CartContext.Provider>
  );
};
