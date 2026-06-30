import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import StatusBadge from './StatusBadge'
import ProjectForm from './ProjectForm'

export default function ProjectList({ canEdit }) {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)

  const load = () => api.get('/projects').then(res => setProjects(res.data)).catch(() => {})

  useEffect(() => { load() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    await api.delete(`/projects/${id}`)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-ink">Projects</h2>
        {canEdit && (
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
            {showForm ? 'Close' : '+ New Project'}
          </button>
        )}
      </div>

      {showForm && <ProjectForm onCreated={() => { setShowForm(false); load() }} onCancel={() => setShowForm(false)} />}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink text-white font-mono text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Project</th>
              <th className="text-left px-4 py-3">Budget</th>
              <th className="text-left px-4 py-3">Manager</th>
              <th className="text-left px-4 py-3">Customer</th>
              <th className="text-left px-4 py-3">Timeline</th>
              <th className="text-left px-4 py-3">Status</th>
              {canEdit && <th className="px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id} className="border-t border-line">
                <td className="px-4 py-3 font-semibold">{p.projectName}</td>
                <td className="px-4 py-3">{p.budget ? `₹${Number(p.budget).toLocaleString('en-IN')}` : '—'}</td>
                <td className="px-4 py-3">{p.manager?.name || '—'}</td>
                <td className="px-4 py-3">{p.customer?.name || '—'}</td>
                <td className="px-4 py-3 text-xs text-slate">{p.startDate} → {p.endDate}</td>
                <td className="px-4 py-3"><StatusBadge status={p.status} /></td>
                {canEdit && (
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(p.id)} className="text-red-600 text-xs font-mono uppercase">Delete</button>
                  </td>
                )}
              </tr>
            ))}
            {projects.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate/60">No projects yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
