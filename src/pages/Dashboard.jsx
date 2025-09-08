import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, Target, Mail, Database, Play } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import ProgressBar from '../components/ui/ProgressBar'
import Badge from '../components/ui/Badge'
import { useApp } from '../context/AppContext'

const enrichmentData = [
  { month: 'Jan', enriched: 120, total: 150 },
  { month: 'Feb', enriched: 140, total: 170 },
  { month: 'Mar', enriched: 160, total: 180 },
  { month: 'Apr', enriched: 180, total: 200 },
]

const leadScoreData = [
  { name: 'Hot (80-100)', value: 25, color: '#ef4444' },
  { name: 'Warm (60-79)', value: 35, color: '#f59e0b' },
  { name: 'Cold (0-59)', value: 40, color: '#6b7280' },
]

export default function Dashboard() {
  const { crmRecords, enrichmentJobs, followUpCadences } = useApp()

  const stats = [
    {
      title: 'Total Records',
      value: crmRecords.length.toString(),
      change: '+12%',
      icon: Users,
      color: 'text-accent'
    },
    {
      title: 'Enriched This Month',
      value: '127',
      change: '+8%',
      icon: Database,
      color: 'text-success'
    },
    {
      title: 'Average Lead Score',
      value: '83',
      change: '+5%',
      icon: Target,
      color: 'text-warning'
    },
    {
      title: 'Active Cadences',
      value: followUpCadences.length.toString(),
      change: '+2',
      icon: Mail,
      color: 'text-accent'
    },
  ]

  const recentJobs = enrichmentJobs.slice(-3)
  const topLeads = crmRecords
    .sort((a, b) => b.leadScore - a.leadScore)
    .slice(0, 5)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">Welcome back! Here's what's happening with your CRM.</p>
        </div>
        <Button onClick={() => console.log('Start enrichment')}>
          <Play className="w-4 h-4 mr-2" />
          Start Enrichment
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} variant="elevated">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-text-primary mt-2">{stat.value}</p>
                <p className="text-success text-sm mt-1">{stat.change} from last month</p>
              </div>
              <div className={`p-3 rounded-lg bg-surface-light ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrichment Progress */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Enrichment Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrichmentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 13% 18%)" />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'hsl(215 20.2% 65.1%)', fontSize: 12 }}
              />
              <Bar dataKey="enriched" fill="hsl(204 100% 50%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="total" fill="hsl(220 15% 16%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Lead Score Distribution */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Lead Score Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leadScoreData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {leadScoreData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {leadScoreData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-text-secondary text-sm">{item.name}</span>
                </div>
                <span className="text-text-primary text-sm font-medium">{item.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Enrichment Jobs */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Recent Enrichment Jobs</h3>
          <div className="space-y-4">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-primary text-sm font-medium">
                      Job #{job.id}
                    </span>
                    <Badge variant={job.status === 'completed' ? 'success' : 'warning'}>
                      {job.status}
                    </Badge>
                  </div>
                  <ProgressBar 
                    value={job.recordsEnriched} 
                    max={job.recordsProcessed}
                    size="sm"
                    showLabel={false}
                  />
                  <p className="text-text-secondary text-xs mt-1">
                    {job.recordsEnriched} of {job.recordsProcessed} records enriched
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Leads */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Top Scoring Leads</h3>
          <div className="space-y-3">
            {topLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {lead.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-text-primary text-sm font-medium">{lead.name}</p>
                    <p className="text-text-secondary text-xs">{lead.company}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-text-primary text-sm font-bold">{lead.leadScore}</p>
                  <Badge 
                    variant={
                      lead.leadScore >= 80 ? 'error' : 
                      lead.leadScore >= 60 ? 'warning' : 'default'
                    }
                  >
                    {lead.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}