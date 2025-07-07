import { createContext, useContext, useState } from 'react'
import { 
  Shield, 
  CreditCard, 
  Building2,
  Bot
} from 'lucide-react'

const MedicalSchemesContext = createContext()

export const useMedicalSchemes = () => {
  const context = useContext(MedicalSchemesContext)
  if (!context) {
    throw new Error('useMedicalSchemes must be used within a MedicalSchemesProvider')
  }
  return context
}

export const MedicalSchemesProvider = ({ children }) => {
  const [chatExpanded, setChatExpanded] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I\'m here to help you with information about medical schemes, insurance claims, and hospital benefits. What would you like to know?'
    }
  ])
  const [newMessage, setNewMessage] = useState('')

  const governmentalSchemes = [
  {
    id: 1,
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana',
    description: 'Free hospitalization coverage for low-income families under SECC 2011.',
    coverage: 'Free hospitalization up to ₹5 lakh/year/family',
    eligibility: 'Low-income families (as per SECC 2011)',
    benefits: [
      'Cashless hospitalization',
      'Pre and post-hospitalization expenses',
      'Treatment for critical illnesses',
      'No cap on family size and age'
    ],
    contact: 'Check eligibility at pmjay.gov.in using Aadhaar',
    status: 'Active',
    icon: Shield,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    applicationProcess: 'Auto-enrolled; check eligibility at pmjay.gov.in using Aadhaar',
    sources: 'https://nha.gov.in/PM-JAY',
    premium: '₹0 (fully government funded)'
  },
  {
    id: 2,
    name: 'PM National Dialysis Program',
    description: 'Free dialysis services for patients with end-stage renal disease (ESRD), especially poor and BPL.',
    coverage: 'Regular dialysis sessions as per medical need',
    eligibility: 'Patients with ESRD, especially poor and BPL',
    benefits: [
      'Free dialysis in public hospitals',
      'Access to empaneled centers',
      'Reduced financial burden on families'
    ],
    contact: 'Visit nearest empaneled govt hospital for registration',
    status: 'Active',
    icon: Shield,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    applicationProcess: 'Visit nearest empaneled govt hospital for registration',
    sources: 'https://nhsrcindia.org',
    premium: '₹0 (government funded)'
  },
  {
    id: 3,
    name: 'Central Government Health Scheme (CGHS)',
    description: 'Healthcare scheme for central government employees and pensioners.',
    coverage: 'Comprehensive healthcare for employees and eligible family members',
    eligibility: 'Family members included under dependent definition',
    benefits: [
      'Outpatient care through CGHS wellness centers',
      'Hospitalization at CGHS empaneled hospitals',
      'Specialist consultations',
      'Diagnostic services'
    ],
    contact: 'Apply via CGHS online portal or CGHS wellness centers',
    status: 'Active',
    icon: Shield,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    applicationProcess: 'Apply via CGHS online portal or CGHS wellness centers',
    sources: 'https://cghs.gov.in',
    premium: 'Varies (monthly deduction or pensioner contribution)'
  }
];

  const insuranceSchemes = [
  {
    id: 1,
    name: 'Star Health Medi-Classic',
    provider: 'Star Health and Allied Insurance',
    type: 'Individual/Family Floater',
    premium: '₹8,500/year',
    deductible: '₹0',
    coverage: 'Up to ₹5 lakh',
    network: 'Pan India hospital network',
    benefits: ['Hospitalisation expenses', 'Pre and post-hospitalisation', 'Daycare procedures', 'Ambulance cover'],
    icon: CreditCard,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    id: 2,
    name: 'New India Mediclaim Policy',
    provider: 'The New India Assurance Co. Ltd.',
    type: 'Family Floater',
    premium: '₹12,000/year',
    deductible: '₹0',
    coverage: 'Up to ₹10 lakh',
    network: 'Nationwide cashless network hospitals',
    benefits: ['In-patient care', 'Daycare treatment', 'Pre and post-hospitalisation', 'AYUSH treatment'],
    icon: CreditCard,
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    id: 3,
    name: 'Employer Medical Allowance',
    provider: 'ABC Tech Pvt. Ltd.',
    type: 'Corporate Health Benefit',
    premium: 'Employer funded',
    deductible: '₹0',
    coverage: 'Up to ₹50K/year',
    network: 'Reimbursable at any hospital',
    benefits: ['Doctor consultations', 'Diagnostic tests', 'Medicines', 'Emergency hospitalisation'],
    icon: CreditCard,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

  const hospitalSchemes = [
    {
      id: 1,
      name: 'MediCare Plus Loyalty Program',
      description: 'Exclusive benefits for regular patients',
      discount: '15% on all services',
      benefits: ['Priority appointment booking', 'Free annual health checkup', 'Discounted diagnostic tests', '24/7 health helpline'],
      eligibility: 'Minimum 3 visits per year',
      validity: 'Valid until Dec 2025',
      status: 'Active',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 2,
      name: 'Senior Citizen Care Package',
      description: 'Special healthcare package for seniors',
      discount: '25% on consultations',
      benefits: ['Free home visits', 'Medication delivery', 'Emergency response service', 'Nutrition counseling'],
      eligibility: 'Age 65 and above',
      validity: 'Lifetime validity',
      status: 'Eligible',
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 3,
      name: 'Family Health Plan',
      description: 'Comprehensive family healthcare coverage',
      discount: '20% for family of 4+',
      benefits: ['Family health records', 'Pediatric care', 'Maternity services', 'Vaccination programs'],
      eligibility: 'Family registration required',
      validity: 'Annual renewal',
      status: 'Available',
      icon: Building2,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ]

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: newMessage
    }

    setChatMessages(prev => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      let botResponse = ''
      
      if (newMessage.toLowerCase().includes('government') || newMessage.toLowerCase().includes('medicare') || newMessage.toLowerCase().includes('medicaid')) {
        botResponse = 'I can help you with governmental schemes:\n\n• **Medicare Plus**: For ages 65+ with comprehensive coverage\n• **Medicaid**: Income-based program for comprehensive care\n• **VA Benefits**: For military veterans\n\nWould you like specific details about eligibility or benefits for any of these programs?'
      } else if (newMessage.toLowerCase().includes('insurance') || newMessage.toLowerCase().includes('claim') || newMessage.toLowerCase().includes('bluecross') || newMessage.toLowerCase().includes('aetna')) {
        botResponse = 'Here\'s information about insurance and claims:\n\n• **BlueCross BlueShield**: PPO plan with nationwide network\n• **Aetna Health Plus**: HMO with 90% coverage after deductible\n• **UnitedHealth Choice**: EPO with exclusive provider network\n\nFor claims, you can check status, submit new claims, or get help with claim disputes. What specific insurance information do you need?'
      } else if (newMessage.toLowerCase().includes('hospital') || newMessage.toLowerCase().includes('loyalty') || newMessage.toLowerCase().includes('discount')) {
        botResponse = 'Our hospital schemes offer great benefits:\n\n• **Loyalty Program**: 15% discount for regular patients\n• **Senior Care Package**: 25% discount for 65+ with home visits\n• **Family Health Plan**: 20% discount for families of 4+\n\nThese include priority booking, free checkups, and special services. Which scheme interests you most?'
      } else if (newMessage.toLowerCase().includes('eligibility') || newMessage.toLowerCase().includes('qualify')) {
        botResponse = 'Eligibility varies by scheme:\n\n**Government**: Age, income, or service-based\n**Insurance**: Employment or individual purchase\n**Hospital**: Visit frequency or demographics\n\nI can check your specific eligibility. Which scheme are you interested in?'
      } else if (newMessage.toLowerCase().includes('cost') || newMessage.toLowerCase().includes('premium') || newMessage.toLowerCase().includes('price')) {
        botResponse = 'Here are the cost structures:\n\n**Insurance Premiums**:\n• BlueCross: $450/month\n• Aetna: $320/month\n• UnitedHealth: $380/month\n\n**Hospital Schemes**: Mostly discount-based with minimal fees\n**Government**: Usually free or low-cost based on eligibility\n\nWould you like detailed cost breakdowns?'
      } else {
        botResponse = 'I can help you with:\n\n🏛️ **Government Schemes**: Medicare, Medicaid, VA benefits\n🏥 **Insurance & Claims**: Coverage details, claim status, provider networks\n🏢 **Hospital Programs**: Loyalty benefits, discounts, special packages\n\nYou can ask about:\n• Eligibility requirements\n• Coverage details\n• Claim procedures\n• Discount programs\n• Application processes\n\nWhat specific information would you like?'
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse
      }

      setChatMessages(prev => [...prev, botMessage])
    }, 1000)

    setNewMessage('')
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-blue-100 text-blue-800'
      case 'eligible': return 'bg-green-100 text-green-800'
      case 'available': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const value = {
    chatExpanded,
    setChatExpanded,
    chatMessages,
    setChatMessages,
    newMessage,
    setNewMessage,
    governmentalSchemes,
    insuranceSchemes,
    hospitalSchemes,
    handleSendMessage,
    getStatusColor
  }

  return (
    <MedicalSchemesContext.Provider value={value}>
      {children}
    </MedicalSchemesContext.Provider>
  )
}