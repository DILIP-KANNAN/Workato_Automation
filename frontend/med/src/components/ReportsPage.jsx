import { 
  FileText, 
  Building2, 
  Download, 
  Printer, 
  Eye, 
  Stethoscope, 
  Heart, 
  Activity, 
  Calendar, 
  Pill 
} from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useReports } from '../context/ReportsContext'
import ServiceReportPage from './ServiceReportPage'

const ReportsPage = () => {
  const { user } = useAuth()
  const { medicalReports, downloadGeneralReport } = useReports()
  const [selectedReport, setSelectedReport] = useState(null)

  if (selectedReport) {
    return <ServiceReportPage service={selectedReport} onBack={() => setSelectedReport(null)} />
  }

  return (
    <div className="space-y-8">
      {/* General Medical Report Summary */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold text-gray-900 flex items-center">
            <FileText className="w-6 h-6 mr-3 text-blue-600" />
            General Medical Summary
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => downloadGeneralReport(user)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-lg">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Consultations</p>
                <p className="text-2xl font-bold text-blue-900">15</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-green-50/80 backdrop-blur-sm rounded-xl p-6 border border-green-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Active Treatments</p>
                <p className="text-2xl font-bold text-green-900">2</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-purple-50/80 backdrop-blur-sm rounded-xl p-6 border border-purple-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-purple-600 font-medium">Medications</p>
                <p className="text-2xl font-bold text-purple-900">4</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Pill className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-orange-50/80 backdrop-blur-sm rounded-xl p-6 border border-orange-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Last Visit</p>
                <p className="text-lg font-bold text-orange-900">Dec 15</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Concise Patient Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-[#D7CCC8]/30 pb-2">Patient Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Name:</span>
                <span className="font-medium text-gray-900">{user.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ID:</span>
                <span className="font-medium text-gray-900">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Age:</span>
                <span className="font-medium text-gray-900">34 years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Blood Group:</span>
                <span className="font-medium text-gray-900">O+</span>
              </div>
            </div>
          </div>

          {/* Current Conditions */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-[#D7CCC8]/30 pb-2">Active Conditions</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Hypertension (Controlled)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Mild Cardiac Arrhythmia</span>
              </div>
            </div>
          </div>

          {/* Allergies & Emergency */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-gray-900 border-b border-[#D7CCC8]/30 pb-2">Important Notes</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Allergies:</span>
                <div className="mt-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-gray-700">Penicillin</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700">Shellfish</span>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <span className="text-gray-600">Emergency Contact:</span>
                <p className="text-gray-700">Jane Doe (Spouse)</p>
                <p className="text-gray-700">(555) 987-6543</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service-Specific Reports */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-3 text-blue-600" />
          Service Reports
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {medicalReports.map((report) => {
            const IconComponent = report.icon
            return (
              <div key={report.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#D7CCC8]/20 hover:border-[#D7CCC8]/40 transition-all hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${report.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${report.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{report.service}</h4>
                    <p className="text-sm text-gray-600">{report.doctor}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Latest Visit:</span>
                    <span className="font-medium text-gray-900">{report.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">{report.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {report.status}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedReport(report)}
                    className="flex-1 flex items-center justify-center space-x-2 p-2 bg-blue-100/80 hover:bg-blue-200/80 rounded-lg transition-colors border border-blue-200/50"
                  >
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 p-2 bg-green-100/80 hover:bg-green-200/80 rounded-lg transition-colors border border-green-200/50">
                    <Download className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">Download</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ReportsPage