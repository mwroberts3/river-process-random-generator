const Task = ({ task, timesPerWeek, minEstimate }: { task: string, timesPerWeek: number, minEstimate: number }) => {
  return (
    <>
      <div>{timesPerWeek} - {task} - {minEstimate}min</div>
    </>
  )
}

export default Task