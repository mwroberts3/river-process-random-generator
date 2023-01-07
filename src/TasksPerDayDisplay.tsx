import { useState, useEffect } from 'react'
import { TaskType } from './data';
import Task from './Task';

const TasksPerDayDisplay = ({ csvImport }: { csvImport: TaskType[] }) => {

  type Day = { day: string, tasks: TaskType[], hours: string };

  const [weeklyArray, setWeeklyArray] = useState<Day[]>([]);
  const [randomTasks, setRandomTasks] = useState(false);


  useEffect(() => {
    const randomizeTimer = setTimeout(() => {
      const clonedCsvImport = structuredClone(csvImport);

      let totalTasks = clonedCsvImport.reduce((accumulator: number, task: TaskType) => {
        if (task.active) return accumulator + task.timesPerWeek;
        return accumulator;
      }, 0);

      const tempWeeklyArray: Array<Day> = [
        { day: 'Monday', tasks: [], hours: '' },
        { day: 'Tuesday', tasks: [], hours: '' },
        { day: 'Wednesday', tasks: [], hours: '' },
        { day: 'Thursday', tasks: [], hours: '' },
        { day: 'Friday', tasks: [], hours: '' },
        { day: 'Saturday', tasks: [], hours: '' },
        { day: 'Sunday', tasks: [], hours: '' }];


      for (let i = 0; i < totalTasks; i++) {
        for (let k = 0; k < clonedCsvImport.length; k++) {
          if (clonedCsvImport[k].timesPerWeek > 0) {
            let randomWeekDay = Math.floor(Math.random() * 7);

            if (!tempWeeklyArray[randomWeekDay].tasks.includes(clonedCsvImport[k])) {
              clonedCsvImport[k].timesPerWeek -= 1;
              tempWeeklyArray[randomWeekDay].tasks.push(clonedCsvImport[k]);
            } else {
              totalTasks++;
            }
          }
        }
      }

      // set minutes per day estimate
      tempWeeklyArray.forEach((day) => {
        const dailyTotalMinutes = day.tasks.reduce((accumulator: number, task: TaskType) => {
          return accumulator + task.minEstimate
        }, 0);

        const hours = Math.floor(dailyTotalMinutes / 60);
        const remainderMinutes = dailyTotalMinutes % 60;

        day.hours = `${hours}:${remainderMinutes.toString().padStart(2, '0')}`;
      })

      console.log(tempWeeklyArray);

      setWeeklyArray(tempWeeklyArray);
    }, 200);

    return () => clearTimeout(randomizeTimer);
  }, [csvImport, randomTasks])

  return (
    <>
      <div className="header-and-btn-container">
        <h1>Tasks Per Day</h1>
        <button onClick={() => setRandomTasks(!randomTasks)}>Randomize Tasks</button>
      </div>
      <section id='tasks-per-day-display'>
        {weeklyArray.map((day, index) => {
          return <div key={index}>
            <h3>{day.day} <span>~{day.hours}</span></h3>
            {day.tasks.map((task: any) => {
              return <Task key={task.id} {...task} display={'Tasks Per Day'} />
            })}
          </div>
        })}
      </section>
    </>
  )
}

export default TasksPerDayDisplay