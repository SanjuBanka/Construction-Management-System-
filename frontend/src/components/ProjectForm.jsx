import React, { useState, useEffect } from 'react'
import api from '../api/axios'

export default function ProjectForm({ onCreated, onCancel }) {
  const [managers, setManagers] = useState([])
  const [customers, setCustomers] = useState([])
  const [form, setForm] = useState({
    projectName: '', budget: '', startDate: '', endDate: '',
    status: 'PLANNED', managerId: '', customerId: ''
  })

  useEffect(() => {
    api.get('/users/role/MANAGER').then(res => setManagers(res.data)).catch(() => {})
    api.get('/users/role/CUSTOMER').then(res => setCustomers(res.data)).catch(() => {})
  }, [])

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/projects', {
      ...form,
      budget: form.budget ? Number(form.budget) : null,
      managerId: form.managerId || null,
      customerId: form.customerId || null,
    })
    onCreated()
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 grid grid-cols-2 gap-4 mb-6">
      <div className="col-span-2">
        <label className="block text-xs font-mono uppercase text-slate mb-1">Project Name</label>
        <input className="input-field" value={form.projectName} onChange={update('projectName')} required />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-1">Budget (₹)</label>
        <input type="number" className="input-field" value={form.budget} onChange={update('budget')} />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-1">Status</label>
        <select className="input-field" value={form.status} onChange={update('status')}>
          <option value="PLANNED">Planned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="ON_HOLD">On Hold</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-1">Start Date</label>
        <input type="date" className="input-field" value={form.startDate} onChange={update('startDate')} />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-1">End Date</label>
        <input type="date" className="input-field" value={form.endDate} onChange={update('endDate')} />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-1">Manager</label>
        <select className="input-field" value={form.managerId} onChange={update('managerId')}>
          <option value="">— Select —</option>
          {managers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-1">Customer</label>
        <select className="input-field" value={form.customerId} onChange={update('customerId')}>
          <option value="">— Select —</option>
          {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div className="col-span-2 flex gap-3 mt-2">
        <button type="submit" className="btn-primary">Save Project</button>
        <button type="button" onClick={onCancel} className="font-mono text-xs uppercase text-slate px-4 py-2">Cancel</button>
      </div>
    </form>
  )
}
