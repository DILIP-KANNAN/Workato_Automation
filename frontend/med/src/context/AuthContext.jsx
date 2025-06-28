import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Mock staff credentials - in real app, this would be in backend
  const mockStaffCredentials = {
    'DOC001': { password: 'doctor123', role: 'doctor', name: 'Dr. Sarah Johnson' },
    'DOC002': { password: 'doctor123', role: 'doctor', name: 'Dr. Michael Chen' },
    'NUR001': { password: 'nurse123', role: 'nurse', name: 'Nurse Emma Wilson' },
    'NUR002': { password: 'nurse123', role: 'nurse', name: 'Nurse David Martinez' }
  }

  // Mock patient data - in real app, this would be in backend
  const mockPatients = {
    'PAT001': { 
      mobile: '1234567890', 
      name: 'John Doe',
      email: 'john.doe@email.com',
      dateOfBirth: '1990-05-15',
      role: 'patient'
    }
  }

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('hospitalUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const loginStaff = async (staffId, password) => {
    const staff = mockStaffCredentials[staffId]
    if (staff && staff.password === password) {
      const userData = {
        id: staffId,
        name: staff.name,
        role: staff.role,
        type: 'staff'
      }
      setUser(userData)
      localStorage.setItem('hospitalUser', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid staff ID or password' }
  }

  const loginPatient = async (patientId, mobile, otp) => {
    // Mock OTP verification - in real app, this would verify with backend
    if (otp !== '123456') {
      return { success: false, error: 'Invalid OTP' }
    }

    const patient = mockPatients[patientId]
    if (patient && patient.mobile === mobile) {
      const userData = {
        id: patientId,
        name: patient.name,
        role: 'patient',
        type: 'patient',
        email: patient.email
      }
      setUser(userData)
      localStorage.setItem('hospitalUser', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid patient ID or mobile number' }
  }

  const registerPatient = async (patientData) => {
    // Mock registration - in real app, this would save to backend
    const newPatientId = 'PAT' + String(Date.now()).slice(-3)
    const userData = {
      id: newPatientId,
      name: `${patientData.firstName} ${patientData.lastName}`,
      role: 'patient',
      type: 'patient',
      email: patientData.email
    }
    setUser(userData)
    localStorage.setItem('hospitalUser', JSON.stringify(userData))
    return { success: true, patientId: newPatientId }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('hospitalUser')
  }

  const value = {
    user,
    loading,
    loginStaff,
    loginPatient,
    registerPatient,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}