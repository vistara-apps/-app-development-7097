import React, { createContext, useContext, useState, useEffect } from 'react'
import { Contact, supabase } from '../lib/supabase'
import { useAuth } from './AuthContext'

interface ContactContextType {
  contacts: Contact[]
  loading: boolean
  addContact: (contact: Omit<Contact, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => Promise<void>
  updateContact: (id: string, updates: Partial<Contact>) => Promise<void>
  deleteContact: (id: string) => Promise<void>
  importContacts: (contacts: any[]) => Promise<void>
  enrichContact: (id: string) => Promise<void>
  refreshContacts: () => Promise<void>
}

const ContactContext = createContext<ContactContextType | undefined>(undefined)

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  const refreshContacts = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (error) throw error
      setContacts(data || [])
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) {
      refreshContacts()
    }
  }, [user])

  const addContact = async (contact: Omit<Contact, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{ ...contact, user_id: user.id }])
        .select()

      if (error) throw error
      if (data) {
        setContacts(prev => [data[0], ...prev])
      }
    } catch (error) {
      console.error('Error adding contact:', error)
      throw error
    }
  }

  const updateContact = async (id: string, updates: Partial<Contact>) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()

      if (error) throw error
      if (data) {
        setContacts(prev => prev.map(c => c.id === id ? data[0] : c))
      }
    } catch (error) {
      console.error('Error updating contact:', error)
      throw error
    }
  }

  const deleteContact = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

      if (error) throw error
      setContacts(prev => prev.filter(c => c.id !== id))
    } catch (error) {
      console.error('Error deleting contact:', error)
      throw error
    }
  }

  const importContacts = async (contactsData: any[]) => {
    if (!user) return

    try {
      const formattedContacts = contactsData.map(contact => ({
        user_id: user.id,
        first_name: contact.firstName || contact.first_name || '',
        last_name: contact.lastName || contact.last_name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        company: contact.company || '',
        linkedin_profile: contact.linkedin || contact.linkedinProfile || '',
        source: 'CSV Import',
        enriched: false,
      }))

      const { data, error } = await supabase
        .from('contacts')
        .insert(formattedContacts)
        .select()

      if (error) throw error
      if (data) {
        setContacts(prev => [...data, ...prev])
      }
    } catch (error) {
      console.error('Error importing contacts:', error)
      throw error
    }
  }

  const enrichContact = async (id: string) => {
    // Simulate enrichment - in a real app, this would call OpenAI API
    try {
      await updateContact(id, { 
        enriched: true,
        custom_fields: {
          job_title: 'Sales Manager',
          company_size: '50-100 employees',
          industry: 'Technology'
        }
      })
    } catch (error) {
      console.error('Error enriching contact:', error)
      throw error
    }
  }

  return (
    <ContactContext.Provider value={{
      contacts,
      loading,
      addContact,
      updateContact,
      deleteContact,
      importContacts,
      enrichContact,
      refreshContacts,
    }}>
      {children}
    </ContactContext.Provider>
  )
}

export function useContacts() {
  const context = useContext(ContactContext)
  if (context === undefined) {
    throw new Error('useContacts must be used within a ContactProvider')
  }
  return context
}