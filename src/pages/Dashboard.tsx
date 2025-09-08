import React from 'react'
import AppShell from '../components/AppShell'
import { useContacts } from '../contexts/ContactContext'
import { useAuth } from '../contexts/AuthContext'
import { 
  Users, 
  Mail, 
  TrendingUp, 
  Zap,
  Upload,
  Plus,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
  const { contacts } = useContacts()
  const { user } = useAuth()

  const stats = [
    {
      name: 'Total Contacts',
      value: contacts.length.toLocaleString(),
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Enriched Contacts',
      value: contacts.filter(c => c.enriched).length.toLocaleString(),
      icon: Zap,
      color: 'bg-green-500',
    },
    {
      name: 'Active Sequences',
      value: '12',
      icon: Mail,
      color: 'bg-purple-500',
    },
    {
      name: 'Response Rate',
      value: '24%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  const recentContacts = contacts.slice(0, 5)

  const quickActions = [
    {
      name: 'Import Contacts',
      description: 'Upload CSV or connect data sources',
      icon: Upload,
      href: '/contacts',
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      name: 'Create Sequence',
      description: 'Set up automated outreach',
      icon: Plus,
      href: '/sequences',
      color: 'bg-green-50 text-green-600 border-green-200',
    },
  ]

  return (
    <AppShell>
      <div className="p-6 space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-purple-600 rounded-lg p-8 text-white">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Here's what's happening with your customer data today.
          </p>
          <div className="flex flex-wrap gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                to={action.href}
                className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
              >
                <action.icon className="h-5 w-5 mr-2" />
                {action.name}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.name} className="card p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-text-secondary">
                    {stat.name}
                  </p>
                  <p className="text-2xl font-bold text-text-primary">
                    {stat.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Contacts */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-text-primary">
                Recent Contacts
              </h2>
              <Link
                to="/contacts"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
            
            {recentContacts.length > 0 ? (
              <div className="space-y-4">
                {recentContacts.map((contact) => (
                  <div key={contact.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {contact.first_name?.[0]}{contact.last_name?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">
                          {contact.first_name} {contact.last_name}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                    {contact.enriched && (
                      <span className="text-xs bg-accent text-white px-2 py-1 rounded-full">
                        Enriched
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">No contacts yet</p>
                <Link
                  to="/contacts"
                  className="btn-primary mt-4 inline-block"
                >
                  Add your first contact
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-text-primary mb-6">
              Quick Actions
            </h2>
            <div className="space-y-4">
              {quickActions.map((action) => (
                <Link
                  key={action.name}
                  to={action.href}
                  className={`block p-4 rounded-lg border-2 border-dashed hover:border-solid transition-all ${action.color}`}
                >
                  <div className="flex items-center">
                    <action.icon className="h-6 w-6 mr-3" />
                    <div>
                      <h3 className="font-medium">{action.name}</h3>
                      <p className="text-sm opacity-80">{action.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 ml-auto" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-text-primary mb-6">
            Recent Activity
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-sm text-text-secondary">
                Welcome to Contact Sync Pro! Start by importing your first contacts.
              </span>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}