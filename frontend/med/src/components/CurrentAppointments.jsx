import { 
  Activity, 
  Calendar, 
  MapPin, 
  Phone, 
  ChevronDown,
  Clock,
  User,
  FileText,
  AlertCircle,
  CheckCircle2,
  Stethoscope
} from 'lucide-react'
import { useAppointment } from '../context/AppointmentContext'

const CurrentAppointments = () => {
  const { 
    currentAppointments, 
    currentAppointmentIndex, 
    nextAppointment, 
    prevAppointment, 
    cancelAppointment,
    setShowServiceSelector
  } = useAppointment()

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6 h-[700px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-blue-600" />
            Current Appointments
          </h3>
          {currentAppointments.length > 1 && (
            <div className="flex items-center space-x-2">
              <button
                onClick={prevAppointment}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              <span className="text-sm text-gray-600 px-2">
                {currentAppointmentIndex + 1}/{currentAppointments.length}
              </span>
              <button
                onClick={nextAppointment}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Current Appointments */}
          {currentAppointments.length > 0 ? (
            <div className="space-y-4">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#D7CCC8]/20 p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 ${
                    currentAppointments[currentAppointmentIndex].service === 'Cardiology' ? 'bg-red-100' : 
                    currentAppointments[currentAppointmentIndex].service === 'General Medicine' ? 'bg-blue-100' : 
                    'bg-purple-100'
                  } rounded-xl flex items-center justify-center`}>
                    {(() => {
                      const IconComponent = currentAppointments[currentAppointmentIndex].icon
                      return (
                        <IconComponent className={`w-8 h-8 ${
                          currentAppointments[currentAppointmentIndex].service === 'Cardiology' ? 'text-red-600' : 
                          currentAppointments[currentAppointmentIndex].service === 'General Medicine' ? 'text-blue-600' : 
                          'text-purple-600'
                        }`} />
                      )
                    })()}
                  </div>
                  <div className="flex-1">
                    <h5 className="text-lg font-semibold text-gray-900">{currentAppointments[currentAppointmentIndex].service}</h5>
                    <p className="text-gray-600 flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {currentAppointments[currentAppointmentIndex].doctor}
                    </p>
                    <p className="text-sm text-gray-500">{currentAppointments[currentAppointmentIndex].type}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentAppointments[currentAppointmentIndex].status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {currentAppointments[currentAppointmentIndex].status === 'confirmed' ? (
                      <CheckCircle2 className="w-4 h-4 inline mr-1" />
                    ) : (
                      <AlertCircle className="w-4 h-4 inline mr-1" />
                    )}
                    {currentAppointments[currentAppointmentIndex].status}
                  </div>
                </div>

                {/* Main Appointment Info */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Date & Time</span>
                      </div>
                      <p className="text-blue-800 font-semibold">{currentAppointments[currentAppointmentIndex].date}</p>
                      <p className="text-blue-700 flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {currentAppointments[currentAppointmentIndex].time}
                      </p>
                    </div>

                    <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-200/30">
                      <div className="flex items-center space-x-2 mb-2">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <span className="font-medium text-gray-900">Location</span>
                      </div>
                      <p className="text-gray-800 font-semibold">{currentAppointments[currentAppointmentIndex].location}</p>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-green-50/80 p-4 rounded-lg border border-green-200/30">
                    <h6 className="font-medium text-green-900 mb-2">Contact & Reception</h6>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">Department: (555) 123-4567</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>Receptionist: Sarah Miller</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1">
                          <Phone className="w-4 h-4" />
                          <span className="font-medium">Emergency: (555) 911-HELP</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Arrive 15 mins early</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* General Information */}
                  <div className="bg-yellow-50/80 p-4 rounded-lg border border-yellow-200/30">
                    <h6 className="font-medium text-yellow-900 mb-2">General Information</h6>
                    <ul className="text-sm text-yellow-800 space-y-1">
                      <li>• Bring your ID and insurance card</li>
                      <li>• Bring a list of current medications</li>
                      <li>• Fasting not required for this appointment</li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3">
                    <button className="flex-1 flex items-center justify-center space-x-2 p-3 bg-[#D7CCC8]/20 hover:bg-[#D7CCC8]/30 rounded-lg transition-colors border border-[#D7CCC8]/30">
                      <FileText className="w-4 h-4" />
                      <span className="text-sm font-medium">View Reports</span>
                    </button>
                    <button 
                      onClick={() => cancelAppointment(currentAppointments[currentAppointmentIndex].id)}
                      className="flex-1 flex items-center justify-center space-x-2 p-3 bg-red-100/80 hover:bg-red-200/80 rounded-lg transition-colors border border-red-200/50 text-red-700"
                    >
                      <span className="text-sm font-medium">Cancel</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-10 h-10 text-gray-400" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Appointments</h4>
              <p className="text-gray-600 mb-6">Schedule your next appointment to continue your healthcare journey</p>
              <button 
                onClick={() => setShowServiceSelector(true)}
                className="btn btn-primary"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CurrentAppointments