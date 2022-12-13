import React from 'react'

const Task = ({task, timesPerWeek, minEstimate}) => {
  return (
    <>
      <div>{timesPerWeek} - {task} - {minEstimate}min</div>
    </>
  )
}

export default Task