import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Calendar, 
  Users, 
  FileText, 
  Pill, 
  LogOut, 
  Bell,
  Building2,
  Plus,
  User,
  Stethoscope,
  Heart,
  Activity,
  MessageCircle,
  Send,
  Bot,
  ChevronRight,
  CheckCircle,
  Star,
  Eye,
  Home,
  CreditCard,
  X,
  Clock,
  MapPin,
  Phone
} from 'lucide-react'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: user.ongoingTreatment 
        ? `Hello ${user.name}! I see you have an upcoming appointment with Dr. Sarah Johnson on Jan 15. Would you like guidance for your visit?`
        : `Hello ${user.name}! How can I help you today? You can ask me about booking appointments, using the app, or general health queries.`
    }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [showServiceSelector, setShowServiceSelector] = useState(false)
  const [appointmentSuccess, setAppointmentSuccess] = useState(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  // Mock data for ongoing treatment
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

  const medicalServices = [
    { id: 1, name: 'Cardiology', icon: Heart, color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 2, name: 'General Medicine', icon: Stethoscope, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 3, name: 'Emergency Care', icon: Activity, color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 4, name: 'Pediatrics', icon: Users, color: 'text-green-600', bgColor: 'bg-green-50' },
    { id: 5, name: 'Surgery', icon: Building2, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 6, name: 'Oncology', icon: Star, color: 'text-pink-600', bgColor: 'bg-pink-50' }
  ]

  const previousServices = [
    { id: 1, name: 'Cardiology', icon: Heart, lastVisit: '2024-12-15' },
    { id: 2, name: 'General Medicine', icon: Stethoscope, lastVisit: '2024-11-20' },
    { id: 3, name: 'Orthopedics', icon: Activity, lastVisit: '2024-10-05' },
    { id: 4, name: 'Dermatology', icon: Star, lastVisit: '2024-09-12' },
    { id: 5, name: 'Neurology', icon: Users, lastVisit: '2024-08-28' }
  ]

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'medication', label: 'Medication', icon: Pill },
    { id: 'schemes', label: 'Medical Schemes', icon: CreditCard }
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: newMessage
    }

    setChatMessages(prev => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      let botResponse = ''
      
      if (newMessage.toLowerCase().includes('appointment')) {
        if (ongoingTreatment) {
          botResponse = `For your upcoming appointment on ${ongoingTreatment.nextAppointment}:\n\n• Arrive 15 minutes early\n• Bring your ID and insurance card\n• Location: Cardiology Wing, 3rd Floor\n• Contact: (555) 123-4567\n• Fasting required: No\n\nAnything else you'd like to know?`
        } else {
          botResponse = 'I can help you book an appointment! You can use the appointment booking section below or ask me about specific services.'
        }
      } else if (newMessage.toLowerCase().includes('medication')) {
        botResponse = 'You can view your current medications in the Medication tab. For prescription refills, contact your doctor or use our online refill service.'
      } else if (newMessage.toLowerCase().includes('report')) {
        botResponse = 'Your medical reports are available in the Reports section. You can download or view them anytime.'
      } else {
        botResponse = 'I understand you need help. You can ask me about:\n\n• Appointment guidance\n• App navigation\n• Medication information\n• Report access\n• General health queries\n\nWhat would you like to know more about?'
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse
      }

      setChatMessages(prev => [...prev, botMessage])
    }, 1000)

    setNewMessage('')
  }

  const handleServiceSelect = (service) => {
    setShowServiceSelector(false)
    handleAppointmentBooking('specific', service)
  }

  const handleAppointmentBooking = (type, service = null) => {
    // Simulate appointment booking
    const appointmentData = {
      type: type,
      service: service?.name || 'General Consultation',
      doctor: 'Dr. Michael Chen',
      date: '2025-01-20',
      time: '2:30 PM',
      location: 'Main Building, 2nd Floor'
    }

    setAppointmentSuccess(appointmentData)
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setAppointmentSuccess(null)
    }, 5000)
  }

  const renderHomeContent = () => (
    <div className="space-y-8">
      {/* Current Treatment and Health Assistant - Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Treatment Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Current Treatment
          </h3>
          
          {ongoingTreatment ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <Heart className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{ongoingTreatment.service}</p>
                    <p className="text-sm text-gray-600">{ongoingTreatment.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Next Appointment</p>
                  <p className="text-sm text-gray-600">{ongoingTreatment.nextAppointment} at {ongoingTreatment.time}</p>
                </div>
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                  <Eye className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">View Reports</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                  <Pill className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Medications</span>
                </button>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-800">Treatment Progress</span>
                  <span className="text-sm text-green-700">{ongoingTreatment.progress}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${ongoingTreatment.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 mb-4">No ongoing treatment</p>
              <button 
                onClick={() => setShowServiceSelector(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>

        {/* Health Assistant Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bot className="w-5 h-5 mr-2 text-blue-600" />
            Health Assistant
          </h3>
          
          <div className="h-80 overflow-y-auto space-y-3 mb-4 p-3 bg-gray-50 rounded-lg">
            {chatMessages.map((message) => (
              <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white border border-gray-200 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-line">{message.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Booking Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          Book Appointment
        </h3>

        <div className="space-y-6">
          {/* Previous Services - Scrollable Row */}
          {previousServices.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Continue Previous Treatment</h4>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {previousServices.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleAppointmentBooking('follow-up', service)}
                    className="flex-shrink-0 w-48 flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                      <service.icon className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{service.name}</p>
                      <p className="text-xs text-gray-600">Last: {service.lastVisit}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* New Appointments */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">New Appointment</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleAppointmentBooking('general')}
                className="flex items-center space-x-3 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 hover:border-blue-300 transition-all"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">General Consultation</p>
                  <p className="text-sm text-gray-600">Book a general health checkup</p>
                </div>
                <ChevronRight className="w-5 h-5 text-blue-600" />
              </button>

              <button
                onClick={() => setShowServiceSelector(true)}
                className="flex items-center space-x-3 p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 hover:border-gray-300 transition-all"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-gray-600" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">Specific Service</p>
                  <p className="text-sm text-gray-600">Choose from specialized departments</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderOtherContent = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Building2 className="w-12 h-12 text-blue-600" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
      <p className="text-gray-600 max-w-md mx-auto">
        We're working on this section to provide you with comprehensive {activeTab} management features.
      </p>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">MediCare Plus</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      {user.role === 'patient' && (
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === item.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600 mt-1">
            {activeTab === 'home' 
              ? 'Manage your appointments and health records' 
              : `Manage your ${activeTab}`
            }
          </p>
        </div>

        {/* Content based on active tab */}
        {user.role === 'patient' ? (
          activeTab === 'home' ? renderHomeContent() : renderOtherContent()
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Staff Dashboard</h3>
            <p className="text-gray-600">Staff dashboard features will be implemented later.</p>
          </div>
        )}
      </main>

      {/* Central Success Message Overlay */}
      {appointmentSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 transform animate-pulse">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h3>
              
              <div className="space-y-3 text-left bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Service:</span>
                  <span className="text-gray-900">{appointmentSuccess.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Doctor:</span>
                  <span className="text-gray-900">{appointmentSuccess.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Date:</span>
                  <span className="text-gray-900">{appointmentSuccess.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Time:</span>
                  <span className="text-gray-900">{appointmentSuccess.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">Location:</span>
                  <span className="text-gray-900">{appointmentSuccess.location}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">
                You will receive a confirmation SMS and email shortly. Please arrive 15 minutes early.
              </p>
              
              <button
                onClick={() => setAppointmentSuccess(null)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Medical Service</h3>
              <button
                onClick={() => setShowServiceSelector(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {medicalServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleServiceSelect(service)}
                  className={`flex items-center space-x-4 p-4 ${service.bgColor} hover:bg-opacity-80 rounded-lg border border-gray-200 hover:border-gray-300 transition-all text-left`}
                >
                  <div className={`w-12 h-12 bg-white rounded-lg flex items-center justify-center`}>
                    <service.icon className={`w-6 h-6 ${service.color}`} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">Specialized care</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard