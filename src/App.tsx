import './global.css';
import { useState, useEffect } from 'react';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';
import CategoryBreakdown from './CategoryBreakdown';

function App() {
  const [csvImport, setCSVImport] = useState((csvImport: any) => {
    if (csvImport) return csvImport;
    else return [];
  });

  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    const fileLoadCheck = setInterval(() => {
      if (csvImport.length > 0) {
        clearInterval(fileLoadCheck);

        setTotalMinutes(csvImport.reduce((accumulator: number, task: any) => {
          if (task.active) {
            return accumulator + task.minEstimate * task.timesPerWeek;
          }
          return accumulator;
        }, 0));
      }
    }, 500);

    return () => clearInterval(fileLoadCheck);
  }, [csvImport]);

  const minToHours = (minutes: number) => {
    let hours = Math.floor(minutes / 60);
    let remainderMinutes = minutes % 60;
    let totalHours = `${hours}:${remainderMinutes.toString().padStart(2, '0')}`;

    return totalHours;
  }

  return (
    <>
      <div id='sections-container'>
        <header>
          <h1>River Process <small>v1.0.0</small></h1>
        </header>
        <OngoingTasks csvImport={csvImport} totalMinutes={totalMinutes} minToHours={minToHours} setCSVImport={setCSVImport} />
        <CategoryBreakdown csvImport={csvImport} totalMinutes={totalMinutes} minToHours={minToHours} />
        <TasksPerDayDisplay csvImport={csvImport} />
      </div>
      <footer>
        see <a href="https://github.com/mwroberts3/river-process-random-generator" target="_blank" rel="noreferrer">README</a> for more information
      </footer>
    </>
  );
}

export default App;
