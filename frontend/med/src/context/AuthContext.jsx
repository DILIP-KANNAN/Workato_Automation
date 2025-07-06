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

  // 🚀 STAFF LOGIN
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

  // 🚀 PATIENT: Request OTP for login or registration
  const requestOtp = async (mobile) => {
    try {
      const { data } = await API.post('/patient/generate-otp', { mobile });
      return { success: true, message: data.message, otp: data.otp }; // remove `otp` in production
    } catch (error) {
      console.error(error);
      return { success: false, error: error.response?.data?.message || 'OTP generation failed' };
    }
  };

  // 🚀 PATIENT REGISTRATION (requires OTP)
  const registerPatient = async (patientData) => {
    try {
        const { data } = await API.post('/patient/register', patientData);
        localStorage.setItem('hospitalToken', data.token);
        localStorage.setItem('hospitalUser', JSON.stringify(data.user));
        setUser(data.user);
        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.response?.data?.message || 'Patient registration failed' };
    }
  };

  const verifyotp = async (mobile, otp) => {
    try {
      const { data } = await API.post('/patient/verify-otp', { mobile, otp });
      return { success: true, message: data.message };
    } catch (error) {
      console.error(error);
      return { success: false, error: error.response?.data?.message || 'OTP verification failed' };
    }
  };

  // 🚀 PATIENT LOGIN (requires OTP)
  const loginPatient = async (mobile, otp) => {
    try {
      const { data } = await API.post('/patient/login', { mobile, otp });
      localStorage.setItem('hospitalToken', data.token);
      localStorage.setItem('hospitalUser', JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
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
    requestOtp,
    verifyotp,
    registerPatient,
    loginPatient,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
