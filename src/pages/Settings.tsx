import React, { useState } from 'react'
import AppShell from '../components/AppShell'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../contexts/ToastContext'
import {
  User,
  CreditCard,
  Key,
  Bell,
  Shield,
  Download,
  Trash2,
  Check
} from 'lucide-react'

export default function Settings() {
  const { user } = useAuth()
  const { addToast } = useToast()
  
  const [activeTab, setActiveTab] = useState('profile')
  const [profile, setProfile] = useState({
    name: user?.email?.split('@')[0] || '',
    email: user?.email || '',
    company: '',
    timezone: 'UTC',
  })
  
  const [notifications, setNotifications] = useState({
    email_sequences: true,
    contact_enrichment: true,
    weekly_reports: false,
    system_updates: true,
  })

  const [subscription] = useState({
    plan: 'Pro Plan',
    price: '$59/month',
    status: 'Active',
    next_billing: '2024-02-15',
    features: [
      'Unlimited contacts',
      'Advanced automation',
      'Contact enrichment',
      'Email sequences',
      'Priority support'
    ]
  })

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'billing', name: 'Billing', icon: CreditCard },
    { id: 'api', name: 'API Keys', icon: Key },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'security', name: 'Security', icon: Shield },
  ]

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    addToast('Profile updated successfully', 'success')
  }

  const handleSaveNotifications = () => {
    addToast('Notification preferences saved', 'success')
  }

  return (
    <AppShell>
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-text-primary">Settings</h1>
            <p className="text-text-secondary">
              Manage your account preferences and configuration
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="mr-3 h-5 w-5" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="card p-6">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                      Profile Information
                    </h2>
                    
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Name
                          </label>
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Company
                          </label>
                          <input
                            type="text"
                            value={profile.company}
                            onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-2">
                            Timezone
                          </label>
                          <select
                            value={profile.timezone}
                            onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          >
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time</option>
                            <option value="America/Chicago">Central Time</option>
                            <option value="America/Denver">Mountain Time</option>
                            <option value="America/Los_Angeles">Pacific Time</option>
                          </select>
                        </div>
                      </div>
                      
                      <button type="submit" className="btn-primary">
                        Save Changes
                      </button>
                    </form>
                  </div>
                )}

                {/* Billing Tab */}
                {activeTab === 'billing' && (
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                      Billing & Subscription
                    </h2>
                    
                    <div className="space-y-6">
                      {/* Current Plan */}
                      <div className="border border-border rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-text-primary">
                              {subscription.plan}
                            </h3>
                            <p className="text-text-secondary">
                              {subscription.price} • Next billing: {subscription.next_billing}
                            </p>
                          </div>
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            {subscription.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 mb-6">
                          {subscription.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Check className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-text-secondary">{feature}</span>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-x-3">
                          <button className="btn-secondary">
                            Change Plan
                          </button>
                          <button className="btn-secondary">
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                      
                      {/* Payment Method */}
                      <div className="border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Payment Method
                        </h3>
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-8 bg-blue-500 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">VISA</span>
                          </div>
                          <div>
                            <p className="text-text-primary">•••• •••• •••• 4242</p>
                            <p className="text-text-secondary text-sm">Expires 12/25</p>
                          </div>
                          <button className="btn-secondary ml-auto">
                            Update
                          </button>
                        </div>
                      </div>
                      
                      {/* Billing History */}
                      <div className="border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Billing History
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <p className="text-text-primary">January 2024</p>
                              <p className="text-text-secondary text-sm">Pro Plan</p>
                            </div>
                            <div className="text-right">
                              <p className="text-text-primary">$59.00</p>
                              <button className="text-primary text-sm hover:underline">
                                <Download className="h-4 w-4 inline mr-1" />
                                Download
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* API Keys Tab */}
                {activeTab === 'api' && (
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                      API Configuration
                    </h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          OpenAI API Key
                        </label>
                        <div className="flex space-x-3">
                          <input
                            type="password"
                            placeholder="sk-..."
                            className="flex-1 px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <button className="btn-primary">
                            Save
                          </button>
                        </div>
                        <p className="text-text-secondary text-sm mt-2">
                          Required for contact enrichment and content generation
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Supabase Configuration
                        </label>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="Supabase URL"
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                          <input
                            type="password"
                            placeholder="Supabase Anon Key"
                            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                        <p className="text-text-secondary text-sm mt-2">
                          Configure your Supabase project for data storage
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                      Notification Preferences
                    </h2>
                    
                    <div className="space-y-6">
                      {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <div>
                            <h3 className="text-text-primary font-medium">
                              {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                            </h3>
                            <p className="text-text-secondary text-sm">
                              {key === 'email_sequences' && 'Get notified when sequences complete'}
                              {key === 'contact_enrichment' && 'Alerts when contacts are enriched'}
                              {key === 'weekly_reports' && 'Weekly performance summaries'}
                              {key === 'system_updates' && 'Important system announcements'}
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={value}
                              onChange={(e) => setNotifications(prev => ({ ...prev, [key]: e.target.checked }))}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                          </label>
                        </div>
                      ))}
                      
                      <button
                        onClick={handleSaveNotifications}
                        className="btn-primary"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <h2 className="text-xl font-semibold text-text-primary mb-6">
                      Security Settings
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Password
                        </h3>
                        <p className="text-text-secondary mb-4">
                          Last changed 30 days ago
                        </p>
                        <button className="btn-secondary">
                          Change Password
                        </button>
                      </div>
                      
                      <div className="border border-border rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Data Export
                        </h3>
                        <p className="text-text-secondary mb-4">
                          Download all your data in CSV format
                        </p>
                        <button className="btn-secondary">
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </button>
                      </div>
                      
                      <div className="border border-red-200 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-red-600 mb-4">
                          Danger Zone
                        </h3>
                        <p className="text-text-secondary mb-4">
                          Permanently delete your account and all associated data
                        </p>
                        <button className="btn-secondary text-red-600 border-red-200 hover:bg-red-50">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}