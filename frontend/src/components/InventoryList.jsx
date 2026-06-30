import React, { useState, useEffect } from 'react'
import api from '../api/axios'

export default function InventoryList() {
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ itemName: '', quantity: '', itemDesc: '', reorderLevel: '' })
  const [showForm, setShowForm] = useState(false)

  const load = () => api.get('/inventory').then(res => setItems(res.data)).catch(() => {})
  useEffect(() => { load() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    await api.post('/inventory', {
      ...form,
      quantity: Number(form.quantity || 0),
      reorderLevel: Number(form.reorderLevel || 10),
    })
    setForm({ itemName: '', quantity: '', itemDesc: '', reorderLevel: '' })
    setShowForm(false)
    load()
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this item?')) return
    await api.delete(`/inventory/${id}`)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-ink">Inventory</h2>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm">
          {showForm ? 'Close' : '+ Add Item'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="card p-6 grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Item Name</label>
            <input className="input-field" value={form.itemName} onChange={e => setForm({ ...form, itemName: e.target.value })} required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Quantity</label>
            <input type="number" className="input-field" value={form.quantity} onChange={e => setForm({ ...form, quantity: e.target.value })} required />
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-mono uppercase text-slate mb-1">Description</label>
            <input className="input-field" value={form.itemDesc} onChange={e => setForm({ ...form, itemDesc: e.target.value })} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Reorder Level</label>
            <input type="number" className="input-field" value={form.reorderLevel} onChange={e => setForm({ ...form, reorderLevel: e.target.value })} />
          </div>
          <div className="col-span-2">
            <button type="submit" className="btn-primary">Save Item</button>
          </div>
        </form>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-ink text-white font-mono text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Item</th>
              <th className="text-left px-4 py-3">Quantity</th>
              <th className="text-left px-4 py-3">Description</th>
              <th className="text-left px-4 py-3">Reorder Level</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className={`border-t border-line ${i.quantity <= i.reorderLevel ? 'bg-amber/5' : ''}`}>
                <td className="px-4 py-3 font-semibold">{i.itemName}</td>
                <td className="px-4 py-3">
                  {i.quantity}
                  {i.quantity <= i.reorderLevel && <span className="badge bg-amber/20 text-amber ml-2">Low Stock</span>}
                </td>
                <td className="px-4 py-3 text-slate">{i.itemDesc}</td>
                <td className="px-4 py-3">{i.reorderLevel}</td>
                <td className="px-4 py-3">
                  <button onClick={() => handleDelete(i.id)} className="text-red-600 text-xs font-mono uppercase">Delete</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate/60">No inventory items yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
