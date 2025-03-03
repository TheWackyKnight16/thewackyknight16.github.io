import { useWorkoutStore } from '../store';

export function SettingsPage() {
  const { clearHistory } = useWorkoutStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Settings</h1>
        <p className="text-gray-400">Manage your app preferences and data</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">Data Management</h2>
          <div className="space-y-4">
            <div>
              <p className="text-gray-400 mb-3">
                Clear all workout history and reset your progress. This action cannot be undone.
              </p>
              <button
                onClick={clearHistory}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Clear All Data
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <div className="prose prose-invert">
            <p className="text-gray-300">
              5/3/1 Workout Tracker helps you follow Jim Wendler's 5/3/1 program for strength training.
              Track your progress, calculate your maxes, and stay consistent with your training.
            </p>
            <p className="text-gray-300">
              This app is based on the 5/3/1 for Beginners program by Jim Wendler. For more detailed
              information about the program, visit the{' '}
              <a
                href="https://thefitness.wiki/routines/5-3-1-for-beginners/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                official program page
              </a>
              .
            </p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4">App Version</h2>
          <p className="text-gray-400">Version 1.0.0</p>
        </div>
      </div>
    </div>
  );
}