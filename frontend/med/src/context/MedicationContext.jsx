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

const MedicationContext = createContext()

export const useMedication = () => {
  const context = useContext(MedicationContext)
  if (!context) {
    throw new Error('useMedication must be used within a MedicationProvider')
  }
  return context
}

export const MedicationProvider = ({ children }) => {
  const [expandedMedications, setExpandedMedications] = useState({})
  const [medicationQuantities, setMedicationQuantities] = useState({
    'lisinopril-current': 15,
    'metoprolol-current': 8,
    'aspirin-current': 30,
    'atorvastatin-current': 0
  })
  const [reminderTimes, setReminderTimes] = useState({
    'lisinopril-current': { morning: '08:00', evening: '20:00' },
    'metoprolol-current': { morning: '08:00', lunch: '13:00' },
    'aspirin-current': { evening: '20:00' },
    'atorvastatin-current': { evening: '20:00' }
  })

  // Current medications
  const currentMedications = [
    {
      id: 'lisinopril-current',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Twice daily',
      timing: ['morning', 'evening'],
      foodInstruction: 'Take with or without food',
      duration: '3 months',
      sideEffects: 'Dizziness, dry cough, headache',
      prescribedBy: 'Dr. Sarah Johnson',
      treatment: 'Hypertension Management',
      startDate: '2024-12-01',
      totalQuantity: 90
    },
    {
      id: 'metoprolol-current',
      name: 'Metoprolol',
      dosage: '25mg',
      frequency: 'Twice daily',
      timing: ['morning', 'lunch'],
      foodInstruction: 'Take with meals',
      duration: '6 months',
      sideEffects: 'Fatigue, dizziness, slow heart rate',
      prescribedBy: 'Dr. Sarah Johnson',
      treatment: 'Cardiac Arrhythmia',
      startDate: '2024-11-15',
      totalQuantity: 180
    },
    {
      id: 'aspirin-current',
      name: 'Aspirin',
      dosage: '75mg',
      frequency: 'Once daily',
      timing: ['evening'],
      foodInstruction: 'Take after dinner',
      duration: 'Long-term',
      sideEffects: 'Stomach irritation, bleeding risk',
      prescribedBy: 'Dr. Sarah Johnson',
      treatment: 'Cardiovascular Protection',
      startDate: '2024-10-01',
      totalQuantity: 30
    },
    {
      id: 'atorvastatin-current',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      timing: ['evening'],
      foodInstruction: 'Take with or without food',
      duration: '6 months',
      sideEffects: 'Muscle pain, liver enzyme elevation',
      prescribedBy: 'Dr. Michael Chen',
      treatment: 'Cholesterol Management',
      startDate: '2024-12-10',
      totalQuantity: 30
    }
  ]

  // Previous medications
  const previousMedications = [
    {
      id: 'amoxicillin-prev',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Three times daily',
      timing: ['morning', 'lunch', 'evening'],
      foodInstruction: 'Take with meals',
      duration: '7 days',
      prescribedBy: 'Dr. Michael Chen',
      treatment: 'Respiratory Infection',
      startDate: '2024-09-15',
      endDate: '2024-09-22',
      status: 'Completed'
    },
    {
      id: 'ibuprofen-prev',
      name: 'Ibuprofen',
      dosage: '400mg',
      frequency: 'As needed',
      timing: ['morning', 'evening'],
      foodInstruction: 'Take with food',
      duration: '2 weeks',
      prescribedBy: 'Dr. Lisa Park',
      treatment: 'Post-surgical Pain',
      startDate: '2024-08-01',
      endDate: '2024-08-15',
      status: 'Completed'
    }
  ]

  const toggleMedicationExpansion = (medicationId) => {
    setExpandedMedications(prev => ({
      ...prev,
      [medicationId]: !prev[medicationId]
    }))
  }

  const updateQuantity = (medicationId, change) => {
    setMedicationQuantities(prev => ({
      ...prev,
      [medicationId]: Math.max(0, prev[medicationId] + change)
    }))
  }

  const updateReminderTime = (medicationId, timing, time) => {
    setReminderTimes(prev => ({
      ...prev,
      [medicationId]: {
        ...prev[medicationId],
        [timing]: time
      }
    }))
  }

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