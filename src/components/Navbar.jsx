import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User, Film } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartTotalItems, wishlist } = useCart();
  const { user } = useAuth();
  const location = useLocation();

  const chiudiMenu = () => setIsOpen(false);

  return (
    <nav className="fixed w-full z-50 top-0 backdrop-blur-xl bg-darker/80 border-b border-white/5 text-light transition-all duration-300 shadow-xl shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          
          <div className="flex items-center z-10">
            <Link to="/" className="flex items-center gap-2 group" onClick={chiudiMenu}>
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Film className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-extrabold text-xl tracking-widest uppercase text-light group-hover:text-primary transition-colors">
                Movie<span className="text-primary group-hover:text-light transition-colors">Project</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex absolute inset-0 justify-center items-center pointer-events-none">
            <div className="flex space-x-2 pointer-events-auto bg-darker/50 p-1.5 rounded-full border border-white/5 backdrop-blur-md shadow-lg shadow-black/20">
              <Link 
                to="/" 
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  location.pathname === '/' 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                Home
              </Link>
              <Link 
                to="/offers" 
                className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 ${
                  location.pathname === '/offers'
                    ? 'bg-primary text-white shadow-glow'
                    : 'text-primary/80 hover:text-white hover:bg-primary/20'
                }`}
              >
                Offerte
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 z-10">
            <Link to="/wishlist" className="relative p-2.5 rounded-full bg-dark-lighter hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/5 text-gray-300 hover:text-primary shadow-sm" title="Wishlist">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-glow ring-2 ring-darker">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            <Link to="/cart" className="relative p-2.5 rounded-full bg-dark-lighter hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/5 text-gray-300 hover:text-primary shadow-sm" title="Carrello">
              <ShoppingCart className="h-5 w-5" />
              {cartTotalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-glow ring-2 ring-darker">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            
            <Link to={user ? "/profile" : "/auth"} className="flex items-center gap-2 p-1.5 pr-4 rounded-full bg-dark-lighter hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/5 text-gray-300 hover:text-white shadow-sm" title="Profilo">
              <div className="bg-gray-800 p-1.5 rounded-full">
                <User className="h-4 w-4 text-gray-300" />
              </div>
              <span className="text-sm font-bold">{user ? user.name.split(' ')[0] : 'Accedi'}</span>
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-primary hover:bg-gray-800 focus:outline-none transition-colors text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      
      {isOpen && (
        <div className="md:hidden bg-darker/95 backdrop-blur-xl border-t border-white/5">
          <div className="px-3 pt-3 pb-4 space-y-2 sm:px-4 flex flex-col">
            <Link to="/" className={`block px-4 py-3 rounded-xl text-base font-medium transition-all ${location.pathname === '/' ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`} onClick={chiudiMenu}>Home</Link>
            <Link to="/offers" className={`block px-4 py-3 rounded-xl text-base font-bold transition-all ${location.pathname === '/offers' ? 'bg-primary/20 text-primary border border-primary/30' : 'text-primary/70 hover:bg-primary/10 hover:text-primary'}`} onClick={chiudiMenu}>Offerte</Link>
            <div className="h-px bg-white/10 my-2" />
            <Link to="/wishlist" className="flex justify-between items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-white/5 hover:text-primary transition-all" onClick={chiudiMenu}>
              <span className="flex items-center gap-3"><Heart className="w-5 h-5" /> Lista Desideri</span>
              {wishlist.length > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold shadow-glow">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link to="/cart" className="flex justify-between items-center px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-white/5 hover:text-primary transition-all" onClick={chiudiMenu}>
              <span className="flex items-center gap-3"><ShoppingCart className="w-5 h-5" /> Carrello</span>
              {cartTotalItems > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-bold shadow-glow">
                  {cartTotalItems}
                </span>
              )}
            </Link>
            <Link to={user ? "/profile" : "/auth"} className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-gray-300 hover:bg-white/5 hover:text-primary transition-all" onClick={chiudiMenu}>
              <User className="w-5 h-5" /> {user ? 'Il Mio Profilo' : 'Accedi / Registrati'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
