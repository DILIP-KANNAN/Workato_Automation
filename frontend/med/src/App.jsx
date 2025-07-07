import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login'
import PatientSignup from './components/PatientSignup'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Toaster position="bottom-right" reverseOrder={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<PatientSignup />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App