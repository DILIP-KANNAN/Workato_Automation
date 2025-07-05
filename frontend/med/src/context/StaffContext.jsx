import { createContext, useContext, useState } from 'react'
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

const StaffContext = createContext()

export const useStaff = () => {
  const context = useContext(StaffContext)
  if (!context) {
    throw new Error('useStaff must be used within a StaffContext')
  }
  return context
}

export const StaffProvider = ({ children }) => {
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showPatientReports, setShowPatientReports] = useState(false)
  const [showReportUpdate, setShowReportUpdate] = useState(false)
  const [selectedPatientForUpdate, setSelectedPatientForUpdate] = useState(null)
  const [scannerActive, setScannerActive] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  // Mock patient data for doctors
  const appointedPatients = [
    {
      id: 'PAT001',
      name: 'John Doe',
      age: 34,
      gender: 'Male',
      bloodGroup: 'O+',
      condition: 'Hypertension',
      severity: 'Moderate',
      nextAppointment: '2025-01-15',
      time: '10:00 AM',
      lastVisit: '2024-12-15',
      status: 'Stable',
      room: 'OPD-3',
      phone: '(555) 123-4567',
      email: 'john.doe@email.com',
      emergencyContact: 'Jane Doe - (555) 987-6543',
      allergies: ['Penicillin', 'Shellfish'],
      currentMedications: ['Lisinopril 10mg', 'Metoprolol 25mg'],
      vitals: {
        bp: '128/82',
        hr: '72',
        temp: '98.6°F',
        weight: '180 lbs'
      }
    },
    {
      id: 'PAT002',
      name: 'Sarah Wilson',
      age: 45,
      gender: 'Female',
      bloodGroup: 'A+',
      condition: 'Diabetes Type 2',
      severity: 'Controlled',
      nextAppointment: '2025-01-16',
      time: '2:30 PM',
      lastVisit: '2024-12-10',
      status: 'Improving',
      room: 'OPD-1',
      phone: '(555) 234-5678',
      email: 'sarah.wilson@email.com',
      emergencyContact: 'Mike Wilson - (555) 876-5432',
      allergies: ['Sulfa drugs'],
      currentMedications: ['Metformin 500mg', 'Insulin'],
      vitals: {
        bp: '135/85',
        hr: '78',
        temp: '98.4°F',
        weight: '165 lbs'
      }
    },
    {
      id: 'PAT003',
      name: 'Robert Chen',
      age: 67,
      gender: 'Male',
      bloodGroup: 'B+',
      condition: 'Cardiac Arrhythmia',
      severity: 'Mild',
      nextAppointment: '2025-01-17',
      time: '11:15 AM',
      lastVisit: '2024-12-08',
      status: 'Stable',
      room: 'CCU-2',
      phone: '(555) 345-6789',
      email: 'robert.chen@email.com',
      emergencyContact: 'Linda Chen - (555) 765-4321',
      allergies: ['None known'],
      currentMedications: ['Warfarin 5mg', 'Digoxin 0.25mg'],
      vitals: {
        bp: '142/88',
        hr: '65',
        temp: '98.2°F',
        weight: '175 lbs'
      }
    },
    {
      id: 'PAT004',
      name: 'Maria Garcia',
      age: 29,
      gender: 'Female',
      bloodGroup: 'AB-',
      condition: 'Pregnancy - 32 weeks',
      severity: 'Normal',
      nextAppointment: '2025-01-18',
      time: '9:00 AM',
      lastVisit: '2024-12-12',
      status: 'Healthy',
      room: 'OB-1',
      phone: '(555) 456-7890',
      email: 'maria.garcia@email.com',
      emergencyContact: 'Carlos Garcia - (555) 654-3210',
      allergies: ['Latex'],
      currentMedications: ['Prenatal vitamins', 'Iron supplements'],
      vitals: {
        bp: '118/75',
        hr: '85',
        temp: '98.8°F',
        weight: '145 lbs'
      }
    },
    {
      id: 'PAT005',
      name: 'David Miller',
      age: 52,
      gender: 'Male',
      bloodGroup: 'O-',
      condition: 'Chronic Kidney Disease',
      severity: 'Moderate',
      nextAppointment: '2025-01-19',
      time: '3:00 PM',
      lastVisit: '2024-12-05',
      status: 'Stable',
      room: 'NEP-1',
      phone: '(555) 567-8901',
      email: 'david.miller@email.com',
      emergencyContact: 'Susan Miller - (555) 543-2109',
      allergies: ['Iodine contrast'],
      currentMedications: ['Lisinopril 20mg', 'Furosemide 40mg'],
      vitals: {
        bp: '150/90',
        hr: '68',
        temp: '98.5°F',
        weight: '190 lbs'
      }
    },
    {
      id: 'PAT006',
      name: 'Lisa Anderson',
      age: 38,
      gender: 'Female',
      bloodGroup: 'A-',
      condition: 'Asthma',
      severity: 'Mild',
      nextAppointment: '2025-01-20',
      time: '1:30 PM',
      lastVisit: '2024-12-18',
      status: 'Well-controlled',
      room: 'PULM-2',
      phone: '(555) 678-9012',
      email: 'lisa.anderson@email.com',
      emergencyContact: 'Tom Anderson - (555) 432-1098',
      allergies: ['Aspirin', 'Dust mites'],
      currentMedications: ['Albuterol inhaler', 'Fluticasone'],
      vitals: {
        bp: '120/78',
        hr: '74',
        temp: '98.3°F',
        weight: '140 lbs'
      }
    }
  ]

  // Dashboard statistics for doctors
  const dashboardStats = {
    totalPatients: appointedPatients.length,
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