'use client'
import { Button, Select, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
    const priority = [ "LOW", "MEDIUM", "HIGH"]
  return (
    <div className='max-w-xl space-y-3'>
        <TextField.Root placeholder='Title'>
        </TextField.Root>
        <div className='flex gap-4'>
        <Select.Root defaultValue='LOW'>
            <Select.Trigger/>
            <Select.Content>
            <Select.Group>
                <Select.Label>Priority</Select.Label>
                {priority.map((item, idx) => <Select.Item value={item}>{item}</Select.Item>)}
            </Select.Group>
            </Select.Content>
        </Select.Root>
        <TextField.Root className='w-36' type='date' >
        </TextField.Root>
        </div>
        <TextArea placeholder='description'/>
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuePage