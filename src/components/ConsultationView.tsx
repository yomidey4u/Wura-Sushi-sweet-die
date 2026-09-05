import React, { useState } from 'react'
import { useForm } from '@formspree/react'
import { useAuth } from '../context/AuthProvider'

const FORMSPREE_ID = 'xqpzprrz'

const ConsultationView: React.FC = () => {
  const { user } = useAuth()
  const [state, handleSubmit] = useForm(FORMSPREE_ID)
  const [message, setMessage] = useState('')

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    handleSubmit(ev)
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Consultation Requests</h3>
      <p className="text-sm text-gray-600">Request booking requests and messages will appear here.</p>

      <div className="mt-6 border rounded p-4 bg-white">
        {state.succeeded ? (
          <div className="p-4">
            <div className="font-semibold">Thank you</div>
            <div className="text-sm text-gray-600">Your message has been received.</div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <input type="hidden" name="source" value="dashboard-consultation" />
            <input type="hidden" name="name" value={user?.user_metadata?.name ?? ''} />
            <input type="hidden" name="email" value={user?.email ?? ''} />

            <div className="flex flex-col gap-1.5">
              <label className="text-sm">Message</label>
              <textarea
                name="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="px-4 py-2 bg-cream rounded"
            >
              {state.submitting ? 'Sending...' : 'Send message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ConsultationView
