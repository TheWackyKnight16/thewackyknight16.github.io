import { useState } from 'react';
import { ArrowRight, Plus, CheckCircle, Calendar } from 'lucide-react';
import { MaxCalculator } from '../components/MaxCalculator';
import { WorkoutTable } from '../components/WorkoutTable';
import { Modal } from '../components/Modal';
import { useWorkoutStore } from '../store';
import { Lift, AssistanceCategory } from '../types';

export function WorkoutPage() {
  const { 
    currentWeek, 
    incrementCycle, 
    dayWorkouts, 
    startDayWorkout, 
    currentDay,
    assistanceExercises,
    updateAssistanceExercise,
    logAssistanceReps,
    completeDayWorkout
  } = useWorkoutStore();
  
  const [selectedLift, setSelectedLift] = useState<Lift | null>(null);
  const [showDaySelector, setShowDaySelector] = useState(false);

  const handleStartDay = (day: 1 | 2 | 3) => {
    startDayWorkout(day);
    setShowDaySelector(false);
  };

  const handleCompleteDayWorkout = () => {
    if (currentDay) {
      completeDayWorkout(currentDay);
    }
  };

  const getAssistanceProgress = (day: 1 | 2 | 3, category: AssistanceCategory) => {
    const dayWorkout = dayWorkouts.find(d => d.day === day);
    if (!dayWorkout) return 0;
    
    const exercise = dayWorkout.assistance.find(a => a.category === category);
    if (!exercise) return 0;
    
    return Math.min(100, (exercise.repsCompleted / exercise.targetReps) * 100);
  };

  const getCategoryLabel = (category: AssistanceCategory): string => {
    switch (category) {
      case 'push': return 'Push';
      case 'pull': return 'Pull';
      case 'singleLegCore': return 'Single Leg/Core';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Current Workout</h1>
          <p className="text-gray-400">Week {currentWeek} of 3</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowDaySelector(true)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Start Day
          </button>
          <button
            onClick={incrementCycle}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next Week
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {currentDay ? (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                Day {currentDay}: {dayWorkouts[currentDay - 1].name}
              </h2>
              <button
                onClick={handleCompleteDayWorkout}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Workout
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Main Lifts</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {dayWorkouts[currentDay - 1].mainLifts.map((lift) => (
                    <div key={lift} className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold capitalize">{lift}</h3>
                        <button
                          onClick={() => setSelectedLift(lift)}
                          className="flex items-center px-3 py-1.5 text-sm bg-gray-600 text-gray-300 rounded-md hover:bg-gray-500 transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-1.5" />
                          Calculate Max
                        </button>
                      </div>
                      <WorkoutTable lift={lift} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Assistance Work</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {dayWorkouts[currentDay - 1].assistance.map((exercise) => (
                    <div key={exercise.category} className="bg-gray-700 rounded-lg p-6">
                      <h4 className="font-medium mb-3">{getCategoryLabel(exercise.category)}</h4>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Exercise
                          </label>
                          <select
                            value={exercise.name}
                            onChange={(e) => updateAssistanceExercise(currentDay, exercise.category, e.target.value)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                          >
                            <option value="">Select an exercise</option>
                            {assistanceExercises[exercise.category].map((name) => (
                              <option key={name} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Reps Completed ({exercise.repsCompleted}/{exercise.targetReps})
                          </label>
                          <input
                            type="number"
                            value={exercise.repsCompleted}
                            onChange={(e) => logAssistanceReps(currentDay, exercise.category, parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                          />
                        </div>
                        
                        <div className="w-full bg-gray-600 rounded-full h-2.5">
                          <div 
                            className="bg-blue-600 h-2.5 rounded-full" 
                            style={{ width: `${getAssistanceProgress(currentDay, exercise.category)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">No Active Workout</h2>
          <p className="text-gray-400 mb-6">Select a day to start your workout</p>
          <button
            onClick={() => setShowDaySelector(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Workout Day
          </button>
        </div>
      )}

      <Modal
        isOpen={selectedLift !== null}
        onClose={() => setSelectedLift(null)}
        title={`Calculate ${selectedLift} Max`}
      >
        {selectedLift && <MaxCalculator lift={selectedLift} onComplete={() => setSelectedLift(null)} />}
      </Modal>

      <Modal
        isOpen={showDaySelector}
        onClose={() => setShowDaySelector(false)}
        title="Select Workout Day"
      >
        <div className="space-y-4">
          {dayWorkouts.map((day) => (
            <button
              key={day.day}
              onClick={() => handleStartDay(day.day as 1 | 2 | 3)}
              className={`w-full px-4 py-3 rounded-md text-left flex items-center justify-between ${
                day.completed 
                  ? 'bg-gray-700 text-gray-400' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              <div>
                <span className="font-medium">Day {day.day}: {day.name}</span>
                <div className="text-sm mt-1">
                  {day.mainLifts.map(lift => lift.charAt(0).toUpperCase() + lift.slice(1)).join(' & ')}
                </div>
              </div>
              {day.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}