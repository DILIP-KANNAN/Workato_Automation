import { createContext, useContext, useState } from 'react'
import { 
  Heart, 
  Stethoscope, 
  Activity, 
  Users, 
  Building2, 
  Star 
} from 'lucide-react'
import React, { useEffect  } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import CurrentAppointments from '../components/CurrentAppointments';

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
  const [ongoingTreatment, setOngoingTreatment] = useState(null);
    const { user } = useAuth();
    const [currentAppointments, setCurrentAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const { data } = await API.get(`/appointments/${user.patientId}`);
                setCurrentAppointments(data.appointments);
            } catch (error) {
                console.error('Error fetching appointments:', error);
                setError('Failed to fetch appointments');
            } finally {
                setLoading(false);
            }
        };
        const fetchNextAppointment = async () => {
        try {
            const { data } = await API.get(`/appointments/${user.patientId}`);
            const appointment = data.appointments[0];

            setOngoingTreatment({
                service: appointment.service,
                doctor: appointment.doctor,
                nextAppointment: appointment.date,
                time: appointment.time,
                status: appointment.status || 'ongoing',
                progress: 75, // compute or set default
                medications: appointment.medications || [],
                lastReport: appointment.lastReport || '',
            });
        } catch (error) {
            console.error('Error fetching next appointment:', error);
            setError('Failed to load next appointment.');
        } finally {
            setLoading(false);
        }
      };

        if (user && user.patientId) {
            fetchAppointments();
            fetchNextAppointment();
        }

    }, [user]);

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

  const cancelAppointment = async (appointmentId) => {
    if (!user?.patientId) {
        alert('User not logged in');
        return;
    }

        try {
            const { data } = await API.delete(`/appointments/${user.patientId}/${appointmentId}`);
            toast.success(data.message,{duration:3500});

            // Update local state to reflect the cancelled appointment
            setCurrentAppointments(prev =>
                prev.filter(appt => appt.appointmentId !== appointmentId)
            );
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || 'Failed to cancel appointment',{duration:3500});
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