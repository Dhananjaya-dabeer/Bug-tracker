'use client'
import dynamic from 'next/dynamic';
import { Button, Select, TextField } from '@radix-ui/themes'
import React, { useState } from 'react'
import "easymde/dist/easymde.min.css";
import { RxCross1 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import CalloutTheme from '@/app/components/CalloutTheme';
import Spinner from '@/app/components/Spinner';
const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false, 
});

interface data{
    title:string,
    priority: string,
    description: string,
    important_dates: string[]
}

interface item{
    path: string[],
    message: ''
}

const NewIssuePage = () => {
    const priority = [ "LOW", "MEDIUM", "HIGH"]
    const [formData, setFormData] = useState<data>({
        title:'',
        priority: '',
        description: '',
        important_dates: [],
    })
    const [newDate, setNewDate] = useState("")
    const [removingIndex, setRemovingIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({
        title:'',
        priority:'',
        description:''
    })
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
    
        const updateState = {
            title: '',
            priority: '',
            description: ''
        };
        setErrors(updateState);
    
        try {
            const response = await fetch("/api/issues", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });
    
            const result = await response.json();
            if (!response.ok) {
                result.forEach((item : item) => {
                    if (item?.path?.[0] === 'title') 
                        setErrors(prev => ({ ...prev, title: item.message }));
                    if (item?.path?.[0] === 'priority') 
                        setErrors(prev => ({ ...prev, priority: 'Priority Required!' }));
                    if (item?.path?.[0] === 'description') 
                        setErrors(prev => ({ ...prev, description: item.message }));
                });
                // toast.error(`${result[0]?.path[0]}: ${result[0]?.path[0] === 'priority' ? 'Priority Required!' : result[0]?.message}`);
                return;
            } else {
                toast.success("Task created");
                router.push('/issues');
            }
        } catch (error) {
            console.error("Error occurred during submission:", error);
            toast.error("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    

  return (
    <form className='max-w-xl space-y-3' onSubmit={handleSubmit}>
        <TextField.Root placeholder='Title*' onChange={(e) => setFormData({...formData, title: e.target.value})}>
        </TextField.Root>
        {errors.title && <CalloutTheme message={errors.title} />}
        <div className='flex gap-4'>
            <div className='flex flex-col space-y-3'>
            <Select.Root  onValueChange={(value) => setFormData({...formData, priority: value})}>
                <Select.Trigger placeholder="Select priority*"/>
                <Select.Content>
                <Select.Group>
                    <Select.Label>Priority</Select.Label>
                    {priority.map((item, idx) => <Select.Item value={item} key={idx}>{item}</Select.Item>)}
                </Select.Group>
                </Select.Content>
            </Select.Root>
            {errors.priority && <CalloutTheme message={errors.priority} />}
            </div>
            <TextField.Root className='w-36' type='date' placeholder='Select date' value={newDate} onChange={(e) => setNewDate(e.target.value)}>
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

       {typeof window !== "undefined" && <SimpleMDE placeholder='description*' onChange={(value) => setFormData(prev => ({...prev, description:value}))}/>}
        {errors.description && <CalloutTheme message={errors.description} />}

        <Button type='submit' style={{cursor:"pointer"}} disabled={isLoading} >Submit New Issue {isLoading && <Spinner size={"small"} />}</Button>
    </form>
  )
}

export default NewIssuePage