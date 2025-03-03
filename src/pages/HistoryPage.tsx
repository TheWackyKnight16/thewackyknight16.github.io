import { useWorkoutStore } from '../store';

export function HistoryPage() {
  const { history, dayWorkouts } = useWorkoutStore();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Workout History</h1>
        <p className="text-gray-400">Review your past workouts and progress</p>
      </div>

      <div className="space-y-4">
        {history.map((entry, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">
                {new Date(entry.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                Week {entry.week} of 3
              </span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(entry.lifts).map(([lift, data]) => (
                <div key={lift} className="space-y-2">
                  <h4 className="font-medium capitalize text-gray-200">{lift}</h4>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-400">
                      Training Max: <span className="text-gray-200">{data.trainingMax} lbs</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      One Rep Max: <span className="text-gray-200">{data.oneRepMax} lbs</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {dayWorkouts.filter(d => d.completed).map((workout, index) => (
          <div key={`day-${workout.day}-${index}`} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-400">
                {new Date(workout.date).toLocaleDateString(undefined, {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm">
                Day {workout.day}: {workout.name}
              </span>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-200 mb-2">Main Lifts</h4>
                <div className="flex space-x-4">
                  {workout.mainLifts.map(lift => (
                    <span key={lift} className="px-3 py-1 bg-gray-700 rounded-md capitalize">
                      {lift}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-200 mb-2">Assistance Work</h4>
                <div className="grid grid-cols-3 gap-4">
                  {workout.assistance.map(exercise => (
                    <div key={exercise.category} className="bg-gray-700 p-3 rounded-md">
                      <p className="text-sm font-medium mb-1">
                        {exercise.category === 'push' ? 'Push' : 
                         exercise.category === 'pull' ? 'Pull' : 'Single Leg/Core'}
                      </p>
                      {exercise.name ? (
                        <div>
                          <p className="text-xs text-gray-400">{exercise.name}</p>
                          <p className="text-xs text-gray-400">
                            {exercise.repsCompleted}/{exercise.targetReps} reps
                          </p>
                        </div>
                      ) : (
                        <p className="text-xs text-gray-500">Not completed</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}