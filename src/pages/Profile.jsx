import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, Clock, Trash2, Package, Award } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const { orderHistory, clearOrderHistory } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); 
  };

  if (!user) return null; 

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
  };

  // --- LOGICA GAMIFICATION ---
  const getTotalMovies = () => {
    return orderHistory.reduce((acc, order) => {
      return acc + order.items.reduce((sum, item) => sum + item.quantity, 0);
    }, 0);
  };

  const totalMovies = getTotalMovies();

  const getLevelInfo = (count) => {
    if (count <= 5) {
      return {
        title: 'Novizio',
        colorClass: 'text-amber-600', // Bronzo
        bgClass: 'bg-amber-600/10',
        borderClass: 'border-amber-600/30',
        barClass: 'bg-gradient-to-r from-amber-800 to-amber-500',
        nextLevel: 6,
        nextTitle: 'Appassionato',
        nextTitleColor: 'text-slate-400',
        progress: (count / 6) * 100
      };
    } else if (count <= 15) {
      return {
        title: 'Appassionato',
        colorClass: 'text-slate-400', // Argento
        bgClass: 'bg-slate-400/10',
        borderClass: 'border-slate-400/30',
        barClass: 'bg-gradient-to-r from-slate-600 to-slate-300',
        nextLevel: 16,
        nextTitle: 'Cinefilo Senior',
        nextTitleColor: 'text-yellow-400',
        progress: (count / 16) * 100
      };
    } else {
      return {
        title: 'Cinefilo Senior',
        colorClass: 'text-yellow-400', // Oro
        bgClass: 'bg-yellow-400/10',
        borderClass: 'border-yellow-400/30',
        barClass: 'bg-gradient-to-r from-yellow-600 to-yellow-300',
        nextLevel: null,
        nextTitle: null,
        progress: 100
      };
    }
  };

  const levelInfo = getLevelInfo(totalMovies);
  // ---------------------------

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Intestazione Profilo & Livello */}
      <div className="bg-dark-lighter rounded-3xl shadow-2xl border border-white/5 overflow-hidden mb-8">
        <div className="h-32 bg-gradient-to-r from-gray-900 to-primary/30 relative"></div>
        
        <div className="px-8 pb-8 relative">
          
          <div className="absolute -top-16 left-8 bg-darker p-2 rounded-full border border-white/10 shadow-xl">
            <div className="bg-gray-800 w-28 h-28 rounded-full flex items-center justify-center relative overflow-hidden">
              <User className="w-12 h-12 text-primary" />
              {/* Badge indicatore sopra l'avatar */}
              <div className={`absolute bottom-0 w-full h-4 ${levelInfo.barClass} opacity-80`}></div>
            </div>
          </div>

          <div className="pt-16 sm:pt-4 sm:ml-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-extrabold text-light capitalize">{user.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30 px-5 py-2.5 rounded-xl font-bold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Esci
            </button>
          </div>

          {/* Sezione Gamification */}
          <div className="mt-10 border-t border-white/5 pt-8 animate-fade-in">
             <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-5">
               <div className={`p-4 rounded-2xl border shadow-inner ${levelInfo.bgClass} ${levelInfo.borderClass}`}>
                 <Award className={`w-10 h-10 ${levelInfo.colorClass}`} />
               </div>
               
               <div>
                 <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mb-1">Status Profilo</p>
                 <h2 className={`text-3xl font-extrabold ${levelInfo.colorClass} drop-shadow-md`}>{levelInfo.title}</h2>
               </div>

               <div className="mt-4 sm:mt-0 sm:ml-auto bg-darker px-6 py-3 rounded-2xl border border-white/5 text-center shadow-inner">
                 <p className="text-4xl font-black text-light leading-none">{totalMovies}</p>
                 <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Film Totali</p>
               </div>
             </div>

             {/* Progress Bar Gamification */}
             <div className="bg-darker rounded-full h-4 w-full overflow-hidden border border-white/5 relative shadow-inner">
               <div 
                 className={`h-full rounded-full transition-all duration-1000 ease-out ${levelInfo.barClass}`} 
                 style={{ width: `${levelInfo.progress}%` }} 
               ></div>
             </div>
             
             {/* Messaggio Livello Successivo */}
             <div className="mt-4 text-center sm:text-left">
               {levelInfo.nextLevel ? (
                 <p className="text-sm text-gray-400 font-medium bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/5">
                   Ti mancano <span className="font-extrabold text-light">{levelInfo.nextLevel - totalMovies} film</span> per diventare <span className={`font-extrabold ${levelInfo.nextTitleColor}`}>{levelInfo.nextTitle}</span>!
                 </p>
               ) : (
                 <p className="text-sm text-yellow-400 font-bold bg-yellow-400/10 inline-block px-4 py-2 rounded-lg border border-yellow-400/20 shadow-glow">
                   Hai raggiunto il livello massimo! Sei una vera leggenda del cinema. 🏆
                 </p>
               )}
             </div>
          </div>

        </div>
      </div>

      {/* Cronologia Acquisti */}
      <div className="bg-dark-lighter rounded-3xl shadow-2xl border border-white/5 p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <Clock className="w-6 h-6 text-primary" /> Cronologia Acquisti
          </h2>
          {orderHistory.length > 0 && (
            <button 
              onClick={clearOrderHistory}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 hover:bg-red-500/10 px-4 py-2 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
            >
              <Trash2 className="w-4 h-4" /> Svuota
            </button>
          )}
        </div>

        {orderHistory.length === 0 ? (
          <div className="bg-darker p-10 rounded-2xl border border-white/5 text-center">
            <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Non hai ancora effettuato nessun acquisto o noleggio.</p>
            <p className="text-sm text-gray-500 mt-2">I film che compri verranno salvati in questa sezione e faranno salire il tuo livello!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orderHistory.map(order => (
              <div key={order.id} className="bg-darker p-6 rounded-2xl border border-white/5 shadow-inner hover:border-white/10 transition-colors">
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Ordine effettuato il {formatDate(order.date)}</p>
                    <p className="text-xs text-gray-600 mt-1 font-mono">ID Ordine: #{order.id}</p>
                  </div>
                  <div className="text-2xl font-extrabold text-primary">
                    €{order.total.toFixed(2)}
                  </div>
                </div>
                
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-500 font-bold bg-white/5 w-6 h-6 flex items-center justify-center rounded-md">{item.quantity}x</span>
                        <span className="font-bold text-light">{item.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold ${item.type === 'acquisto' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-400'}`}>
                          {item.type}
                        </span>
                      </div>
                      <span className="text-gray-400 font-medium">€{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
