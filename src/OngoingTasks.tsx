import { useState } from 'react'
import Task from './Task'

const OngoingTasks = ({ unmutatedTaskList, totalMinutes, minToHours }: { unmutatedTaskList: any, totalMinutes: number, minToHours: Function }) => {
  const [showTasks, setShowTasks] = useState(false);

  const totalHours = minToHours(totalMinutes);

  const uploadTxtFile = () => {
    // convert .txt file to task array, may need to be in the App component
  }

  if (showTasks) {
    return (
      <div>
        <div className='header-and-btn-container'>
          <h1>Ongoing Tasks</h1>
          <div id='ongoing-tasks-buttons-display'>
            <button onClick={() => setShowTasks(false)}>Hide</button>
            <div className='pseudo-btn'>import .txt <input type='file' /></div>
          </div>
        </div>
        <p>{totalHours} hours</p>
        {
          unmutatedTaskList.map((item: any) => {
            return <Task key={item.id} {...item} />
          })
        }
      </div >
    )
  }

  return (
    <div className='header-and-btn-container'>
      <h1>Ongoing Tasks</h1>
      <div id='ongoing-tasks-buttons-display'>
        <button onClick={() => setShowTasks(true)}>Show</button>
        <div className='pseudo-btn'>import .txt <input type='file' /></div>
      </div>
    </div>
  )
}

export default OngoingTasks