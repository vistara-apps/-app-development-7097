import React, { useState } from 'react'
import { Target, TrendingUp, Settings, RefreshCw } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import DataTable from '../components/ui/DataTable'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useApp } from '../context/AppContext'

export default function LeadScoring() {
  const { crmRecords } = useApp()
  const [scoringModel, setScoringModel] = useState('default')

  const scoringCriteria = [
    { name: 'Company Size', weight: 25, description: 'Number of employees' },
    { name: 'Industry Match', weight: 20, description: 'Target industry alignment' },
    { name: 'Engagement Level', weight: 20, description: 'Email opens, clicks, responses' },
    { name: 'Contact Quality', weight: 15, description: 'Decision maker role' },
    { name: 'Geographic Location', weight: 10, description: 'Target market location' },
    { name: 'Technology Stack', weight: 10, description: 'Tech compatibility' },
  ]

  const leadsByScore = crmRecords.reduce((acc, record) => {
    if (record.leadScore >= 80) acc.hot++
    else if (record.leadScore >= 60) acc.warm++
    else acc.cold++
    return acc
  }, { hot: 0, warm: 0, cold: 0 })

  const columns = [
    {
      key: 'name',
      label: 'Lead',
      render: (value, record) => (
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {value.charAt(0)}
            </span>
          </div>
          <div>
            <p className="text-text-primary font-medium">{value}</p>
            <p className="text-text-secondary text-sm">{record.company}</p>
          </div>
        </div>
      )
    },
    {
      key: 'leadScore',
      label: 'Score',
      render: (score) => (
        <div className="flex items-center space-x-3">
          <div className="w-16 h-3 bg-border rounded-full">
            <div 
              className={`h-full rounded-full ${
                score >= 80 ? 'bg-error' :
                score >= 60 ? 'bg-warning' : 'bg-text-secondary'
              }`}
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-text-primary font-bold text-lg">{score}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Priority',
      render: (_, record) => (
        <Badge 
          variant={
            record.leadScore >= 80 ? 'error' :
            record.leadScore >= 60 ? 'warning' : 'default'
          }
        >
          {record.leadScore >= 80 ? 'High' :
           record.leadScore >= 60 ? 'Medium' : 'Low'}
        </Badge>
      )
    },
    {
      key: 'enrichedData',
      label: 'Industry',
      render: (data) => (
        <span className="text-text-secondary">
          {data?.industry || 'Unknown'}
        </span>
      )
    },
    {
      key: 'lastContacted',
      label: 'Last Contact',
      render: (date) => (
        <span className="text-text-secondary text-sm">
          {date ? new Date(date).toLocaleDateString() : 'Never'}
        </span>
      )
    }
  ]

  const sortedRecords = [...crmRecords].sort((a, b) => b.leadScore - a.leadScore)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Lead Scoring</h1>
          <p className="text-text-secondary mt-1">AI-powered lead prioritization and scoring</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Configure Model
          </Button>
          <Button>
            <RefreshCw className="w-4 h-4 mr-2" />
            Recalculate Scores
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Hot Leads</p>
              <p className="text-2xl font-bold text-error mt-2">{leadsByScore.hot}</p>
              <p className="text-text-secondary text-sm mt-1">Score 80-100</p>
            </div>
            <div className="p-3 rounded-lg bg-error/20">
              <Target className="w-6 h-6 text-error" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Warm Leads</p>
              <p className="text-2xl font-bold text-warning mt-2">{leadsByScore.warm}</p>
              <p className="text-text-secondary text-sm mt-1">Score 60-79</p>
            </div>
            <div className="p-3 rounded-lg bg-warning/20">
              <TrendingUp className="w-6 h-6 text-warning" />
            </div>
          </div>
        </Card>

        <Card variant="elevated">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary text-sm font-medium">Cold Leads</p>
              <p className="text-2xl font-bold text-text-secondary mt-2">{leadsByScore.cold}</p>
              <p className="text-text-secondary text-sm mt-1">Score 0-59</p>
            </div>
            <div className="p-3 rounded-lg bg-surface-light">
              <Target className="w-6 h-6 text-text-secondary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Scoring Model & Leads */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scoring Criteria */}
        <Card variant="elevated">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Scoring Criteria</h3>
          <div className="space-y-4">
            {scoringCriteria.map((criteria, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-text-primary text-sm font-medium">{criteria.name}</span>
                  <span className="text-text-secondary text-sm">{criteria.weight}%</span>
                </div>
                <ProgressBar 
                  value={criteria.weight} 
                  max={100}
                  size="sm"
                  showLabel={false}
                />
                <p className="text-text-secondary text-xs">{criteria.description}</p>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <Settings className="w-4 h-4 mr-2" />
            Customize Weights
          </Button>
        </Card>

        {/* Lead Scores Table */}
        <div className="lg:col-span-2">
          <Card variant="elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">
                Lead Rankings
              </h3>
              <select
                value={scoringModel}
                onChange={(e) => setScoringModel(e.target.value)}
                className="px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              >
                <option value="default">Default Model</option>
                <option value="saas">SaaS Model</option>
                <option value="enterprise">Enterprise Model</option>
              </select>
            </div>
            <DataTable
              columns={columns}
              data={sortedRecords}
              variant="hoverable"
              onRowClick={(record) => console.log('View lead details:', record)}
            />
          </Card>
        </div>
      </div>
    </div>
  )
}