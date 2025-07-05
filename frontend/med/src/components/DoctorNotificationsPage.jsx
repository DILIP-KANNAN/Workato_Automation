import { 
  ArrowLeft, 
  Bell, 
  AlertTriangle, 
  Calendar, 
  FileText, 
  Heart, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Info,
  X,
  Settings,
  Filter,
  User,
  Pill
} from 'lucide-react'
import { useState } from 'react'
import { useStaff } from '../context/StaffContext'

const DoctorNotificationsPage = () => {
  const { setActiveTab } = useStaff()
  const [filter, setFilter] = useState('all')

  const notifications = [
    {
      id: 1,
      type: 'emergency',
      title: 'Critical Patient Alert',
      message: 'Patient John Doe (PAT001) showing irregular vitals. BP: 180/110, HR: 95 bpm. Immediate attention required.',
      time: '5 minutes ago',
      read: false,
      priority: 'critical',
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      patient: 'John Doe (PAT001)'
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Sarah Wilson scheduled for follow-up consultation at 2:30 PM today. Diabetes management review.',
      time: '30 minutes ago',
      read: false,
      priority: 'high',
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      patient: 'Sarah Wilson (PAT002)'
    },
    {
      id: 3,
      type: 'report',
      title: 'Lab Results Available',
      message: 'Blood work results for Robert Chen are now available for review. Cholesterol levels show improvement.',
      time: '1 hour ago',
      read: true,
      priority: 'medium',
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      patient: 'Robert Chen (PAT003)'
    },
    {
      id: 4,
      type: 'medication',
      title: 'Prescription Approval Needed',
      message: 'New prescription request for Maria Garcia requires your approval. Prenatal vitamins dosage adjustment.',
      time: '2 hours ago',
      read: false,
      priority: 'medium',
      icon: Pill,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      patient: 'Maria Garcia (PAT004)'
    },
    {
      id: 5,
      type: 'system',
      title: 'ICU Bed Assignment',
      message: 'ICU bed 3 has been assigned to incoming emergency patient. Expected arrival in 15 minutes.',
      time: '3 hours ago',
      read: true,
      priority: 'high',
      icon: Info,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      patient: 'Emergency Patient'
    },
    {
      id: 6,
      type: 'appointment',
      title: 'Appointment Cancelled',
      message: 'Patient David Miller has cancelled his 4:00 PM appointment. Reason: Family emergency.',
      time: '4 hours ago',
      read: true,
      priority: 'low',
      icon: Calendar,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      patient: 'David Miller (PAT005)'
    },
    {
      id: 7,
      type: 'emergency',
      title: 'Code Blue Alert',
      message: 'Code Blue called in ICU Room 2. Patient Emma Thompson requires immediate assistance.',
      time: '6 hours ago',
      read: true,
      priority: 'critical',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      patient: 'Emma Thompson (ICU002)'
    }
  ]

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true
    if (filter === 'unread') return !notif.read
    return notif.type === filter
  })

  const unreadCount = notifications.filter(notif => !notif.read).length

  const filterOptions = [
    { value: 'all', label: 'All Notifications', count: notifications.length },
    { value: 'unread', label: 'Unread', count: unreadCount },
    { value: 'emergency', label: 'Emergency', count: notifications.filter(n => n.type === 'emergency').length },
    { value: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
    { value: 'report', label: 'Reports', count: notifications.filter(n => n.type === 'report').length },
    { value: 'medication', label: 'Medications', count: notifications.filter(n => n.type === 'medication').length }
  ]

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500'
      case 'high': return 'border-l-orange-500'
      case 'medium': return 'border-l-yellow-500'
      case 'low': return 'border-l-green-500'
      default: return 'border-l-gray-300'
    }
  }

  const markAsRead = (id) => {
    // Implementation would update notification status
    console.log('Mark as read:', id)
  }

  const markAllAsRead = () => {
    // Implementation would mark all as read
    console.log('Mark all as read')
  }

  const deleteNotification = (id) => {
    // Implementation would delete notification
    console.log('Delete notification:', id)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Doctor Notifications</h2>
                <p className="text-gray-600">{unreadCount} unread notifications</p>
              </div>
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
            const IconComponent = notification.icon
            return (
              <div
                key={notification.id}
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
                          {notification.time}
                        </span>
                        <button
                          onClick={() => deleteNotification(notification.id)}
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
                          notification.type === 'emergency' ? 'bg-red-100 text-red-800' :
                          notification.type === 'appointment' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'report' ? 'bg-purple-100 text-purple-800' :
                          notification.type === 'medication' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {notification.type}
                        </span>
                        
                        <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                          notification.priority === 'critical' ? 'bg-red-100 text-red-800' :
                          notification.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                          notification.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {notification.priority} priority
                        </span>

                        <div className="flex items-center space-x-1 text-xs text-gray-600">
                          <User className="w-3 h-3" />
                          <span>{notification.patient}</span>
                        </div>
                      </div>
                      
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
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

      {/* Quick Actions */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => setActiveTab('intensive')}
            className="flex items-center space-x-3 p-4 bg-red-50/80 hover:bg-red-100/80 rounded-xl border border-red-200/50 transition-all group"
          >
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <div className="text-left">
              <p className="font-medium text-red-900">Check ICU</p>
              <p className="text-xs text-red-700">View critical patients</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className="flex items-center space-x-3 p-4 bg-blue-50/80 hover:bg-blue-100/80 rounded-xl border border-blue-200/50 transition-all group"
          >
            <FileText className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900">Review Reports</p>
              <p className="text-xs text-blue-700">Check pending reports</p>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('update')}
            className="flex items-center space-x-3 p-4 bg-green-50/80 hover:bg-green-100/80 rounded-xl border border-green-200/50 transition-all group"
          >
            <Pill className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900">Update Records</p>
              <p className="text-xs text-green-700">Add new reports</p>
            </div>
          </button>

          <button className="flex items-center space-x-3 p-4 bg-purple-50/80 hover:bg-purple-100/80 rounded-xl border border-purple-200/50 transition-all group">
            <Calendar className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-purple-900">Schedule</p>
              <p className="text-xs text-purple-700">View appointments</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DoctorNotificationsPage