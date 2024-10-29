'use client'
import { Select } from '@radix-ui/themes'
import React, { useState } from 'react'

interface SelectProps{
    placeholder: string,
    label: string,
    data: string[],
    handler: (value: string) => void,
    setValue: (value: string) => void,
    value: string
}
const SelectTag = ({placeholder, label, data, handler, setValue, value}: SelectProps) => {
  
  return (
    <Select.Root onValueChange={(value) => {handler(value), setValue(value)}} value={value}>
          <Select.Trigger placeholder={placeholder}/>
            <Select.Content>
              <Select.Group>
                <Select.Label>{label}</Select.Label>
                    {data.map((item:string, idx:number) => <Select.Item value={item} key={idx}>{item}</Select.Item>)}
                </Select.Group>
            </Select.Content>
        </Select.Root>
  )
}

export default SelectTag