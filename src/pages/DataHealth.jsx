import React, { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Download, Users, Mail, Phone } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import ProgressBar from '../components/ui/ProgressBar'
import { useApp } from '../context/AppContext'

export default function DataHealth() {
  const { crmRecords } = useApp()
  const [scanInProgress, setScanInProgress] = useState(false)

  // Calculate data health metrics
  const healthMetrics = {
    totalRecords: crmRecords.length,
    completeRecords: crmRecords.filter(r => r.email && r.phone && r.company).length,
    missingEmails: crmRecords.filter(r => !r.email).length,
    missingPhones: crmRecords.filter(r => !r.phone).length,
    duplicates: 0, // Simplified for demo
    outdatedRecords: crmRecords.filter(r => !r.lastContacted).length
  }

  const completionRate = Math.round((healthMetrics.completeRecords / healthMetrics.totalRecords) * 100)

  const issues = [
    {
      id: 1,
      type: 'missing_data',
      severity: 'high',
      title: 'Missing Contact Information',
      description: `${healthMetrics.missingEmails} records missing email addresses`,
      affectedRecords: healthMetrics.missingEmails,
      action: 'Enrich Missing Data'
    },
    {
      id: 2,
      type: 'missing_data',
      severity: 'medium',
      title: 'Missing Phone Numbers',
      description: `${healthMetrics.missingPhones} records missing phone numbers`,
      affectedRecords: healthMetrics.missingPhones,
      action: 'Find Phone Numbers'
    },
    {
      id: 3,
      type: 'stale_data',
      severity: 'medium',
      title: 'Outdated Contact Records',
      description: `${healthMetrics.outdatedRecords} records haven't been contacted`,
      affectedRecords: healthMetrics.outdatedRecords,
      action: 'Update Last Contact'
    },
    {
      id: 4,
      type: 'validation',
      severity: 'low',
      title: 'Email Format Issues',
      description: '2 records with invalid email formats',
      affectedRecords: 2,
      action: 'Validate Emails'
    }
  ]

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'error'
      case 'medium':
        return 'warning'
      case 'low':
        return 'accent'
      default:
        return 'default'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return XCircle
      case 'medium':
        return AlertTriangle
      case 'low':
        return CheckCircle
      default:
        return AlertTriangle
    }
  }

  const handleScan = () => {
    setScanInProgress(true)
    setTimeout(() => setScanInProgress(false), 3000)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">Data Health</h1>
          <p className="text-text-secondary mt-1">Monitor and improve your CRM data quality</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button onClick={handleScan} disabled={scanInProgress}>
            <RefreshCw className={`w-4 h-4 mr-2 ${scanInProgress ? 'animate-spin' : ''}`} />
            {scanInProgress ? 'Scanning...' : 'Run Health Check'}
          </Button>
        </div>
      </div>

      {/* Health Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Health Score */}
        <Card variant="elevated">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(220 13% 18%)"
                  strokeWidth="8"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="hsl(204 100% 50%)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${completionRate * 2.51} 251`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-text-primary">{completionRate}%</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Data Health Score</h3>
            <p className="text-text-secondary text-sm mt-1">
              {completionRate >= 80 ? 'Excellent' : completionRate >= 60 ? 'Good' : 'Needs Improvement'}
            </p>
          </div>
        </Card>

        {/* Key Metrics */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Total Records</p>
                <p className="text-2xl font-bold text-text-primary mt-1">{healthMetrics.totalRecords}</p>
              </div>
              <Users className="w-8 h-8 text-accent" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Complete Records</p>
                <p className="text-2xl font-bold text-success mt-1">{healthMetrics.completeRecords}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Missing Emails</p>
                <p className="text-2xl font-bold text-error mt-1">{healthMetrics.missingEmails}</p>
              </div>
              <Mail className="w-8 h-8 text-error" />
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary text-sm font-medium">Missing Phones</p>
                <p className="text-2xl font-bold text-warning mt-1">{healthMetrics.missingPhones}</p>
              </div>
              <Phone className="w-8 h-8 text-warning" />
            </div>
          </Card>
        </div>
      </div>

      {/* Data Quality Issues */}
      <Card variant="elevated">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-text-primary">Data Quality Issues</h3>
          <Badge variant={issues.length > 0 ? 'warning' : 'success'}>
            {issues.length} issues found
          </Badge>
        </div>

        <div className="space-y-4">
          {issues.map((issue) => {
            const SeverityIcon = getSeverityIcon(issue.severity)
            return (
              <div key={issue.id} className="flex items-center justify-between p-4 bg-background rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg bg-surface-light`}>
                    <SeverityIcon className={`w-5 h-5 text-${getSeverityColor(issue.severity)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-text-primary">{issue.title}</h4>
                      <Badge variant={getSeverityColor(issue.severity)}>
                        {issue.severity}
                      </Badge>
                    </div>
                    <p className="text-text-secondary text-sm">{issue.description}</p>
                    <p className="text-text-secondary text-xs mt-1">
                      Affects {issue.affectedRecords} records
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  {issue.action}
                </Button>
              </div>
            )
          })}
        </div>
      </Card>

      {/* Data Completion Progress */}
      <Card variant="elevated">
        <h3 className="text-lg font-semibold text-text-primary mb-4">Data Completion Progress</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-text-primary font-medium">Email Addresses</span>
              <span className="text-text-secondary">
                {crmRecords.filter(r => r.email).length} / {crmRecords.length}
              </span>
            </div>
            <ProgressBar 
              value={crmRecords.filter(r => r.email).length} 
              max={crmRecords.length}
              showLabel={false}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-text-primary font-medium">Phone Numbers</span>
              <span className="text-text-secondary">
                {crmRecords.filter(r => r.phone).length} / {crmRecords.length}
              </span>
            </div>
            <ProgressBar 
              value={crmRecords.filter(r => r.phone).length} 
              max={crmRecords.length}
              showLabel={false}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-text-primary font-medium">LinkedIn Profiles</span>
              <span className="text-text-secondary">
                {crmRecords.filter(r => r.linkedinProfile).length} / {crmRecords.length}
              </span>
            </div>
            <ProgressBar 
              value={crmRecords.filter(r => r.linkedinProfile).length} 
              max={crmRecords.length}
              showLabel={false}
            />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-text-primary font-medium">Industry Data</span>
              <span className="text-text-secondary">
                {crmRecords.filter(r => r.enrichedData?.industry).length} / {crmRecords.length}
              </span>
            </div>
            <ProgressBar 
              value={crmRecords.filter(r => r.enrichedData?.industry).length} 
              max={crmRecords.length}
              showLabel={false}
            />
          </div>
        </div>
      </Card>
    </div>
  )
}