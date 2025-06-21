import type { TimeEntry } from '../types';

type Props = {
  entries: TimeEntry[];
};

export const TotalHours: React.FC<Props> = ({ entries }) => {
  const total = entries.reduce((sum, entry) => sum + entry.hours, 0);
  return <p>Total Hours Worked: {total}</p>;
};
