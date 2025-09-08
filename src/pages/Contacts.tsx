import React, { useState, useRef } from 'react'
import AppShell from '../components/AppShell'
import { useContacts } from '../contexts/ContactContext'
import { useToast } from '../contexts/ToastContext'
import Papa from 'papaparse'
import {
  Users,
  Upload,
  Plus,
  Search,
  Filter,
  Zap,
  Trash2,
  Edit,

  Mail
} from 'lucide-react'

export default function Contacts() {
  const { contacts, loading, addContact, deleteContact, enrichContact, importContacts } = useContacts()
  const { addToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [newContact, setNewContact] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    linkedin_profile: '',
  })

  const filteredContacts = contacts.filter(contact =>
    contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      header: true,
      complete: async (results) => {
        try {
          await importContacts(results.data as any[])
          addToast(`Successfully imported ${results.data.length} contacts`, 'success')
        } catch (error) {
          addToast('Failed to import contacts', 'error')
        }
      },
      error: (error) => {
        addToast('Error parsing CSV file', 'error')
        console.error('CSV parsing error:', error)
      }
    })

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await addContact({
        ...newContact,
        source: 'Manual Entry',
        enriched: false,
      })
      setNewContact({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        company: '',
        linkedin_profile: '',
      })
      setShowAddModal(false)
      addToast('Contact added successfully', 'success')
    } catch (error) {
      addToast('Failed to add contact', 'error')
    }
  }

  const handleEnrichContact = async (contactId: string) => {
    try {
      await enrichContact(contactId)
      addToast('Contact enriched successfully', 'success')
    } catch (error) {
      addToast('Failed to enrich contact', 'error')
    }
  }

  const handleDeleteContact = async (contactId: string) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(contactId)
        addToast('Contact deleted successfully', 'success')
      } catch (error) {
        addToast('Failed to delete contact', 'error')
      }
    }
  }

  if (loading) {
    return (
      <AppShell>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">Contacts</h1>
            <p className="text-text-secondary">
              Manage and enrich your customer data
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <input
              type="file"
              accept=".csv"
              onChange={handleCSVUpload}
              ref={fileInputRef}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-secondary flex items-center"
            >
              <Upload className="h-4 w-4 mr-2" />
              Import CSV
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Contact
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-500">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  Total Contacts
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {contacts.length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  Enriched
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {contacts.filter(c => c.enriched).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-500">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-text-secondary">
                  With Email
                </p>
                <p className="text-2xl font-bold text-text-primary">
                  {contacts.filter(c => c.email).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="card overflow-hidden">
          {filteredContacts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">
                              {contact.first_name?.[0]}{contact.last_name?.[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-text-primary">
                              {contact.first_name} {contact.last_name}
                            </div>
                            <div className="text-sm text-text-secondary">
                              {contact.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-primary">
                        {contact.company || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                        {contact.source || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.enriched ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Enriched
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            Basic
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          {!contact.enriched && (
                            <button
                              onClick={() => handleEnrichContact(contact.id)}
                              className="text-accent hover:text-accent/80 p-1"
                              title="Enrich Contact"
                            >
                              <Zap className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            className="text-blue-600 hover:text-blue-800 p-1"
                            title="Edit Contact"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContact(contact.id)}
                            className="text-red-600 hover:text-red-800 p-1"
                            title="Delete Contact"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="h-12 w-12 text-text-secondary mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text-primary mb-2">
                No contacts found
              </h3>
              <p className="text-text-secondary mb-6">
                {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first contact or importing from CSV.'}
              </p>
              {!searchTerm && (
                <div className="space-x-4">
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary"
                  >
                    Add Contact
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary"
                  >
                    Import CSV
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Add Contact Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                Add New Contact
              </h2>
              
              <form onSubmit={handleAddContact} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newContact.first_name}
                      onChange={(e) => setNewContact(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      required
                      value={newContact.last_name}
                      onChange={(e) => setNewContact(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-text-primary mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newContact.company}
                    onChange={(e) => setNewContact(prev => ({ ...prev, company: e.target.value }))}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Add Contact
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
