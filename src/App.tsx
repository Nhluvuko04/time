import React, { useState } from 'react';
import './App.css';

type TimeEntry = {
  id: number;
  task: string;
  hours: number;
  isRunning?: boolean;
  startTime?: number;
};

function App() {
  const [entries, setEntries] = useState<TimeEntry[]>([]);
  const [task, setTask] = useState('');
  const [hours, setHours] = useState<number>(0);
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const addEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task || hours <= 0) return;

    const newEntry: TimeEntry = {
      id: Date.now(),
      task,
      hours
    };

    setEntries([...entries, newEntry]);
    setTask('');
    setHours(0);
  };

  const deleteEntry = (id: number) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  const editEntry = (id: number) => {
    const entry = entries.find(e => e.id === id);
    if (entry) {
      setTask(entry.task);
      setHours(entry.hours);
      deleteEntry(id);
    }
  };

  const startTimer = () => {
    if (task.trim() === '') return;
    const id = Date.now();
    const newEntry: TimeEntry = {
      id,
      task,
      hours: 0,
      isRunning: true,
      startTime: Date.now()
    };
    setEntries([...entries, newEntry]);
    setActiveTaskId(id);

    const idInterval = setInterval(() => {
      setEntries(prev =>
        prev.map(entry =>
          entry.id === id
            ? { ...entry, hours: +(entry.hours + 0.01).toFixed(2) }
            : entry
        )
      );
    }, 600);
    setTimerId(idInterval);
  };

  const stopTimer = () => {
    if (timerId) clearInterval(timerId);
    setTimerId(null);
    setActiveTaskId(null);
  };

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  return (
    <div className="App">
      <h1>⏱Time Tracker</h1>
      <form onSubmit={addEntry}>
        <input
          type="text"
          placeholder="Task name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="number"
          placeholder="Hours worked"
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
        />
        <button type="submit">Add Entry</button>
        <button type="button" onClick={startTimer} disabled={timerId !== null}>
          Start Timer
        </button>
        <button type="button" onClick={stopTimer} disabled={timerId === null}>
          Stop Timer
        </button>
      </form>

      <h2>Entries</h2>
      <ul>
        {entries.map((entry) => (
          <li key={entry.id}>
            {entry.task} – {entry.hours.toFixed(2)} hrs
            <button onClick={() => editEntry(entry.id)}>Edit</button>
            <button onClick={() => deleteEntry(entry.id)}>Delete</button>
            {entry.id === activeTaskId && entry.isRunning && <span> ⏳</span>}
          </li>
        ))}
      </ul>

      <h3>Total Hours: {totalHours.toFixed(2)}</h3>
    </div>
  );
}

export default App;
