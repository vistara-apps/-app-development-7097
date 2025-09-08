import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Contact = {
  id: string
  user_id: string
  first_name: string
  last_name: string
  email: string
  phone?: string
  company?: string
  linkedin_profile?: string
  source?: string
  created_at: string
  updated_at: string
  custom_fields?: Record<string, any>
  enriched: boolean
}

export type Sequence = {
  id: string
  user_id: string
  name: string
  steps: SequenceStep[]
  trigger: string
  created_at: string
  updated_at: string
  active: boolean
}

export type SequenceStep = {
  id: string
  sequence_id: string
  type: 'email' | 'wait'
  delay: number
  content?: string
  send_at?: string
}