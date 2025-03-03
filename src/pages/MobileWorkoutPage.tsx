import { useState, useEffect } from 'react';
import { Timer, CheckCircle2, XCircle, ArrowRight, Calendar } from 'lucide-react';
import { useWorkoutStore } from '../store';
import { Lift, AssistanceCategory } from '../types';
import { Modal } from '../components/Modal';

export function MobileWorkoutPage() {
  const { 
    dayWorkouts, 
    startDayWorkout, 
    currentDay,
    assistanceExercises,
    updateAssistanceExercise,
    logAssistanceReps,
    completeDayWorkout,
    currentWeek,
    lifts,
    toggleSetCompleted,
    logSetReps
  } = useWorkoutStore();
  
  const [timer, setTimer] = useState<number>(180); // 3 minutes rest timer
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showDaySelector, setShowDaySelector] = useState(false);
  const [activeTab, setActiveTab] = useState<'main' | 'assistance'>('main');

  useEffect(() => {
    let interval: number | undefined;
    
    if (isTimerRunning && timer > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  const startTimer = () => {
    setIsTimerRunning(true);
    setTimer(180);
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(180);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartDay = (day: 1 | 2 | 3) => {
    startDayWorkout(day);
    setShowDaySelector(false);
  };

  const handleCompleteDayWorkout = () => {
    if (currentDay) {
      completeDayWorkout(currentDay);
    }
  };

  const getCategoryLabel = (category: AssistanceCategory): string => {
    switch (category) {
      case 'push': return 'Push';
      case 'pull': return 'Pull';
      case 'singleLegCore': return 'Single Leg/Core';
      default: return '';
    }
  };

  const getAssistanceProgress = (day: 1 | 2 | 3, category: AssistanceCategory) => {
    const dayWorkout = dayWorkouts.find(d => d.day === day);
    if (!dayWorkout) return 0;
    
    const exercise = dayWorkout.assistance.find(a => a.category === category);
    if (!exercise) return 0;
    
    return Math.min(100, (exercise.repsCompleted / exercise.targetReps) * 100);
  };

  const getCurrentDayWorkout = () => {
    if (!currentDay) return null;
    return dayWorkouts.find(d => d.day === currentDay) || null;
  };

  const currentDayWorkout = getCurrentDayWorkout();

  const handleToggleSet = (lift: Lift, setIndex: number) => {
    if (currentDay) {
      toggleSetCompleted(currentDay, lift, setIndex);
    }
  };

  const handleLogReps = (lift: Lift, setIndex: number, reps: number) => {
    if (currentDay) {
      logSetReps(currentDay, lift, setIndex, reps);
    }
  };

  const isSetCompleted = (lift: Lift, setIndex: number) => {
    if (!currentDay || !currentDayWorkout || !currentDayWorkout.setStatus) return false;
    return currentDayWorkout.setStatus[lift][setIndex].completed;
  };

  const getSetReps = (lift: Lift, setIndex: number) => {
    if (!currentDay || !currentDayWorkout || !currentDayWorkout.setStatus) return 0;
    return currentDayWorkout.setStatus[lift][setIndex].actualReps;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Mobile Workout View</h1>
        <p className="text-gray-400">Week {currentWeek} of 3</p>
      </div>

      {!currentDay ? (
        <div className="bg-gray-800 rounded-lg p-6 text-center">
          <p className="text-gray-400 mb-4">No active workout session</p>
          <button
            onClick={() => setShowDaySelector(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Workout Day
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Day {currentDay}: {currentDayWorkout?.name}
              </h2>
              <button
                onClick={handleCompleteDayWorkout}
                className="flex items-center px-3 py-1.5 text-sm bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
                Complete
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Rest Timer</h2>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-mono">{formatTime(timer)}</span>
                {isTimerRunning ? (
                  <button
                    onClick={pauseTimer}
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    <XCircle className="w-6 h-6" />
                  </button>
                ) : (
                  <button
                    onClick={startTimer}
                    className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                  >
                    <Timer className="w-6 h-6" />
                  </button>
                )}
                <button
                  onClick={resetTimer}
                  className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex border-b border-gray-700 mb-4">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'main' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('main')}
              >
                Main Lifts
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === 'assistance' 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('assistance')}
              >
                Assistance
              </button>
            </div>

            {activeTab === 'main' && currentDayWorkout && (
              <div className="space-y-6">
                {currentDayWorkout.mainLifts.map((lift) => {
                  const WEEK_SCHEMES = {
                    1: [
                      { percentage: 65, reps: 5, isAmrap: false },
                      { percentage: 75, reps: 5, isAmrap: false },
                      { percentage: 85, reps: 5, isAmrap: true },
                      { percentage: 65, reps: 5, isAmrap: false },
                      { percentage: 65, reps: 5, isAmrap: false },
                      { percentage: 65, reps: 5, isAmrap: false },
                      { percentage: 65, reps: 5, isAmrap: false },
                      { percentage: 65, reps: 5, isAmrap: false },
                    ],
                    2: [
                      { percentage: 70, reps: 3, isAmrap: false },
                      { percentage: 80, reps: 3, isAmrap: false },
                      { percentage: 90, reps: 3, isAmrap: true },
                      { percentage: 70, reps: 5, isAmrap: false },
                      { percentage: 70, reps: 5, isAmrap: false },
                      { percentage: 70, reps: 5, isAmrap: false },
                      { percentage: 70, reps: 5, isAmrap: false },
                      { percentage: 70, reps: 5, isAmrap: false },
                    ],
                    3: [
                      { percentage: 75, reps: 5, isAmrap: false },
                      { percentage: 85, reps: 3, isAmrap: false },
                      { percentage: 95, reps: 1, isAmrap: true },
                      { percentage: 75, reps: 5, isAmrap: false },
                      { percentage: 75, reps: 5, isAmrap: false },
                      { percentage: 75, reps: 5, isAmrap: false },
                      { percentage: 75, reps: 5, isAmrap: false },
                      { percentage: 75, reps: 5, isAmrap: false },
                    ],
                  };
                  
                  return (
                    <div key={lift} className="bg-gray-700 rounded-lg p-4">
                      <h3 className="text-lg font-semibold capitalize mb-3">{lift}</h3>
                      <div className="space-y-3">
                        {WEEK_SCHEMES[currentWeek as 1 | 2 | 3].map((set, index) => {
                          const weight = Math.round((lifts[lift].trainingMax * set.percentage) / 100);
                          const isCompleted = isSetCompleted(lift, index);
                          const actualReps = getSetReps(lift, index);
                          
                          return (
                            <div
                              key={index}
                              className={`flex items-center justify-between p-3 ${
                                set.isAmrap ? 'bg-blue-900/20' : 'bg-gray-600'
                              } rounded-lg ${isCompleted ? 'border border-green-500' : ''}`}
                            >
                              <div>
                                <p className="font-medium">Set {index + 1}</p>
                                <p className="text-sm text-gray-400">
                                  {weight} lbs × {set.reps} reps
                                  {set.isAmrap && ' (AMRAP)'}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                {set.isAmrap ? (
                                  <input
                                    type="number"
                                    placeholder="Reps"
                                    value={actualReps || ''}
                                    onChange={(e) => handleLogReps(lift, index, parseInt(e.target.value) || 0)}
                                    className="w-20 px-3 py-1 bg-gray-500 border border-gray-400 rounded text-white"
                                  />
                                ) : (
                                  <CheckCircle2 
                                    className={`w-6 h-6 cursor-pointer ${
                                      isCompleted ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                                    }`}
                                    onClick={() => handleToggleSet(lift, index)}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'assistance' && currentDayWorkout && (
              <div className="space-y-4">
                {currentDayWorkout.assistance.map((exercise) => (
                  <div key={exercise.category} className="bg-gray-700 rounded-lg p-4">
                    <h4 className="font-medium mb-3">{getCategoryLabel(exercise.category)}</h4>
                    
                    <div className="space-y-3">
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
                        <div className="flex items-center justify-between mb-1">
                          <label className="block text-sm font-medium text-gray-300">
                            Reps Completed
                          </label>
                          <span className="text-sm text-gray-400">
                            {exercise.repsCompleted}/{exercise.targetReps}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={exercise.repsCompleted}
                            onChange={(e) => logAssistanceReps(currentDay, exercise.category, parseInt(e.target.value) || 0)}
                            className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md text-white"
                          />
                        </div>
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
            )}
          </div>
        </div>
      )}

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
              {day.completed && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            </button>
          ))}
        </div>
      </Modal>
    </div>
  );
}