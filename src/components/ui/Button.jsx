import React from 'react'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent',
    secondary: 'bg-surface-light text-text-primary hover:bg-border focus:ring-border',
    outline: 'border border-border text-text-primary hover:bg-surface-light focus:ring-border',
    destructive: 'bg-error text-white hover:bg-error/90 focus:ring-error',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-lg font-medium transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}