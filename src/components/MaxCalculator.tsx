import React, { useState } from 'react';
import { Lift } from '../types';
import { useWorkoutStore } from '../store';

interface Props {
  lift: Lift;
  onComplete?: () => void;
}

export function MaxCalculator({ lift, onComplete }: Props) {
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const calculateTrainingMax = useWorkoutStore((state) => state.calculateTrainingMax);

  const calculateOneRepMax = () => {
    const w = parseFloat(weight);
    const r = parseFloat(reps);
    if (w && r) {
      // Brzycki Formula
      const oneRepMax = Math.round(w * (36 / (37 - r)));
      calculateTrainingMax(lift, oneRepMax);
      if (onComplete) {
        onComplete();
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-gray-300 mb-1">
            Weight (lbs)
          </label>
          <input
            id="weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter weight"
          />
        </div>
        <div>
          <label htmlFor="reps" className="block text-sm font-medium text-gray-300 mb-1">
            Reps
          </label>
          <input
            id="reps"
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter reps"
          />
        </div>
        <button
          onClick={calculateOneRepMax}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Calculate
        </button>
      </div>
    </div>
  );
}