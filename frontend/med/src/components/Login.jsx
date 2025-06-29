import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  User, 
  Lock, 
  Phone, 
  Shield, 
  UserPlus, 
  Building2, 
  Heart, 
  Stethoscope, 
  Activity, 
  Users, 
  Clock, 
  Award,
  ChevronRight,
  Star,
  CheckCircle,
  MapPin,
  Mail
} from 'lucide-react'

const Login = () => {
  const [userType, setUserType] = useState('')
  const [formData, setFormData] = useState({
    staffId: '',
    password: '',
    patientId: '',
    mobile: '',
    otp: ''
  })
  const [showOtp, setShowOtp] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { loginStaff, loginPatient } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const sendOtp = async () => {
    if (!formData.patientId || !formData.mobile) {
      setError('Please enter Patient ID and Mobile Number')
      return
    }
    
    setShowOtp(true)
    setError('OTP sent to your mobile number. Use 123456 for demo.')
  }

  const handleStaffLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await loginStaff(formData.staffId, formData.password)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const handlePatientLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const result = await loginPatient(formData.patientId, formData.mobile, formData.otp)
    
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }

  const services = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Advanced heart care with state-of-the-art equipment and experienced cardiologists",
      color: "bg-red-100 text-red-600",
      bgColor: "bg-red-50"
    },
    {
      icon: Activity,
      title: "Emergency Care", 
      description: "24/7 emergency services with rapid response and critical care facilities",
      color: "bg-orange-100 text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Comprehensive healthcare services for all age groups and medical conditions",
      color: "bg-blue-100 text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: "Pediatrics",
      description: "Specialized medical care designed specifically for children and adolescents",
      color: "bg-green-100 text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Building2,
      title: "Surgery",
      description: "Advanced surgical procedures with minimally invasive techniques",
      color: "bg-purple-100 text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Star,
      title: "Oncology",
      description: "Comprehensive cancer care with latest treatment protocols",
      color: "bg-pink-100 text-pink-600",
      bgColor: "bg-pink-50"
    }
  ]

  const features = [
    "Digital Health Records",
    "Online Appointment Booking", 
    "Telemedicine Consultations",
    "Prescription Management",
    "Insurance Integration",
    "24/7 Patient Support"
  ]

  const stats = [
    { number: "50,000+", label: "Patients Served" },
    { number: "200+", label: "Medical Experts" },
    { number: "15+", label: "Specialties" },
    { number: "24/7", label: "Emergency Care" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#B3E5FC] via-[#E1F5FE] to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(179,229,252,0.4) 2px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-[#D7CCC8]/20 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-[#B3E5FC]/20 rounded-full blur-2xl animate-pulse delay-2000"></div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200/40 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-xxl flex items-center justify-center mr-3 shadow-lg">
                <img src='Preview.png' className='rounded-2xl'></img>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">VitalCare</h1>
                <p className="text-xs text-gray-700">Advanced Healthcare Management</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Phone className="w-4 h-4" />
                <span className="font-semibold">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-700">
                <Mail className="w-4 h-4" />
                <span>info@medicareplus.com</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Left Content - 8 columns */}
          <div className="lg:col-span-8">
            {/* Hero Section */}
            <div className="mb-16">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Health,
                <span className="text-black"> Our Priority</span>
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience world-class healthcare with our comprehensive hospital management system. 
                From appointment booking to medical records, we've revolutionized patient care.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-blue-200/50 shadow-lg hover:border-[#D7CCC8]/30 transition-colors">
                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                    <div className="text-sm text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-200/40 shadow-lg hover:border-[#D7CCC8]/30 transition-colors">
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Hospital Image */}
              <div className="mb-12">
                <img 
                  src="https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                  alt="Modern Hospital Building" 
                  className="w-full h-80 object-cover rounded-3xl shadow-2xl border border-[#D7CCC8]/20"
                />
              </div>
            </div>
          </div>

          {/* Right Login Form - 4 columns */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#D7CCC8]/20 p-8">
                <div className="text-center mb-6">
                  <div className="mx-auto w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                    <img src='Preview.png' className='rounded-2xl'></img>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                  <p className="text-gray-700 mt-1">Access your healthcare portal</p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
                  {!userType ? (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-center mb-6 text-gray-900">Select User Type</h3>
                      
                      <button
                        onClick={() => setUserType('patient')}
                        className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl hover:bg-white/90 hover:border-[#D7CCC8]/30 transition-all group shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">Patient</div>
                            <div className="text-sm text-gray-700">Access your medical records</div>
                          </div>
                        </div>
                      </button>

                      <button
                        onClick={() => setUserType('staff')}
                        className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl hover:bg-white/90 hover:border-[#D7CCC8]/30 transition-all group shadow-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                            <Shield className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900">Medical Staff</div>
                            <div className="text-sm text-gray-700">Doctor & Nurse portal</div>
                          </div>
                        </div>
                      </button>
                    </div>
                  ) : userType === 'staff' ? (
                    <form onSubmit={handleStaffLogin} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Staff Login</h3>
                        <p className="text-gray-700 text-sm">Enter your credentials</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Staff ID
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="staffId"
                            value={formData.staffId}
                            onChange={handleInputChange}
                            placeholder="Enter staff ID"
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter password"
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                            required
                          />
                        </div>
                      </div>

                      {error && (
                        <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-500 to-[#D7CCC8] text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-[#BCAAA4] transition-all duration-200 disabled:opacity-50 shadow-lg"
                      >
                        {loading ? (
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                        ) : (
                          'Login'
                        )}
                      </button>

                      <div className="text-center">
                        <p className="text-xs text-gray-700">
                          Demo: DOC001/doctor123, NUR001/nurse123
                        </p>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handlePatientLogin} className="space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-900">Patient Login</h3>
                        <p className="text-gray-700 text-sm">Enter your details</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Patient ID
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="text"
                            name="patientId"
                            value={formData.patientId}
                            onChange={handleInputChange}
                            placeholder="Enter patient ID"
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-800 mb-2">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                          <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                            required
                          />
                        </div>
                      </div>

                      {!showOtp ? (
                        <button
                          type="button"
                          onClick={sendOtp}
                          className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-colors shadow-lg"
                        >
                          Send OTP
                        </button>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium text-gray-800 mb-2">
                            Enter OTP
                          </label>
                          <input
                            type="text"
                            name="otp"
                            value={formData.otp}
                            onChange={handleInputChange}
                            placeholder="Enter 6-digit OTP"
                            className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                            maxLength="6"
                            required
                          />
                        </div>
                      )}

                      {error && (
                        <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                          {error}
                        </div>
                      )}

                      {showOtp && (
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full bg-gradient-to-r from-blue-500 to-[#D7CCC8] text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-[#BCAAA4] transition-all duration-200 disabled:opacity-50 shadow-lg"
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                          ) : (
                            'Verify & Login'
                          )}
                        </button>
                      )}

                      <div className="text-center space-y-2">
                        <p className="text-xs text-gray-700">
                          Demo: PAT001, Mobile: 1234567890
                        </p>
                        <Link
                          to="/signup"
                          className="inline-flex items-center text-blue-700 hover:text-blue-800 text-sm font-medium"
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          New Patient? Register
                        </Link>
                      </div>
                    </form>
                  )}

                  {userType && (
                    <button
                      onClick={() => {
                        setUserType('')
                        setFormData({
                          staffId: '',
                          password: '',
                          patientId: '',
                          mobile: '',
                          otp: ''
                        })
                        setShowOtp(false)
                        setError('')
                      }}
                      className="mt-4 text-sm text-gray-700 hover:text-gray-900 w-full text-center font-medium"
                    >
                      ← Back to user selection
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Mobile Hero Section */}
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Your Health,
              <span className="text-black"> Our Priority</span>
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Experience world-class healthcare with our comprehensive hospital management system.
            </p>
            
            {/* Mobile Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 text-center border border-blue-200/50 shadow-lg hover:border-[#D7CCC8]/30 transition-colors">
                  <div className="text-xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-xs text-gray-700">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Login Form */}
          <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl border border-[#D7CCC8]/20 p-6">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-[#D7CCC8] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
              <p className="text-gray-700 mt-1">Access your healthcare portal</p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg">
              {/* Same form content as desktop but optimized for mobile */}
              {!userType ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-center mb-6 text-gray-900">Select User Type</h3>
                  
                  <button
                    onClick={() => setUserType('patient')}
                    className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl hover:bg-white/90 hover:border-[#D7CCC8]/30 transition-all group shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Patient</div>
                        <div className="text-sm text-gray-700">Access your medical records</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setUserType('staff')}
                    className="w-full p-4 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-xl hover:bg-white/90 hover:border-[#D7CCC8]/30 transition-all group shadow-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold text-gray-900">Medical Staff</div>
                        <div className="text-sm text-gray-700">Doctor & Nurse portal</div>
                      </div>
                    </div>
                  </button>
                </div>
              ) : userType === 'staff' ? (
                <form onSubmit={handleStaffLogin} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Staff Login</h3>
                    <p className="text-gray-700 text-sm">Enter your credentials</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Staff ID
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="staffId"
                        value={formData.staffId}
                        onChange={handleInputChange}
                        placeholder="Enter staff ID"
                        className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 to-[#D7CCC8] text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-[#BCAAA4] transition-all duration-200 disabled:opacity-50 shadow-lg"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                    ) : (
                      'Login'
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-xs text-gray-700">
                      Demo: DOC001/doctor123, NUR001/nurse123
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handlePatientLogin} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Patient Login</h3>
                    <p className="text-gray-700 text-sm">Enter your details</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Patient ID
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleInputChange}
                        placeholder="Enter patient ID"
                        className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="Enter mobile number"
                        className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                        required
                      />
                    </div>
                  </div>

                  {!showOtp ? (
                    <button
                      type="button"
                      onClick={sendOtp}
                      className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-colors shadow-lg"
                    >
                      Send OTP
                    </button>
                  ) : (
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-2">
                        Enter OTP
                      </label>
                      <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={handleInputChange}
                        placeholder="Enter 6-digit OTP"
                        className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-gray-900 placeholder-gray-600"
                        maxLength="6"
                        required
                      />
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-100/80 backdrop-blur-sm border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {showOtp && (
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-500 to-[#D7CCC8] text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-[#BCAAA4] transition-all duration-200 disabled:opacity-50 shadow-lg"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mx-auto"></div>
                      ) : (
                        'Verify & Login'
                      )}
                    </button>
                  )}

                  <div className="text-center space-y-2">
                    <p className="text-xs text-gray-700">
                      Demo: PAT001, Mobile: 1234567890
                    </p>
                    <Link
                      to="/signup"
                      className="inline-flex items-center text-blue-700 hover:text-blue-800 text-sm font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      New Patient? Register
                    </Link>
                  </div>
                </form>
              )}

              {userType && (
                <button
                  onClick={() => {
                    setUserType('')
                    setFormData({
                      staffId: '',
                      password: '',
                      patientId: '',
                      mobile: '',
                      otp: ''
                    })
                    setShowOtp(false)
                    setError('')
                  }}
                  className="mt-4 text-sm text-gray-700 hover:text-gray-900 w-full text-center font-medium"
                >
                  ← Back to user selection
                </button>
              )}
            </div>
          </div>

          {/* Mobile Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-blue-200/40 shadow-lg hover:border-[#D7CCC8]/30 transition-colors">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-gray-800 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Medical Services Section - Full Width */}
        <div className="mt-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Medical Services</h3>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered by our team of experienced medical professionals
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="group">
                <div className="bg-white/60 backdrop-blur-sm p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-blue-200/40 hover:border-[#D7CCC8]/30">
                  <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <service.icon className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h4>
                  <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                  <div className="flex items-center text-blue-700 font-medium group-hover:text-blue-800">
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-16 bg-white/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-[#D7CCC8]/20 shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose MediCare Plus?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-[#D7CCC8]/10">
                <Users className="w-10 h-10 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Expert Doctors</h4>
              <p className="text-gray-700">Board-certified specialists with years of experience in their respective fields</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-[#D7CCC8]/10">
                <Activity className="w-10 h-10 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Advanced Technology</h4>
              <p className="text-gray-700">State-of-the-art medical equipment and cutting-edge treatment facilities</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg border border-[#D7CCC8]/10">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-3 text-lg">Compassionate Care</h4>
              <p className="text-gray-700">Patient-centered approach with personalized treatment plans and dedicated support</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-16 bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-blue-200/50 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-gray-700">123 Healthcare Avenue<br />Medical District, MD 12345</p>
            </div>
            <div>
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-700">Emergency: (555) 911-HELP<br />General: (555) 123-4567</p>
            </div>
            <div>
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h4 className="font-semibold text-gray-900 mb-2">Hours</h4>
              <p className="text-gray-700">24/7 Emergency Care<br />Mon-Fri: 8AM-8PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login