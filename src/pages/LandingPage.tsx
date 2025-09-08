
import { Link } from 'react-router-dom'
import { 
  Database, 
  Zap, 
  Mail, 
  Users, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

export default function LandingPage() {
  const features = [
    {
      icon: Database,
      title: 'Data Aggregation Hub',
      description: 'Connect various data sources and create a unified customer database'
    },
    {
      icon: Zap,
      title: 'Automated Contact Enrichment',
      description: 'Automatically find and add missing contact details and company information'
    },
    {
      icon: Mail,
      title: 'Targeted Outreach Sequences',
      description: 'Create and automate multi-step email follow-up campaigns'
    },
    {
      icon: Users,
      title: 'Smart Contact Segmentation',
      description: 'Automatically group contacts based on defined criteria'
    }
  ]

  const benefits = [
    'Save hours of manual data entry',
    'Increase lead conversion rates',
    'Never lose track of prospects',
    'Automate follow-up sequences',
    'Rich contact profiles',
    'Targeted messaging'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-surface/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Database className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Contact Sync Pro</span>
            </div>
            <Link
              to="/auth"
              className="btn-primary"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 1000+ founders
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Effortlessly consolidate and enrich your 
              <span className="text-primary"> customer data</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
              The complete solution for early-stage founders to aggregate, enrich, and automate outreach for their customer data. Stop losing leads and start growing faster.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/auth"
              className="inline-flex items-center px-8 py-4 bg-primary text-white rounded-lg hover:opacity-90 transition-opacity font-semibold"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <button className="inline-flex items-center px-8 py-4 bg-surface border border-border rounded-lg hover:bg-gray-50 transition-colors font-semibold">
              Watch Demo
            </button>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 shadow-2xl">
              <div className="bg-surface rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Contact Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2,949</div>
                    <div className="text-sm text-blue-600">Total Contacts</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">87%</div>
                    <div className="text-sm text-green-600">Enriched</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">45</div>
                    <div className="text-sm text-purple-600">Active Sequences</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-surface">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-text-primary mb-4">
              Everything you need to manage customer data
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Powerful features designed specifically for early-stage founders who need to move fast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card p-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-text-primary mb-6">
                Why founders choose Contact Sync Pro
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-text-secondary">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card p-8">
              <h3 className="text-2xl font-semibold text-text-primary mb-4">
                Start your free trial
              </h3>
              <p className="text-text-secondary mb-6">
                Join hundreds of founders who have streamlined their customer data management
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Core features</span>
                  <span className="font-semibold">$29/month</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Advanced automation</span>
                  <span className="font-semibold">$59/month</span>
                </div>
                <Link
                  to="/auth"
                  className="w-full btn-primary text-center block"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Database className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">Contact Sync Pro</span>
          </div>
          <p className="text-text-secondary">
            © 2024 Contact Sync Pro. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
