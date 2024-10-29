'use client'
import React, { useEffect, useState } from 'react';
import { LineChart } from './LineChart';
import Spinner from '@/app/components/Spinner';
import { IssueData } from '../issues/page';

interface FinalChartProp {
    tasks: IssueData[]
}

export default function FinalChart({tasks} : FinalChartProp) {
  
  const getConcurrentTasksData = (tasks:IssueData[], startDate:string, endDate: string) => {
  const dateRange = [];
  const concurrentCounts: Record<string, number> = {};

  const currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateRange.push(currentDate.toISOString().split('T')[0]); // format YYYY-MM-DD
    currentDate.setDate(currentDate.getDate() + 1);
  }

  dateRange.forEach(date => {
    concurrentCounts[date] = tasks.filter(task => {
      const taskCreated = new Date(task.createdAt);
      const taskUpdated = new Date(task.updatedAt);

      // Count tasks created or updated on this date
      return (
        taskCreated.toISOString().split('T')[0] === date ||
        taskUpdated.toISOString().split('T')[0] === date
      );
    }).length;
  });

  return {
    labels: dateRange,
    data: dateRange.map(date => concurrentCounts[date] || 0),
  };
  };

  const getMinMaxDates = (tasks: IssueData[]) => {
    if (tasks.length === 0) return { minDate: "", maxDate: "" };

    const dates = tasks.flatMap(task => [
      new Date(task.createdAt),
      new Date(task.updatedAt)
    ]);
  
    const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
  
    return {
      minDate: minDate.toISOString().split('T')[0], 
      maxDate: maxDate.toISOString().split('T')[0], 
    };
  };
  // 2024-10-28,2024-10-29
  const {minDate, maxDate} = tasks  ? getMinMaxDates(tasks) : {minDate:"", maxDate: ""}
  
  const { labels, data } = tasks ? getConcurrentTasksData(tasks, "2024-10-25", maxDate) : {labels:[], data:[]};

  console.log(labels, data)



  return (
    <main className="">
      <p>Concurrent Tasks Trend</p>
      <LineChart labels={labels} data={data} />
    </main>
  )
}
