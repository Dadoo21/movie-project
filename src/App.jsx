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
