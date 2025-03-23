import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Routing.css';
import Home from '../Page/Home';
import ConnexionPage from '../Page/ConnexionPage';
import DashboardPage from '../Page/DashboardPage'; // Assurez-vous d'avoir une page de tableau de bord
import ProtectedRoute from '../Components/ProtectedRoute';
import { AuthProvider } from '../Services/authContext';

export default function Routing() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/connect" element={<ConnexionPage />} />
          <Route path="/dashboard/*" element={<ProtectedRoute element={<DashboardPage />} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}