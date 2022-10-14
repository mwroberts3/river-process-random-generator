import React, { useState, useEffect } from 'react'
import { ongoingTasks } from './data'

const TasksPerDayDisplay = () => {
  const [weeklyArray, setWeeklyArray] = useState([]);
  
  const calculateTasksPerDay = () => {
    console.log('set tasks', weeklyArray)

    let totalTasks = ongoingTasks.reduce((accumulator, object) => {
      return accumulator + object.timesPerWeek;
    }, 0);

    console.log('total tasks', totalTasks);

    let tempWeeklyArray = [
    {day: 'Mon', tasks: []},
    {day: 'Tue', tasks: []},
    {day: 'Wed', tasks: []},
    {day: 'Thu', tasks: []},
    {day: 'Fri', tasks: []},
    {day: 'Sat', tasks: []},
    {day: 'Sun', tasks: []}];

    for(let i=0; i < totalTasks; i++) {
      for(let k=0; k < ongoingTasks.length; k++){
        if (ongoingTasks[k].timesPerWeek > 0) {
          let randomWeekDay = Math.floor(Math.random() * 7);

          if (!tempWeeklyArray[randomWeekDay].tasks.includes(ongoingTasks[k])) {
            ongoingTasks[k].timesPerWeek -= 1;
            tempWeeklyArray[randomWeekDay].tasks.push(ongoingTasks[k]);
          } else {
            totalTasks++;
          }
        }
      }
    }

    setWeeklyArray(tempWeeklyArray);
  }

  useEffect(() => {
    calculateTasksPerDay()
  }, [])

  return (
    <>
    <h1>Tasks Per Day</h1>
    <button>Save to Firebase</button>
    <button>Randomize Tasks</button>
    <section id='tasks-per-day-display'>
      {weeklyArray.map((day, index) => {
        return <div key={index}>
          <h3>{day.day}</h3>
          {day.tasks.map((item, index) => { 
            return (
            <div key={index}>
              <input type='checkbox'/><span className={item.class}>{item.task}</span>
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