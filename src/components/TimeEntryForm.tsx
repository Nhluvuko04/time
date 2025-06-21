import { useState } from 'react';

type Props = {
  onAdd: (entry: { taskName: string; hours: number }) => void;
};

export const TimeEntryForm: React.FC<Props> = ({ onAdd }) => {
  const [taskName, setTaskName] = useState('');
  const [hours, setHours] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName || Number(hours) <= 0) return;
    onAdd({ taskName, hours: Number(hours) });
    setTaskName('');
    setHours('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <button type="submit">Add Entry</button>
    </form>
  );
};
