import './global.css';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';
import CategoryBreakdown from './CategoryBreakdown';
import { masterTaskList } from './data'

function App() {
  const unmutatedTaskList = structuredClone(masterTaskList);

  return (
    <>
      <header>
        <h1>River Process Random Generator</h1>
      </header>
      <OngoingTasks unmutatedTaskList={unmutatedTaskList} />
      <CategoryBreakdown />
      <TasksPerDayDisplay masterTaskList={masterTaskList} unmutatedTaskList={unmutatedTaskList} />
      <footer>
        <h4>see README.md for information on River Process</h4>
      </footer>
    </>
  );
}

export default App;
