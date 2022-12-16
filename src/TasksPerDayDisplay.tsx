import { useState, useEffect } from 'react'
import { Task } from './data';

const TasksPerDayDisplay = ({ masterTaskList, unmutatedTaskList }: { masterTaskList: Task[], unmutatedTaskList: Task[] }) => {

  type Day = { day: string, tasks: Task[], hours: string };

  const [weeklyArray, setWeeklyArray] = useState<Day[]>([]);

  const calculateTasksPerDay = () => {
    masterTaskList = structuredClone(unmutatedTaskList);

    let totalTasks = masterTaskList.reduce((accumulator: number, object: any) => {
      return accumulator + object.timesPerWeek;
    }, 0);

    let tempWeeklyArray: Array<Day> = [
      { day: 'Mon', tasks: [], hours: '' },
      { day: 'Tue', tasks: [], hours: '' },
      { day: 'Wed', tasks: [], hours: '' },
      { day: 'Thu', tasks: [], hours: '' },
      { day: 'Fri', tasks: [], hours: '' },
      { day: 'Sat', tasks: [], hours: '' },
      { day: 'Sun', tasks: [], hours: '' }];

    for (let i = 0; i < totalTasks; i++) {
      for (let k = 0; k < masterTaskList.length; k++) {
        if (masterTaskList[k].timesPerWeek > 0) {
          let randomWeekDay = Math.floor(Math.random() * 7);

          if (!tempWeeklyArray[randomWeekDay].tasks.includes(masterTaskList[k])) {
            masterTaskList[k].timesPerWeek -= 1;
            tempWeeklyArray[randomWeekDay].tasks.push(masterTaskList[k]);
          } else {
            totalTasks++;
          }
        }
      }
    }

    // set minutes per day estimate
    tempWeeklyArray.forEach((day) => {
      const dailyTotalMinutes = day.tasks.reduce((accumulator: number, object: any) => {
        return accumulator + object.minEstimate
      }, 0);

      const hours = Math.floor(dailyTotalMinutes / 60);
      const remainderMinutes = dailyTotalMinutes % 60;

      day.hours = `${hours}:${remainderMinutes.toString().padStart(2, '0')}`;
    })

    setWeeklyArray(tempWeeklyArray);
  }

  useEffect(() => {
    calculateTasksPerDay()
  }, [])

  return (
    <>
      <h1>Tasks Per Day</h1>
      <button onClick={() => calculateTasksPerDay()}>Randomize Tasks</button>
      <section id='tasks-per-day-display'>
        {weeklyArray.map((day, index) => {
          return <div key={index}>
            <h3>{day.day} <span>~{day.hours}</span></h3>
            {day.tasks.map((item, index) => {
              return (
                <div key={index}>
                  <span className={item.class}>{item.task}</span>
                </div>
              )
            })}
          </div>
        })}
      </section>
    </>
  )
}

export default TasksPerDayDisplay