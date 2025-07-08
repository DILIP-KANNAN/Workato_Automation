import { 
  Download, 
  Printer, 
  ArrowLeft,
  Calendar,
  ClipboardList,
  Pill,
  Heart,
  Stethoscope,
  Activity,
  FileText
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useReports } from '../context/ReportsContext';

const ServiceReportPage = ({ service, onBack }) => {
  const { user } = useAuth();
  const { getConsultationData, downloadMedicalReportPDF } = useReports();

  // Consistent icon/color/bg utility
  const getServiceIcon = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology': return Heart;
      case 'General Medicine': return Stethoscope;
      case 'Radiology': return Activity;
      default: return FileText;
    }
  };

  const getServiceColor = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology': return 'text-red-600';
      case 'General Medicine': return 'text-blue-600';
      case 'Radiology': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getServiceBgColor = (serviceName) => {
    switch (serviceName) {
      case 'Cardiology': return 'bg-red-100';
      case 'General Medicine': return 'bg-blue-100';
      case 'Radiology': return 'bg-purple-100';
      default: return 'bg-gray-100';
    }
  };

  const consultationData = getConsultationData(service.service);
  const ServiceIcon = getServiceIcon(service.service);

  const handleDownloadPDF = () => {
    console.log("i am clicked!!")
    downloadMedicalReportPDF({
      service,
      user,
      consultationData
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur rounded-2xl shadow-lg border border-blue-200/50 p-6">
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
              <p className="text-gray-600">
                {consultationData.consultations.length} consultations • Latest: {consultationData.consultations[0]?.date}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleDownloadPDF}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors shadow-lg">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Service Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard
            value={consultationData.consultations.length}
            label="Total Visits"
            bgColor="bg-blue-50/80"
            textColor="text-blue-900"
          />
          <SummaryCard
            value={consultationData.prescriptions.length}
            label="Active Medications"
            bgColor="bg-green-50/80"
            textColor="text-green-900"
          />
          <SummaryCard
            value={consultationData.consultations[0]?.date || "N/A"}
            label="Last Visit"
            bgColor="bg-purple-50/80"
            textColor="text-purple-900"
          />
          <SummaryCard
            value={service.status === 'completed' ? 'Complete' : 'Ongoing'}
            label="Status"
            bgColor={service.status === 'completed' ? "bg-green-50/80" : "bg-yellow-50/80"}
            textColor={service.status === 'completed' ? "text-green-900" : "text-yellow-900"}
          />
        </div>
      </div>

      {/* Consultation History */}
      <SectionContainer title="Consultation History" icon={ClipboardList} iconColor="text-blue-600">
        <div className="space-y-6">
          {consultationData.consultations.map((consultation, index) => (
            <ConsultationCard key={index} index={index} consultation={consultation} />
          ))}
        </div>
      </SectionContainer>

      {/* Current Prescriptions */}
      {consultationData.prescriptions.length > 0 && (
        <SectionContainer title="Current Prescriptions" icon={Pill} iconColor="text-green-600">
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
        </SectionContainer>
      )}
    </div>
  );
};

export default ServiceReportPage;

/* -----------------------------------
   Utility Components
----------------------------------- */

const SummaryCard = ({ value, label, bgColor, textColor }) => (
  <div className={`${bgColor} p-4 rounded-lg border`}>
    <div className="text-center">
      <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
      <p className={`text-sm ${textColor.replace('900', '700')}`}>{label}</p>
    </div>
  </div>
);

const SectionContainer = ({ title, icon: Icon, iconColor, children }) => (
  <div className="bg-white/60 backdrop-blur rounded-2xl shadow-lg border border-blue-200/50 p-8">
    <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
      <Icon className={`w-6 h-6 mr-3 ${iconColor}`} />
      {title}
    </h3>
    {children}
  </div>
);

const ConsultationCard = ({ index, consultation }) => (
  <div className="bg-gray-50/80 p-6 rounded-xl border border-gray-200/50">
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
      <div className="text-right flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-900">{consultation.date}</span>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InfoBlock title="Chief Complaint:" content={consultation.chiefComplaint} />
      <InfoBlock title="Examination:" content={consultation.examination} />
      <InfoBlock title="Assessment:" content={consultation.assessment} />
      <InfoBlock title="Plan:" content={consultation.plan} />
    </div>

    <div className="mt-4 pt-4 border-t border-gray-200">
      <h5 className="font-medium text-gray-900 mb-2">Doctor's Notes:</h5>
      <p className="text-gray-700 bg-blue-50/60 p-3 rounded-lg text-sm italic">{consultation.notes}</p>
    </div>
  </div>
);

const InfoBlock = ({ title, content }) => (
  <div>
    <h5 className="font-medium text-gray-900 mb-2">{title}</h5>
    <p className="text-gray-700 bg-white/60 p-3 rounded-lg text-sm">{content}</p>
  </div>
);
