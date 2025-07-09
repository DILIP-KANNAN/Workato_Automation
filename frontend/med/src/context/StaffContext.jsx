import { createContext, useContext, useState, useEffect } from 'react'
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Users, 
  Building2, 
  Star,
  AlertTriangle,
  Clock,
  UserCheck,
  Bed,
  Calendar,
  FileText
} from 'lucide-react'
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const StaffContext = createContext()

export const useStaff = () => {
  const context = useContext(StaffContext)
  if (!context) {
    throw new Error('useStaff must be used within a StaffContext')
  }
  return context
}

export const StaffProvider = ({ children }) => {
  const { user } = useAuth();
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showPatientReports, setShowPatientReports] = useState(false)
  const [showReportUpdate, setShowReportUpdate] = useState(false)
  const [selectedPatientForUpdate, setSelectedPatientForUpdate] = useState(null)
  const [scannerActive, setScannerActive] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [appointedPatients, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      console.log(user.id)
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                const response = await API.get(`http://localhost:5000/api/appointment/${user.id}`);
                setAppointments(response.data.appointments);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (user.id) {
            fetchAppointments();
        }
    }, [user.id]);

  // Dashboard statistics for doctors
  const dashboardStats = {
    totalPatients: 1,
    todayAppointments: 8,
    intensiveCare: 3,
    pendingReports: 5,
    emergencyAlerts: 2,
    completedToday: 6
  }

  // Intensive care patients
  const intensiveCarePatients = [
    {
      id: 'ICU001',
      name: 'James Miller',
      age: 58,
      condition: 'Post-surgical recovery',
      severity: 'Critical',
      room: 'ICU-1',
      admissionDate: '2025-01-10',
      vitals: { bp: '160/95', hr: '95', temp: '99.2°F', o2: '92%' }
    },
    {
      id: 'ICU002',
      name: 'Emma Thompson',
      age: 72,
      condition: 'Respiratory failure',
      severity: 'Serious',
      room: 'ICU-3',
      admissionDate: '2025-01-12',
      vitals: { bp: '145/90', hr: '88', temp: '100.1°F', o2: '89%' }
    },
    {
      id: 'ICU003',
      name: 'David Lee',
      age: 41,
      condition: 'Cardiac arrest recovery',
      severity: 'Stable',
      room: 'ICU-5',
      admissionDate: '2025-01-13',
      vitals: { bp: '125/80', hr: '75', temp: '98.6°F', o2: '95%' }
    }
  ]

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient)
    setShowPatientReports(true)
    setActiveTab('reports')
  }

  const handleReportUpdate = (patient) => {
    setSelectedPatientForUpdate(patient)
    setShowReportUpdate(true)
    setActiveTab('update')
  }

  const handleQRScan = () => {
    setScannerActive(true)
    // Simulate QR scan result
    setTimeout(() => {
      const mockPatient = appointedPatients[0]
      setSelectedPatientForUpdate(mockPatient)
      setScannerActive(false)
      setShowReportUpdate(true)
      setActiveTab('update')
    }, 2000)
  }

  const value = {
    appointedPatients,
    dashboardStats,
    intensiveCarePatients,
    selectedPatient,
    showPatientReports,
    showReportUpdate,
    selectedPatientForUpdate,
    scannerActive,
    activeTab,
    setSelectedPatient,
    setShowPatientReports,
    setShowReportUpdate,
    setSelectedPatientForUpdate,
    setScannerActive,
    setActiveTab,
    handlePatientSelect,
    handleReportUpdate,
    handleQRScan
  }

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  )
}