import { 
  Bell, 
  Calendar, 
  Pill, 
  FileText, 
  Heart, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info,
  X,
  Settings,
  Filter
} from 'lucide-react'
import { useState } from 'react'
import { useNotifications } from '../context/NotificationsContext'

const NotificationsPage = () => {
  const [filter, setFilter] = useState('all')
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    getUnreadCount 
  } = useNotifications()

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    return notif.type === filter
  })

  const unreadCount = getUnreadCount()

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
    { value: 'medication', label: 'Medications', count: notifications.filter(n => n.type === 'medication').length },
    { value: 'report', label: 'Reports', count: notifications.filter(n => n.type === 'report').length },
    { value: 'health', label: 'Health Reminders', count: notifications.filter(n => n.type === 'health').length }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-300'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Notifications</h2>
              <p className="text-gray-600">{unreadCount} unread notifications</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-lg">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-1 bg-gray-100/80 p-1 rounded-lg">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                filter === option.value
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <span>{option.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                filter === option.value
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const IconComponent =  Bell
            return (
              <div
                key={notification._id}
                className={`bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border-l-4 ${getPriorityColor(notification.priority)} p-6 hover:shadow-xl transition-all ${
                  !notification.read ? 'border-r-4 border-r-blue-500' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${notification.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <IconComponent className={`w-6 h-6 ${notification.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                        {notification.title}
                        {!notification.read && (
                          <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                        )}
                      </h3>
                      <div className="flex items-center space-x-2 ml-4">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {new Date(notification.time).toLocaleDateString()}
                        </span>
                        <button
                          onClick={() => deleteNotification(notification._id)}
                          className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className={`text-sm leading-relaxed mb-3 ${!notification.read ? 'text-gray-700' : 'text-gray-600'}`}>
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          notification.type === 'appointment' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'medication' ? 'bg-green-100 text-green-800' :
                          notification.type === 'report' ? 'bg-purple-100 text-purple-800' :
                          notification.type === 'health' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          notification.priority === 'high' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.priority} priority
                        </span>
                      </div>
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification._id)}
                          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {filter === 'all' 
                ? "You're all caught up! No notifications to show."
                : `No ${filter} notifications found.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Notification Settings */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Settings className="w-6 h-6 mr-3 text-blue-600" />
          Notification Preferences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Email Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Appointment reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Medication reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Lab results available</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Health tips and articles</span>
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">SMS Notifications</h4>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Urgent appointment changes</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Critical medication alerts</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Daily medication reminders</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700">Health check reminders</span>
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage