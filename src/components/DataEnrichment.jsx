import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, Play, CheckCircle, Clock, Download, FileText } from 'lucide-react';

const DataEnrichment = () => {
  const { enrichmentJobs, setEnrichmentJobs, crmRecords, setCrmRecords } = useApp();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      setUploadedFile(file);
    } else {
      alert('Please upload a CSV file');
    }
  };

  const startEnrichment = () => {
    if (!uploadedFile) return;

    setIsProcessing(true);
    
    // Simulate enrichment process
    const newJob = {
      id: enrichmentJobs.length + 1,
      status: 'running',
      recordsProcessed: 0,
      recordsEnriched: 0,
      createdAt: new Date().toISOString()
    };

    setEnrichmentJobs([...enrichmentJobs, newJob]);

    // Simulate processing
    setTimeout(() => {
      const enrichedRecords = crmRecords.map(record => ({
        ...record,
        enriched: true,
        phone: record.phone || `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        linkedinProfile: record.linkedinProfile || `https://linkedin.com/in/${record.name.toLowerCase().replace(' ', '')}`
      }));

      setCrmRecords(enrichedRecords);
      
      setEnrichmentJobs(prev => prev.map(job => 
        job.id === newJob.id 
          ? { ...job, status: 'completed', recordsProcessed: 50, recordsEnriched: 45 }
          : job
      ));
      
      setIsProcessing(false);
      setUploadedFile(null);
    }, 3000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'running':
        return <Clock className="text-yellow-400" size={20} />;
      default:
        return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-500/10 text-green-400`;
      case 'running':
        return `${baseClasses} bg-yellow-500/10 text-yellow-400`;
      default:
        return `${baseClasses} bg-gray-500/10 text-gray-400`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-textPrimary mb-2">Data Enrichment</h1>
        <p className="text-textSecondary">Upload your CRM data and automatically enrich missing contact information</p>
      </div>

      {/* Upload Section */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Upload CRM Data</h2>
        
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="mx-auto text-textSecondary mb-4" size={48} />
          <h3 className="text-lg font-medium text-textPrimary mb-2">Upload CSV File</h3>
          <p className="text-textSecondary mb-4">
            Upload your CRM export to automatically enrich contact information
          </p>
          
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="csv-upload"
          />
          
          <label
            htmlFor="csv-upload"
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md hover:bg-accent/90 cursor-pointer transition-colors"
          >
            <FileText size={16} />
            Choose CSV File
          </label>
          
          {uploadedFile && (
            <div className="mt-4 p-3 bg-surface rounded-md">
              <p className="text-textPrimary font-medium">File: {uploadedFile.name}</p>
              <p className="text-textSecondary text-sm">Size: {(uploadedFile.size / 1024).toFixed(1)} KB</p>
            </div>
          )}
        </div>

        {uploadedFile && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={startEnrichment}
              disabled={isProcessing}
              className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-md hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Play size={16} />
              {isProcessing ? 'Processing...' : 'Start Enrichment'}
            </button>
          </div>
        )}
      </div>

      {/* Enrichment Jobs */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-textPrimary">Enrichment Jobs</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-md text-textSecondary hover:text-textPrimary hover:border-accent transition-colors">
            <Download size={16} />
            Export Results
          </button>
        </div>

        <div className="space-y-4">
          {enrichmentJobs.map((job) => (
            <div key={job.id} className="p-4 bg-surface rounded-lg border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(job.status)}
                  <div>
                    <h3 className="font-medium text-textPrimary">
                      Enrichment Job #{job.id}
                    </h3>
                    <p className="text-sm text-textSecondary">
                      {new Date(job.createdAt).toLocaleDateString()} at{' '}
                      {new Date(job.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                <span className={getStatusBadge(job.status)}>
                  {job.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-textSecondary">Records Processed</p>
                  <p className="text-lg font-semibold text-textPrimary">{job.recordsProcessed}</p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">Records Enriched</p>
                  <p className="text-lg font-semibold text-textPrimary">{job.recordsEnriched}</p>
                </div>
                <div>
                  <p className="text-sm text-textSecondary">Success Rate</p>
                  <p className="text-lg font-semibold text-textPrimary">
                    {job.recordsProcessed > 0 
                      ? Math.round((job.recordsEnriched / job.recordsProcessed) * 100)
                      : 0
                    }%
                  </p>
                </div>
              </div>

              {job.status === 'running' && (
                <div className="mt-4">
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(job.recordsProcessed / 50) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-textSecondary mt-2">
                    Processing... {job.recordsProcessed}/50 records
                  </p>
                </div>
              )}
            </div>
          ))}

          {enrichmentJobs.length === 0 && (
            <div className="text-center py-8">
              <Clock className="mx-auto text-textSecondary mb-4" size={48} />
              <h3 className="text-lg font-medium text-textPrimary mb-2">No Enrichment Jobs</h3>
              <p className="text-textSecondary">Upload a CSV file to start your first enrichment job</p>
            </div>
          )}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-cardBg border border-border rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold text-textPrimary mb-4">Enrichment Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-surface rounded-lg">
            <h3 className="font-medium text-textPrimary mb-2">CSV Format</h3>
            <p className="text-sm text-textSecondary">
              Include columns: Name, Company, Email. We'll enrich with phone numbers, LinkedIn profiles, and more.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-lg">
            <h3 className="font-medium text-textPrimary mb-2">Best Results</h3>
            <p className="text-sm text-textSecondary">
              Provide complete names and company information for highest enrichment success rates.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-lg">
            <h3 className="font-medium text-textPrimary mb-2">Data Privacy</h3>
            <p className="text-sm text-textSecondary">
              All uploaded data is processed securely and never shared with third parties.
            </p>
          </div>
          <div className="p-4 bg-surface rounded-lg">
            <h3 className="font-medium text-textPrimary mb-2">Processing Time</h3>
            <p className="text-sm text-textSecondary">
              Typical enrichment takes 1-2 minutes per 100 records depending on data complexity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataEnrichment;