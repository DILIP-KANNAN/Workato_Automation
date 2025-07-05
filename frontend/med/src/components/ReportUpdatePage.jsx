import { 
  ArrowLeft, 
  User, 
  QrCode, 
  Search, 
  Save, 
  FileText, 
  Calendar, 
  Clock, 
  Stethoscope,
  Activity,
  Heart,
  Thermometer,
  Weight,
  Pill,
  AlertCircle,
  CheckCircle,
  Camera,
  Plus,
  Minus,
  X
} from 'lucide-react'
import { useState } from 'react'
import { useStaff } from '../context/StaffContext'

const ReportUpdatePage = () => {
  const { 
    selectedPatientForUpdate, 
    setActiveTab, 
    scannerActive, 
    setScannerActive,
    handleQRScan 
  } = useStaff()

  const [patientId, setPatientId] = useState('')
  const [selectedPatient, setSelectedPatient] = useState(selectedPatientForUpdate)
  const [medications, setMedications] = useState([])
  const [reportData, setReportData] = useState({
    consultationType: '',
    chiefComplaint: '',
    presentIllness: '',
    examination: '',
    vitals: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      weight: '',
      height: '',
      oxygenSaturation: ''
    },
    assessment: '',
    diagnosis: '',
    plan: '',
    followUp: '',
    notes: ''
  })

  const mockPatients = [
    { id: 'PAT001', name: 'John Doe', age: 34, condition: 'Hypertension' },
    { id: 'PAT002', name: 'Sarah Wilson', age: 45, condition: 'Diabetes Type 2' },
    { id: 'PAT003', name: 'Robert Chen', age: 67, condition: 'Cardiac Arrhythmia' },
    { id: 'PAT004', name: 'Maria Garcia', age: 29, condition: 'Pregnancy - 32 weeks' }
  ]

  const medicationOptions = [
    'Lisinopril', 'Metoprolol', 'Aspirin', 'Atorvastatin', 'Metformin', 'Insulin',
    'Warfarin', 'Digoxin', 'Amlodipine', 'Losartan', 'Simvastatin', 'Omeprazole',
    'Levothyroxine', 'Albuterol', 'Prednisone', 'Ibuprofen', 'Acetaminophen'
  ]

  const dosageOptions = ['5mg', '10mg', '25mg', '50mg', '100mg', '250mg', '500mg', '1000mg']
  const timingOptions = ['Once daily', 'Twice daily', 'Three times daily', 'Four times daily', 'As needed']
  const foodOptions = ['Before meals', 'After meals', 'With food', 'Without food', 'Empty stomach']

  const handlePatientSearch = () => {
    const patient = mockPatients.find(p => p.id === patientId.toUpperCase())
    if (patient) {
      setSelectedPatient(patient)
    } else {
      alert('Patient not found. Please check the Patient ID.')
    }
  }

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setReportData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setReportData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const addMedication = () => {
    setMedications(prev => [...prev, {
      id: Date.now(),
      name: '',
      dosage: '',
      timing: '',
      food: '',
      duration: '',
      instructions: ''
    }])
  }

  const removeMedication = (id) => {
    setMedications(prev => prev.filter(med => med.id !== id))
  }

  const updateMedication = (id, field, value) => {
    setMedications(prev => prev.map(med => 
      med.id === id ? { ...med, [field]: value } : med
    ))
  }

  const handleSaveReport = () => {
    if (!selectedPatient) {
      alert('Please select a patient first.')
      return
    }

    if (!reportData.consultationType || !reportData.chiefComplaint || !reportData.assessment) {
      alert('Please fill in all required fields.')
      return
    }

    // Simulate saving report
    alert(`Report saved successfully for ${selectedPatient.name}!`)
    setActiveTab('dashboard')
  }

  const consultationTypes = [
    'Initial Consultation',
    'Follow-up Visit',
    'Emergency Consultation',
    'Routine Checkup',
    'Specialist Consultation',
    'Post-operative Review',
    'Diagnostic Review'
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Update Patient Report</h2>
              <p className="text-gray-600">Create or update medical consultation report</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveReport}
              className="flex items-center space-x-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <Save className="w-4 h-4" />
              <span>Save Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Patient Selection */}
      {!selectedPatient && (
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <User className="w-6 h-6 mr-3 text-blue-600" />
            Select Patient
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Manual Patient ID Entry */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Enter Patient ID</h4>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    placeholder="Enter Patient ID (e.g., PAT001)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={handlePatientSearch}
                    className="flex items-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
                
                <div className="bg-blue-50/80 p-4 rounded-lg border border-blue-200/50">
                  <h5 className="font-medium text-blue-900 mb-2">Available Patients:</h5>
                  <div className="space-y-1 text-sm text-blue-800">
                    {mockPatients.map(patient => (
                      <div key={patient.id} className="flex justify-between">
                        <span>{patient.id}</span>
                        <span>{patient.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* QR Code Scanner */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">QR Code Scanner</h4>
              <div className="text-center">
                <div className={`w-full h-48 ${scannerActive ? 'bg-gray-900' : 'bg-gray-100'} rounded-lg flex items-center justify-center mb-4 border-2 border-dashed border-gray-300`}>
                  {scannerActive ? (
                    <div className="text-white">
                      <Camera className="w-12 h-12 mx-auto mb-2 animate-pulse" />
                      <p>Scanning for QR code...</p>
                    </div>
                  ) : (
                    <div className="text-gray-500">
                      <QrCode className="w-12 h-12 mx-auto mb-2" />
                      <p>QR Scanner Ready</p>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={handleQRScan}
                  disabled={scannerActive}
                  className="flex items-center space-x-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white rounded-lg transition-colors mx-auto"
                >
                  <QrCode className="w-4 h-4" />
                  <span>{scannerActive ? 'Scanning...' : 'Start QR Scan'}</span>
                </button>
                
                <p className="text-sm text-gray-600 mt-3">
                  Scan patient's QR code from their wristband or ID card
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Form */}
      {selectedPatient && (
        <div className="space-y-8">
          {/* Selected Patient Info */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200/50 p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Patient Selected</h3>
                <p className="text-gray-600">
                  {selectedPatient.name} (ID: {selectedPatient.id}) • {selectedPatient.age} years • {selectedPatient.condition}
                </p>
              </div>
              <button
                onClick={() => setSelectedPatient(null)}
                className="ml-auto px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
              >
                Change Patient
              </button>
            </div>
          </div>

          {/* Report Form */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 mr-3 text-blue-600" />
              Medical Report Details
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Consultation Information</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Consultation Type *
                      </label>
                      <select
                        value={reportData.consultationType}
                        onChange={(e) => handleInputChange('consultationType', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select consultation type</option>
                        {consultationTypes.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chief Complaint *
                      </label>
                      <textarea
                        value={reportData.chiefComplaint}
                        onChange={(e) => handleInputChange('chiefComplaint', e.target.value)}
                        placeholder="Patient's main concern or reason for visit"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        History of Present Illness
                      </label>
                      <textarea
                        value={reportData.presentIllness}
                        onChange={(e) => handleInputChange('presentIllness', e.target.value)}
                        placeholder="Detailed history of current symptoms"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Physical Examination
                      </label>
                      <textarea
                        value={reportData.examination}
                        onChange={(e) => handleInputChange('examination', e.target.value)}
                        placeholder="Physical examination findings"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>

                {/* Assessment & Plan */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Assessment & Plan</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Assessment *
                      </label>
                      <textarea
                        value={reportData.assessment}
                        onChange={(e) => handleInputChange('assessment', e.target.value)}
                        placeholder="Clinical assessment and impression"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Diagnosis
                      </label>
                      <textarea
                        value={reportData.diagnosis}
                        onChange={(e) => handleInputChange('diagnosis', e.target.value)}
                        placeholder="Primary and secondary diagnoses"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Treatment Plan
                      </label>
                      <textarea
                        value={reportData.plan}
                        onChange={(e) => handleInputChange('plan', e.target.value)}
                        placeholder="Treatment plan and recommendations"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="4"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Vital Signs */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-red-600" />
                    Vital Signs
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Blood Pressure
                      </label>
                      <input
                        type="text"
                        value={reportData.vitals.bloodPressure}
                        onChange={(e) => handleInputChange('vitals.bloodPressure', e.target.value)}
                        placeholder="120/80"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Heart Rate
                      </label>
                      <input
                        type="text"
                        value={reportData.vitals.heartRate}
                        onChange={(e) => handleInputChange('vitals.heartRate', e.target.value)}
                        placeholder="72 bpm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Temperature
                      </label>
                      <input
                        type="text"
                        value={reportData.vitals.temperature}
                        onChange={(e) => handleInputChange('vitals.temperature', e.target.value)}
                        placeholder="98.6°F"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="text"
                        value={reportData.vitals.weight}
                        onChange={(e) => handleInputChange('vitals.weight', e.target.value)}
                        placeholder="70 kg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height
                      </label>
                      <input
                        type="text"
                        value={reportData.vitals.height}
                        onChange={(e) => handleInputChange('vitals.height', e.target.value)}
                        placeholder="170 cm"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Oxygen Saturation
                      </label>
                      <input
                        type="text"
                        value={reportData.vitals.oxygenSaturation}
                        onChange={(e) => handleInputChange('vitals.oxygenSaturation', e.target.value)}
                        placeholder="98%"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium text-gray-900 flex items-center">
                      <Pill className="w-5 h-5 mr-2 text-green-600" />
                      Medications Prescribed
                    </h4>
                    <button
                      onClick={addMedication}
                      className="flex items-center space-x-1 px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Medication</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {medications.map((medication) => (
                      <div key={medication.id} className="bg-gray-50/80 p-4 rounded-lg border border-gray-200/50">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium text-gray-900">Medication {medications.indexOf(medication) + 1}</h5>
                          <button
                            onClick={() => removeMedication(medication.id)}
                            className="p-1 text-red-500 hover:text-red-700 rounded"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Medication Name
                            </label>
                            <select
                              value={medication.name}
                              onChange={(e) => updateMedication(medication.id, 'name', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select medication</option>
                              {medicationOptions.map(med => (
                                <option key={med} value={med}>{med}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Dosage
                            </label>
                            <select
                              value={medication.dosage}
                              onChange={(e) => updateMedication(medication.id, 'dosage', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select dosage</option>
                              {dosageOptions.map(dose => (
                                <option key={dose} value={dose}>{dose}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Timing
                            </label>
                            <select
                              value={medication.timing}
                              onChange={(e) => updateMedication(medication.id, 'timing', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select timing</option>
                              {timingOptions.map(time => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Food Instructions
                            </label>
                            <select
                              value={medication.food}
                              onChange={(e) => updateMedication(medication.id, 'food', e.target.value)}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select food instruction</option>
                              {foodOptions.map(food => (
                                <option key={food} value={food}>{food}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Duration
                            </label>
                            <input
                              type="text"
                              value={medication.duration}
                              onChange={(e) => updateMedication(medication.id, 'duration', e.target.value)}
                              placeholder="e.g., 7 days, 1 month"
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Special Instructions
                            </label>
                            <input
                              type="text"
                              value={medication.instructions}
                              onChange={(e) => updateMedication(medication.id, 'instructions', e.target.value)}
                              placeholder="Additional instructions"
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {medications.length === 0 && (
                      <div className="text-center py-6 bg-gray-50/80 rounded-lg border border-gray-200/50">
                        <Pill className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600 text-sm">No medications added yet</p>
                        <p className="text-gray-500 text-xs">Click "Add Medication" to prescribe medications</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Follow-up & Notes */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Follow-up & Notes</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Follow-up Instructions
                      </label>
                      <textarea
                        value={reportData.followUp}
                        onChange={(e) => handleInputChange('followUp', e.target.value)}
                        placeholder="Follow-up schedule and instructions"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                      </label>
                      <textarea
                        value={reportData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Any additional notes or observations"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>* Required fields</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveReport}
                    className="flex items-center space-x-2 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors shadow-lg"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportUpdatePage