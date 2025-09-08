import React from 'react'

export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-light text-text-secondary',
    success: 'bg-success/20 text-success border border-success/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    error: 'bg-error/20 text-error border border-error/30',
    accent: 'bg-accent/20 text-accent border border-accent/30',
  }

  return (
    <span className={`
      inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </span>
  )
}