import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Routing.css'
import Home from '../Page/Home'
import LoginPage from '../Page/LoginPage'
import DashboardPage from '../Page/DashboardPage'
import { ProtectedRoute } from '../components/ProtectedRoute'

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}