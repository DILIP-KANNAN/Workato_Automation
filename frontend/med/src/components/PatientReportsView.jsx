import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Printer, 
  Calendar, 
  User, 
  Phone, 
  Mail, 
  Heart, 
  Activity, 
  Pill,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'
import { useStaff } from '../context/StaffContext'

const PatientReportsView = () => {
  const { selectedPatient, setShowPatientReports } = useStaff()

  if (!selectedPatient) return null

  const patientReports = [
    {
      id: 1,
      service: 'Cardiology',
      date: '2024-12-15',
      type: 'Follow-up Consultation',
      status: 'completed',
      doctor: 'Dr. Sarah Johnson',
      findings: 'Blood pressure well controlled. Patient shows good compliance with medication regimen.',
      recommendations: 'Continue current medications. Home BP monitoring. Follow-up in 3 months.',
      vitals: { bp: '128/82', hr: '72', temp: '98.6°F', weight: '180 lbs' }
    },
    {
      id: 2,
      service: 'General Medicine',
      date: '2024-11-20',
      type: 'Annual Health Checkup',
      status: 'completed',
      doctor: 'Dr. Michael Chen',
      findings: 'Overall health status good. All preventive care measures up to date.',
      recommendations: 'Continue current lifestyle. Annual screening tests ordered.',
      vitals: { bp: '125/80', hr: '70', temp: '98.4°F', weight: '178 lbs' }
    },
    {
      id: 3,
      service: 'Laboratory',
      date: '2024-10-15',
      type: 'Blood Work',
      status: 'completed',
      doctor: 'Dr. Lisa Park',
      findings: 'Cholesterol levels slightly elevated. Kidney function normal.',
      recommendations: 'Dietary modifications recommended. Recheck in 3 months.',
      vitals: { cholesterol: '220 mg/dL', glucose: '95 mg/dL', creatinine: '1.0 mg/dL' }
    }
  ]

  const downloadPatientReport = () => {
    const reportContent = `
MEDICARE PLUS - PATIENT MEDICAL REPORT
=====================================

Patient Information:
- Name: ${selectedPatient.name}
- Patient ID: ${selectedPatient.id}
- Age: ${selectedPatient.age} years
- Gender: ${selectedPatient.gender}
- Blood Group: ${selectedPatient.bloodGroup}
- Generated: ${new Date().toLocaleDateString()}

CONTACT INFORMATION
===================
- Phone: ${selectedPatient.phone}
- Email: ${selectedPatient.email}
- Emergency Contact: ${selectedPatient.emergencyContact}

CURRENT CONDITION
=================
- Primary Condition: ${selectedPatient.condition}
- Severity: ${selectedPatient.severity}
- Status: ${selectedPatient.status}
- Current Room: ${selectedPatient.room}

CURRENT VITALS
==============
- Blood Pressure: ${selectedPatient.vitals.bp} mmHg
- Heart Rate: ${selectedPatient.vitals.hr} bpm
- Temperature: ${selectedPatient.vitals.temp}
- Weight: ${selectedPatient.vitals.weight}

ALLERGIES
=========
${selectedPatient.allergies.map((allergy, index) => `${index + 1}. ${allergy}`).join('\n')}

CURRENT MEDICATIONS
===================
${selectedPatient.currentMedications.map((medication, index) => `${index + 1}. ${medication}`).join('\n')}

CONSULTATION HISTORY
====================
${patientReports.map((report, index) => `
Consultation ${index + 1}: ${report.date}
${'-'.repeat(40)}
Service: ${report.service}
Type: ${report.type}
Doctor: ${report.doctor}
Status: ${report.status}

Findings: ${report.findings}

Recommendations: ${report.recommendations}

Vitals: ${Object.entries(report.vitals).map(([key, value]) => `${key}: ${value}`).join(', ')}
`).join('\n')}

NEXT APPOINTMENT
================
Date: ${selectedPatient.nextAppointment}
Time: ${selectedPatient.time}
Location: ${selectedPatient.room}

This report is generated electronically and is valid without signature.
For questions, contact MediCare Plus at (555) 123-4567
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${selectedPatient.name}_Medical_Report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowPatientReports(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-blue-600">
                {selectedPatient.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{selectedPatient.name}</h2>
              <p className="text-gray-600">Patient ID: {selectedPatient.id} • {selectedPatient.age} years • {selectedPatient.gender}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadPatientReport}
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

        {/* Patient Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{selectedPatient.condition}</p>
              <p className="text-sm text-blue-700">Primary Condition</p>
            </div>
          </div>
          <div className="bg-green-50/80 p-4 rounded-lg border border-green-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-900">{selectedPatient.status}</p>
              <p className="text-sm text-green-700">Current Status</p>
            </div>
          </div>
          <div className="bg-purple-50/80 p-4 rounded-lg border border-purple-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-900">{selectedPatient.nextAppointment}</p>
              <p className="text-sm text-purple-700">Next Appointment</p>
            </div>
          </div>
          <div className="bg-orange-50/80 p-4 rounded-lg border border-orange-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-orange-900">{selectedPatient.room}</p>
              <p className="text-sm text-orange-700">Current Location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Information */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Personal Information
          </h3>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Blood Group</p>
                <p className="font-semibold text-gray-900">{selectedPatient.bloodGroup}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Age</p>
                <p className="font-semibold text-gray-900">{selectedPatient.age} years</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900 flex items-center">
                <Phone className="w-4 h-4 mr-2 text-gray-500" />
                {selectedPatient.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900 flex items-center">
                <Mail className="w-4 h-4 mr-2 text-gray-500" />
                {selectedPatient.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Emergency Contact</p>
              <p className="font-semibold text-gray-900">{selectedPatient.emergencyContact}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-2">Allergies</p>
              <div className="space-y-1">
                {selectedPatient.allergies.map((allergy, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-700">{allergy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Current Vitals & Medications */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Heart className="w-6 h-6 mr-3 text-red-600" />
            Current Status
          </h3>

          <div className="space-y-6">
            {/* Vitals */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Latest Vitals</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50/80 p-3 rounded-lg">
                  <p className="text-sm text-red-600">Blood Pressure</p>
                  <p className="font-semibold text-red-900">{selectedPatient.vitals.bp}</p>
                </div>
                <div className="bg-blue-50/80 p-3 rounded-lg">
                  <p className="text-sm text-blue-600">Heart Rate</p>
                  <p className="font-semibold text-blue-900">{selectedPatient.vitals.hr} bpm</p>
                </div>
                <div className="bg-orange-50/80 p-3 rounded-lg">
                  <p className="text-sm text-orange-600">Temperature</p>
                  <p className="font-semibold text-orange-900">{selectedPatient.vitals.temp}</p>
                </div>
                <div className="bg-green-50/80 p-3 rounded-lg">
                  <p className="text-sm text-green-600">Weight</p>
                  <p className="font-semibold text-green-900">{selectedPatient.vitals.weight}</p>
                </div>
              </div>
            </div>

            {/* Current Medications */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Pill className="w-5 h-5 mr-2 text-green-600" />
                Current Medications
              </h4>
              <div className="space-y-2">
                {selectedPatient.currentMedications.map((medication, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-green-50/80 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-700">{medication}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-3 text-purple-600" />
            Appointment Details
          </h3>

          <div className="space-y-4">
            <div className="bg-purple-50/80 p-4 rounded-lg border border-purple-200/50">
              <h4 className="font-medium text-purple-900 mb-2">Next Appointment</h4>
              <div className="space-y-2">
                <p className="text-sm text-purple-800">
                  <strong>Date:</strong> {selectedPatient.nextAppointment}
                </p>
                <p className="text-sm text-purple-800">
                  <strong>Time:</strong> {selectedPatient.time}
                </p>
                <p className="text-sm text-purple-800">
                  <strong>Location:</strong> {selectedPatient.room}
                </p>
              </div>
            </div>

            <div className="bg-gray-50/80 p-4 rounded-lg border border-gray-200/50">
              <h4 className="font-medium text-gray-900 mb-2">Last Visit</h4>
              <p className="text-sm text-gray-700 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {selectedPatient.lastVisit}
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${
              selectedPatient.severity === 'Critical' ? 'bg-red-50/80 border-red-200/50' :
              selectedPatient.severity === 'Moderate' ? 'bg-yellow-50/80 border-yellow-200/50' :
              'bg-green-50/80 border-green-200/50'
            }`}>
              <h4 className="font-medium text-gray-900 mb-2">Condition Severity</h4>
              <p className={`text-sm font-medium ${
                selectedPatient.severity === 'Critical' ? 'text-red-800' :
                selectedPatient.severity === 'Moderate' ? 'text-yellow-800' :
                'text-green-800'
              }`}>
                {selectedPatient.severity} - {selectedPatient.condition}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation History */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <FileText className="w-6 h-6 mr-3 text-blue-600" />
          Consultation History
        </h3>

        <div className="space-y-6">
          {patientReports.map((report, index) => (
            <div key={report.id} className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{report.service} - {report.type}</h4>
                    <p className="text-sm text-gray-600">{report.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{report.date}</span>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                    {report.status}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Findings:</h5>
                  <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{report.findings}</p>
                </div>
                
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Recommendations:</h5>
                  <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{report.recommendations}</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Vitals Recorded:</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {Object.entries(report.vitals).map(([key, value]) => (
                    <div key={key} className="bg-blue-50/60 p-2 rounded-lg text-center">
                      <p className="text-xs text-blue-600 capitalize">{key}</p>
                      <p className="font-semibold text-blue-900 text-sm">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PatientReportsView