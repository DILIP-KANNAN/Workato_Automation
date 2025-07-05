import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Building2,
  Bell,
  LogOut,
  Home,
  FileText,
  Pill,
  CreditCard,
  MapPin,
  Users,
  Star,
  Phone,
  Mail,
  Clock
} from 'lucide-react'
import { AppointmentProvider } from '../context/AppointmentContext'
import { MedicationProvider } from '../context/MedicationContext'
import { ReportsProvider } from '../context/ReportsContext'
import { ChatProvider } from '../context/ChatContext'
import { NotificationsProvider } from '../context/NotificationsContext'
import { MedicalSchemesProvider } from '../context/MedicalSchemesContext'
import { StaffProvider } from '../context/StaffContext'
import HomePage from './HomePage'
import ReportsPage from './ReportsPage'
import MedicationPage from './MedicationPage'
import NotificationsPage from './NotificationsPage'
import MedicalSchemesPage from './MedicalSchemesPage'
import DoctorDashboard from './DoctorDashboard'

const Dashboard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('home')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleNotificationClick = () => {
    setActiveTab('notifications')
  }

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'medication', label: 'Medication', icon: Pill },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'schemes', label: 'Medical Schemes', icon: CreditCard }
  ]

  // Check if user is medical staff (doctor or nurse)
  const isMedicalStaff = user.role === 'doctor' || user.role === 'nurse'

  return (
    <NotificationsProvider>
      <MedicalSchemesProvider>
        <StaffProvider>
          <AppointmentProvider>
            <MedicationProvider>
              <ReportsProvider>
                <ChatProvider>
                  <div className="min-h-screen bg-gradient-to-br from-[#B3E5FC] via-[#E1F5FE] to-white">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 25px 25px, rgba(179,229,252,0.4) 2px, transparent 0)`,
                        backgroundSize: '50px 50px'
                      }}></div>
                    </div>

                    {/* Header */}
                    <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/40 sticky top-0 z-40">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                            <img src='Preview.png' className='rounded-2xl'></img>
                          </div>
                            <h1 className="text-xl font-bold text-gray-900">VitalCare</h1>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            {user.role === 'patient' && (
                              <button 
                                onClick={handleNotificationClick}
                                className="p-2 text-gray-400 hover:text-gray-600 relative"
                              >
                                <Bell className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                              </button>
                            )}
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

                    {/* Navigation - Only for patients */}
                    {user.role === 'patient' && (
                      <nav className="bg-white/60 backdrop-blur-sm border-b border-blue-200/30">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div className="flex space-x-8">
                            {navigationItems.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                                  activeTab === item.id
                                    ? 'border-[#D7CCC8] text-gray-900'
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
                          {isMedicalStaff 
                            ? `${user.role === 'doctor' ? 'Doctor' : 'Nurse'} Dashboard - Manage your patients and medical records`
                            : activeTab === 'home' 
                              ? 'Manage your appointments and health records' 
                              : `Manage your ${activeTab}`
                          }
                        </p>
                      </div>

                      {/* Content based on user role and active tab */}
                      {isMedicalStaff ? (
                        user.role === 'doctor' ? <DoctorDashboard /> : (
                          <div className="text-center py-16">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">Nurse Dashboard</h3>
                            <p className="text-gray-600">Nurse dashboard features will be implemented later.</p>
                          </div>
                        )
                      ) : user.role === 'patient' ? (
                        activeTab === 'home' ? <HomePage /> : 
                        activeTab === 'reports' ? <ReportsPage /> :
                        activeTab === 'medication' ? <MedicationPage /> :
                        activeTab === 'notifications' ? <NotificationsPage /> :
                        activeTab === 'schemes' ? <MedicalSchemesPage /> :
                        <div className="text-center py-16">
                          <div className="w-24 h-24 bg-blue-100/80 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Building2 className="w-12 h-12 text-blue-600" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon</h3>
                          <p className="text-gray-600 max-w-md mx-auto">
                            We're working on this section to provide you with comprehensive {activeTab} management features.
                          </p>
                        </div>
                      ) : (
                        <div className="text-center py-16">
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">Staff Dashboard</h3>
                          <p className="text-gray-600">Staff dashboard features will be implemented later.</p>
                        </div>
                      )}
                    </main>

                    {/* Footer */}
                    <footer className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white mt-16">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                          {/* Hospital Info */}
                          <div className="md:col-span-1">
                            <div className="flex items-center space-x-3 mb-4">
                              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                <Building2 className="w-6 h-6 text-white" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold">MediCare Plus</h3>
                                <p className="text-slate-300 text-sm">Advanced Healthcare</p>
                              </div>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">
                              Providing world-class healthcare services with compassionate care and cutting-edge medical technology.
                            </p>
                          </div>

                          {/* Location */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                              <MapPin className="w-5 h-5 mr-2" />
                              Location
                            </h4>
                            <div className="space-y-2 text-slate-300">
                              <p className="font-medium">MediCare Plus Hospital</p>
                              <p>123 Healthcare Avenue</p>
                              <p>Medical District, MD 12345</p>
                              <div className="flex items-center space-x-2 mt-3">
                                <Clock className="w-4 h-4" />
                                <span className="text-sm">24/7 Emergency Care</span>
                              </div>
                            </div>
                          </div>

                          {/* Expert Doctors */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                              <Users className="w-5 h-5 mr-2" />
                              Expert Doctors
                            </h4>
                            <div className="space-y-2 text-slate-300">
                              <p>200+ Medical Professionals</p>
                              <p>Board-certified specialists</p>
                              <p>15+ years average experience</p>
                              <p>Multidisciplinary care teams</p>
                            </div>
                          </div>

                          {/* Contact & Quality */}
                          <div>
                            <h4 className="text-lg font-semibold mb-4 flex items-center">
                              <Star className="w-5 h-5 mr-2" />
                              Contact & Quality
                            </h4>
                            <div className="space-y-3 text-slate-300">
                              <div className="flex items-center space-x-2">
                                <Phone className="w-4 h-4" />
                                <span>(555) 123-4567</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="w-4 h-4" />
                                <span>info@medicareplus.com</span>
                              </div>
                              <div className="mt-4 space-y-1">
                                <p className="font-medium">4.9/5 Patient Rating</p>
                                <p>JCI Accredited Hospital</p>
                                <p>ISO 9001:2015 Certified</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Bottom Bar */}
                        <div className="border-t border-slate-600 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
                          <p className="text-slate-300 text-sm">
                            © 2025 MediCare Plus Hospital. All rights reserved.
                          </p>
                          <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">Privacy Policy</a>
                            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">Terms of Service</a>
                            <a href="#" className="text-slate-300 hover:text-white text-sm transition-colors">Patient Rights</a>
                          </div>
                        </div>
                      </div>
                    </footer>
                  </div>
                </ChatProvider>
              </ReportsProvider>
            </MedicationProvider>
          </AppointmentProvider>
        </StaffProvider>
      </MedicalSchemesProvider>
    </NotificationsProvider>
  )
}

export default Dashboard