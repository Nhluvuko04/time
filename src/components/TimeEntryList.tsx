import type { TimeEntry } from '../types';

type Props = {
  entries: TimeEntry[];
};

export const TimeEntryList: React.FC<Props> = ({ entries }) => (
  <ul>
    {entries.map((entry) => (
      <li key={entry.id}>
        {entry.taskName} — {entry.hours} hour(s)
      </li>
    ))}
  </ul>
);
