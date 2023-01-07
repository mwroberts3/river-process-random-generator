import { useState, Fragment } from 'react'
import Task from './Task'
import FileImport from './FileImport';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import { IconContext } from 'react-icons/lib/esm/iconContext';

const OngoingTasks = ({ csvImport, totalMinutes, minToHours, setCSVImport }: { csvImport: any, totalMinutes: number, minToHours: Function, setCSVImport: Function }) => {
  const [showTasks, setShowTasks] = useState(false);
  const [sortByTask, setSortByTask] = useState(false);
  const [sortByCategory, setSortByCategory] = useState(false);
  const [sortByTimesPerWeek, setSortByTimesPerWeek] = useState(false);
  const [sortByMinutes, setSortByMinutes] = useState(false);

  const totalHours = minToHours(totalMinutes);

  const sortTable = (e: any, setArrowUp: any) => {
    let selectedSortCategory = e.target.textContent === 'Times Per Week ' ? 'timesPerWeek' : e.target.textContent === 'Category ' ? 'categories' : e.target.textContent.toLowerCase().trim();

    const arrowUp = e.target.innerHTML.split('d="M0 ')[1].split('z"')[0] === '0h24v24H0' ? true : false;

    if (selectedSortCategory === 'task') {
      csvImport.sort((a: any, b: any) =>
        sortShortHand(a[selectedSortCategory as keyof typeof a].toLowerCase(), b[selectedSortCategory as keyof typeof b].toLowerCase()))
    };

    if (selectedSortCategory === 'categories') {
      csvImport.sort((a: any, b: any) =>
        sortShortHand(a[selectedSortCategory as keyof typeof a][0].toLowerCase(), b[selectedSortCategory as keyof typeof b][0].toLowerCase()))
    };

    if (selectedSortCategory === 'timesPerWeek' || selectedSortCategory === 'minutes') {
      csvImport.sort((a: any, b: any) =>
        sortShortHand(a[selectedSortCategory as keyof typeof a], b[selectedSortCategory as keyof typeof b]))
    };

    setArrowUp(!arrowUp);

    function sortShortHand(a: any, b: any) {
      if (arrowUp) {
        if (a > b) return 1;
        else return -1;
      } else {
        if (a > b) return -1;
        else return 1;
      }
    }
  }

  if (showTasks) {
    return (
      <div>
        <div className='header-and-btn-container'>
          <h1>Ongoing Tasks</h1>
          <div id='ongoing-tasks-buttons-display'>
            <button onClick={() => setShowTasks(false)}>Hide</button>
            <FileImport setCSVImport={setCSVImport} />
          </div>
        </div>
        <p>{totalHours} out of ~72  total non-work/sleep hours per week</p>
        <IconContext.Provider value={{ className: 'table-icons' }}>
          <table id="ongoing-tasks-table">
            <tbody>
              <tr className='non-hover'>
                <th onClick={(e) => sortTable(e, setSortByTask)}>Task {sortByTask ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
                <th onClick={(e) => sortTable(e, setSortByCategory)}>Category {sortByCategory ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
                <th onClick={(e) => sortTable(e, setSortByTimesPerWeek)}>Times Per Week {sortByTimesPerWeek ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
                <th onClick={(e) => sortTable(e, setSortByMinutes)}>Minutes {sortByMinutes ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}</th>
              </tr>
              {
                csvImport.map((task: any, index: number) => {
                  if (task.active) {
                    return <Task key={task.id} {...task} display={'Ongoing Tasks'} />
                  }
                  return <Fragment key={index} />;
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
        <FileImport setCSVImport={setCSVImport} />
      </div>
    </div>
  )
}

export default OngoingTasks