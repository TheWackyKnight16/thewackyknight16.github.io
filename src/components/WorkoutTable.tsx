import React from 'react';
import { Lift } from '../types';
import { useWorkoutStore } from '../store';

interface Props {
  lift: Lift;
}

const WEEK_SCHEMES = {
  1: [
    { percentage: 65, reps: 5, isAmrap: false },
    { percentage: 75, reps: 5, isAmrap: false },
    { percentage: 85, reps: 5, isAmrap: true },
  ],
  2: [
    { percentage: 70, reps: 3, isAmrap: false },
    { percentage: 80, reps: 3, isAmrap: false },
    { percentage: 90, reps: 3, isAmrap: true },
  ],
  3: [
    { percentage: 75, reps: 5, isAmrap: false },
    { percentage: 85, reps: 3, isAmrap: false },
    { percentage: 95, reps: 1, isAmrap: true },
  ],
};

export function WorkoutTable({ lift }: Props) {
  const { lifts, currentWeek } = useWorkoutStore();
  const trainingMax = lifts[lift].trainingMax;

  return (
    <div className="overflow-hidden rounded-md border border-gray-700">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Set</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Weight</th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-300">Reps</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {WEEK_SCHEMES[currentWeek as 1 | 2 | 3].map((set, index) => (
            <tr key={index} className={set.isAmrap ? 'bg-blue-900/20' : ''}>
              <td className="px-4 py-3 text-sm">{index + 1}</td>
              <td className="px-4 py-3 text-sm">
                {Math.round((trainingMax * set.percentage) / 100)} lbs
              </td>
              <td className="px-4 py-3 text-sm">
                {set.reps}
                {set.isAmrap && <span className="text-blue-400 ml-1">(AMRAP)</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}