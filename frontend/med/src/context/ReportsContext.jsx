import { createContext, useContext } from 'react'
import { 
  Heart, 
  Stethoscope, 
  Activity 
} from 'lucide-react'

const ReportsContext = createContext()

export const useReports = () => {
  const context = useContext(ReportsContext)
  if (!context) {
    throw new Error('useReports must be used within a ReportsProvider')
  }
  return context
}

export const ReportsProvider = ({ children }) => {
  // Medical reports data
  const medicalReports = [
    {
      id: 1,
      service: 'Cardiology',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-12-15',
      type: 'Consultation',
      status: 'completed',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      id: 2,
      service: 'General Medicine',
      doctor: 'Dr. Michael Chen',
      date: '2024-11-20',
      type: 'Routine Checkup',
      status: 'completed',
      icon: Stethoscope,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      service: 'Radiology',
      doctor: 'Dr. Lisa Park',
      date: '2024-10-05',
      type: 'CT Scan',
      status: 'completed',
      icon: Activity,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ]

  const downloadGeneralReport = (user) => {
    const reportContent = `
MEDICARE PLUS - GENERAL MEDICAL REPORT
=====================================

Patient Information:
- Name: ${user.name}
- Patient ID: ${user.id}
- Generated: ${new Date().toLocaleDateString()}

HEALTH SUMMARY
==============
- Total Consultations: 15
- Active Treatments: 2
- Medications: 4 active prescriptions
- Last Visit: December 15, 2024
- Next Appointment: January 15, 2025

VITAL STATISTICS
================
- Blood Pressure: 128/82 mmHg (Slightly Elevated)
- Heart Rate: 72 bpm (Normal)
- BMI: 24.5 (Normal)
- Blood Sugar: 95 mg/dL (Normal)

CURRENT CONDITIONS
==================
1. Hypertension - Under treatment with Dr. Sarah Johnson
2. Mild Cardiac Arrhythmia - Monitoring with medication

ALLERGIES
=========
- Penicillin (Severe)
- Shellfish (Moderate)

EMERGENCY CONTACT
=================
- Name: Jane Doe
- Relationship: Spouse
- Phone: (555) 987-6543

CURRENT MEDICATIONS
===================
1. Lisinopril 10mg - Twice daily
2. Metoprolol 25mg - Twice daily  
3. Aspirin 75mg - Once daily
4. Atorvastatin 20mg - Once daily

RECENT CONSULTATIONS
====================
- Dec 15, 2024: Cardiology Follow-up
- Nov 20, 2024: General Medicine Checkup
- Oct 05, 2024: Radiology CT Scan

RECOMMENDATIONS
===============
- Continue current medication regimen
- Regular blood pressure monitoring
- Follow-up in 3 months
- Maintain healthy diet and exercise

This report is generated electronically and is valid without signature.
For questions, contact MediCare Plus at (555) 123-4567
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${user.name}_General_Medical_Report_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadSpecificReport = (report, user) => {
    const reportContent = `
MEDICARE PLUS - ${report.service.toUpperCase()} REPORT
${'='.repeat(50)}

Patient Information:
- Name: ${user.name}
- Patient ID: ${user.id}
- Service: ${report.service}
- Date of Service: ${report.date}
- Doctor: ${report.doctor}
- Type: ${report.type}

CONSULTATION DETAILS
====================
Date: ${report.date}
Time: 10:00 AM
Duration: 45 minutes
Status: ${report.status}

CHIEF COMPLAINT
===============
${report.service === 'Cardiology' ? 'Follow-up for hypertension and cardiac monitoring' :
  report.service === 'General Medicine' ? 'Routine health checkup and medication review' :
  'Diagnostic imaging as per physician recommendation'}

EXAMINATION FINDINGS
====================
${report.service === 'Cardiology' ? 
  `- Blood Pressure: 128/82 mmHg
- Heart Rate: 72 bpm, regular rhythm
- Heart sounds: S1, S2 normal, no murmurs
- ECG: Normal sinus rhythm
- No signs of heart failure` :
  report.service === 'General Medicine' ?
  `- General appearance: Well-appearing
- Vital signs: Stable
- Cardiovascular: Regular rate and rhythm
- Respiratory: Clear to auscultation
- Abdomen: Soft, non-tender` :
  `- CT scan of chest completed
- No acute abnormalities detected
- Previous findings stable
- Contrast enhancement normal`}

ASSESSMENT
==========
${report.service === 'Cardiology' ? 
  `1. Hypertension - well controlled on current medications
2. Mild cardiac arrhythmia - stable, continue monitoring` :
  report.service === 'General Medicine' ?
  `1. Overall health status: Good
2. Chronic conditions: Stable
3. Preventive care: Up to date` :
  `1. Imaging results: Normal
2. No acute pathology identified
3. Follow-up as clinically indicated`}

PLAN
====
${report.service === 'Cardiology' ? 
  `- Continue Lisinopril 10mg twice daily
- Continue Metoprolol 25mg twice daily
- Home blood pressure monitoring
- Follow-up in 3 months
- Contact if symptoms worsen` :
  report.service === 'General Medicine' ?
  `- Continue current medications
- Annual health screening
- Lifestyle counseling provided
- Return PRN or in 6 months
- Vaccination status reviewed` :
  `- Results discussed with patient
- Copy sent to referring physician
- Follow-up imaging in 6 months if indicated
- Return to clinic PRN`}

MEDICATIONS PRESCRIBED/REVIEWED
===============================
${report.service === 'Cardiology' ? 
  `1. Lisinopril 10mg - Take twice daily
2. Metoprolol 25mg - Take twice daily
3. Aspirin 75mg - Take once daily evening` :
  report.service === 'General Medicine' ?
  `1. Current medications reviewed
2. No changes recommended
3. Medication adherence counseled` :
  `No medications prescribed during this visit`}

FOLLOW-UP INSTRUCTIONS
======================
- Next appointment scheduled
- Contact clinic for any concerns
- Emergency contact: (555) 911-HELP
- Patient education materials provided

Doctor's Notes:
${report.service === 'Cardiology' ? 
  'Patient responding well to current treatment. Blood pressure control improved. Continue current regimen.' :
  report.service === 'General Medicine' ?
  'Patient in good health. Encouraged to maintain current lifestyle. All preventive measures up to date.' :
  'Imaging study completed without complications. Results within normal limits.'}

Electronically signed by: ${report.doctor}
Date: ${report.date}
License #: MD-${Math.random().toString().substr(2, 6)}

This report is generated electronically and is valid without signature.
For questions, contact MediCare Plus at (555) 123-4567
    `

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${user.name}_${report.service}_Report_${report.date}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const value = {
    medicalReports,
    downloadGeneralReport,
    downloadSpecificReport
  }

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  )
}