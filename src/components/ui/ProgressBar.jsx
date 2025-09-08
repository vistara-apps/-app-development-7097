import React from 'react'

export default function ProgressBar({ 
  value, 
  max = 100, 
  className = '',
  showLabel = true,
  size = 'md'
}) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  }

  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between text-sm text-text-secondary mb-1">
          <span>{value} / {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-border rounded-full ${sizes[size]}`}>
        <div
          className="bg-accent rounded-full transition-all duration-300 ease-in-out h-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}