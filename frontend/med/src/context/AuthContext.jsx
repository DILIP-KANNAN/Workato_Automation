import { createContext, useContext, useState, useEffect } from 'react';
import API from '../api/axios'; // your configured Axios instance

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('hospitalUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // 🚀 Staff login
  const loginStaff = async (staffId, password) => {
    try {
      const { data } = await API.post('/staff/login', { staffId, password });
      localStorage.setItem('hospitalToken', data.token);
      localStorage.setItem('hospitalUser', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.response?.data?.message || 'Staff login failed' };
    }
  };

  // 🚀 Patient registration
  const registerPatient = async (patientData) => {
    try {
      const { data } = await API.post('/patient/register', patientData);
      return { success: true, patientId: data.patient.patientId };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.response?.data?.message || 'Patient registration failed' };
    }
  };

  // 🚀 Patient login: request OTP and verify OTP
  const loginPatient = async (patientId, mobile, otp = null) => {
    try {
      if (!otp) {
        // Request OTP
        const { data } = await API.post('/patient/login', { patientId, mobile });
        return { success: true, otpSent: true, message: data.message };
      } else {
        // Verify OTP
        const { data } = await API.post('/patient/verify-otp', { patientId, otp });
        localStorage.setItem('hospitalToken', data.token);
        localStorage.setItem('hospitalUser', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: error.response?.data?.message || 'Patient login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('hospitalToken');
    localStorage.removeItem('hospitalUser');
    setUser(null);
  };

  const value = {
    user,
    loading,
    loginStaff,
    loginPatient,
    registerPatient,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
