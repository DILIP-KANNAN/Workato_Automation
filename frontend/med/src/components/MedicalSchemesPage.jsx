import { 
  CreditCard, 
  Shield, 
  Building2, 
  MessageCircle, 
  ChevronRight, 
  Phone, 
  Mail, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Info,
  X,
  Send,
  Bot,
  Minimize2,
  Maximize2
} from 'lucide-react'
import { useMedicalSchemes } from '../context/MedicalSchemesContext'

const MedicalSchemesPage = () => {
  const {
    chatExpanded,
    setChatExpanded,
    chatMessages,
    newMessage,
    setNewMessage,
    governmentalSchemes,
    insuranceSchemes,
    hospitalSchemes,
    handleSendMessage,
    getStatusColor
  } = useMedicalSchemes()

  return (
    <div className="space-y-8 relative">
      {/* Floating Chatbot */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        chatExpanded ? 'w-96 h-[500px]' : 'w-16 h-16'
      }`}>
        {!chatExpanded ? (
          <button
            onClick={() => setChatExpanded(true)}
            className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
          >
            <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold">
              ?
            </span>
          </button>
        ) : (
          <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-blue-200/50 h-full flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-200/30">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Schemes Assistant</h4>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
              <button
                onClick={() => setChatExpanded(false)}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${
                    message.type === 'user' 
                      ? 'bg-blue-500 text-white rounded-2xl rounded-br-md' 
                      : 'bg-gray-100 text-gray-800 rounded-2xl rounded-bl-md'
                  } p-3`}>
                    <p className="text-sm leading-relaxed whitespace-pre-line">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-blue-200/30">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about schemes..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page Header */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Medical Schemes</h2>
              <p className="text-gray-600">Manage your healthcare coverage and benefits</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Need help?</p>
            <p className="text-sm text-blue-600 font-medium">Click the chat icon →</p>
          </div>
        </div>
      </div>

      {/* 1. Governmental Schemes */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Shield className="w-6 h-6 mr-3 text-blue-600" />
          Government Healthcare Schemes
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {governmentalSchemes.map((scheme) => {
            const IconComponent = scheme.icon
            return (
              <div key={scheme.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#D7CCC8]/20 hover:border-[#D7CCC8]/40 transition-all hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${scheme.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${scheme.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{scheme.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                      {scheme.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{scheme.description}</p>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Coverage:</p>
                    <p className="text-sm text-gray-600">{scheme.coverage}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Eligibility:</p>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Key Benefits:</p>
                  <div className="space-y-1">
                    {scheme.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                    {scheme.benefits.length > 2 && (
                      <p className="text-xs text-blue-600">+{scheme.benefits.length - 2} more benefits</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-xs text-gray-600">{scheme.contact}</span>
                  </div>
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1">
                    <span>Learn More</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. Insurance and Claims */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <CreditCard className="w-6 h-6 mr-3 text-green-600" />
          Insurance Coverage & Claims
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {insuranceSchemes.map((insurance) => {
            const IconComponent = insurance.icon
            return (
              <div key={insurance.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#D7CCC8]/20 hover:border-[#D7CCC8]/40 transition-all hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${insurance.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${insurance.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{insurance.name}</h4>
                    <p className="text-sm text-gray-600">{insurance.provider}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50/80 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Plan Type</p>
                    <p className="font-semibold text-gray-900">{insurance.type}</p>
                  </div>
                  <div className="bg-gray-50/80 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Premium</p>
                    <p className="font-semibold text-gray-900">{insurance.premium}</p>
                  </div>
                  <div className="bg-gray-50/80 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Deductible</p>
                    <p className="font-semibold text-gray-900">{insurance.deductible}</p>
                  </div>
                  <div className="bg-gray-50/80 p-3 rounded-lg">
                    <p className="text-xs text-gray-600">Coverage</p>
                    <p className="font-semibold text-gray-900">{insurance.coverage}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Recent Claim:</p>
                  <div className="bg-blue-50/80 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">{insurance.lastClaim}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(insurance.claimStatus)}`}>
                        {insurance.claimStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Amount: {insurance.claimAmount}</p>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 flex items-center justify-center space-x-2 p-2 bg-blue-100/80 hover:bg-blue-200/80 rounded-lg transition-colors border border-blue-200/50">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-blue-700">View Claims</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 p-2 bg-green-100/80 hover:bg-green-200/80 rounded-lg transition-colors border border-green-200/50">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-green-700">Contact</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* 3. Hospital Schemes */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Building2 className="w-6 h-6 mr-3 text-purple-600" />
          Hospital Benefit Schemes
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {hospitalSchemes.map((scheme) => {
            const IconComponent = scheme.icon
            return (
              <div key={scheme.id} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-[#D7CCC8]/20 hover:border-[#D7CCC8]/40 transition-all hover:shadow-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-12 h-12 ${scheme.bgColor} rounded-lg flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${scheme.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{scheme.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(scheme.status)}`}>
                      {scheme.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{scheme.description}</p>

                <div className="bg-green-50/80 p-3 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-green-900">{scheme.discount}</p>
                  <p className="text-xs text-green-700">Discount Rate</p>
                </div>

                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Eligibility:</p>
                    <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">Validity:</p>
                    <p className="text-sm text-gray-600">{scheme.validity}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-2">Benefits Include:</p>
                  <div className="space-y-1">
                    {scheme.benefits.slice(0, 2).map((benefit, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                    {scheme.benefits.length > 2 && (
                      <p className="text-xs text-purple-600">+{scheme.benefits.length - 2} more benefits</p>
                    )}
                  </div>
                </div>

                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-purple-100/80 hover:bg-purple-200/80 rounded-lg transition-colors border border-purple-200/50">
                  <span className="text-sm text-purple-700 font-medium">
                    {scheme.status === 'Active' ? 'Manage Benefits' : 'Apply Now'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-purple-600" />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50/80 hover:bg-blue-100/80 rounded-xl border border-blue-200/50 transition-all group">
            <FileText className="w-6 h-6 text-blue-600" />
            <div className="text-left">
              <p className="font-medium text-blue-900">Submit Claim</p>
              <p className="text-xs text-blue-700">File new insurance claim</p>
            </div>
            <ChevronRight className="w-4 h-4 text-blue-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="flex items-center space-x-3 p-4 bg-green-50/80 hover:bg-green-100/80 rounded-xl border border-green-200/50 transition-all group">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div className="text-left">
              <p className="font-medium text-green-900">Check Eligibility</p>
              <p className="text-xs text-green-700">Verify scheme eligibility</p>
            </div>
            <ChevronRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="flex items-center space-x-3 p-4 bg-purple-50/80 hover:bg-purple-100/80 rounded-xl border border-purple-200/50 transition-all group">
            <Building2 className="w-6 h-6 text-purple-600" />
            <div className="text-left">
              <p className="font-medium text-purple-900">Hospital Benefits</p>
              <p className="text-xs text-purple-700">View available discounts</p>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-600 group-hover:translate-x-1 transition-transform" />
          </button>

          <button className="flex items-center space-x-3 p-4 bg-orange-50/80 hover:bg-orange-100/80 rounded-xl border border-orange-200/50 transition-all group">
            <Phone className="w-6 h-6 text-orange-600" />
            <div className="text-left">
              <p className="font-medium text-orange-900">Get Support</p>
              <p className="text-xs text-orange-700">Contact scheme support</p>
            </div>
            <ChevronRight className="w-4 h-4 text-orange-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MedicalSchemesPage