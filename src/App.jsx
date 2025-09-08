import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import Dashboard from './pages/Dashboard'
import CRMRecords from './pages/CRMRecords'
import LeadScoring from './pages/LeadScoring'
import FollowUpCadences from './pages/FollowUpCadences'
import DataHealth from './pages/DataHealth'
import { AppProvider } from './context/AppContext'

function App() {
  return (
    <AppProvider>
      <AppShell>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crm-records" element={<CRMRecords />} />
          <Route path="/lead-scoring" element={<LeadScoring />} />
          <Route path="/follow-up-cadences" element={<FollowUpCadences />} />
          <Route path="/data-health" element={<DataHealth />} />
        </Routes>
      </AppShell>
    </AppProvider>
  )
}

export default App