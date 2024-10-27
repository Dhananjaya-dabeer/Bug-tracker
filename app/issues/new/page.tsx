'use client'
import { Button, Select, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface data{
    title:string,
    priority: string,
    description: string,
    important_dates: string[]
}

const NewIssuePage = () => {
    const priority = [ "LOW", "MEDIUM", "HIGH"]
    const [formData, setFormData] = useState<data>({
        title:'',
        priority: 'LOW',
        description: '',
        important_dates: [],
    })
    const [newDate, setNewDate] = useState("")
    const [removingIndex, setRemovingIndex] = useState<number | null>(null);
    const router = useRouter()

     const handleDateChange = () => {
        
        if (newDate) {
            setFormData(prev => ({
                ...prev,
                important_dates: [...prev.important_dates, newDate] 
            }));
        }

        setNewDate("")
    };

    const handleRemoveDate = (id:number) => {
        setRemovingIndex(id); 
        setTimeout(() => {
            setFormData(prev => {
                const newDates = [...prev.important_dates];
                newDates.splice(id, 1); 
                return { ...prev, important_dates: newDates };
            });
            setRemovingIndex(null); 
        }, 300); 
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        const response = await fetch("/api/issues", {
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        })

        const result = await response.json()
        if(!response.ok){
            toast.error(`${result[0]?.path[0]}: ${result[0]?.message}`)
            return
        }else{
            toast.success("Task created")
            router.push('/issues')
        }
        
    }

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit}>
        <TextField.Root placeholder='Title' onChange={(e) => setFormData({...formData, title: e.target.value})}>
        </TextField.Root>

        <div className='flex gap-4'>
            <Select.Root defaultValue='LOW' onValueChange={(value) => setFormData({...formData, priority: value})}>
                <Select.Trigger/>
                <Select.Content>
                <Select.Group>
                    <Select.Label>Priority</Select.Label>
                    {priority.map((item, idx) => <Select.Item value={item} key={idx}>{item}</Select.Item>)}
                </Select.Group>
                </Select.Content>
            </Select.Root>
            <TextField.Root className='w-36' type='date' value={newDate} onChange={(e) => setNewDate(e.target.value)}>
            </TextField.Root>
            <Button onClick={handleDateChange} type='button' style={{cursor:"pointer"}} >Add date</Button>

        </div>

        <div className='flex gap-2 items-center'>
            {formData.important_dates.map((item, idx) => 
            <div 
            className={`w-36 flex items-center justify-evenly border rounded-md border-gray-300 transition-all duration-300 ease-in-out ${removingIndex === idx ? 'opacity-0' : ''}`} 
            key={idx}>

            <RxCross1 
            height="16" 
            width="16" 
            className='cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out' 
            onClick={() => handleRemoveDate(idx)}/>

            <div>{item}</div>

            </div>)}
        </div>

        <SimpleMDE placeholder='description' onChange={(value) => setFormData(prev => ({...prev, description:value}))}/>

        <Button type='submit' style={{cursor:"pointer"}} >Submit New Issue</Button>
    </form>
  )
}

export default NewIssuePage