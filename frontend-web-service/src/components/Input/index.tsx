
import React from 'react'
import { InputStyle } from './styles'

interface InputProps {
  width?: string
  placeholder?: string
  type?: string
  name?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

export default function Input(props: InputProps) {
  return (
    <InputStyle {...props}/>
  )
}
