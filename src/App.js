import './global.css';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';


function App() {
  return (
    <>
      <header>
        <h1>River Process Random Generator</h1>
      </header>
      <OngoingTasks />
      <TasksPerDayDisplay />
      <footer>
        <h4>see README.md for information on River Process</h4>
      </footer>
    </>
  );
}

export default App;
