import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import StatusBadge from './StatusBadge'
import { useAuth } from '../context/AuthContext'

export default function MaterialList({ canManage }) {
  const { user } = useAuth()
  const [materials, setMaterials] = useState([])
  const [projects, setProjects] = useState([])
  const [items, setItems] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ requestId: '', projectId: '', itemId: '', quantityRequested: '' })

  const load = () => api.get('/materials').then(res => setMaterials(res.data)).catch(() => {})

  useEffect(() => {
    load()
    api.get('/projects').then(res => setProjects(res.data)).catch(() => {})
    api.get('/inventory').then(res => setItems(res.data)).catch(() => {})
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/materials', { ...form, quantityRequested: Number(form.quantityRequested), requestedById: user.userId })
    setForm({ requestId: '', projectId: '', itemId: '', quantityRequested: '' })
    setShowForm(false)
    load()
  }

  const handleStatusChange = async (id, status) => {
    await api.patch(`/materials/${id}/status`, { status })
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-ink">Material Requests</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
          {showForm ? 'Close' : '+ New Request'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Request ID</label>
            <input className="input-field" value={form.requestId} onChange={e => setForm({ ...form, requestId: e.target.value })} placeholder="REQ-1002" required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Quantity</label>
            <input type="number" className="input-field" value={form.quantityRequested} onChange={e => setForm({ ...form, quantityRequested: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Project</label>
            <select className="input-field" value={form.projectId} onChange={e => setForm({ ...form, projectId: e.target.value })} required>
              <option value="">— Select —</option>
              {projects.map(p => <option key={p.id} value={p.id}>{p.projectName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Item</label>
            <select className="input-field" value={form.itemId} onChange={e => setForm({ ...form, itemId: e.target.value })} required>
              <option value="">— Select —</option>
              {items.map(i => <option key={i.id} value={i.id}>{i.itemName}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <button type="submit" className="btn-primary">Submit Request</button>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink text-white font-mono text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Request ID</th>
              <th className="text-left px-4 py-3">Project</th>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Qty</th>
              <th className="text-left px-4 py-3">Status</th>
              {canManage && <th className="px-4 py-3">Action</th>}
            </tr>
          </thead>
          <tbody>
            {materials.map(m => (
              <tr key={m.id} className="border-t border-line">
                <td className="px-4 py-3 font-mono text-xs">{m.requestId}</td>
                <td className="px-4 py-3">{m.project?.projectName}</td>
                <td className="px-4 py-3">{m.item?.itemName}</td>
                <td className="px-4 py-3">{m.quantityRequested}</td>
                <td className="px-4 py-3"><StatusBadge status={m.status} /></td>
                {canManage && (
                  <td className="px-4 py-3">
                    <select
                      className="input-field text-xs py-1"
                      value={m.status}
                      onChange={(e) => handleStatusChange(m.id, e.target.value)}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                      <option value="FULFILLED">Fulfilled</option>
                    </select>
                  </td>
                )}
              </tr>
            ))}
            {materials.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate/60">No material requests yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
