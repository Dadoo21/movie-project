import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, Award } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/'); // Riporta alla home dopo il logout
  };

  if (!user) return null; 

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
        
        
        <div className="h-32 bg-gradient-to-r from-gray-800 to-primary/20 relative"></div>
        
        
        <div className="px-8 pb-8 relative">
          
          
          <div className="absolute -top-16 left-8 bg-darker p-2 rounded-full border border-gray-700 shadow-xl">
            <div className="bg-gray-800 w-28 h-28 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>

          
          <div className="pt-16 sm:pt-4 sm:ml-40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-light capitalize">{user.name}</h1>
              <div className="flex items-center gap-2 text-gray-400 mt-1">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
            </div>
            
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 px-5 py-2.5 rounded-lg font-bold transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Esci dall'Account
            </button>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" /> Il tuo Status
            </h2>
            <div className="bg-darker p-6 rounded-xl border border-gray-800">
              <p className="text-gray-300 leading-relaxed">
                Benvenuto nella tua area personale, <strong>{user.name}</strong>! Sei un membro ufficiale di MovieProject. 
                Continua ad esplorare il catalogo per aggiungere fantastici film alla tua Wishlist o procedi con i tuoi acquisti dal Carrello.
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Profile;
