import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Offers from './pages/Offers';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist'; // Added wishlist page import
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {

    return <Navigate to="/auth" state={{ message: 'Devi accedere per visualizzare questa pagina.' }} replace />;
  }
  return children;
};

const RequireAuthOrGuest = ({ children }) => {
  const { user, isGuest } = useAuth();
  if (!user && !isGuest) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Toaster 
        position="top-center" 
        containerStyle={{
          top: 85, // Spinge i toast sotto la navbar
        }}
        toastOptions={{
          style: {
            background: '#1f2937', // bg-gray-800
            color: '#f8fafc',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <div className="flex flex-col min-h-screen bg-dark text-light">
        
        <Navbar />
        
        
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<RequireAuthOrGuest><Home /></RequireAuthOrGuest>} />
            <Route path="/offers" element={<RequireAuthOrGuest><Offers /></RequireAuthOrGuest>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
            <Route path="/auth" element={<Auth />} />
            
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>

        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
