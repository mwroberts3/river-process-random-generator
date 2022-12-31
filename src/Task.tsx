const Task = ({ task, timesPerWeek, minEstimate, categories, className }: { task: string, timesPerWeek: number, minEstimate: number, categories: Array<string>, className: string }) => {

  return (
    <tr>
      <td className={className}>{task}</td>
      <td>{categories[0]}</td>
      <td>{timesPerWeek}</td>
      <td>{minEstimate}</td>
    </tr>
  )
}

export default Task