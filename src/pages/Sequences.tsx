import React, { useState } from 'react'
import AppShell from '../components/AppShell'
import { useContacts } from '../contexts/ContactContext'
import { useToast } from '../contexts/ToastContext'
import {
  Mail,
  Plus,
  Play,
  Pause,
  Edit,
  Trash2,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react'

interface SequenceStep {
  id: string
  type: 'email' | 'wait'
  delay: number
  content?: string
}

interface Sequence {
  id: string
  name: string
  steps: SequenceStep[]
  trigger: string
  active: boolean
  contacts_count: number
  open_rate: number
  response_rate: number
}

export default function Sequences() {
  const { contacts } = useContacts()
  const { addToast } = useToast()
  
  const [sequences, setSequences] = useState<Sequence[]>([
    {
      id: '1',
      name: 'Welcome Series',
      steps: [
        { id: '1', type: 'email', delay: 0, content: 'Welcome to our platform!' },
        { id: '2', type: 'wait', delay: 3 },
        { id: '3', type: 'email', delay: 0, content: 'How are you finding everything?' }
      ],
      trigger: 'New Contact',
      active: true,
      contacts_count: 25,
      open_rate: 45,
      response_rate: 12
    },
    {
      id: '2',
      name: 'Follow-up Campaign',
      steps: [
        { id: '1', type: 'email', delay: 0, content: 'Following up on our conversation...' },
        { id: '2', type: 'wait', delay: 7 },
        { id: '3', type: 'email', delay: 0, content: 'Any questions I can help with?' }
      ],
      trigger: 'Demo Attended',
      active: false,
      contacts_count: 12,
      open_rate: 38,
      response_rate: 8
    }
  ])
  
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newSequence, setNewSequence] = useState({
    name: '',
    trigger: '',
    steps: [{ id: '1', type: 'email' as const, delay: 0, content: '' }]
  })

  const handleCreateSequence = (e: React.FormEvent) => {
    e.preventDefault()
    
    const sequence: Sequence = {
      id: Date.now().toString(),
      name: newSequence.name,
      steps: newSequence.steps.map(step => ({ ...step, id: Date.now().toString() })),
      trigger: newSequence.trigger,
      active: true,
      contacts_count: 0,
      open_rate: 0,
      response_rate: 0
    }
    
    setSequences(prev => [sequence, ...prev])
    setNewSequence({
      name: '',
      trigger: '',
      steps: [{ id: '1', type: 'email', delay: 0, content: '' }]
    })
    setShowCreateModal(false)
    addToast('Sequence created successfully', 'success')
  }

  const toggleSequenceStatus = (id: string) => {
    setSequences(prev => prev.map(seq => 
      seq.id === id ? { ...seq, active: !seq.active } : seq
    ))
    addToast('Sequence status updated', 'success')
  }

  const deleteSequence = (id: string) => {
    if (window.confirm('Are you sure you want to delete this sequence?')) {
      setSequences(prev => prev.filter(seq => seq.id !== id))
      addToast('Sequence deleted successfully', 'success')
    }
  }

  const addStep = () => {
    const newStep = { 
      id: Date.now().toString(), 
      type: 'email' as const, 
      delay: 0, 
      content: '' 
    }
    setNewSequence(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }))
  }

  const updateStep = (index: number, field: string, value: any) => {
    setNewSequence(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }))
  }

  const removeStep = (index: number) => {
    setNewSequence(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }))
  }

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Sequences</h1>
            <p className="text-text-secondary">
              Automate your outreach with targeted email sequences
            </p>
          </div>
          
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Sequence
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  Total Sequences
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {sequences.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500">
                <Play className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  Active
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {sequences.filter(s => s.active).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  Total Contacts
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {sequences.reduce((sum, seq) => sum + seq.contacts_count, 0)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-orange-500">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  Avg Response Rate
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {sequences.length > 0 
                    ? Math.round(sequences.reduce((sum, seq) => sum + seq.response_rate, 0) / sequences.length)
                    : 0
                  }%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sequences List */}
        <div className="space-y-4">
          {sequences.length > 0 ? (
            sequences.map((sequence) => (
              <div key={sequence.id} className="card p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {sequence.name}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        sequence.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {sequence.active ? 'Active' : 'Paused'}
                      </span>
                    </div>
                    
                    <p className="text-text-secondary mb-3">
                      Trigger: {sequence.trigger} • {sequence.steps.length} steps
                    </p>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4 text-text-secondary" />
                        <span>{sequence.contacts_count} contacts</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Mail className="h-4 w-4 text-text-secondary" />
                        <span>{sequence.open_rate}% open rate</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4 text-text-secondary" />
                        <span>{sequence.response_rate}% response rate</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleSequenceStatus(sequence.id)}
                      className={`p-2 rounded-md ${
                        sequence.active 
                          ? 'text-orange-600 hover:text-orange-800' 
                          : 'text-green-600 hover:text-green-800'
                      }`}
                      title={sequence.active ? 'Pause Sequence' : 'Start Sequence'}
                    >
                      {sequence.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </button>
                    <button
                      className="p-2 text-blue-600 hover:text-blue-800 rounded-md"
                      title="Edit Sequence"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => deleteSequence(sequence.id)}
                      className="p-2 text-red-600 hover:text-red-800 rounded-md"
                      title="Delete Sequence"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                {/* Sequence Steps Preview */}
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 overflow-x-auto">
                    {sequence.steps.map((step, index) => (
                      <div key={step.id} className="flex items-center space-x-2 flex-shrink-0">
                        <div className={`p-2 rounded-md ${
                          step.type === 'email' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.type === 'email' ? <Mail className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                        </div>
                        <span className="text-sm text-text-secondary">
                          {step.type === 'email' ? `Email ${index + 1}` : `Wait ${step.delay} days`}
                        </span>
                        {index < sequence.steps.length - 1 && (
                          <div className="w-8 h-px bg-border"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card p-12 text-center">
              <Mail className="h-12 w-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No sequences yet
              </h3>
              <p className="text-text-secondary mb-6">
                Create your first automated email sequence to start engaging with your contacts.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn-primary"
              >
                Create Your First Sequence
              </button>
            </div>
          )}
        </div>

        {/* Create Sequence Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Create New Sequence
              </h2>
              
              <form onSubmit={handleCreateSequence} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Sequence Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newSequence.name}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g., Welcome Series"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-2">
                    Trigger
                  </label>
                  <select
                    required
                    value={newSequence.trigger}
                    onChange={(e) => setNewSequence(prev => ({ ...prev, trigger: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select trigger</option>
                    <option value="New Contact">New Contact</option>
                    <option value="Demo Attended">Demo Attended</option>
                    <option value="Trial Started">Trial Started</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-text-primary">
                      Sequence Steps
                    </label>
                    <button
                      type="button"
                      onClick={addStep}
                      className="btn-secondary text-sm"
                    >
                      Add Step
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {newSequence.steps.map((step, index) => (
                      <div key={index} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-text-primary">
                            Step {index + 1}
                          </h4>
                          {newSequence.steps.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeStep(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                              Type
                            </label>
                            <select
                              value={step.type}
                              onChange={(e) => updateStep(index, 'type', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                              <option value="email">Email</option>
                              <option value="wait">Wait</option>
                            </select>
                          </div>
                          
                          {step.type === 'wait' && (
                            <div>
                              <label className="block text-sm font-medium text-text-secondary mb-1">
                                Days to wait
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={step.delay}
                                onChange={(e) => updateStep(index, 'delay', parseInt(e.target.value))}
                                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              />
                            </div>
                          )}
                        </div>
                        
                        {step.type === 'email' && (
                          <div>
                            <label className="block text-sm font-medium text-text-secondary mb-1">
                              Email Content
                            </label>
                            <textarea
                              rows={4}
                              value={step.content}
                              onChange={(e) => updateStep(index, 'content', e.target.value)}
                              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                              placeholder="Hi {{firstName}}, ..."
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Create Sequence
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}