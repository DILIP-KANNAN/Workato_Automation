import { Bot, Send, MessageCircle, Lightbulb, Heart, Calendar, Pill, FileText } from 'lucide-react'
import { useChat } from '../context/ChatContext'
import { useAppointment } from '../context/AppointmentContext'

const HealthAssistant = () => {
  const { chatMessages, newMessage, setNewMessage, handleSendMessage } = useChat()
  const { ongoingTreatment } = useAppointment()

  const onSendMessage = () => {
    handleSendMessage(ongoingTreatment)
  }

  const quickActions = [
    { 
      icon: Calendar, 
      label: 'Appointment Help', 
      message: 'I need help with my upcoming appointment',
      color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
    },
    { 
      icon: Pill, 
      label: 'Medication Info', 
      message: 'Tell me about my medications',
      color: 'bg-green-100 text-green-700 hover:bg-green-200'
    },
    { 
      icon: FileText, 
      label: 'Reports Access', 
      message: 'How do I access my medical reports?',
      color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
    },
    { 
      icon: Heart, 
      label: 'Health Tips', 
      message: 'Give me some health tips for my condition',
      color: 'bg-red-100 text-red-700 hover:bg-red-200'
    }
  ]

  const handleQuickAction = (message) => {
    setNewMessage(message)
    setTimeout(() => {
      handleSendMessage(ongoingTreatment)
    }, 100)
  }

  return (
    <div className="lg:col-span-1">
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-6 h-[700px] flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            <Bot className="w-6 h-6 mr-3 text-blue-600" />
            Health Assistant
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">Online</span>
          </div>
        </div>

        {/* Quick Actions */}
        {chatMessages.length <= 1 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon
                return (
                  <button
                    key={index}
                    onClick={() => handleQuickAction(action.message)}
                    className={`flex items-center space-x-2 p-3 rounded-lg transition-colors text-sm font-medium ${action.color}`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{action.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}
        
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6">
          {chatMessages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${
                message.type === 'user' 
                  ? 'bg-blue-500 text-white rounded-2xl rounded-br-md' 
                  : 'bg-white/90 border border-[#D7CCC8]/30 text-gray-800 rounded-2xl rounded-bl-md shadow-sm'
              } p-4`}>
                {message.type === 'bot' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-xs font-medium text-gray-600">Health Assistant</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.message}</p>
                <div className="flex justify-end mt-2">
                  <span className={`text-xs ${
                    message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                  }`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="border-t border-[#D7CCC8]/20 pt-4">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 bg-white/80 border border-blue-200/50 rounded-xl focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-sm pr-12"
              />
              <MessageCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              onClick={onSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl transition-colors shadow-lg hover:shadow-xl"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
            <span>Powered by AI • Available 24/7</span>
            <span>Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HealthAssistant