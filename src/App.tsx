import './global.css';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';
import CategoryBreakdown from './CategoryBreakdown';
import { masterTaskList } from './data'

function App() {
  const unmutatedTaskList = structuredClone(masterTaskList);

  const totalMinutes: number = unmutatedTaskList.reduce((accumulator: number, task: any) => accumulator + task.minEstimate * task.timesPerWeek, 0);

  const minToHours = (minutes: number) => {
    let hours = Math.floor(minutes / 60);
    let remainderMinutes = minutes % 60;
    let totalHours = `${hours}:${remainderMinutes.toString().padStart(2, '0')}`;

    return totalHours;
  }

  return (
    <>
      <header>
        <h1>River Process Assist</h1>
      </header>
      <OngoingTasks unmutatedTaskList={unmutatedTaskList} totalMinutes={totalMinutes} minToHours={minToHours} />
      <CategoryBreakdown unmutatedTaskList={unmutatedTaskList} totalMinutes={totalMinutes} minToHours={minToHours} />
      <TasksPerDayDisplay masterTaskList={masterTaskList} unmutatedTaskList={unmutatedTaskList} />
      <footer>
        <h4>see README.md for information on River Process</h4>
      </footer>
    </>
  );
}

export default App;
