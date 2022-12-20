import { useState } from 'react'
import Task from './Task'

const OngoingTasks = ({ unmutatedTaskList, totalMinutes }: { unmutatedTaskList: any, totalMinutes: number }) => {
  const [showTasks, setShowTasks] = useState(false);

  const hours = Math.floor(totalMinutes / 60);
  const remainderMinutes = totalMinutes % 60;
  const totalHours = `${hours}:${remainderMinutes.toString().padStart(2, '0')}`;

  if (showTasks) {
    return (
      <div>
        <h1>Ongoing Tasks <span>{totalHours} hours</span></h1>
        <div id='ongoing-tasks-buttons-display'>
          <button onClick={() => setShowTasks(false)}>Hide</button>
          <button>Import from Firebase</button>
          <button>Upload .txt File to Firebase</button>
        </div>
        {unmutatedTaskList.map((item: any) => {
          return <Task key={item.id} {...item} />
        })}
      </div>
    )
  }

  return (
    <div>
      <h1>Ongoing Tasks <span>{totalHours} hours</span></h1>
      <div id='ongoing-tasks-buttons-display'>
        <button onClick={() => setShowTasks(true)}>Show</button>
        <button>Import from Firebase</button>
        <button>Upload .txt File to Firebase</button>
      </div>
    </div>
  )
}

export default OngoingTasks