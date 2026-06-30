import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [form, setForm] = useState({
    name: '', username: '', email: '', password: '', role: 'CUSTOMER',
    empId: '', skill: '', jobRole: '', experienceYears: '', contactNumber: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const payload = { ...form, experienceYears: form.experienceYears ? Number(form.experienceYears) : null }
      const data = await register(payload)
      if (data.role === 'ADMIN') navigate('/admin')
      else if (data.role === 'MANAGER') navigate('/manager')
      else navigate('/customer')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="card w-full max-w-lg p-8">
        <h1 className="font-display font-bold text-2xl text-ink mb-6">Create Account</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-3 py-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-xs font-mono uppercase text-slate mb-1">Full Name</label>
            <input className="input-field" value={form.name} onChange={update('name')} required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Username</label>
            <input className="input-field" value={form.username} onChange={update('username')} required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Email</label>
            <input type="email" className="input-field" value={form.email} onChange={update('email')} required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Password</label>
            <input type="password" className="input-field" value={form.password} onChange={update('password')} required />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Role</label>
            <select className="input-field" value={form.role} onChange={update('role')}>
              <option value="CUSTOMER">Customer</option>
              <option value="EMPLOYEE">Employee</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Employee ID</label>
            <input className="input-field" value={form.empId} onChange={update('empId')} placeholder="optional" />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Contact Number</label>
            <input className="input-field" value={form.contactNumber} onChange={update('contactNumber')} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Skill</label>
            <input className="input-field" value={form.skill} onChange={update('skill')} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Job Role</label>
            <input className="input-field" value={form.jobRole} onChange={update('jobRole')} />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-1">Experience (yrs)</label>
            <input type="number" className="input-field" value={form.experienceYears} onChange={update('experienceYears')} />
          </div>

          <button type="submit" disabled={loading} className="btn-primary col-span-2 mt-2">
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-slate">
          Already have an account? <Link to="/login" className="text-amber font-semibold">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
