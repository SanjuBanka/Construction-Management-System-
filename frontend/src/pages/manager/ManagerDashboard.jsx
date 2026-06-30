import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import ProjectList from '../../components/ProjectList'
import MaterialList from '../../components/MaterialList'

const TABS = ['Projects', 'Materials']

export default function ManagerDashboard() {
  const [tab, setTab] = useState('Projects')

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-6">
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`font-mono text-xs uppercase px-4 py-2 rounded-md border ${
                tab === t ? 'bg-ink text-white border-ink' : 'bg-white text-slate border-line'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 'Projects' && <ProjectList canEdit />}
        {tab === 'Materials' && <MaterialList canManage />}
      </div>
    </div>
  )
}
