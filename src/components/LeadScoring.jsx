import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Target, TrendingUp, TrendingDown, Filter, Star, Edit, Eye } from 'lucide-react';

const LeadScoring = () => {
  const { crmRecords } = useApp();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [sortBy, setSortBy] = useState('leadScore');
  const [filterBy, setFilterBy] = useState('all');

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreBadge = (score) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (score >= 80) return `${baseClasses} bg-green-500/10 text-green-400`;
    if (score >= 60) return `${baseClasses} bg-yellow-500/10 text-yellow-400`;
    return `${baseClasses} bg-red-500/10 text-red-400`;
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Hot';
    if (score >= 60) return 'Warm';
    return 'Cold';
  };

  const filteredAndSortedRecords = crmRecords
    .filter(record => {
      if (filterBy === 'all') return true;
      if (filterBy === 'hot') return record.leadScore >= 80;
      if (filterBy === 'warm') return record.leadScore >= 60 && record.leadScore < 80;
      if (filterBy === 'cold') return record.leadScore < 60;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'leadScore') return b.leadScore - a.leadScore;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'company') return a.company.localeCompare(b.company);
      return 0;
    });

  const avgScore = Math.round(crmRecords.reduce((sum, record) => sum + record.leadScore, 0) / crmRecords.length);
  const hotLeads = crmRecords.filter(record => record.leadScore >= 80).length;
  const warmLeads = crmRecords.filter(record => record.leadScore >= 60 && record.leadScore < 80).length;
  const coldLeads = crmRecords.filter(record => record.leadScore < 60).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary mb-2">Lead Scoring</h1>
        <p className="text-textSecondary">AI-powered lead scoring to prioritize your sales efforts</p>
      </div>

      {/* Scoring Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Average Score</p>
              <p className="text-2xl font-bold text-textPrimary mt-1">{avgScore}</p>
            </div>
            <div className="p-3 bg-accent/10 rounded-lg">
              <Target className="text-accent" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Hot Leads</p>
              <p className="text-2xl font-bold text-green-400 mt-1">{hotLeads}</p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <TrendingUp className="text-green-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Warm Leads</p>
              <p className="text-2xl font-bold text-yellow-400 mt-1">{warmLeads}</p>
            </div>
            <div className="p-3 bg-yellow-500/10 rounded-lg">
              <Star className="text-yellow-400" size={24} />
            </div>
          </div>
        </div>

        <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-textSecondary text-sm font-medium">Cold Leads</p>
              <p className="text-2xl font-bold text-red-400 mt-1">{coldLeads}</p>
            </div>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <TrendingDown className="text-red-400" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-cardBg border border-border rounded-lg shadow-card">
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl font-semibold text-textPrimary">Scored Leads</h2>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <select
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="px-3 py-2 bg-surface border border-border rounded-md text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="all">All Leads</option>
                <option value="hot">Hot Leads (80+)</option>
                <option value="warm">Warm Leads (60-79)</option>
                <option value="cold">Cold Leads (&lt;60)</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-surface border border-border rounded-md text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="leadScore">Sort by Score</option>
                <option value="name">Sort by Name</option>
                <option value="company">Sort by Company</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Lead
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-textSecondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredAndSortedRecords.map((record) => (
                <tr key={record.id} className="hover:bg-surface/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-textPrimary">{record.name}</div>
                      <div className="text-sm text-textSecondary">{record.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-textPrimary">{record.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl font-bold ${getScoreColor(record.leadScore)}`}>
                        {record.leadScore}
                      </span>
                      <span className={getScoreBadge(record.leadScore)}>
                        {getScoreLabel(record.leadScore)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      record.status === 'qualified' ? 'bg-green-500/10 text-green-400' :
                      record.status === 'hot' ? 'bg-red-500/10 text-red-400' :
                      'bg-gray-500/10 text-gray-400'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    {record.lastContacted ? new Date(record.lastContacted).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-textSecondary">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedRecord(record)}
                        className="p-1 hover:bg-cardBg rounded transition-colors"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="p-1 hover:bg-cardBg rounded transition-colors"
                        title="Edit Score"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-cardBg border border-border rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-textPrimary">Lead Details</h3>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-textSecondary hover:text-textPrimary"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-textPrimary mb-3">Contact Information</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-textSecondary">Name</p>
                      <p className="text-textPrimary font-medium">{selectedRecord.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-textSecondary">Company</p>
                      <p className="text-textPrimary font-medium">{selectedRecord.company}</p>
                    </div>
                    <div>
                      <p className="text-sm text-textSecondary">Email</p>
                      <p className="text-textPrimary font-medium">{selectedRecord.email}</p>
                    </div>
                    {selectedRecord.phone && (
                      <div>
                        <p className="text-sm text-textSecondary">Phone</p>
                        <p className="text-textPrimary font-medium">{selectedRecord.phone}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-textPrimary mb-3">Scoring Details</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-textSecondary">Lead Score</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${getScoreColor(selectedRecord.leadScore)}`}>
                          {selectedRecord.leadScore}
                        </span>
                        <span className={getScoreBadge(selectedRecord.leadScore)}>
                          {getScoreLabel(selectedRecord.leadScore)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-textSecondary">Status</p>
                      <p className="text-textPrimary font-medium capitalize">{selectedRecord.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-textSecondary">Data Enriched</p>
                      <p className="text-textPrimary font-medium">{selectedRecord.enriched ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-textPrimary mb-3">Scoring Factors</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-sm text-textSecondary">Company Size</p>
                    <p className="text-textPrimary font-medium">Medium (50-200 employees)</p>
                    <p className="text-green-400 text-sm">+15 points</p>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-sm text-textSecondary">Industry Match</p>
                    <p className="text-textPrimary font-medium">High relevance</p>
                    <p className="text-green-400 text-sm">+20 points</p>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-sm text-textSecondary">Job Title</p>
                    <p className="text-textPrimary font-medium">Decision maker level</p>
                    <p className="text-green-400 text-sm">+25 points</p>
                  </div>
                  <div className="p-3 bg-surface rounded-lg">
                    <p className="text-sm text-textSecondary">Engagement</p>
                    <p className="text-textPrimary font-medium">Recently active</p>
                    <p className="text-green-400 text-sm">+10 points</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Scoring Configuration */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Scoring Configuration</h2>
        <p className="text-textSecondary mb-6">
          Customize how leads are scored based on your business criteria
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-textPrimary">Scoring Criteria</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-textPrimary">Company Size</span>
                <span className="text-textSecondary">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-textPrimary">Industry Match</span>
                <span className="text-textSecondary">30%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-textPrimary">Job Title/Role</span>
                <span className="text-textSecondary">25%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                <span className="text-textPrimary">Engagement Level</span>
                <span className="text-textSecondary">20%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-textPrimary">Score Ranges</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                <span className="text-green-400 font-medium">Hot Leads</span>
                <span className="text-green-400">80-100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg">
                <span className="text-yellow-400 font-medium">Warm Leads</span>
                <span className="text-yellow-400">60-79</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                <span className="text-red-400 font-medium">Cold Leads</span>
                <span className="text-red-400">0-59</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 transition-colors">
            Update Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadScoring;