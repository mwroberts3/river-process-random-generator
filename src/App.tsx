import './global.css';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';
import { masterTaskList } from './data'

function App() {
  type Task = { id: number | string, task: string, timesPerWeek: number, class: string, timeFrame: string, minEstimate: number };

  const unmutatedTaskList: Array<Task> = structuredClone(masterTaskList);

  return (
    <>
      <header>
        <h1>River Process Random Generator</h1>
      </header>
      <OngoingTasks unmutatedTaskList={unmutatedTaskList} />
      <TasksPerDayDisplay masterTaskList={masterTaskList} unmutatedTaskList={unmutatedTaskList} />
      <footer>
        <h4>see README.md for information on River Process</h4>
      </footer>
    </>
  );
}

export default App;
