import React from 'react'
import PieChart from './PieChart'
import { IssueData } from '../issues/page';

interface HighlightsProp {
    tasks: IssueData[]
}


const Highlights = ({tasks}: HighlightsProp) => {

    const getTaskCountsByPriority = (tasks: IssueData[]) => {
        const priorityCounts = {
            High: 0,
            Medium: 0,
            Low: 0,
        };

        tasks.forEach(task => {
            switch (task.priority) {
                case 'HIGH':
                    priorityCounts.High++;
                    break;
                case 'MEDIUM':
                    priorityCounts.Medium++;
                    break;
                case 'LOW':
                    priorityCounts.Low++;
                    break;
                default:
                    break;
            }
        });

        return {
            labels: Object.keys(priorityCounts),
            counts: Object.values(priorityCounts),
        };
    };


    const getTaskCountsByStatus = (tasks: IssueData[]) => {
        const statusCounts = {
            BACKLOG: 0,
            IN_PROGRESS: 0,
            REVIEW: 0,
            COMPLETED: 0,
        };

        tasks.forEach(task => {
            switch (task.status) {
                case 'BACKLOG':
                    statusCounts.BACKLOG++;
                    break;
                case 'IN_PROGRESS':
                    statusCounts.IN_PROGRESS++;
                    break;
                case 'REVIEW':
                    statusCounts.REVIEW++;
                    break;
                case 'COMPLETED':
                    statusCounts.COMPLETED++;
                    break;
                default:
                    break;
            }
        });

        return statusCounts;
    };

    const statusCounts = getTaskCountsByStatus(tasks);
    const pieChartData = {
        labels: Object.keys(statusCounts),
        counts: Object.values(statusCounts),
    };


    const taskData = tasks ? getTaskCountsByPriority(tasks) : { labels: [], counts: [] };
  return (
    <div>
        <div className='flex flex-col  sm:justify-evenly sm:flex-row '>
            <div>
                <p className='mb-0'>Task Priority Distribution</p>
                <PieChart data={taskData} typeCheck = {'priority'} />
            </div>
            <div>
                <p className='mb-0'>Task Status Distribution</p>
                <PieChart data={pieChartData} typeCheck = {'status'}/>
            </div>
        </div>
    </div>
  )
}

export default Highlights