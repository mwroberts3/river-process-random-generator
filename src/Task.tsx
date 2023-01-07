const Task = ({ task, timesPerWeek, minEstimate, categories, color, display }: { task: string, timesPerWeek: number, minEstimate: number, categories: Array<string>, color: string, display: string }) => {

  if (display === 'Ongoing Tasks') {
    return (
      <tr>
        <td style={{ color: color }}>{task}</td>
        <td>{categories[0]}</td>
        <td>{timesPerWeek}</td>
        <td>{minEstimate}</td>
      </tr>
    )
  }
  return (
    <div>
      <span style={{ color: color }}>{task}</span>
    </div>
  )
}

export default Task