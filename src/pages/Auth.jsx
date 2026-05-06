import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogIn, UserPlus } from 'lucide-react';
import toast from 'react-hot-toast';

const Auth = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true); // Toggle tra Login e Register
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  
  const { login, register, setGuestMode } = useAuth();
  const navigate = useNavigate(); // Per reindirizzare l'utente dopo il successo
  
  const message = location.state?.message;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        login(formData.email, formData.password);
        toast.success('Bentornato!');
        navigate('/profile');
      } else {
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
          throw new Error('Tutti i campi sono obbligatori');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Le password non coincidono');
        }

        const { confirmPassword, ...userData } = formData;
        register(userData);
        toast.success('Account creato con successo!');
        navigate('/profile');
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-md">
        
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-darker mb-4 border border-gray-700">
            {isLogin ? <LogIn className="w-8 h-8 text-primary" /> : <UserPlus className="w-8 h-8 text-primary" />}
          </div>
          <h2 className="text-3xl font-extrabold text-light">{isLogin ? 'Bentornato!' : 'Crea Account'}</h2>
          <p className="text-gray-400 mt-2">
            {isLogin ? 'Accedi per continuare' : 'Registrati per iniziare a noleggiare'}
          </p>
        </div>

        
        {message && !error && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 text-yellow-500 p-3 rounded-lg mb-6 text-sm text-center">
            {message}
          </div>
        )}
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Nome Completo</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange}
                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="Mario Rossi"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              required
              className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="mario@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange}
              required
              className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Conferma Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange}
                required={!isLogin}
                className="w-full bg-darker border border-gray-700 rounded-lg px-4 py-3 text-light focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/30 mt-4"
          >
            {isLogin ? 'Accedi' : 'Registrati'}
          </button>

          <button 
            type="button" 
            onClick={() => {
              setGuestMode();
              navigate('/');
            }}
            className="w-full bg-transparent hover:bg-gray-800 text-gray-300 font-bold py-3 rounded-lg transition-all border border-gray-700 mt-2"
          >
            Continua senza accedere
          </button>
        </form>

        
        <div className="mt-6 text-center text-sm text-gray-400">
          {isLogin ? "Non hai un account? " : "Hai già un account? "}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setError(''); // Pulisce errori precedenti cambiando form
            }} 
            className="text-primary hover:underline font-bold focus:outline-none"
          >
            {isLogin ? 'Registrati ora' : 'Accedi'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Auth;
