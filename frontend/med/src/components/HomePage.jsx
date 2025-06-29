import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useAppointment } from '../context/AppointmentContext'
import { useChat } from '../context/ChatContext'
import CurrentAppointments from './CurrentAppointments'
import HealthAssistant from './HealthAssistant'
import AppointmentBooking from './AppointmentBooking'
import AppointmentModals from './AppointmentModals'
import { CheckCircle, X } from 'lucide-react'

const HomePage = () => {
  const { user } = useAuth()
  const { appointmentSuccess, setAppointmentSuccess, ongoingTreatment } = useAppointment()
  const { initializeChat } = useChat()

  useEffect(() => {
    if (user && initializeChat) {
      initializeChat(user, ongoingTreatment)
    }
  }, [user?.id, initializeChat]) // Only depend on user.id to avoid unnecessary re-renders

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {appointmentSuccess && (
        <div className="bg-green-50/80 backdrop-blur-sm border border-green-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Appointment Booked Successfully!</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-800">
                <div><strong>Service:</strong> {appointmentSuccess.service}</div>
                <div><strong>Doctor:</strong> {appointmentSuccess.doctor}</div>
                <div><strong>Date & Time:</strong> {appointmentSuccess.date} at {appointmentSuccess.time}</div>
                <div><strong>Location:</strong> {appointmentSuccess.location}</div>
              </div>
              <p className="text-sm text-green-700 mt-3">
                You will receive a confirmation SMS and email shortly. Please arrive 15 minutes early.
              </p>
              <p className="text-xs text-green-600 mt-2 bg-green-100/50 p-2 rounded-lg">
                <strong>Note:</strong> The slot you selected is for knowing your preference. The actual time may vary based on doctor availability.
              </p>
            </div>
            <button
              onClick={() => setAppointmentSuccess(null)}
              className="text-green-600 hover:text-green-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Top Row: Current Appointments and Health Assistant Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CurrentAppointments />
        <HealthAssistant />
      </div>

      {/* Bottom Row: Appointment Booking - Full Width */}
      <div className="w-full">
        <AppointmentBooking />
      </div>

      <AppointmentModals />
    </div>
  )
}

export default HomePage