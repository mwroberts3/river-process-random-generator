import { useState } from 'react'
import Task from './Task'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { IconContext } from 'react-icons/lib/esm/iconContext';

const OngoingTasks = ({ unmutatedTaskList, totalMinutes, minToHours }: { unmutatedTaskList: any, totalMinutes: number, minToHours: Function }) => {
  const [showTasks, setShowTasks] = useState(false);

  const totalHours = minToHours(totalMinutes);

  const sortTable = (e: any) => {
    console.log(e.target.textContent);
    console.log(e.target.innerHTML.split('d="M0 ')[1].split('z"')[0]);
  }

  if (showTasks) {
    return (
      <div>
        <div className='header-and-btn-container'>
          <h1>Ongoing Tasks</h1>
          <div id='ongoing-tasks-buttons-display'>
            <button onClick={() => setShowTasks(false)}>Hide</button>
          </div>
        </div>
        <p>{totalHours} out of ~72  total non-work/sleep hours per week</p>
        <IconContext.Provider value={{ className: 'table-icons' }}>
          <table id="ongoing-tasks-table">
            <tbody>
              <tr>
                <th onClick={sortTable}>Task <MdKeyboardArrowUp /></th>
                <th onClick={sortTable}>Category <MdKeyboardArrowUp /></th>
                <th onClick={sortTable}>Times Per Week <MdKeyboardArrowDown /></th>
                <th onClick={sortTable}>Minutes <MdKeyboardArrowDown /></th>
              </tr>
              {
                unmutatedTaskList.map((item: any) => {
                  console.log(item);
                  return <Task key={item.id} {...item} />
                })
              }
            </tbody>
          </table>
        </IconContext.Provider>
      </div >
    )
  }

  return (
    <div className='header-and-btn-container'>
      <h1>Ongoing Tasks</h1>
      <div id='ongoing-tasks-buttons-display'>
        <button onClick={() => setShowTasks(true)}>Show</button>
        {/* <div className='pseudo-btn'>import .txt <input type='file' /></div> */}
      </div>
    </div>
  )
}

export default OngoingTasks