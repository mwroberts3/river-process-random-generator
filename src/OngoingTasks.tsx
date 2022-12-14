import { useState } from 'react'
import Task from './Task'

const OngoingTasks = ({ unmutatedTaskList }: { unmutatedTaskList: any }) => {
  const [showTasks, setShowTasks] = useState(false);

  const totalMinutes = unmutatedTaskList.reduce((accumulator: number, task: any) => accumulator + task.minEstimate * task.timesPerWeek, 0);

  const hours = Math.floor(totalMinutes / 60);
  const remainderMinutes = totalMinutes % 60;
  const totalHours = `${hours}:${remainderMinutes.toString().padStart(2, '0')}`;

  if (showTasks) {
    return (
      <div>
        <h1>Ongoing Tasks <span>{totalHours} hours</span></h1>
        <button onClick={() => setShowTasks(false)}>Hide</button>
        {unmutatedTaskList.map((item) => {
          return <Task key={item.id} {...item} />
        })}
      </div>
    )
  }

  return (
    <div>
      <h1>Ongoing Tasks <span>{totalHours} hours</span></h1>
      <button onClick={() => setShowTasks(true)}>Show</button>
    </div>
  )
}

export default OngoingTasks