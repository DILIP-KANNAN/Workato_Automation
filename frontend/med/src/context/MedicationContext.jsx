import { createContext, useContext, useState } from 'react'
import { 
  Sun, 
  Utensils, 
  Moon, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  AlertTriangle 
} from 'lucide-react'
import React, { useEffect  } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const MedicationContext = createContext()

export const useMedication = () => {
  const context = useContext(MedicationContext)
  if (!context) {
    throw new Error('useMedication must be used within a MedicationProvider')
  }
  return context
}

export const MedicationProvider = ({ children }) => {
  const [currentMedications, setCurrentMedications] = useState([]);
  const [medicationsLoading, setMedicationsLoading] = useState(false);
  const [medicationsError, setMedicationsError] = useState('');
  const [expandedMedications, setExpandedMedications] = useState({})
  const [medicationQuantities, setMedicationQuantities] = useState({})
  const [reminderTimes, setReminderTimes] = useState({})
  const [previousMedications, setPreviousMedications] = useState([]);

  const { user } = useAuth();

useEffect(() => {
    const fetchMedications = async () => {
        if (!user?.patientId) return;

        setMedicationsLoading(true);
        setMedicationsError('');

        try {
            const { data } = await API.get(`/medications/${user.patientId}`);
            setCurrentMedications(data.medications);
        } catch (error) {
            console.error('Error fetching medications:', error);
            setMedicationsError('Failed to fetch medications');
        } finally {
            setMedicationsLoading(false);
        }
    };
    fetchMedications();
  }, [user]);

  useEffect(() => {
    if (currentMedications.length) {
        const quantities = {};
        currentMedications.forEach(med => {
            quantities[med.id] = med.Quantity || 0; // fallback safety
        });
        setMedicationQuantities(quantities);
    }
  }, [currentMedications]);

  useEffect(() => {
    if (currentMedications.length) {
        const defaultTimes = {
            morning: '08:00',
            lunch: '13:00',
            evening: '20:00'
        };

        const reminders = {};

        currentMedications.forEach(med => {
            const medReminder = {};

            med.timing.forEach(time => {
                if (med.reminderTimes && med.reminderTimes[time]) {
                    // Use existing timing from backend if available
                    medReminder[time] = med.reminderTimes[time];
                } else {
                    // Otherwise use default
                    medReminder[time] = defaultTimes[time] || '08:00';
                }
            });

            reminders[med.id] = medReminder;
        });

        setReminderTimes(reminders);
    }
  }, [currentMedications]);


  // Previous medications
  useEffect(() => {
  const fetchPreviousMedications = async () => {
    try {
      const { data } = await API.get(`/previous-medications/${user.patientId}`);
      setPreviousMedications(data.medications);
    } catch (error) {
      console.error('Error fetching previous medications:', error);
    }
  };

  if (user && user.patientId) {
    fetchPreviousMedications();
  }
}, [user]);


  const toggleMedicationExpansion = (medicationId) => {
    setExpandedMedications(prev => ({
      ...prev,
      [medicationId]: !prev[medicationId]
    }))
  }

  const updateQuantity = async (medicationId, change) => {
    const newQuantity = Math.max(0, medicationQuantities[medicationId] + change);

    try {
      await API.patch('/medications/update-quantity', {
        patientId: user.patientId,
        medicationId,
        Quantity: newQuantity
      });

      setMedicationQuantities(prev => ({
        ...prev,
        [medicationId]: newQuantity
      }));
      toast.success('Quantity updated successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update quantity.');
    }
  };

  const updateReminderTime = async (medicationId, timing, time) => {
    try {
      await API.patch('/medications/update-reminder', {
        patientId: user.patientId,
        medicationId,
        timing,
        time
      });

      setReminderTimes(prev => ({
        ...prev,
        [medicationId]: {
          ...prev[medicationId],
          [timing]: time
        }
      }));
      toast.success('Reminder updated successfully.');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update reminder.');
    }
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'out', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    if (quantity <= 5) return { status: 'low', color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle }
    return { status: 'good', color: 'bg-green-100 text-green-800', icon: CheckCircle }
  }

  const getTimingIcon = (timing) => {
    switch (timing) {
      case 'morning': return Sun
      case 'lunch': return Utensils
      case 'evening': return Moon
      default: return Clock
    }
  }

  const getTimingColor = (timing) => {
    switch (timing) {
      case 'morning': return 'bg-yellow-100 text-yellow-800'
      case 'lunch': return 'bg-orange-100 text-orange-800'
      case 'evening': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const value = {
    currentMedications,
    previousMedications,
    expandedMedications,
    medicationQuantities,
    reminderTimes,
    setExpandedMedications,
    setMedicationQuantities,
    setReminderTimes,
    toggleMedicationExpansion,
    updateQuantity,
    updateReminderTime,
    getStockStatus,
    getTimingIcon,
    getTimingColor
  }

  return (
    <MedicationContext.Provider value={value}>
      {children}
    </MedicationContext.Provider>
  )
}