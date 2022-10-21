import React from 'react'

const Task = ({task, timesPerWeek}) => {
  return (
    <>
      <div>{timesPerWeek} - {task}</div>
    </>
  )
}

export default Task