const Task = ({ task, timesPerWeek, minEstimate, categories }: { task: string, timesPerWeek: number, minEstimate: number, categories: Array<string> }) => {

  return (
    <tr>
      <td>{task}</td>
      <td>{categories[0]}</td>
      <td>{timesPerWeek}</td>
      <td>{minEstimate}</td>
    </tr>
  )
}

export default Task