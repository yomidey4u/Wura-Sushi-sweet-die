import React from 'react'

const ConsultationView: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Consultation Requests</h3>
      <p className="text-sm text-gray-600">Request booking requests and messages will appear here.</p>
      <div className="mt-6 border rounded p-4 bg-white">No consultations yet.</div>
    </div>
  )
}

export default ConsultationView
