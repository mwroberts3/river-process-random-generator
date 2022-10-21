import { useState, useEffect } from 'react'
import './global.css';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';
import { masterTaskList } from './data'

function App() {
  const unmutatedTaskList = structuredClone(masterTaskList);

  return (
    <>
      <header>
        <h1>River Process Random Generator</h1>
      </header>
      <OngoingTasks masterTaskList={masterTaskList} unmutatedTaskList={unmutatedTaskList}/>
      <TasksPerDayDisplay masterTaskList={masterTaskList}/>
      <footer>
        <h4>see README.md for information on River Process</h4>
      </footer>
    </>
  );
}

export default App;
