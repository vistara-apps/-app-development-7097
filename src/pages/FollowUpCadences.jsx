import React, { useState } from 'react'
import { Plus, Play, Pause, Edit, Trash2, Mail, CheckSquare, Clock } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import { useApp } from '../context/AppContext'

export default function FollowUpCadences() {
  const { followUpCadences } = useApp()
  const [selectedCadence, setSelectedCadence] = useState(null)

  const getStepIcon = (type) => {
    switch (type) {
      case 'email':
        return Mail
      case 'task':
        return CheckSquare
      default:
        return Clock
    }
  }

  const getStepColor = (type) => {
    switch (type) {
      case 'email':
        return 'text-accent'
      case 'task':
        return 'text-warning'
      default:
        return 'text-text-secondary'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Follow-up Cadences</h1>
          <p className="text-text-secondary mt-1">Automate your outreach sequences</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Cadence
        </Button>
      </div>

      {/* Cadences Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cadences List */}
        <div className="space-y-4">
          {followUpCadences.map((cadence) => (
            <Card 
              key={cadence.id} 
              variant="elevated"
              className={`cursor-pointer transition-all ${
                selectedCadence?.id === cadence.id ? 'ring-2 ring-accent' : ''
              }`}
              onClick={() => setSelectedCadence(cadence)}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">{cadence.name}</h3>
                    <p className="text-text-secondary text-sm mt-1">
                      Trigger: {cadence.triggerCondition}
                    </p>
                  </div>
                  <Badge variant="success">Active</Badge>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-text-secondary">
                    <Mail className="w-4 h-4 mr-1" />
                    {cadence.steps.filter(s => s.type === 'email').length} emails
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <CheckSquare className="w-4 h-4 mr-1" />
                    {cadence.steps.filter(s => s.type === 'task').length} tasks
                  </div>
                  <div className="flex items-center text-text-secondary">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.max(...cadence.steps.map(s => s.delayDays))} days
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="text-text-secondary text-sm">
                    12 leads enrolled • 8 active
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Pause className="w-3 h-3 mr-1" />
                      Pause
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}

          {/* Create New Cadence Card */}
          <Card 
            variant="elevated"
            className="border-2 border-dashed border-border hover:border-accent cursor-pointer transition-colors"
          >
            <div className="text-center py-8">
              <Plus className="w-8 h-8 text-text-secondary mx-auto mb-3" />
              <h3 className="text-lg font-medium text-text-primary">Create New Cadence</h3>
              <p className="text-text-secondary text-sm mt-1">
                Set up automated follow-up sequences
              </p>
              <Button className="mt-4">Get Started</Button>
            </div>
          </Card>
        </div>

        {/* Cadence Details */}
        <div>
          {selectedCadence ? (
            <Card variant="elevated">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-text-primary">
                    {selectedCadence.name}
                  </h3>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-3 h-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">Trigger Condition</h4>
                  <p className="text-text-secondary text-sm bg-background p-2 rounded">
                    {selectedCadence.triggerCondition}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-text-primary">Sequence Steps</h4>
                  <div className="space-y-3">
                    {selectedCadence.steps.map((step, index) => {
                      const StepIcon = getStepIcon(step.type)
                      return (
                        <div key={step.id} className="flex items-start space-x-3 p-3 bg-background rounded-lg">
                          <div className={`p-2 rounded-lg bg-surface-light ${getStepColor(step.type)}`}>
                            <StepIcon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="font-medium text-text-primary">
                                Step {index + 1}: {step.type === 'email' ? 'Email' : 'Task'}
                              </h5>
                              <span className="text-text-secondary text-sm">
                                Day {step.delayDays}
                              </span>
                            </div>
                            <p className="text-text-secondary text-sm mt-1">
                              {step.content}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h4 className="font-medium text-text-primary mb-3">Performance</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-text-primary">12</p>
                      <p className="text-text-secondary text-sm">Total Enrolled</p>
                    </div>
                    <div className="text-center p-3 bg-background rounded-lg">
                      <p className="text-2xl font-bold text-success">67%</p>
                      <p className="text-text-secondary text-sm">Completion Rate</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <Card variant="elevated">
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary">Select a Cadence</h3>
                <p className="text-text-secondary text-sm mt-1">
                  Choose a cadence from the list to view details
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}