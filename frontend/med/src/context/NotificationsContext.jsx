import { createContext, useContext, useState } from 'react'
import { 
  Bell, 
  Calendar, 
  Pill, 
  FileText, 
  Heart, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info
} from 'lucide-react'

const NotificationsContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Upcoming Appointment Reminder',
      message: 'Your cardiology appointment with Dr. Sarah Johnson is scheduled for tomorrow at 10:00 AM',
      time: '2 hours ago',
      read: false,
      priority: 'high',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Medication Reminder',
      message: 'Time to take your evening dose of Lisinopril (10mg)',
      time: '4 hours ago',
      read: false,
      priority: 'medium',
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      type: 'report',
      title: 'Lab Results Available',
      message: 'Your blood test results from December 10th are now available for review',
      time: '1 day ago',
      read: true,
      priority: 'medium',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 4,
      type: 'health',
      title: 'Blood Pressure Check',
      message: 'Remember to check your blood pressure today and log the readings',
      time: '1 day ago',
      read: false,
      priority: 'medium',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 5,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message: 'Your appointment with Dr. Michael Chen on January 18th has been confirmed',
      time: '2 days ago',
      read: true,
      priority: 'low',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 6,
      type: 'medication',
      title: 'Prescription Refill Needed',
      message: 'Your Metoprolol prescription is running low. Only 3 doses remaining.',
      time: '3 days ago',
      read: false,
      priority: 'high',
      icon: AlertCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 7,
      type: 'system',
      title: 'Health Portal Update',
      message: 'New features have been added to your patient portal. Check out the medication tracking improvements.',
      time: '5 days ago',
      read: true,
      priority: 'low',
      icon: Info,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 8,
      type: 'appointment',
      title: 'Appointment Reminder',
      message: 'Don\'t forget your CT scan appointment tomorrow at 9:15 AM in the Radiology Department',
      time: '1 week ago',
      read: true,
      priority: 'medium',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    }
  ])

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    )
  }

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  const getUnreadCount = () => {
    return notifications.filter(notif => !notif.read).length
  }

  const value = {
    notifications,
    setNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    getUnreadCount
  }

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  )
}