'use client'
import React, { useEffect, useState } from 'react';
import { LineChart } from './components/LineChart';
import Spinner from '@/app/components/Spinner';
import { IssueData } from './issues/page';
import FinalChart from './components/FinalChart';
import Highlights from './components/Highlights';


export default function Home() {
  const [tasks, setTasks] = useState<IssueData[]>();
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
   try {
    const response = await fetch('/api/issues', {method: "GET"});
    const tasks = await response.json();
    return tasks; 
   } catch (error) {
      console.log(error)
   }
  };
  
  useEffect(() => {
    const fetchData = async () => {
     try {
      const data = await fetchTasks();
      setTasks(data);
      setLoading(false);
     } catch (error) {
        console.log(error)
     }finally{
      setLoading(false)
     }
    };

    fetchData();
  }, []);

  return (
    tasks ? <main className="flex flex-col justify-between  sm:justify-between  space-y-2  ">
      <Highlights tasks={tasks}/>
      <FinalChart tasks={tasks} />
    </main> : <main className='flex h-[80vh] w-screen justify-center items-center'>
      <Spinner size='large'/>
    </main>
  )
}
