import React from 'react'

export default function DataTable({ 
  columns, 
  data, 
  onRowClick,
  className = '',
  variant = 'default' 
}) {
  const variants = {
    default: '',
    striped: '[&>tbody>tr:nth-child(odd)]:bg-surface-light',
    hoverable: '[&>tbody>tr]:hover:bg-surface-light [&>tbody>tr]:cursor-pointer',
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`w-full ${variants[variant]}`}>
        <thead>
          <tr className="border-b border-border">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((row, index) => (
            <tr
              key={index}
              onClick={() => onRowClick?.(row)}
              className="transition-colors"
            >
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-4 text-sm">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}