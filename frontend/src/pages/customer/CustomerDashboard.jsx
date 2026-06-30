import React from 'react'
import Navbar from '../../components/Navbar'
import ProjectList from '../../components/ProjectList'

export default function CustomerDashboard() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ProjectList canEdit={false} />
      </div>
    </div>
  )
}
