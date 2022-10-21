import React, { useState } from 'react'
import Task from './Task'

const OngoingTasks = ({masterTaskList, unmutatedTaskList}) => {
  const [showTasks, setShowTasks] = useState(false);

  if (showTasks) {
    return (
      <div>
      <h1>Ongoing Tasks</h1>
      <button onClick={() => setShowTasks(false)}>Hide</button>
      {unmutatedTaskList.map((item) => {
        return <Task key={item.id} {...item}/>})}
      </div>
    )
  }

  return (
    <div>
      <h1>Ongoing Tasks</h1>
      <button onClick={() => setShowTasks(true)}>Show</button>
    </div>
  )
}

export default OngoingTasks