import React from 'react'

const TextField = ({ value, onChange, placeholder, label }) => {
  return (
    <input
      type='text'
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
export default TextField
