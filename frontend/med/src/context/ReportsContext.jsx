import { createContext, useContext, useState } from 'react'
import { 
  Heart, 
  Stethoscope, 
  Activity 
} from 'lucide-react'
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react'
import { jsPDF } from "jspdf";
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
  const { user } = useAuth();
  const [medicalReports,setmedicalReports]=useState([])
  const [consultations, setConsultations] = useState([]);

  const fetchConsultations = async () => {
        try {
            const res = await API.get(`http://localhost:5000/api/consultations/${user.patientId}`);
            setConsultations(res.data.data);
        } catch (error) {
            console.error("Error fetching consultations:", error);
        }
    };
  useEffect(() => {
        if (user?.id) fetchConsultations();
    }, [user]);

  const getConsultationData = (serviceName) => {
        // console.log(consultations,serviceName)
        const service = consultations.find(s => s.serviceName === serviceName);
        return service || { consultations: [], prescriptions: [] };
    };

  useEffect(() => {
    const fetchReportsFromAppointments = async () => {
        try {
            const response = await API.get(`http://localhost:5000/api/appointments/${user.patientId}`);
            const appointments = response.data.appointments;
            const reports = appointments.map((appt, idx) => ({
                id: idx + 1,
                service: appt.service,
                doctor: appt.doctor,
                date: appt.date,
                type: appt.type,
                status: appt.status,
                icon: Stethoscope,
                color: 'text-blue-600',
                bgColor: 'bg-blue-100'
            }));
            // console.log(appointments)
            setmedicalReports(reports);
        } catch (error) {
            console.error('Error fetching reports:', error);
        }
    };

    fetchReportsFromAppointments();
}, [user.patientId]);

  const downloadGeneralReportPDF = (user) => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("MEDICARE PLUS - GENERAL MEDICAL REPORT", 10, 10);

    let y = 20;
    const addSection = (title, content) => {
        doc.setFontSize(12);
        doc.text(title, 10, y);
        y += 7;
        doc.setFontSize(10);
        content.forEach(line => {
            doc.text(line, 12, y);
            y += 6;
        });
        y += 5;
    };

    addSection("Patient Information", [
        `Name: ${user.name}`,
        `Patient ID: ${user.patientId}`,
        `Generated: ${new Date().toLocaleDateString()}`
    ]);

    addSection("Vital Statistics", [
        `Blood Pressure: ${user.vitals?.bp || 'N/A'}`,
        `Heart Rate: ${user.vitals?.hr || 'N/A'}`,
        `BMI: ${user.vitals?.bmi || 'N/A'}`,
        `Blood Sugar: ${user.vitals?.bloodSugar || 'N/A'}`
    ]);

    addSection("Current Medications", user.medications?.map((med, idx) =>
        `${idx + 1}. ${med.name} ${med.dosage} - ${med.frequency}`
    ) || ['None']);

    addSection("Recommendations", [
        'Continue current medication regimen',
        'Regular monitoring as per condition',
        'Maintain healthy lifestyle'
    ]);

    doc.save(`${user.name}_Medical_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const downloadMedicalReportPDF = ({
    type,
    report,
    user,
    consultationData,
    service
}) => {
    const doc = new jsPDF();
    let y = 15;
    console.log("I am called!!")
    doc.setFontSize(16);
    doc.text("MEDICARE PLUS - MEDICAL REPORT", 14, y);
    y += 10;

    doc.setFontSize(12);
    doc.text(`Patient: ${user.name} (ID: ${user.id})`, 14, y);
    y += 7;
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, y);
    y += 10;

    if (type === 'specific') {
        // Single report PDF
        doc.setFontSize(14);
        doc.text(`${report.service} Report`, 14, y);
        y += 10;

        const sections = [
            { title: "Service Details", content: [
                `Service: ${report.service}`,
                `Date of Service: ${report.date}`,
                `Doctor: ${report.doctor}`,
                `Type: ${report.type}`,
                `Status: ${report.status}`
            ]},
            { title: "Consultation Details", content: [
                `Date: ${report.date}`,
                `Time: 10:00 AM`,
                `Duration: 45 minutes`
            ]},
            { title: "Chief Complaint", content: [
                report.service === 'Cardiology' ? 'Follow-up for hypertension and cardiac monitoring' :
                report.service === 'General Medicine' ? 'Routine health checkup and medication review' :
                'Diagnostic imaging as per physician recommendation'
            ]},
            { title: "Doctor's Notes", content: [
                report.service === 'Cardiology' ? 
                'Patient responding well to current treatment. Blood pressure control improved. Continue current regimen.' :
                report.service === 'General Medicine' ? 
                'Patient in good health. Encouraged to maintain current lifestyle. All preventive measures up to date.' :
                'Imaging study completed without complications. Results within normal limits.'
            ]}
        ];

        sections.forEach(section => {
            doc.setFontSize(12);
            doc.text(section.title, 14, y);
            y += 7;
            doc.setFontSize(10);
            section.content.forEach(line => {
                doc.text(line, 16, y);
                y += 6;
            });
            y += 5;
        });

        doc.text(`Electronically signed by: ${report.doctor}`, 14, y);
        y += 7;
        doc.text(`License #: MD-${Math.random().toString().substr(2, 6)}`, 14, y);

        doc.save(`${user.name}_${report.service}_Report_${report.date}.pdf`);

    } else if (type === 'service') {
        // Service-wise history PDF
        doc.setFontSize(14);
        doc.text(`${service.service} Service History`, 14, y);
        y += 10;

        const consultations = consultationData.consultations || [];

        doc.setFontSize(12);
        doc.text(`Total Consultations: ${consultations.length}`, 14, y);
        y += 7;
        doc.text(`Service Period: ${consultations[consultations.length - 1]?.date || 'N/A'} to ${consultations[0]?.date || 'N/A'}`, 14, y);
        y += 10;

        consultations.forEach((consultation, idx) => {
            doc.setFontSize(11);
            doc.text(`Consultation ${idx + 1}: ${consultation.date}`, 14, y);
            y += 7;
            doc.setFontSize(10);
            doc.text(`Type: ${consultation.type}`, 16, y);
            y += 5;
            doc.text(`Doctor: ${consultation.doctor}`, 16, y);
            y += 5;
            doc.text(`Chief Complaint: ${consultation.chiefComplaint}`, 16, y);
            y += 5;
            doc.text(`Examination: ${consultation.examination}`, 16, y);
            y += 5;
            doc.text(`Assessment: ${consultation.assessment}`, 16, y);
            y += 5;
            doc.text(`Plan: ${consultation.plan}`, 16, y);
            y += 5;
            doc.text(`Doctor's Notes: ${consultation.notes}`, 16, y);
            y += 10;

            if (y > 270) {
                doc.addPage();
                y = 15;
            }
        });

        doc.text(`Doctor's Electronic Signature: ${service.doctor}`, 14, y);
        y += 7;
        doc.text(`License #: MD-${Math.random().toString().substr(2, 6)}`, 14, y);

        doc.save(`${user.name}_${service.service}_Service_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    }
};


  const value = {
    medicalReports,
    downloadGeneralReportPDF,
    downloadMedicalReportPDF,
    consultations,
    getConsultationData
  }

  return (
    <ReportsContext.Provider value={value}>
      {children}
    </ReportsContext.Provider>
  )
}