import React from 'react'

export default function Card({ children, className = '', variant = 'default' }) {
  const variants = {
    default: 'bg-surface border border-border',
    elevated: 'bg-surface border border-border shadow-card',
  }

  return (
    <div className={`rounded-lg p-6 ${variants[variant]} ${className}`}>
      {children}
    </div>
  )
}