
import { createContext, useState, useEffect, useContext } from 'react';
import { getMoviePricing } from '../utils/pricing';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (movie, type = 'acquisto') => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === movie.id && item.type === type);
      if (existing) {
        return prev.map(item =>
          item.id === movie.id && item.type === type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const { finalPurchasePrice, finalRentPrice } = getMoviePricing(movie);
      const price = type === 'acquisto' ? finalPurchasePrice : finalRentPrice;

      return [...prev, { ...movie, quantity: 1, type, price }];
    });
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

    setWishlist(prev => prev.filter(item => !cartMovieIds.has(item.id)));

    setCart([]);
  };

  const toggleWishlist = (movie) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === movie.id);
      if (exists) {
        return prev.filter(item => item.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const isInWishlist = (id) => wishlist.some(item => item.id === id);

  const cartTotalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCartAndCheckout, cartTotalItems, cartTotalPrice,
      wishlist, toggleWishlist, isInWishlist 
    }}>
      {children}
    </CartContext.Provider>
  );
};
