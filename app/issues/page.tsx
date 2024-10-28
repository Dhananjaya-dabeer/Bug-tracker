'use client'
import React, { useEffect, useState } from 'react'
import { Button, Select, Text } from '@radix-ui/themes'
import Link from 'next/link'
import Spinner from '@/Components/Spinner'
import { toast } from 'react-toastify'
import SelectTag from '@/Components/Select'

interface IssueData{
  id: string,
  createdAt: string,
  description: string,
  important_dates: string[],
  priority: string,
  status: string,
  title: string,
  updatedAt: string
}

enum Status {
  BACKLOG = "BACKLOG",
  IN_PROGRESS = "IN_PROGRESS",
  REVIEW = "REVIEW",
  COMPLETED = "COMPLETED"
}

enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH"
}

const priorityOrder: Record<Priority, number> = {
  [Priority.LOW]: 1,
  [Priority.MEDIUM]: 2,
  [Priority.HIGH]: 3
}

const statusOrder: Record<Status, number> = {
  [Status.BACKLOG]: 1,
  [Status.IN_PROGRESS] : 2,
  [Status.REVIEW]: 3,
  [Status.COMPLETED] : 4
}

const IssuesPage = () => {

  const [data, setData] = useState<IssueData[]>()
  const [originalData, setOriginalData] = useState<IssueData[]>()
  const [isLoading, setIsLoading] = useState(false)
  const status = ["BACKLOG", "IN_PROGRESS", "REVIEW", "COMPLETED"]
  const sortDependencies = ["Status:Lowest", "Status:Highest", "Priority:Lowest", "Priority:Highest"]
  const filterDependencies = ["BACKLOG", "IN_PROGRESS", "REVIEW", "COMPLETED",  "LOW", "MEDIUM", "HIGH"]
  useEffect(() => {
    ;(async() => {
      try {
        setIsLoading(true)
        const response = await fetch("api/issues", {
          method: "GET"
        })
        const result = await response.json()
        setData(result)
        setOriginalData(result)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
        console.log(error)
      }finally{
        setIsLoading(false)
      }
    })()
  },[])


  const handleDelete = async(id: string) => {
    try {
      const response = await fetch(`api/issues/${id}`, {
        method:"DELETE"
      })
      const result = await response.json()
      toast.success("Deleted an Issue Successfully!")
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateStatus = async(value:string, id: string) => {
      try {
        const response = await fetch(`api/issues/${id}`, {
          method: "PUT",
          body: JSON.stringify(value)
        })
        const result = await response.json()
        console.log(result)
        if(data){
          const temp = [...data].map((item) => {
            return item.id === id ? {...item, status: value} : item
          })
         setData(temp)
        }
      } catch (error) {
        
      }
  }

  const handleSort = (value:string) => {
    if (data) {
      let sortedData;
  
      switch (value) {
        case "Status:Lowest":
          sortedData = [...data].sort((a, b) => statusOrder[a.status as Status] - statusOrder[b.status as Status]);
          break;
        case "Status:Highest":
          sortedData = [...data].sort((a, b) => statusOrder[b.status as Status] - statusOrder[a.status as Status]);
          break;
        case "Priority:Lowest":
          sortedData = [...data].sort((a, b) => priorityOrder[a.priority as Priority] - priorityOrder[b.priority as Priority]);
          break;
        case "Priority:Highest":
          sortedData = [...data].sort((a, b) => priorityOrder[b.priority as Priority] - priorityOrder[a.priority as Priority]);
          break;
        default:
          sortedData = data;
      }
  
      setData(sortedData);
    }
  }

  const handleFilter = (value: string) => {
    let filteredData
    if(originalData){
      if(Object.values(Status).includes(value as Status)){
        filteredData = originalData.filter((item) => item.status === value)
      }
      else if(Object.values(Priority).includes(value as Priority)){
        filteredData = originalData.filter((item) => item.priority === value)
      }
      else{
        filteredData = originalData
      }
    }
    console.log(filteredData)
    setData(filteredData)
  }

  return !isLoading ? (
    <div className='space-y-6 text-sm'>
      <div className='flex justify-between items-center'>
        <Button>
          <Link href={'/issues/new'}>Create New Issue</Link>
        </Button>
        <div className='space-x-2'>
          <SelectTag placeholder='Sort' label='Sort' data={sortDependencies} handler={handleSort} />
          <SelectTag placeholder='Filter' label='Filter' data={filterDependencies} handler={handleFilter} />
        </div>
      </div>
      <div className='space-y-6'>
        {data?.map((item) => (
          <div key={item.id} className='bg-gray-200 rounded-lg p-4 shadow'>
            <div className='flex justify-between'>
              <div className='flex-1 py-2'>
                <Text as="div" className="text-lg">
                  <span className='font-medium'>Title: </span>{item.title}
                </Text>
                <Text as="div" className="text-sm">
                  <span className='font-medium'>Description: </span>{item.description}
                </Text>
                {item?.important_dates.length > 0 && <div className='flex flex-row space-x-1'>
                  <span className='font-medium'>Important Dates: </span>
                  {item.important_dates?.map((date,idx) => <span key={date} className='flex space-x-2 flex-row'>
                    {date}{idx !== item?.important_dates?.length -1 && ',' }
                  </span>)}
                </div>}
                <Text>
                  <span className='font-medium text-sm'>Priority: </span>
                  <span className={`${item.priority === 'LOW' ? 'text-green-600' : item.priority === 'MEDIUM' ? 'text-cyan-700' : 'text-red-600'} text-sm`}>
                    {item.priority.toLowerCase()}
                  </span>
                </Text>
              </div>
              <div className={"flex flex-col justify-between items-center"}>
              <Select.Root  onValueChange={(value) => handleUpdateStatus(value, item?.id)} value={item?.status}>
                <Select.Trigger placeholder="Select priority*"/>
                <Select.Content>
                <Select.Group>
                    {status.map((status, idx) => <Select.Item value={status} key={idx}>{status}</Select.Item>)}
                </Select.Group>
                </Select.Content>
            </Select.Root>
                <div className='space-x-2'>
                  <Button color='green'>
                  <Link href={`/issues/edit/${item?.id}`}>Edit</Link>
                  </Button>
                  <Button color='red' onClick={() => handleDelete(item?.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className='flex justify-center items-center h-[80vh]'>
      <Spinner size={"large"} />
    </div>
  );
};


export default IssuesPage