import React from 'react'

const Task = ({task, timesPerWeek}) => {
  return (
    <>
      <div>{task} - {timesPerWeek}</div>
    </>
  )
}

export default Task