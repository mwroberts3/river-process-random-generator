import { useState } from 'react'
import Task from './Task'
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { IconContext } from 'react-icons/lib/esm/iconContext';

const OngoingTasks = ({ unmutatedTaskList, totalMinutes, minToHours }: { unmutatedTaskList: any, totalMinutes: number, minToHours: Function }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [sortByTask, setSortByTask] = useState(false);
  const [sortByCategory, setSortByCategory] = useState(false);
  const [sortByTimesPerWeek, setSortByTimesPerWeek] = useState(false);
  const [sortByMinutes, setSortByMinutes] = useState(false);


  const totalHours = minToHours(totalMinutes);

  const sortTable = (e: any, setArrowUp: any) => {
    const selectedSortCategory = e.target.textContent === 'Times Per Week ' ? 'timesPerWeek' : e.target.textContent.toLowerCase().trim();
    const arrowUp = e.target.innerHTML.split('d="M0 ')[1].split('z"')[0] === '0h24v24H0' ? true : false;

    setArrowUp(!arrowUp);
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
                <th onClick={(e) => sortTable(e, setSortByTask)}>Task {sortByTask ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
                <th onClick={(e) => sortTable(e, setSortByCategory)}>Category {sortByCategory ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
                <th onClick={(e) => sortTable(e, setSortByTimesPerWeek)}>Times Per Week {sortByTimesPerWeek ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
                <th onClick={(e) => sortTable(e, setSortByMinutes)}>Minutes {sortByMinutes ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
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