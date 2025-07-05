import { 
  ArrowLeft, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Thermometer, 
  Droplets, 
  Clock, 
  User, 
  Phone, 
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Bell,
  FileText,
  Pill,
  Monitor
} from 'lucide-react'
import { useState } from 'react'
import { useStaff } from '../context/StaffContext'

const IntensiveCarePage = () => {
  const { setActiveTab, intensiveCarePatients } = useStaff()
  const [selectedPatient, setSelectedPatient] = useState(null)

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'serious': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'stable': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getVitalStatus = (vital, value) => {
    // Simple vital status logic - in real app this would be more sophisticated
    switch (vital) {
      case 'bp':
        const [systolic] = value.split('/').map(Number)
        if (systolic > 140) return { status: 'high', color: 'text-red-600', icon: TrendingUp }
        if (systolic < 90) return { status: 'low', color: 'text-blue-600', icon: TrendingDown }
        return { status: 'normal', color: 'text-green-600', icon: Minus }
      case 'hr':
        const hr = parseInt(value)
        if (hr > 100) return { status: 'high', color: 'text-red-600', icon: TrendingUp }
        if (hr < 60) return { status: 'low', color: 'text-blue-600', icon: TrendingDown }
        return { status: 'normal', color: 'text-green-600', icon: Minus }
      case 'temp':
        const temp = parseFloat(value)
        if (temp > 99.5) return { status: 'high', color: 'text-red-600', icon: TrendingUp }
        if (temp < 97) return { status: 'low', color: 'text-blue-600', icon: TrendingDown }
        return { status: 'normal', color: 'text-green-600', icon: Minus }
      case 'o2':
        const o2 = parseInt(value)
        if (o2 < 90) return { status: 'low', color: 'text-red-600', icon: TrendingDown }
        if (o2 < 95) return { status: 'moderate', color: 'text-orange-600', icon: TrendingDown }
        return { status: 'normal', color: 'text-green-600', icon: Minus }
      default:
        return { status: 'normal', color: 'text-gray-600', icon: Minus }
    }
  }

  const icuStats = {
    totalBeds: 12,
    occupiedBeds: 8,
    criticalPatients: 3,
    stablePatients: 5,
    averageStay: '4.2 days',
    emergencyAlerts: 2
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">Intensive Care Unit</h2>
                <p className="text-gray-600">Monitor and manage critical patients</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg">
              <Bell className="w-4 h-4" />
              <span>Emergency Alert</span>
            </button>
          </div>
        </div>

        {/* ICU Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200/50 text-center">
            <p className="text-2xl font-bold text-blue-900">{icuStats.totalBeds}</p>
            <p className="text-sm text-blue-700">Total Beds</p>
          </div>
          <div className="bg-orange-50/80 p-4 rounded-lg border border-orange-200/50 text-center">
            <p className="text-2xl font-bold text-orange-900">{icuStats.occupiedBeds}</p>
            <p className="text-sm text-orange-700">Occupied</p>
          </div>
          <div className="bg-red-50/80 p-4 rounded-lg border border-red-200/50 text-center">
            <p className="text-2xl font-bold text-red-900">{icuStats.criticalPatients}</p>
            <p className="text-sm text-red-700">Critical</p>
          </div>
          <div className="bg-green-50/80 p-4 rounded-lg border border-green-200/50 text-center">
            <p className="text-2xl font-bold text-green-900">{icuStats.stablePatients}</p>
            <p className="text-sm text-green-700">Stable</p>
          </div>
          <div className="bg-purple-50/80 p-4 rounded-lg border border-purple-200/50 text-center">
            <p className="text-lg font-bold text-purple-900">{icuStats.averageStay}</p>
            <p className="text-sm text-purple-700">Avg Stay</p>
          </div>
          <div className="bg-yellow-50/80 p-4 rounded-lg border border-yellow-200/50 text-center">
            <p className="text-2xl font-bold text-yellow-900">{icuStats.emergencyAlerts}</p>
            <p className="text-sm text-yellow-700">Alerts</p>
          </div>
        </div>
      </div>

      {/* ICU Patients Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {intensiveCarePatients.map((patient) => (
          <div
            key={patient.id}
            className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-red-200/50 p-6 hover:shadow-xl transition-all cursor-pointer"
            onClick={() => setSelectedPatient(selectedPatient?.id === patient.id ? null : patient)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-red-600">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{patient.age} years • {patient.room}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSeverityColor(patient.severity)}`}>
                {patient.severity}
              </span>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">{patient.condition}</h4>
              <p className="text-sm text-gray-600">Admitted: {patient.admissionDate}</p>
            </div>

            {/* Vital Signs */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {Object.entries(patient.vitals).map(([key, value]) => {
                const vitalStatus = getVitalStatus(key, value)
                const StatusIcon = vitalStatus.icon
                return (
                  <div key={key} className="bg-gray-50/80 p-3 rounded-lg border border-gray-200/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-600 uppercase tracking-wide">
                          {key === 'bp' ? 'Blood Pressure' : 
                           key === 'hr' ? 'Heart Rate' : 
                           key === 'temp' ? 'Temperature' : 
                           key === 'o2' ? 'Oxygen Sat' : key}
                        </p>
                        <p className="font-semibold text-gray-900">{value}</p>
                      </div>
                      <StatusIcon className={`w-4 h-4 ${vitalStatus.color}`} />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Expanded Details */}
            {selectedPatient?.id === patient.id && (
              <div className="border-t border-gray-200 pt-4 space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Current Monitoring</h5>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Monitor className="w-4 h-4 text-blue-600" />
                      <span>Cardiac Monitor</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-green-600" />
                      <span>Pulse Oximeter</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span>Blood Pressure</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Thermometer className="w-4 h-4 text-orange-600" />
                      <span>Temperature</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Care Team</h5>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Dr. Sarah Johnson (Attending)</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Nurse Emma Wilson (Primary)</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-1 p-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm">
                    <FileText className="w-4 h-4" />
                    <span>View Chart</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-1 p-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm">
                    <Pill className="w-4 h-4" />
                    <span>Medications</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ICU Bed Status */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">ICU Bed Status</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array.from({ length: 12 }, (_, i) => {
            const bedNumber = i + 1
            const isOccupied = bedNumber <= 8
            const patient = intensiveCarePatients.find(p => p.room === `ICU-${bedNumber}`)
            
            return (
              <div
                key={bedNumber}
                className={`p-4 rounded-lg border-2 transition-all ${
                  isOccupied 
                    ? patient?.severity === 'Critical' 
                      ? 'bg-red-50 border-red-200 hover:border-red-300' 
                      : patient?.severity === 'Serious'
                      ? 'bg-orange-50 border-orange-200 hover:border-orange-300'
                      : 'bg-green-50 border-green-200 hover:border-green-300'
                    : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                    isOccupied 
                      ? patient?.severity === 'Critical' 
                        ? 'bg-red-100' 
                        : patient?.severity === 'Serious'
                        ? 'bg-orange-100'
                        : 'bg-green-100'
                      : 'bg-gray-100'
                  }`}>
                    <span className={`text-sm font-bold ${
                      isOccupied 
                        ? patient?.severity === 'Critical' 
                          ? 'text-red-600' 
                          : patient?.severity === 'Serious'
                          ? 'text-orange-600'
                          : 'text-green-600'
                        : 'text-gray-600'
                    }`}>
                      {bedNumber}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-gray-900">ICU-{bedNumber}</p>
                  <p className={`text-xs ${
                    isOccupied 
                      ? patient?.severity === 'Critical' 
                        ? 'text-red-600' 
                        : patient?.severity === 'Serious'
                        ? 'text-orange-600'
                        : 'text-green-600'
                      : 'text-gray-600'
                  }`}>
                    {isOccupied ? patient?.severity || 'Occupied' : 'Available'}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-200 rounded-full"></div>
            <span>Critical</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-200 rounded-full"></div>
            <span>Serious</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-200 rounded-full"></div>
            <span>Stable</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
            <span>Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntensiveCarePage