import React, { useState } from 'react'
import { Plus, Upload, Search, Filter, Download, Phone, Mail, Linkedin } from 'lucide-react'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import DataTable from '../components/ui/DataTable'
import Badge from '../components/ui/Badge'
import { useApp } from '../context/AppContext'

export default function CRMRecords() {
  const { crmRecords } = useApp()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredRecords = crmRecords.filter(record => {
    const matchesSearch = record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const columns = [
    {
      key: 'name',
      label: 'Contact',
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
      key: 'email',
      label: 'Contact Info',
      render: (email, record) => (
        <div className="space-y-1">
          {email && (
            <div className="flex items-center text-text-secondary text-sm">
              <Mail className="w-3 h-3 mr-1" />
              {email}
            </div>
          )}
          {record.phone && (
            <div className="flex items-center text-text-secondary text-sm">
              <Phone className="w-3 h-3 mr-1" />
              {record.phone}
            </div>
          )}
          {record.linkedinProfile && (
            <div className="flex items-center text-text-secondary text-sm">
              <Linkedin className="w-3 h-3 mr-1" />
              LinkedIn
            </div>
          )}
        </div>
      )
    },
    {
      key: 'leadScore',
      label: 'Lead Score',
      render: (score) => (
        <div className="flex items-center space-x-2">
          <div className="w-12 h-2 bg-border rounded-full">
            <div 
              className="h-full bg-accent rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>
          <span className="text-text-primary font-medium">{score}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (status) => (
        <Badge 
          variant={
            status === 'hot' ? 'error' :
            status === 'qualified' ? 'success' :
            status === 'new' ? 'accent' : 'default'
          }
        >
          {status}
        </Badge>
      )
    },
    {
      key: 'enrichedData',
      label: 'Industry',
      render: (data) => (
        <span className="text-text-secondary text-sm">
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-text-primary">CRM Records</h1>
          <p className="text-text-secondary mt-1">Manage and enrich your customer data</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Record
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search contacts, companies, or emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="qualified">Qualified</option>
              <option value="hot">Hot</option>
            </select>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Records Table */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">
            {filteredRecords.length} Records
          </h3>
          <div className="text-text-secondary text-sm">
            Showing {filteredRecords.length} of {crmRecords.length} total records
          </div>
        </div>
        <DataTable
          columns={columns}
          data={filteredRecords}
          variant="hoverable"
          onRowClick={(record) => console.log('View record:', record)}
        />
      </Card>
    </div>
  )
}