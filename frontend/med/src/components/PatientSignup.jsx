import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { User, Mail, Phone, Calendar, MapPin, Upload, ArrowLeft, Building2 } from 'lucide-react'

const PatientSignup = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    mobile: '',
    email: '',
    address: '',
    emergencyContact: '',
    emergencyRelation: '',
    bloodGroup: '',
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    previousReports: null
  })
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { registerPatient } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    })
    setError('')
  }

  const sendOtp = async () => {
    if (!formData.mobile) {
      setError('Please enter your mobile number')
      return
    }
    
    setShowOtp(true)
    setError('OTP sent to your mobile number. Use 123456 for demo.')
  }

  const verifyOtp = () => {
    if (otp !== '123456') {
      setError('Invalid OTP')
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.dateOfBirth || !formData.gender) {
        setError('Please fill all required fields')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!showOtp) {
        sendOtp()
        return
      }
      
      if (!verifyOtp()) return
      
      setStep(3)
    } else {
      setLoading(true)
      setError('')

      try {
        const result = await registerPatient(formData)
        
        if (result.success) {
          navigate('/dashboard')
        } else {
          setError(result.error || 'Registration failed')
        }
      } catch (err) {
        setError('Registration failed. Please try again.')
      }
      
      setLoading(false)
    }
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Personal Information</h3>
        <p className="text-gray-700">Step 1 of 3</p>
        <div className="w-16 h-0.5 bg-[#D7CCC8]/60 mx-auto mt-2"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            First Name *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Date of Birth *
        </label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Gender *
        </label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Blood Group
        </label>
        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
        <p className="text-gray-700">Step 2 of 3</p>
        <div className="w-16 h-0.5 bg-[#D7CCC8]/60 mx-auto mt-2"></div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Mobile Number *
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            placeholder="Enter your mobile number"
            required
          />
        </div>
      </div>

      {showOtp && (
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Enter OTP *
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            placeholder="Enter 6-digit OTP"
            maxLength="6"
            required
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Email Address *
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            rows="3"
            placeholder="Enter your complete address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Emergency Contact
          </label>
          <input
            type="tel"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            placeholder="Emergency contact number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-800 mb-2">
            Relation
          </label>
          <input
            type="text"
            name="emergencyRelation"
            value={formData.emergencyRelation}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            placeholder="e.g., Father, Mother, Spouse"
          />
        </div>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Medical Information</h3>
        <p className="text-gray-700">Step 3 of 3</p>
        <div className="w-16 h-0.5 bg-[#D7CCC8]/60 mx-auto mt-2"></div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Known Allergies
        </label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
          rows="2"
          placeholder="List any known allergies (medications, food, etc.)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Chronic Conditions
        </label>
        <textarea
          name="chronicConditions"
          value={formData.chronicConditions}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
          rows="2"
          placeholder="List any chronic medical conditions (diabetes, hypertension, etc.)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Current Medications
        </label>
        <textarea
          name="currentMedications"
          value={formData.currentMedications}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
          rows="2"
          placeholder="List current medications with dosage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-800 mb-2">
          Upload Previous Medical Reports
        </label>
        <div className="relative">
          <Upload className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="file"
            name="previousReports"
            onChange={handleInputChange}
            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 focus:shadow-[#D7CCC8]/20 focus:shadow-lg transition-all"
            accept=".pdf,.jpg,.jpeg,.png"
            multiple
          />
        </div>
        <p className="text-xs text-gray-600 mt-1 bg-[#D7CCC8]/10 px-3 py-1 rounded-lg">
          Upload PDF, JPG, or PNG files (optional)
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B3E5FC] via-[#E1F5FE] to-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25px 25px, rgba(179,229,252,0.4) 2px, transparent 0),
            radial-gradient(circle at 75px 75px, rgba(215,204,200,0.3) 1px, transparent 0)
          `,
          backgroundSize: '50px 50px, 100px 100px'
        }}></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-[#D7CCC8]/40 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-[#B3E5FC]/20 rounded-full blur-2xl animate-pulse delay-2000"></div>

      {/* Header with enhanced styling */}
      <header className="bg-white/80 backdrop-blur-md border-b-2 border-[#D7CCC8]/30 sticky top-0 z-40 relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D7CCC8]/50 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-[#D7CCC8] rounded-xl flex items-center justify-center mr-3 shadow-lg ring-2 ring-[#D7CCC8]/20">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediCare Plus</h1>
                <p className="text-xs text-gray-700">Patient Registration</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-[#D7CCC8] rounded-full flex items-center justify-center mb-4 shadow-lg ring-4 ring-[#D7CCC8]/20">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 relative">
            Patient Registration
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#D7CCC8]/60 rounded-full"></div>
          </h2>
          <p className="text-gray-700 mt-4">Join our healthcare platform</p>
        </div>

        <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border-2 border-[#D7CCC8]/30 p-8 relative overflow-hidden">
          {/* Top accent strip */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-[#D7CCC8] to-blue-500"></div>
          
          {/* Progress indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    step >= stepNumber 
                      ? 'bg-[#D7CCC8] text-white shadow-lg' 
                      : 'bg-white/60 text-gray-500 border border-gray-300'
                  }`}>
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div className={`w-12 h-0.5 mx-2 transition-all ${
                      step > stepNumber ? 'bg-[#D7CCC8]' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg relative">
              {/* Side accent bars */}
              <div className="absolute left-0 top-4 bottom-4 w-1 bg-[#D7CCC8]/60 rounded-r-full"></div>
              <div className="absolute right-0 top-4 bottom-4 w-1 bg-[#D7CCC8]/60 rounded-l-full"></div>
              
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {error && (
                <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 border-l-4 border-l-red-500 text-red-800 px-4 py-3 rounded-lg mt-6">
                  {error}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-colors shadow-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>
              )}

              <div className="flex-1" />

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-[#D7CCC8] text-white rounded-lg font-medium hover:from-blue-600 hover:to-[#BCAAA4] transition-all duration-200 disabled:opacity-50 shadow-lg hover:shadow-[#D7CCC8]/30 hover:shadow-xl relative overflow-hidden"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></div>
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : step === 3 ? (
                  'Complete Registration'
                ) : step === 2 && !showOtp ? (
                  'Send OTP'
                ) : (
                  'Next'
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-6">
            <Link
              to="/login"
              className="text-blue-700 hover:text-blue-800 text-sm font-medium hover:bg-[#D7CCC8]/10 px-3 py-1 rounded-lg transition-all"
            >
              Already have an account? Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientSignup