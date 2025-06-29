import { createContext, useContext, useState, useCallback } from 'react'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

export const ChatProvider = ({ children }) => {
  const [chatMessages, setChatMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [initialized, setInitialized] = useState(false)

  const initializeChat = useCallback((user, ongoingTreatment) => {
    // Only initialize once
    if (initialized) return

    const initialMessage = {
      id: 1,
      type: 'bot',
      message: ongoingTreatment 
        ? `Hello ${user.name}! I see you have an upcoming appointment with Dr. Sarah Johnson on Jan 15. Would you like guidance for your visit?`
        : `Hello ${user.name}! How can I help you today? You can ask me about booking appointments, using the app, or general health queries.`
    }
    setChatMessages([initialMessage])
    setInitialized(true)
  }, [initialized])

  const handleSendMessage = useCallback((ongoingTreatment) => {
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
      
      if (newMessage.toLowerCase().includes('appointment')) {
        if (ongoingTreatment) {
          botResponse = `For your upcoming appointment on ${ongoingTreatment.nextAppointment}:\n\n• Arrive 15 minutes early\n• Bring your ID and insurance card\n• Location: Cardiology Wing, 3rd Floor\n• Contact: (555) 123-4567\n• Fasting required: No\n\nAnything else you'd like to know?`
        } else {
          botResponse = 'I can help you book an appointment! You can use the appointment booking section below or ask me about specific services.'
        }
      } else if (newMessage.toLowerCase().includes('medication')) {
        botResponse = 'You can view your current medications in the Medication tab. For prescription refills, contact your doctor or use our online refill service.'
      } else if (newMessage.toLowerCase().includes('report')) {
        botResponse = 'Your medical reports are available in the Reports section. You can download or view them anytime.'
      } else {
        botResponse = 'I understand you need help. You can ask me about:\n\n• Appointment guidance\n• App navigation\n• Medication information\n• Report access\n• General health queries\n\nWhat would you like to know more about?'
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: botResponse
      }

      setChatMessages(prev => [...prev, botMessage])
    }, 1000)

    setNewMessage('')
  }, [newMessage])

  const value = {
    chatMessages,
    newMessage,
    setChatMessages,
    setNewMessage,
    initializeChat,
    handleSendMessage
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}