import { createContext, useContext, useState } from 'react'
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Users, 
  Building2, 
  Star 
} from 'lucide-react'

const AppointmentContext = createContext()

export const useAppointment = () => {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider')
  }
  return context
}

export const AppointmentProvider = ({ children }) => {
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0)
  const [appointmentSuccess, setAppointmentSuccess] = useState(null)
  const [showServiceSelector, setShowServiceSelector] = useState(false)
  const [showDiagnosticSelector, setShowDiagnosticSelector] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')

  // Current appointments data
  const currentAppointments = [
    {
      id: 1,
      service: 'Cardiology',
      icon: Heart,
      doctor: 'Dr. Sarah Johnson',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'confirmed',
      location: 'Cardiology Wing, 3rd Floor',
      type: 'Follow-up Consultation'
    },
    {
      id: 2,
      service: 'General Medicine',
      icon: Stethoscope,
      doctor: 'Dr. Michael Chen',
      date: '2025-01-18',
      time: '2:30 PM',
      status: 'confirmed',
      location: 'General Medicine, 2nd Floor',
      type: 'Routine Checkup'
    },
    {
      id: 3,
      service: 'Radiology',
      icon: Activity,
      doctor: 'Dr. Lisa Park',
      date: '2025-01-20',
      time: '9:15 AM',
      status: 'pending',
      location: 'Radiology Department, Ground Floor',
      type: 'CT Scan'
    }
  ]

  const medicalServices = [
    { id: 1, name: 'Cardiology', icon: Heart, color: 'text-red-600', bgColor: 'bg-red-100' },
    { id: 2, name: 'General Medicine', icon: Stethoscope, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { id: 3, name: 'Pediatrics', icon: Users, color: 'text-green-600', bgColor: 'bg-green-100' },
    { id: 4, name: 'Surgery', icon: Building2, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { id: 5, name: 'Oncology', icon: Star, color: 'text-pink-600', bgColor: 'bg-pink-100' }
  ]

  const scanServices = [
    { id: 1, name: 'X-Ray', icon: Activity, description: 'Digital X-ray imaging', duration: '15 mins' },
    { id: 2, name: 'CT Scan', icon: Activity, description: 'Computed Tomography', duration: '30 mins' },
    { id: 3, name: 'MRI', icon: Activity, description: 'Magnetic Resonance Imaging', duration: '45 mins' },
    { id: 4, name: 'Ultrasound', icon: Activity, description: 'Ultrasound imaging', duration: '20 mins' },
    { id: 5, name: 'ECG', icon: Heart, description: 'Electrocardiogram', duration: '10 mins' },
    { id: 6, name: 'Blood Test', icon: Activity, description: 'Complete blood analysis', duration: '5 mins' },
    { id: 7, name: 'Mammography', icon: Activity, description: 'Breast cancer screening', duration: '20 mins' },
    { id: 8, name: 'Bone Density', icon: Activity, description: 'DEXA scan for osteoporosis', duration: '30 mins' },
    { id: 9, name: 'Stress Test', icon: Heart, description: 'Cardiac stress testing', duration: '60 mins' }
  ]

  const previousServices = [
    { id: 1, name: 'Cardiology', icon: Heart, lastVisit: '2024-12-15' },
    { id: 2, name: 'General Medicine', icon: Stethoscope, lastVisit: '2024-11-20' }
  ]

  const ongoingTreatment = {
    service: 'Cardiology',
    icon: Heart,
    doctor: 'Dr. Sarah Johnson',
    nextAppointment: '2025-01-15',
    time: '10:00 AM',
    status: 'ongoing',
    progress: 75,
    medications: ['Lisinopril 10mg', 'Metoprolol 25mg'],
    lastReport: '2025-01-08'
  }

  const nextAppointment = () => {
    setCurrentAppointmentIndex((prev) => 
      prev === currentAppointments.length - 1 ? 0 : prev + 1
    )
  }

  const prevAppointment = () => {
    setCurrentAppointmentIndex((prev) => 
      prev === 0 ? currentAppointments.length - 1 : prev - 1
    )
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setShowServiceSelector(false)
    setShowDatePicker(true)
  }

  const handleAppointmentBooking = (type, service = null) => {
    if (!selectedDate || !selectedTime) {
      alert('Please select your preferred date and time')
      return
    }

    const appointmentData = {
      type: type,
      service: service?.name || 'General Consultation',
      doctor: 'Dr. Michael Chen',
      date: selectedDate,
      time: selectedTime,
      location: 'Main Building, 2nd Floor'
    }

    setAppointmentSuccess(appointmentData)
    setShowDatePicker(false)
    setSelectedDate('')
    setSelectedTime('')
  }

  const cancelAppointment = (appointmentId) => {
    if (confirm('Are you sure you want to cancel this appointment?')) {
      alert('Appointment cancelled successfully')
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const value = {
    currentAppointments,
    currentAppointmentIndex,
    appointmentSuccess,
    showServiceSelector,
    showDiagnosticSelector,
    showDatePicker,
    selectedService,
    selectedDate,
    selectedTime,
    medicalServices,
    scanServices,
    previousServices,
    ongoingTreatment,
    setCurrentAppointmentIndex,
    setAppointmentSuccess,
    setShowServiceSelector,
    setShowDiagnosticSelector,
    setShowDatePicker,
    setSelectedService,
    setSelectedDate,
    setSelectedTime,
    nextAppointment,
    prevAppointment,
    handleServiceSelect,
    handleAppointmentBooking,
    cancelAppointment,
    getMinDate
  }

  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  )
}