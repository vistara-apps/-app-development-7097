import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, AlertTriangle, CheckCircle, Users, Database, Trash2, Edit, Search } from 'lucide-react';

const DataHealth = () => {
  const { crmRecords } = useApp();
  const [selectedIssue, setSelectedIssue] = useState('duplicates');

  // Calculate data health metrics
  const totalRecords = crmRecords.length;
  const completeRecords = crmRecords.filter(record => 
    record.name && record.email && record.company && record.phone && record.linkedinProfile
  ).length;
  
  const missingData = crmRecords.filter(record => 
    !record.phone || !record.linkedinProfile
  );

  const duplicateEmails = crmRecords.reduce((acc, record, index) => {
    const duplicateIndex = crmRecords.findIndex((r, i) => i !== index && r.email === record.email);
    if (duplicateIndex !== -1 && !acc.find(item => item.email === record.email)) {
      acc.push(record);
    }
    return acc;
  }, []);

  const staleRecords = crmRecords.filter(record => {
    if (!record.lastContacted) return true;
    const lastContact = new Date(record.lastContacted);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return lastContact < thirtyDaysAgo;
  });

  const healthScore = Math.round((completeRecords / totalRecords) * 100);

  const healthIssues = [
    {
      id: 'duplicates',
      title: 'Duplicate Records',
      count: duplicateEmails.length,
      severity: 'high',
      icon: Users,
      description: 'Records with duplicate email addresses'
    },
    {
      id: 'missing',
      title: 'Missing Contact Info',
      count: missingData.length,
      severity: 'medium',
      icon: Database,
      description: 'Records missing phone numbers or LinkedIn profiles'
    },
    {
      id: 'stale',
      title: 'Stale Records',
      count: staleRecords.length,
      severity: 'low',
      icon: AlertTriangle,
      description: 'Records with no contact activity in 30+ days'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'low': return 'text-blue-400 bg-blue-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const renderIssueDetails = () => {
    const issue = healthIssues.find(issue => issue.id === selectedIssue);
    if (!issue) return null;

    let records = [];
    switch (selectedIssue) {
      case 'duplicates':
        records = duplicateEmails;
        break;
      case 'missing':
        records = missingData;
        break;
      case 'stale':
        records = staleRecords;
        break;
      default:
        records = [];
    }

    return (
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-textPrimary">{issue.title}</h3>
          <div className="flex gap-2">
            {selectedIssue === 'duplicates' && (
              <button className="px-3 py-1 bg-red-500/10 text-red-400 rounded-md text-sm hover:bg-red-500/20 transition-colors">
                Merge Duplicates
              </button>
            )}
            {selectedIssue === 'missing' && (
              <button className="px-3 py-1 bg-accent/10 text-accent rounded-md text-sm hover:bg-accent/20 transition-colors">
                Auto-Enrich
              </button>
            )}
            {selectedIssue === 'stale' && (
              <button className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-md text-sm hover:bg-yellow-500/20 transition-colors">
                Bulk Update
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Issue
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {records.slice(0, 10).map((record) => (
                <tr key={record.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-textPrimary">{record.name}</div>
                      <div className="text-sm text-textSecondary">{record.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-textPrimary">
                    {record.company}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {selectedIssue === 'duplicates' && 'Duplicate email'}
                    {selectedIssue === 'missing' && (
                      <div>
                        {!record.phone && <div>Missing phone</div>}
                        {!record.linkedinProfile && <div>Missing LinkedIn</div>}
                      </div>
                    )}
                    {selectedIssue === 'stale' && (
                      <div>
                        Last contact: {record.lastContacted 
                          ? new Date(record.lastContacted).toLocaleDateString()
                          : 'Never'
                        }
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-textSecondary">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-cardBg rounded transition-colors" title="Edit">
                        <Edit size={14} />
                      </button>
                      {selectedIssue === 'duplicates' && (
                        <button className="p-1 hover:bg-red-500/10 rounded transition-colors text-red-400" title="Delete">
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {records.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="mx-auto text-green-400 mb-2" size={32} />
              <p className="text-textSecondary">No issues found in this category</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary mb-2">Data Health</h1>
        <p className="text-textSecondary">Monitor and maintain the quality of your CRM data</p>
      </div>

      {/* Health Score Overview */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="hsl(210 40% 20%)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={healthScore >= 80 ? '#4ade80' : healthScore >= 60 ? '#facc15' : '#f87171'}
                  strokeWidth="8"
                  strokeDasharray={`${(healthScore / 100) * 283} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${getHealthScoreColor(healthScore)}`}>
                  {healthScore}%
                </span>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary mb-1">Data Health Score</h2>
              <p className="text-textSecondary">
                {completeRecords} of {totalRecords} records are complete
              </p>
              <p className="text-sm text-textSecondary mt-2">
                {healthScore >= 80 && 'Excellent data quality'}
                {healthScore >= 60 && healthScore < 80 && 'Good data quality with room for improvement'}
                {healthScore < 60 && 'Data quality needs attention'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-400">{completeRecords}</p>
              <p className="text-xs text-textSecondary">Complete</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-400">{missingData.length}</p>
              <p className="text-xs text-textSecondary">Incomplete</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">{duplicateEmails.length}</p>
              <p className="text-xs text-textSecondary">Duplicates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {healthIssues.map((issue) => {
          const Icon = issue.icon;
          return (
            <div
              key={issue.id}
              onClick={() => setSelectedIssue(issue.id)}
              className={`bg-cardBg border rounded-lg p-6 shadow-card cursor-pointer transition-all hover:shadow-lg ${
                selectedIssue === issue.id ? 'border-accent' : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-3 rounded-lg ${getSeverityColor(issue.severity)}`}>
                  <Icon size={24} />
                </div>
                <span className="text-2xl font-bold text-textPrimary">{issue.count}</span>
              </div>
              
              <h3 className="text-lg font-semibold text-textPrimary mb-1">{issue.title}</h3>
              <p className="text-sm text-textSecondary">{issue.description}</p>
              
              <div className="mt-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(issue.severity)}`}>
                  {issue.severity.charAt(0).toUpperCase() + issue.severity.slice(1)} Priority
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Issue Details */}
      {renderIssueDetails()}

      {/* Maintenance Actions */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Maintenance Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent transition-colors text-left">
            <div className="p-2 bg-accent/10 rounded-lg">
              <Search className="text-accent" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-textPrimary">Find & Merge Duplicates</h3>
              <p className="text-sm text-textSecondary">Automatically detect and merge duplicate records</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent transition-colors text-left">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <Database className="text-green-400" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-textPrimary">Auto-Enrich Missing Data</h3>
              <p className="text-sm text-textSecondary">Fill in missing contact information automatically</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent transition-colors text-left">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Shield className="text-yellow-400" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-textPrimary">Data Validation Rules</h3>
              <p className="text-sm text-textSecondary">Set up rules to prevent data quality issues</p>
            </div>
          </button>

          <button className="flex items-center gap-3 p-4 bg-surface border border-border rounded-lg hover:border-accent transition-colors text-left">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <CheckCircle className="text-purple-400" size={20} />
            </div>
            <div>
              <h3 className="font-medium text-textPrimary">Schedule Health Checks</h3>
              <p className="text-sm text-textSecondary">Automate regular data quality monitoring</p>
            </div>
          </button>
        </div>
      </div>

      {/* Data Quality Tips */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Data Quality Best Practices</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-textPrimary mb-3">Prevention</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>• Set up data validation rules for new entries</li>
              <li>• Train team members on data entry standards</li>
              <li>• Use standardized formats for phone numbers and addresses</li>
              <li>• Implement duplicate detection on data entry</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-textPrimary mb-3">Maintenance</h3>
            <ul className="space-y-2 text-sm text-textSecondary">
              <li>• Schedule weekly data health reviews</li>
              <li>• Set up automated enrichment for missing fields</li>
              <li>• Regularly audit and clean stale records</li>
              <li>• Monitor data quality metrics and trends</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataHealth;