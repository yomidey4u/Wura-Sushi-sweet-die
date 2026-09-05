import React from 'react'

const SettingsView: React.FC = () => {
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
      <p className="text-sm text-gray-600">Personalise your account and notification preferences.</p>
      <div className="mt-6 border rounded p-4 bg-white">No settings configured.</div>
    </div>
  )
}

export default SettingsView
