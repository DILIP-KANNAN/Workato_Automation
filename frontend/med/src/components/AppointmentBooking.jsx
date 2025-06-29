import { 
  Calendar, 
  Stethoscope, 
  Plus, 
  Activity, 
  ChevronRight,
  Clock,
  Heart,
  Building2
} from 'lucide-react'
import { useAppointment } from '../context/AppointmentContext'

const AppointmentBooking = () => {
  const { 
    previousServices, 
    medicalServices,
    scanServices,
    setSelectedService, 
    setShowDatePicker, 
    setShowServiceSelector,
    setShowDiagnosticSelector
  } = useAppointment()

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
          <Calendar className="w-7 h-7 mr-3 text-blue-600" />
          Book New Appointment
        </h3>
        <div className="text-sm text-gray-600 bg-blue-50/80 px-4 py-2 rounded-lg">
          Available slots: Mon-Fri 8AM-6PM, Sat 9AM-2PM
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Previous Services */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-green-600" />
            Continue Previous Treatment
          </h4>
          <p className="text-sm text-gray-600 mb-4">Quick booking for your ongoing treatments</p>
          
          {previousServices.length > 0 ? (
            <div className="space-y-3">
              {previousServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service)
                      setShowDatePicker(true)
                    }}
                    className="w-full flex items-center space-x-4 p-4 bg-white/80 hover:bg-[#D7CCC8]/20 rounded-xl border border-[#D7CCC8]/20 hover:border-[#D7CCC8]/40 transition-all group"
                  >
                    <div className="w-12 h-12 bg-gray-100 group-hover:bg-[#D7CCC8]/30 rounded-xl flex items-center justify-center transition-colors">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">Last visit: {service.lastVisit}</p>
                      <p className="text-xs text-green-600">✓ Medical history available</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#D7CCC8] transition-colors" />
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50/80 rounded-xl border border-gray-200/50">
              <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No previous treatments</p>
            </div>
          )}
        </div>

        {/* New Appointments */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
            New Consultation
          </h4>
          <p className="text-sm text-gray-600 mb-4">Book a new appointment or general checkup</p>

          <div className="space-y-3">
            {/* General Consultation */}
            <button
              onClick={() => {
                setSelectedService({ name: 'General Consultation' })
                setShowDatePicker(true)
              }}
              className="w-full flex items-center space-x-4 p-4 bg-blue-50/80 hover:bg-blue-100/80 rounded-xl border border-blue-200/50 hover:border-blue-300/50 transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center transition-colors">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">General Consultation</p>
                <p className="text-sm text-gray-600">Comprehensive health checkup</p>
                <p className="text-xs text-blue-600">Duration: 30-45 minutes</p>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Specialized Services */}
            <button
              onClick={() => setShowServiceSelector(true)}
              className="w-full flex items-center space-x-4 p-4 bg-[#D7CCC8]/20 hover:bg-[#D7CCC8]/30 rounded-xl border border-[#D7CCC8]/30 hover:border-[#D7CCC8]/50 transition-all group"
            >
              <div className="w-12 h-12 bg-[#D7CCC8]/40 group-hover:bg-[#D7CCC8]/60 rounded-xl flex items-center justify-center transition-colors">
                <Plus className="w-6 h-6 text-gray-700" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Specialized Services</p>
                <p className="text-sm text-gray-600">Choose from {medicalServices.length} departments</p>
                <p className="text-xs text-gray-500">Cardiology, Neurology, Orthopedics & more</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-600 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Diagnostic Services */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-purple-600" />
            Diagnostic Services
          </h4>
          <p className="text-sm text-gray-600 mb-4">Book scans, tests, and diagnostic procedures</p>

          <div className="space-y-3">
            {/* Diagnostic Services Selector */}
            <button
              onClick={() => setShowDiagnosticSelector(true)}
              className="w-full flex items-center space-x-4 p-4 bg-purple-50/80 hover:bg-purple-100/80 rounded-xl border border-purple-200/50 hover:border-purple-300/50 transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center transition-colors">
                <Activity className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Select Diagnostic Service</p>
                <p className="text-sm text-gray-600">X-Ray, CT Scan, MRI, Blood Tests & more</p>
                <p className="text-xs text-purple-600">{scanServices.length} services available</p>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Quick Access - Most Common Tests */}
            <div className="bg-gray-50/80 p-4 rounded-xl border border-gray-200/50">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Quick Access</h5>
              <div className="space-y-2">
                {scanServices.slice(0, 3).map((service) => (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service)
                      setShowDatePicker(true)
                    }}
                    className="w-full text-left p-2 hover:bg-white/80 rounded-lg transition-colors text-sm"
                  >
                    <span className="font-medium text-gray-900">{service.name}</span>
                    <span className="text-gray-600 ml-2">({service.duration})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppointmentBooking