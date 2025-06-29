import { 
  FileText, 
  Download, 
  Printer, 
  ArrowLeft,
  Calendar,
  User,
  MapPin,
  Clock,
  Activity,
  Heart,
  Stethoscope,
  Pill,
  ClipboardList
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const ServiceReportPage = ({ service, onBack }) => {
  const { user } = useAuth()

  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology': return Heart
      case 'General Medicine': return Stethoscope
      case 'Radiology': return Activity
      default: return FileText
    }
  }

  const getServiceColor = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology': return 'text-red-600'
      case 'General Medicine': return 'text-blue-600'
      case 'Radiology': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  const getServiceBgColor = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology': return 'bg-red-100'
      case 'General Medicine': return 'bg-blue-100'
      case 'Radiology': return 'bg-purple-100'
      default: return 'bg-gray-100'
    }
  }

  const getConsultationData = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology':
        return {
          consultations: [
            {
              date: "2024-12-15",
              type: "Follow-up Consultation",
              doctor: "Dr. Sarah Johnson",
              chiefComplaint: "Routine follow-up for hypertension management",
              examination: "BP: 128/82 mmHg, HR: 72 bpm regular rhythm. Heart sounds normal, no murmurs. ECG shows normal sinus rhythm.",
              assessment: "Hypertension well controlled on current medications. Patient shows excellent compliance with treatment regimen.",
              plan: "Continue current medications. Home BP monitoring. Follow-up in 3 months.",
              notes: "Patient responding well to treatment. Blood pressure control significantly improved since last visit. No adverse effects reported."
            },
            {
              date: "2024-09-20",
              type: "Initial Consultation",
              doctor: "Dr. Sarah Johnson",
              chiefComplaint: "Elevated blood pressure readings at home",
              examination: "BP: 145/95 mmHg, HR: 78 bpm. Heart sounds normal. No signs of end-organ damage.",
              assessment: "Stage 1 hypertension. No evidence of secondary causes.",
              plan: "Initiate antihypertensive therapy. Lifestyle modifications counseled.",
              notes: "New diagnosis of hypertension. Patient counseled on lifestyle modifications and medication compliance."
            },
            {
              date: "2024-06-10",
              type: "Preventive Screening",
              doctor: "Dr. Sarah Johnson", 
              chiefComplaint: "Routine cardiovascular screening",
              examination: "BP: 138/88 mmHg, HR: 75 bpm. Cardiovascular examination normal.",
              assessment: "Borderline hypertension. Cardiovascular risk assessment performed.",
              plan: "Lifestyle modifications. Home BP monitoring. Follow-up in 3 months.",
              notes: "Patient advised on dietary changes and regular exercise. Family history of hypertension noted."
            }
          ],
          prescriptions: ["Lisinopril", "Metoprolol", "Aspirin"]
        }
      case 'General Medicine':
        return {
          consultations: [
            {
              date: "2024-11-20",
              type: "Annual Health Checkup",
              doctor: "Dr. Michael Chen",
              chiefComplaint: "Routine annual physical examination",
              examination: "Vital signs stable. Complete physical examination normal. All systems review negative.",
              assessment: "Overall health status good. All preventive care measures up to date.",
              plan: "Continue current lifestyle. Annual screening tests ordered.",
              notes: "Patient in excellent health. Encouraged to maintain current exercise routine and healthy diet."
            },
            {
              date: "2024-08-15",
              type: "Follow-up Visit",
              doctor: "Dr. Michael Chen",
              chiefComplaint: "Follow-up for vitamin D deficiency",
              examination: "General appearance well. No specific complaints. Lab results reviewed.",
              assessment: "Vitamin D levels normalized with supplementation.",
              plan: "Continue vitamin D supplementation. Recheck levels in 6 months.",
              notes: "Good response to vitamin D therapy. Patient reports improved energy levels."
            },
            {
              date: "2024-05-10",
              type: "Initial Consultation",
              doctor: "Dr. Michael Chen",
              chiefComplaint: "Fatigue and low energy levels",
              examination: "Physical examination normal. Lab work ordered to rule out deficiencies.",
              assessment: "Vitamin D deficiency identified. Otherwise healthy.",
              plan: "Vitamin D supplementation initiated. Lifestyle counseling provided.",
              notes: "Patient counseled on importance of sun exposure and dietary sources of vitamin D."
            }
          ],
          prescriptions: ["Multivitamin", "Vitamin D3"]
        }
      case 'Radiology':
        return {
          consultations: [
            {
              date: "2024-10-05",
              type: "CT Scan - Chest",
              doctor: "Dr. Lisa Park",
              chiefComplaint: "Follow-up imaging for previous lung nodule",
              examination: "CT chest with contrast completed. Previous small nodule in right lower lobe stable in size.",
              assessment: "Stable pulmonary nodule. No new abnormalities detected.",
              plan: "Continue surveillance. Repeat CT in 6 months.",
              notes: "Nodule remains stable compared to previous imaging. No concerning features identified."
            },
            {
              date: "2024-04-15",
              type: "Initial CT Scan",
              doctor: "Dr. Lisa Park",
              chiefComplaint: "Evaluation of abnormal chest X-ray",
              examination: "CT chest revealed small 4mm nodule in right lower lobe. No other abnormalities.",
              assessment: "Small pulmonary nodule, likely benign. Surveillance recommended.",
              plan: "Follow-up CT in 6 months to assess stability.",
              notes: "Small nodule identified. Patient counseled on surveillance protocol and low risk of malignancy."
            }
          ],
          prescriptions: []
        }
      default:
        return { consultations: [], prescriptions: [] }
    }
  }

  const downloadServiceReport = () => {
    const consultationData = getConsultationData(service.service)
    const reportContent = `
MEDICARE PLUS - ${service.service.toUpperCase()} REPORT
${'='.repeat(50)}

Patient: ${user.name} (ID: ${user.id})
Service: ${service.service}
Report Generated: ${new Date().toLocaleDateString()}

CONSULTATION HISTORY
====================
${consultationData.consultations.map((consultation, index) => `
Consultation ${index + 1}: ${consultation.date}
${'-'.repeat(40)}
Type: ${consultation.type}
Doctor: ${consultation.doctor}
Chief Complaint: ${consultation.chiefComplaint}

Examination: ${consultation.examination}

Assessment: ${consultation.assessment}

Plan: ${consultation.plan}

Doctor's Notes: ${consultation.notes}
`).join('\n')}

CURRENT PRESCRIPTIONS
=====================
${consultationData.prescriptions.length > 0 ? 
  consultationData.prescriptions.map((medication, index) => `${index + 1}. ${medication}`).join('\n') : 
  'No active prescriptions for this service'}

SUMMARY
=======
Total Consultations: ${consultationData.consultations.length}
Service Period: ${consultationData.consultations[consultationData.consultations.length - 1]?.date} to ${consultationData.consultations[0]?.date}
Current Status: ${service.status}

Doctor's Electronic Signature: ${service.doctor}
Report Date: ${new Date().toLocaleDateString()}
License #: MD-${Math.random().toString().substr(2, 6)}

This report is generated electronically and is valid without signature.
For questions, contact MediCare Plus at (555) 123-4567
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${user.name}_${service.service}_Report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const ServiceIcon = getServiceIcon(service.service)
  const consultationData = getConsultationData(service.service)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className={`w-12 h-12 ${getServiceBgColor(service.service)} rounded-lg flex items-center justify-center`}>
              <ServiceIcon className={`w-6 h-6 ${getServiceColor(service.service)}`} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{service.service} Report</h2>
              <p className="text-gray-600">{consultationData.consultations.length} consultations • Latest: {consultationData.consultations[0]?.date}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={downloadServiceReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-lg">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Service Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-900">{consultationData.consultations.length}</p>
              <p className="text-sm text-blue-700">Total Visits</p>
            </div>
          </div>
          <div className="bg-green-50/80 p-4 rounded-lg border border-green-200/50">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-900">{consultationData.prescriptions.length}</p>
              <p className="text-sm text-green-700">Active Medications</p>
            </div>
          </div>
          <div className="bg-purple-50/80 p-4 rounded-lg border border-purple-200/50">
            <div className="text-center">
              <p className="text-lg font-bold text-purple-900">{consultationData.consultations[0]?.date}</p>
              <p className="text-sm text-purple-700">Last Visit</p>
            </div>
          </div>
          <div className={`p-4 rounded-lg border ${
            service.status === 'completed' ? 'bg-green-50/80 border-green-200/50' : 'bg-yellow-50/80 border-yellow-200/50'
          }`}>
            <div className="text-center">
              <p className={`text-lg font-bold ${service.status === 'completed' ? 'text-green-900' : 'text-yellow-900'}`}>
                {service.status === 'completed' ? 'Complete' : 'Ongoing'}
              </p>
              <p className={`text-sm ${service.status === 'completed' ? 'text-green-700' : 'text-yellow-700'}`}>Status</p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation History */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <ClipboardList className="w-6 h-6 mr-3 text-blue-600" />
          Consultation History
        </h3>

        <div className="space-y-6">
          {consultationData.consultations.map((consultation, index) => (
            <div key={index} className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{consultation.type}</h4>
                    <p className="text-sm text-gray-600">{consultation.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{consultation.date}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Chief Complaint:</h5>
                    <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{consultation.chiefComplaint}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Examination:</h5>
                    <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{consultation.examination}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Assessment:</h5>
                    <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{consultation.assessment}</p>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Plan:</h5>
                    <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{consultation.plan}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Doctor's Notes:</h5>
                <p className="text-gray-700 bg-blue-50/60 p-3 rounded-lg text-sm italic">{consultation.notes}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Prescriptions */}
      {consultationData.prescriptions.length > 0 && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Pill className="w-6 h-6 mr-3 text-green-600" />
            Current Prescriptions
          </h3>

          <div className="bg-green-50/80 p-6 rounded-xl border border-green-200/50">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {consultationData.prescriptions.map((medication, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-white/60 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Pill className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-green-900">{medication}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ServiceReportPage