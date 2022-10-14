import React from 'react'

const Task = ({task, timesPerWeek}) => {
  return (
    <>
      {console.log(timesPerWeek)}
      <div>{timesPerWeek} - {task}</div>
    </>
  )
}

export default Task