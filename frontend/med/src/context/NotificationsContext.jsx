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
import React, { useEffect  } from 'react';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
const NotificationsContext = createContext()

export const useNotifications = () => {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationsProvider')
  }
  return context
}

export const NotificationsProvider = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([])
   useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const { data } = await API.get(`/notifications/${user.patientId}`);
      setNotifications(data.notifications)
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications.');
    }
  };

  if (user?.patientId) {
    fetchNotifications();
  }
}, [user]);


  const markAsRead = async (id) => {
    try {
        await API.patch('/notifications/mark-as-read', {
            patientId: user.patientId,
            notificationId: id
        });
        // Optimistic UI update
        setNotifications(prev =>
            prev.map(notif =>
                notif._id === id ? { ...notif, read: true } : notif
            )
        );
    } catch (error) {
        console.error('Error marking notification as read:', error);
        toast.error('Failed to mark notification as read.');
    }
};

const markAllAsRead = async () => {
    try {
        await API.patch('/notifications/mark-all-as-read', {
            patientId: user.patientId
        });
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, read: true }))
        );
    } catch (error) {
        console.error('Error marking all notifications as read:', error);
        toast.error('Failed to mark all notifications as read.');
    }
};

const deleteNotification = async (id) => {
    try {
        await API.delete('/notifications/delete', {
            data: { patientId: user.patientId, notificationId: id }
        });
        setNotifications(prev => prev.filter(notif => notif._id !== id));
    } catch (error) {
        console.error('Error deleting notification:', error);
        toast.error('Failed to delete notification.');
    }
};


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