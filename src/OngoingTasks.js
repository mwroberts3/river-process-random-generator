import React from 'react'
import Task from './Task'
import { ongoingTasks } from './data'

const OngoingTasks = () => {
  return (
    <div>
      <h1>Ongoing Tasks</h1>
      <button>Show</button>
      {ongoingTasks.map((item) => {
        return <Task key={item.id} {...item}/>        
      })}
    </div>
  )
}

export default OngoingTasks