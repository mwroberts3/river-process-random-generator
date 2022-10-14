import './global.css';
import OngoingTasks from './OngoingTasks';
import TasksPerDayDisplay from './TasksPerDayDisplay';


function App() {
  return (
    <main>
      <header>
        <h1>River Progress Assist</h1>
      </header>
      <OngoingTasks />
      <TasksPerDayDisplay />
    </main>
  );
}

export default App;
