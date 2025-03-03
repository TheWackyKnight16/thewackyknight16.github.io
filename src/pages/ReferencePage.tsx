import React from 'react';

export function ReferencePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">5/3/1 Program Reference</h1>
        <p className="text-gray-400">Complete guide to the 5/3/1 for Beginners program</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Quick Program Overview</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              On each of the three lifting days, you will perform:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Quick warmup of jumping or throwing movements</li>
              <li>Eight sets of your first Main Lift (third set is AMRAP)</li>
              <li>Eight sets of your second Main Lift (third set is AMRAP)</li>
              <li>50-100 reps each of Push, Pull, and Single Leg/Core exercises</li>
            </ol>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Weekly Schedule</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Day 1 (Monday)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Squats – Main Lift Sets</li>
                <li>Bench Press – Main Lift Sets</li>
                <li>Assistance Work</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Day 2 (Wednesday)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Deadlift – Main Lift Sets</li>
                <li>Overhead Press – Main Lift Sets</li>
                <li>Assistance Work</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Day 3 (Friday)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Bench Press – Main Lift Sets</li>
                <li>Squats – Main Lift Sets</li>
                <li>Assistance Work</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Training Max Guidelines</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">To set your initial Training Max:</p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Find a weight you can complete 3-5 reps with good bar speed</li>
              <li>Calculate your estimated One Rep Max (1RM)</li>
              <li>Use 90% of this 1RM as your Training Max</li>
            </ol>
            <div className="mt-4">
              <p className="text-gray-300">
                <strong>Important:</strong> Your Training Max is not a measure of your strength—it's a
                tool to inform your workout weights.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Weekly Progression</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Week 1</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>Set 1: 5 reps @ 65%</li>
                  <li>Set 2: 5 reps @ 75%</li>
                  <li>Set 3: 5+ reps @ 85%</li>
                  <li>Sets 4-8: 5×5 @ 65%</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Week 2</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>Set 1: 3 reps @ 70%</li>
                  <li>Set 2: 3 reps @ 80%</li>
                  <li>Set 3: 3+ reps @ 90%</li>
                  <li>Sets 4-8: 5×5 @ 70%</li>
                </ul>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Week 3</h3>
                <ul className="space-y-1 text-gray-300">
                  <li>Set 1: 5 reps @ 75%</li>
                  <li>Set 2: 3 reps @ 85%</li>
                  <li>Set 3: 1+ reps @ 95%</li>
                  <li>Sets 4-8: 5×5 @ 75%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Assistance Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Push (50-100 reps)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Dips</li>
                <li>Pushups</li>
                <li>DB Bench Press</li>
                <li>DB Overhead Press</li>
                <li>Tricep Extensions</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Pull (50-100 reps)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Chinups</li>
                <li>Pullups</li>
                <li>DB Rows</li>
                <li>Face Pulls</li>
                <li>Lat Pulldowns</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-3">Single Leg/Core (50-100 reps)</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Ab Exercises</li>
                <li>Lunges</li>
                <li>Step Ups</li>
                <li>KB Swings</li>
                <li>Back Raises</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Progress and Deloading</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Training Max Progression</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                <li>Upper body lifts: Add 5 lbs per cycle</li>
                <li>Lower body lifts: Add 10 lbs per cycle</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Deload Protocol</h3>
              <p className="text-gray-300">
                Every 7th week (after two 3-week cycles), take a deload week using lighter weights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}