import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User, Film } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Stato per il menu mobile (hamburger)
  const { cartTotalItems } = useCart(); // Totale articoli nel carrello
  const { user } = useAuth(); // Per sapere se l'utente è loggato

  const chiudiMenu = () => setIsOpen(false);

  return (
    <nav className="bg-darker text-light fixed w-full z-50 top-0 shadow-lg shadow-black/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={chiudiMenu}>
              <Film className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl tracking-wider uppercase text-primary">MovieProject</span>
            </Link>
          </div>

          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6 text-sm font-medium">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <Link to="/offers" className="hover:text-primary transition-colors text-yellow-500">Offerte</Link>
            </div>
          </div>

          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/wishlist" className="hover:text-primary transition-colors" title="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
            
            <Link to="/cart" className="relative hover:text-primary transition-colors" title="Carrello">
              <ShoppingCart className="h-5 w-5" />
              
              {cartTotalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            
            <Link to={user ? "/profile" : "/auth"} className="hover:text-primary transition-colors" title="Profilo">
              <User className="h-5 w-5" />
            </Link>
          </div>

          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-primary hover:bg-gray-800 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-darker border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-primary" onClick={chiudiMenu}>Home</Link>
            <Link to="/offers" className="block px-3 py-2 rounded-md text-base font-medium text-yellow-500 hover:bg-gray-800 hover:text-primary" onClick={chiudiMenu}>Offerte</Link>
            <Link to="/wishlist" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-primary" onClick={chiudiMenu}>Wishlist</Link>
            <Link to="/cart" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-primary flex justify-between items-center" onClick={chiudiMenu}>
              Carrello
              {cartTotalItems > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            <Link to={user ? "/profile" : "/auth"} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-800 hover:text-primary" onClick={chiudiMenu}>
              {user ? 'Il Mio Profilo' : 'Login / Registrati'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
