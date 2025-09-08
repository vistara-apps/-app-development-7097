import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Plus, Play, Pause, Edit, Trash2, Clock, Users, CheckCircle } from 'lucide-react';

const FollowUpCadences = () => {
  const { followUpCadences, setFollowUpCadences } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingCadence, setEditingCadence] = useState(null);
  const [newCadence, setNewCadence] = useState({
    name: '',
    triggerCondition: 'lead_status_new',
    steps: [
      { type: 'email', content: '', delayDays: 0 }
    ]
  });

  const triggerOptions = [
    { value: 'lead_status_new', label: 'New Lead Added' },
    { value: 'lead_score_above_80', label: 'Lead Score Above 80' },
    { value: 'lead_score_above_60', label: 'Lead Score Above 60' },
    { value: 'no_contact_7days', label: 'No Contact for 7 Days' },
    { value: 'email_opened', label: 'Email Opened' },
    { value: 'email_clicked', label: 'Email Link Clicked' }
  ];

  const stepTypes = [
    { value: 'email', label: 'Send Email', icon: Mail },
    { value: 'task', label: 'Create Task', icon: CheckCircle }
  ];

  const addStep = () => {
    setNewCadence(prev => ({
      ...prev,
      steps: [...prev.steps, { type: 'email', content: '', delayDays: 1 }]
    }));
  };

  const removeStep = (index) => {
    setNewCadence(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }));
  };

  const updateStep = (index, field, value) => {
    setNewCadence(prev => ({
      ...prev,
      steps: prev.steps.map((step, i) => 
        i === index ? { ...step, [field]: value } : step
      )
    }));
  };

  const saveCadence = () => {
    if (!newCadence.name.trim()) return;

    const cadence = {
      id: followUpCadences.length + 1,
      ...newCadence,
      active: true
    };

    setFollowUpCadences([...followUpCadences, cadence]);
    setShowCreateModal(false);
    setNewCadence({
      name: '',
      triggerCondition: 'lead_status_new',
      steps: [{ type: 'email', content: '', delayDays: 0 }]
    });
  };

  const toggleCadenceStatus = (id) => {
    setFollowUpCadences(prev => 
      prev.map(cadence => 
        cadence.id === id 
          ? { ...cadence, active: !cadence.active }
          : cadence
      )
    );
  };

  const deleteCadence = (id) => {
    setFollowUpCadences(prev => prev.filter(cadence => cadence.id !== id));
  };

  const getTriggerLabel = (condition) => {
    const option = triggerOptions.find(opt => opt.value === condition);
    return option ? option.label : condition;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-textPrimary mb-2">Follow-up Cadences</h1>
          <p className="text-textSecondary">Automate your outreach with intelligent follow-up sequences</p>
        </div>
        
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
        >
          <Plus size={16} />
          Create Cadence
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Active Cadences</p>
              <p className="text-2xl font-bold text-textPrimary mt-1">
                {followUpCadences.filter(c => c.active).length}
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Play className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Total Sequences</p>
              <p className="text-2xl font-bold text-textPrimary mt-1">{followUpCadences.length}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Mail className="text-accent" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Enrolled Leads</p>
              <p className="text-2xl font-bold text-textPrimary mt-1">47</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Users className="text-purple-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Response Rate</p>
              <p className="text-2xl font-bold text-textPrimary mt-1">24%</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <CheckCircle className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Cadences List */}
      <div className="space-y-4">
        {followUpCadences.map((cadence) => (
          <div key={cadence.id} className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-textPrimary">{cadence.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    cadence.active 
                      ? 'bg-green-500/10 text-green-400' 
                      : 'bg-gray-500/10 text-gray-400'
                  }`}>
                    {cadence.active ? 'Active' : 'Paused'}
                  </span>
                </div>
                <p className="text-textSecondary text-sm">
                  Trigger: {getTriggerLabel(cadence.triggerCondition)}
                </p>
                <p className="text-textSecondary text-sm">
                  {cadence.steps.length} steps • 12 leads enrolled
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleCadenceStatus(cadence.id)}
                  className={`p-2 rounded-md transition-colors ${
                    cadence.active 
                      ? 'hover:bg-red-500/10 text-red-400' 
                      : 'hover:bg-green-500/10 text-green-400'
                  }`}
                  title={cadence.active ? 'Pause' : 'Activate'}
                >
                  {cadence.active ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={() => setEditingCadence(cadence)}
                  className="p-2 hover:bg-cardBg rounded-md transition-colors text-textSecondary hover:text-textPrimary"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => deleteCadence(cadence.id)}
                  className="p-2 hover:bg-red-500/10 rounded-md transition-colors text-red-400"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-textSecondary uppercase tracking-wider">Sequence Steps</h4>
              <div className="space-y-3">
                {cadence.steps.map((step, index) => {
                  const StepIcon = stepTypes.find(type => type.value === step.type)?.icon || Mail;
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 bg-surface rounded-lg">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                          <StepIcon className="text-accent" size={16} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-textPrimary">
                            Step {index + 1}: {stepTypes.find(type => type.value === step.type)?.label}
                          </span>
                          {step.delayDays > 0 && (
                            <span className="flex items-center gap-1 text-xs text-textSecondary">
                              <Clock size={12} />
                              {step.delayDays} day{step.delayDays !== 1 ? 's' : ''} delay
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-textSecondary">{step.content || 'No content specified'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {followUpCadences.length === 0 && (
          <div className="bg-cardBg border border-border rounded-lg p-12 text-center shadow-card">
            <Mail className="mx-auto text-textSecondary mb-4" size={48} />
            <h3 className="text-lg font-medium text-textPrimary mb-2">No Cadences Created</h3>
            <p className="text-textSecondary mb-6">
              Create your first follow-up cadence to automate your outreach
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
            >
              Create Your First Cadence
            </button>
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingCadence) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-cardBg border border-border rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-textPrimary">
                {editingCadence ? 'Edit Cadence' : 'Create New Cadence'}
              </h3>
              <button
                onClick={() => {
                  setShowCreateModal(false);
                  setEditingCadence(null);
                }}
                className="text-textSecondary hover:text-textPrimary"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Cadence Name
                </label>
                <input
                  type="text"
                  value={newCadence.name}
                  onChange={(e) => setNewCadence(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., New Lead Welcome"
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md text-textPrimary placeholder-textSecondary focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textPrimary mb-2">
                  Trigger Condition
                </label>
                <select
                  value={newCadence.triggerCondition}
                  onChange={(e) => setNewCadence(prev => ({ ...prev, triggerCondition: e.target.value }))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  {triggerOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Steps */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-textPrimary">
                    Sequence Steps
                  </label>
                  <button
                    onClick={addStep}
                    className="flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors text-sm"
                  >
                    <Plus size={14} />
                    Add Step
                  </button>
                </div>

                <div className="space-y-4">
                  {newCadence.steps.map((step, index) => (
                    <div key={index} className="p-4 bg-surface border border-border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-textPrimary">Step {index + 1}</h4>
                        {newCadence.steps.length > 1 && (
                          <button
                            onClick={() => removeStep(index)}
                            className="text-red-400 hover:text-red-300"
                          >
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <label className="block text-xs text-textSecondary mb-1">Type</label>
                          <select
                            value={step.type}
                            onChange={(e) => updateStep(index, 'type', e.target.value)}
                            className="w-full px-3 py-2 bg-cardBg border border-border rounded-md text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          >
                            {stepTypes.map(type => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs text-textSecondary mb-1">Delay (days)</label>
                          <input
                            type="number"
                            min="0"
                            value={step.delayDays}
                            onChange={(e) => updateStep(index, 'delayDays', parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-cardBg border border-border rounded-md text-textPrimary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs text-textSecondary mb-1">
                          {step.type === 'email' ? 'Email Template' : 'Task Description'}
                        </label>
                        <textarea
                          value={step.content}
                          onChange={(e) => updateStep(index, 'content', e.target.value)}
                          placeholder={
                            step.type === 'email' 
                              ? 'Enter email template...' 
                              : 'Enter task description...'
                          }
                          rows="3"
                          className="w-full px-3 py-2 bg-cardBg border border-border rounded-md text-textPrimary placeholder-textSecondary text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingCadence(null);
                  }}
                  className="px-4 py-2 border border-border rounded-md text-textSecondary hover:text-textPrimary hover:border-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={saveCadence}
                  className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors"
                >
                  {editingCadence ? 'Update Cadence' : 'Create Cadence'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowUpCadences;