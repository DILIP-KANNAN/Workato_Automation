import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  Activity, 
  Heart,
  Stethoscope,
  Clock,
  UserCheck,
  Bed,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Bell,
  ChevronRight,
  MapPin,
  Phone,
  Eye,
  Edit,
  AlertCircle
} from 'lucide-react'
import { useStaff } from '../context/StaffContext'
import DoctorReportsPage from './DoctorReportsPage'
import ReportUpdatePage from './ReportUpdatePage'
import DoctorNotificationsPage from './DoctorNotificationsPage'
import IntensiveCarePage from './IntensiveCarePage'

const DoctorDashboard = () => {
  const {
    appointedPatients,
    dashboardStats,
    intensiveCarePatients,
    activeTab,
    setActiveTab,
    handlePatientSelect,
    handleReportUpdate,
    handleQRScan
  } = useStaff()

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'reports', label: 'View Reports', icon: FileText },
    { id: 'update', label: 'Update Report', icon: Edit },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'intensive', label: 'Intensive Care', icon: AlertTriangle }
  ]

  if (activeTab === 'reports') {
    return <DoctorReportsPage />
  }

  if (activeTab === 'update') {
    return <ReportUpdatePage />
  }

  if (activeTab === 'notifications') {
    return <DoctorNotificationsPage />
  }

  if (activeTab === 'intensive') {
    return <IntensiveCarePage />
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'serious': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'mild': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'stable': return 'bg-green-100 text-green-800 border-green-200'
      case 'normal': return 'bg-green-100 text-green-800 border-green-200'
      case 'controlled': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="space-y-8">
      {/* Navigation Bar */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Doctor Dashboard</h2>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('update')}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Quick Update</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 bg-gray-100/80 p-1 rounded-lg">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Patients</p>
              <p className="text-2xl font-bold text-blue-900">{dashboardStats.totalPatients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-green-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Today's Appointments</p>
              <p className="text-2xl font-bold text-green-900">{dashboardStats.todayAppointments}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-red-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Intensive Care</p>
              <p className="text-2xl font-bold text-red-900">{dashboardStats.intensiveCare}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Pending Reports</p>
              <p className="text-2xl font-bold text-purple-900">{dashboardStats.pendingReports}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Emergency Alerts</p>
              <p className="text-2xl font-bold text-orange-900">{dashboardStats.emergencyAlerts}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-teal-200/50 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-600 font-medium">Completed Today</p>
              <p className="text-2xl font-bold text-teal-900">{dashboardStats.completedToday}</p>
            </div>
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-teal-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments Overview */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-blue-600" />
            Today's Appointments
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setActiveTab('reports')}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <Eye className="w-4 h-4" />
              <span>View All Reports</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {appointedPatients.slice(0, 4).map((patient) => (
            <div
              key={patient.id}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#D7CCC8]/20 hover:border-[#D7CCC8]/40 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-600">{patient.age} years • {patient.condition}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(patient.severity)}`}>
                  {patient.severity}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50/80 p-2 rounded-lg">
                  <p className="text-xs text-gray-600">Next Appointment</p>
                  <p className="text-sm font-medium text-gray-900">{patient.nextAppointment}</p>
                  <p className="text-xs text-gray-600">{patient.time}</p>
                </div>
                <div className="bg-gray-50/80 p-2 rounded-lg">
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="text-sm font-medium text-gray-900">{patient.room}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  Last visit: {patient.lastVisit}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePatientSelect(patient)}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
                  >
                    View Reports
                  </button>
                  <button
                    onClick={() => handleReportUpdate(patient)}
                    className="px-3 py-1 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setActiveTab('reports')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View all {appointedPatients.length} patients →
          </button>
        </div>
      </div>

      {/* Quick Stats and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50/80 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Completed consultation</p>
                <p className="text-xs text-gray-600">Sarah Wilson - 2:30 PM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-blue-50/80 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Report updated</p>
                <p className="text-xs text-gray-600">John Doe - 1:45 PM</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-orange-50/80 rounded-lg">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-4 h-4 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Emergency alert</p>
                <p className="text-xs text-gray-600">ICU Patient - 12:15 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab('update')}
              className="flex items-center space-x-2 p-3 bg-blue-50/80 hover:bg-blue-100/80 rounded-lg transition-colors border border-blue-200/50"
            >
              <Edit className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Update Report</span>
            </button>
            
            <button
              onClick={() => setActiveTab('reports')}
              className="flex items-center space-x-2 p-3 bg-green-50/80 hover:bg-green-100/80 rounded-lg transition-colors border border-green-200/50"
            >
              <FileText className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-900">View Reports</span>
            </button>
            
            <button
              onClick={() => setActiveTab('intensive')}
              className="flex items-center space-x-2 p-3 bg-red-50/80 hover:bg-red-100/80 rounded-lg transition-colors border border-red-200/50"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="text-sm font-medium text-red-900">ICU Patients</span>
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className="flex items-center space-x-2 p-3 bg-purple-50/80 hover:bg-purple-100/80 rounded-lg transition-colors border border-purple-200/50"
            >
              <Bell className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-purple-900">Notifications</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard