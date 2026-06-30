import React from 'react'

const COLORS = {
  PLANNED: 'bg-gray-100 text-gray-700',
  IN_PROGRESS: 'bg-blue-100 text-blue-700',
  COMPLETED: 'bg-green-100 text-green-700',
  ON_HOLD: 'bg-yellow-100 text-yellow-700',
  PENDING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-blue-100 text-blue-700',
  REJECTED: 'bg-red-100 text-red-700',
  FULFILLED: 'bg-green-100 text-green-700',
}

export default function StatusBadge({ status }) {
  return <span className={`badge ${COLORS[status] || 'bg-gray-100 text-gray-700'}`}>{status}</span>
}
