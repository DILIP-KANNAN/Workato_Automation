import { X } from 'lucide-react'
import { useAppointment } from '../context/AppointmentContext'

const AppointmentModals = () => {
  const {
    showServiceSelector,
    showDatePicker,
    showDiagnosticSelector,
    selectedService,
    selectedDate,
    selectedTime,
    medicalServices,
    scanServices,
    setShowServiceSelector,
    setShowDatePicker,
    setShowDiagnosticSelector,
    setSelectedService,
    setSelectedDate,
    setSelectedTime,
    handleServiceSelect,
    handleAppointmentBooking,
    getMinDate
  } = useAppointment()

  return (
    <>
      {/* Service Selector Modal */}
      {showServiceSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#D7CCC8]/30 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Medical Service</h3>
              <button
                onClick={() => setShowServiceSelector(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {medicalServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service)}
                    className="flex items-center space-x-4 p-4 bg-white/80 hover:bg-[#D7CCC8]/20 rounded-xl border border-blue-200/50 hover:border-[#D7CCC8]/40 transition-all text-left"
                  >
                    <div className={`w-12 h-12 ${service.bgColor} rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-6 h-6 ${service.color}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">Specialized care</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Diagnostic Services Selector Modal */}
      {showDiagnosticSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#D7CCC8]/30 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Diagnostic Service</h3>
              <button
                onClick={() => setShowDiagnosticSelector(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scanServices.map((service) => {
                const IconComponent = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => {
                      setSelectedService(service)
                      setShowDiagnosticSelector(false)
                      setShowDatePicker(true)
                    }}
                    className="flex items-center space-x-4 p-4 bg-white/80 hover:bg-purple-50/80 rounded-xl border border-purple-200/50 hover:border-purple-300/50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-sm text-gray-600">{service.description}</p>
                      <p className="text-xs text-purple-600">{service.duration}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#D7CCC8]/30 p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Select Date & Time</h3>
              <button
                onClick={() => {
                  setShowDatePicker(false)
                  setSelectedDate('')
                  setSelectedTime('')
                }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service: {selectedService?.name}
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getMinDate()}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8]"
                  required
                />
              </div>

              <div className="bg-blue-50/80 p-3 rounded-lg border border-blue-200/50">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> The slot you are selecting is only for knowing your preference. The actual time of the appointment may vary based on doctor availability.
                </p>
              </div>

              <button
                onClick={() => handleAppointmentBooking('specific', selectedService)}
                disabled={!selectedDate || !selectedTime}
                className="w-full bg-gradient-to-r from-blue-500 to-[#D7CCC8] text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-[#BCAAA4] transition-all duration-200 disabled:opacity-50 shadow-lg"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AppointmentModals