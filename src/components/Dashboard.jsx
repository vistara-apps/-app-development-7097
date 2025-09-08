import React from 'react';
import { useApp } from '../context/AppContext';
import { TrendingUp, Users, Mail, Database, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const { crmRecords, enrichmentJobs } = useApp();

  const enrichedCount = crmRecords.filter(record => record.enriched).length;
  const avgLeadScore = Math.round(crmRecords.reduce((sum, record) => sum + record.leadScore, 0) / crmRecords.length);
  const completedJobs = enrichmentJobs.filter(job => job.status === 'completed').length;

  const chartData = [
    { name: 'Jan', enriched: 65, leads: 120 },
    { name: 'Feb', enriched: 89, leads: 145 },
    { name: 'Mar', enriched: 127, leads: 180 },
    { name: 'Apr', enriched: 156, leads: 210 },
    { name: 'May', enriched: 189, leads: 245 },
    { name: 'Jun', enriched: 234, leads: 290 },
  ];

  const leadScoreData = [
    { range: '0-20', count: 5 },
    { range: '21-40', count: 12 },
    { range: '41-60', count: 28 },
    { range: '61-80', count: 35 },
    { range: '81-100', count: 20 },
  ];

  const stats = [
    {
      title: 'Total Records',
      value: crmRecords.length.toString(),
      icon: Database,
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Enriched Records',
      value: enrichedCount.toString(),
      icon: CheckCircle,
      change: '+18%',
      changeType: 'positive'
    },
    {
      title: 'Avg Lead Score',
      value: avgLeadScore.toString(),
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Active Cadences',
      value: '4',
      icon: Mail,
      change: '+2',
      changeType: 'positive'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary mb-2">Dashboard</h1>
        <p className="text-textSecondary">Overview of your CRM data enrichment and automation</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-textSecondary text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-textPrimary mt-1">{stat.value}</p>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Icon className="text-accent" size={24} />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {stat.change}
                </span>
                <span className="text-textSecondary text-sm ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Enrichment Trend */}
        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Enrichment Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 40% 20%)" />
                <XAxis dataKey="name" stroke="hsl(220 5.9% 70%)" />
                <YAxis stroke="hsl(220 5.9% 70%)" />
                <Line 
                  type="monotone" 
                  dataKey="enriched" 
                  stroke="hsl(204 100% 50%)" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(204 100% 50%)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="leads" 
                  stroke="hsl(220 38.2% 60%)" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(220 38.2% 60%)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-sm text-textSecondary">Enriched Records</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-sm text-textSecondary">Total Leads</span>
            </div>
          </div>
        </div>

        {/* Lead Score Distribution */}
        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold text-textPrimary mb-4">Lead Score Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={leadScoreData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(210 40% 20%)" />
                <XAxis dataKey="range" stroke="hsl(220 5.9% 70%)" />
                <YAxis stroke="hsl(220 5.9% 70%)" />
                <Bar dataKey="count" fill="hsl(204 100% 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <h3 className="text-lg font-semibold text-textPrimary mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="text-green-400" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-textPrimary font-medium">Enrichment job completed</p>
              <p className="text-textSecondary text-sm">127 out of 150 records successfully enriched</p>
            </div>
            <span className="text-textSecondary text-sm">2 hours ago</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Mail className="text-blue-400" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-textPrimary font-medium">Follow-up cadence triggered</p>
              <p className="text-textSecondary text-sm">New lead welcome sequence started for 3 prospects</p>
            </div>
            <span className="text-textSecondary text-sm">4 hours ago</span>
          </div>

          <div className="flex items-center gap-4 p-4 bg-surface rounded-lg">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Clock className="text-yellow-400" size={20} />
            </div>
            <div className="flex-1">
              <p className="text-textPrimary font-medium">Enrichment job in progress</p>
              <p className="text-textSecondary text-sm">Processing 75 records, 38 completed so far</p>
            </div>
            <span className="text-textSecondary text-sm">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;