import { 
  Pill, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Minus, 
  Plus as PlusIcon 
} from 'lucide-react'
import { useMedication } from '../context/MedicationContext'

const MedicationPage = () => {
  const {
    currentMedications,
    previousMedications,
    expandedMedications,
    medicationQuantities,
    reminderTimes,
    toggleMedicationExpansion,
    updateQuantity,
    updateReminderTime,
    getStockStatus,
    getTimingIcon,
    getTimingColor,
    setMedicationQuantities
  } = useMedication()

  return (
    <div className="space-y-8">
      {/* Current Medications */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <Pill className="w-6 h-6 mr-3 text-blue-600" />
          Current Medications
        </h3>

        <div className="space-y-6">
          {currentMedications.map((medication) => {
            const stockStatus = getStockStatus(medicationQuantities[medication.id] || 0)
            const isExpanded = expandedMedications[medication.id]
            const StockIcon = stockStatus.icon
            
            return (
              <div key={medication.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-[#D7CCC8]/20 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{medication.name}</h4>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {medication.dosage}
                        </span>
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}>
                          <StockIcon className="w-3 h-3" />
                          <span>{stockStatus.status === 'out' ? 'Out of Stock' : stockStatus.status === 'low' ? 'Low Stock' : 'In Stock'}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{medication.frequency} • {medication.foodInstruction}</p>
                      <p className="text-sm text-gray-500">Prescribed by {medication.prescribedBy} for {medication.treatment}</p>
                    </div>
                    
                    <button
                      onClick={() => toggleMedicationExpansion(medication.id)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Timing Pills */}
                  <div className="flex items-center space-x-2 mb-4">
                    {medication.timing.map((time) => {
                      const TimingIcon = getTimingIcon(time)
                      return (
                        <div key={time} className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getTimingColor(time)}`}>
                          <TimingIcon className="w-4 h-4" />
                          <span className="capitalize">{time}</span>
                        </div>
                      )
                    })}
                  </div>

                  {/* Quantity Management */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">Quantity Available:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(medication.id, -1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <input
                          type="number"
                          value={medicationQuantities[medication.id] || 0}
                          onChange={(e) => setMedicationQuantities(prev => ({
                            ...prev,
                            [medication.id]: Math.max(0, parseInt(e.target.value) || 0)
                          }))}
                          className="w-16 px-2 py-1 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8]"
                          min="0"
                        />
                        <button
                          onClick={() => updateQuantity(medication.id, 1)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-sm text-gray-500">/ {medication.totalQuantity} total</span>
                    </div>
                  </div>

                  {/* Reminder Times */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">Set Reminder Times:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {medication.timing.map((timing) => {
                        const TimingIcon = getTimingIcon(timing)
                        return (
                          <div key={timing} className="flex items-center space-x-2">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-sm ${getTimingColor(timing)}`}>
                              <TimingIcon className="w-4 h-4" />
                              <span className="capitalize">{timing}</span>
                            </div>
                            <input
                              type="time"
                              value={reminderTimes[medication.id]?.[timing] || ''}
                              onChange={(e) => updateReminderTime(medication.id, timing, e.target.value)}
                              className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#D7CCC8] focus:border-[#D7CCC8] text-sm"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="border-t border-[#D7CCC8]/20 p-6 bg-gray-50/50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Treatment Details</h5>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p><strong>Duration:</strong> {medication.duration}</p>
                          <p><strong>Started:</strong> {medication.startDate}</p>
                          <p><strong>Treatment:</strong> {medication.treatment}</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Side Effects</h5>
                        <p className="text-sm text-gray-600">{medication.sideEffects}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Previous Medications */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-blue-200/50 p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-3 text-gray-600" />
          Previous Medications
        </h3>

        <div className="space-y-4">
          {previousMedications.map((medication) => (
            <div key={medication.id} className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{medication.name}</h4>
                    <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                      {medication.dosage}
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {medication.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{medication.frequency} • {medication.foodInstruction}</p>
                  <p className="text-sm text-gray-500">Prescribed by {medication.prescribedBy} for {medication.treatment}</p>
                </div>
              </div>

              {/* Timing Pills */}
              <div className="flex items-center space-x-2 mb-4">
                {medication.timing.map((time) => {
                  const TimingIcon = getTimingIcon(time)
                  return (
                    <div key={time} className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getTimingColor(time)} opacity-75`}>
                      <TimingIcon className="w-4 h-4" />
                      <span className="capitalize">{time}</span>
                    </div>
                  )
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                <div>
                  <strong>Duration:</strong> {medication.duration}
                </div>
                <div>
                  <strong>Started:</strong> {medication.startDate}
                </div>
                <div>
                  <strong>Completed:</strong> {medication.endDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MedicationPage