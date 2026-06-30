import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-ink text-white px-6 py-4 flex items-center justify-between border-b-4 border-amber">
      <div>
        <span className="font-display font-bold text-lg tracking-tight">SWPM</span>
        <span className="font-mono text-xs text-white/50 ml-2">Smart Workforce & Project Manager</span>
      </div>
      {user && (
        <div className="flex items-center gap-4">
          <span className="font-body text-sm">
            {user.name} <span className="text-amber font-mono text-xs uppercase ml-1">{user.role}</span>
          </span>
          <button onClick={handleLogout} className="font-mono text-xs uppercase border border-white/30 px-3 py-1.5 rounded hover:bg-white/10 transition-colors">
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
