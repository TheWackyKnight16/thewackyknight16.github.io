import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  WorkoutState, 
  Lift, 
  LiftData, 
  SetLog, 
  WorkoutLog, 
  AssistanceCategory, 
  DayWorkout,
  SetStatus
} from './types';

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

const DEFAULT_ASSISTANCE_EXERCISES = {
  push: ['Dips', 'Pushups', 'DB Bench Press', 'Incline DB Bench', 'DB OHP', 'Tricep Extension', 'Tricep Pushdown'],
  pull: ['Chinups', 'Pullups', 'Inverted Rows', 'DB Rows', 'Cable Rows', 'Machine Rows', 'Face Pulls', 'Band Pull-Aparts', 'Lat Pulldowns', 'Curls'],
  singleLegCore: ['Ab Wheel', 'Planks', 'Leg Raises', 'Back Raises', 'Reverse Hypers', 'Lunges', 'Step Ups', 'Bulgarian Split Squats', 'KB Swings', 'KB Snatches']
};

const initializeSetStatus = (lift: Lift): SetStatus[] => {
  return Array(8).fill(null).map(() => ({
    completed: false,
    actualReps: 0
  }));
};

const DAY_WORKOUTS: DayWorkout[] = [
  {
    day: 1,
    name: 'Monday',
    mainLifts: ['squat', 'bench'],
    assistance: [
      { name: '', category: 'push', repsCompleted: 0, targetReps: 50 },
      { name: '', category: 'pull', repsCompleted: 0, targetReps: 50 },
      { name: '', category: 'singleLegCore', repsCompleted: 0, targetReps: 50 }
    ],
    completed: false,
    date: '',
    setStatus: {
      squat: initializeSetStatus('squat'),
      bench: initializeSetStatus('bench')
    }
  },
  {
    day: 2,
    name: 'Wednesday',
    mainLifts: ['deadlift', 'press'],
    assistance: [
      { name: '', category: 'push', repsCompleted: 0, targetReps: 50 },
      { name: '', category: 'pull', repsCompleted: 0, targetReps: 50 },
      { name: '', category: 'singleLegCore', repsCompleted: 0, targetReps: 50 }
    ],
    completed: false,
    date: '',
    setStatus: {
      deadlift: initializeSetStatus('deadlift'),
      press: initializeSetStatus('press')
    }
  },
  {
    day: 3,
    name: 'Friday',
    mainLifts: ['bench', 'squat'],
    assistance: [
      { name: '', category: 'push', repsCompleted: 0, targetReps: 50 },
      { name: '', category: 'pull', repsCompleted: 0, targetReps: 50 },
      { name: '', category: 'singleLegCore', repsCompleted: 0, targetReps: 50 }
    ],
    completed: false,
    date: '',
    setStatus: {
      bench: initializeSetStatus('bench'),
      squat: initializeSetStatus('squat')
    }
  }
];

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set) => ({
      lifts: {
        squat: { oneRepMax: 0, trainingMax: 0 },
        bench: { oneRepMax: 0, trainingMax: 0 },
        deadlift: { oneRepMax: 0, trainingMax: 0 },
        press: { oneRepMax: 0, trainingMax: 0 },
      },
      currentWeek: 1,
      history: [],
      currentWorkout: [],
      dayWorkouts: JSON.parse(JSON.stringify(DAY_WORKOUTS)),
      currentDay: null,
      assistanceExercises: DEFAULT_ASSISTANCE_EXERCISES,

      setLiftData: (lift: Lift, data: LiftData) =>
        set((state) => ({
          lifts: {
            ...state.lifts,
            [lift]: data,
          },
        })),

      calculateTrainingMax: (lift: Lift, oneRepMax: number) =>
        set((state) => ({
          lifts: {
            ...state.lifts,
            [lift]: {
              oneRepMax,
              trainingMax: Math.round(oneRepMax * 0.9),
            },
          },
        })),

      incrementCycle: () =>
        set((state) => {
          const newWeek = state.currentWeek === 3 ? 1 : state.currentWeek + 1;
          const newLifts = {
            ...state.lifts,
            squat: {
              ...state.lifts.squat,
              trainingMax: state.lifts.squat.trainingMax + 10,
            },
            deadlift: {
              ...state.lifts.deadlift,
              trainingMax: state.lifts.deadlift.trainingMax + 10,
            },
            bench: {
              ...state.lifts.bench,
              trainingMax: state.lifts.bench.trainingMax + 5,
            },
            press: {
              ...state.lifts.press,
              trainingMax: state.lifts.press.trainingMax + 5,
            },
          };

          // Reset day workouts for the new week
          const resetDayWorkouts = JSON.parse(JSON.stringify(DAY_WORKOUTS));

          return {
            currentWeek: newWeek,
            lifts: newLifts,
            history: [
              ...state.history,
              {
                date: new Date().toISOString(),
                week: state.currentWeek,
                lifts: state.lifts,
              },
            ],
            currentWorkout: [], // Reset current workout
            dayWorkouts: resetDayWorkouts,
            currentDay: null,
          };
        }),

      clearHistory: () =>
        set(() => ({
          history: [],
          currentWorkout: [],
          dayWorkouts: JSON.parse(JSON.stringify(DAY_WORKOUTS)),
          currentDay: null,
        })),

      startNewWorkout: () =>
        set((state) => {
          const lifts: Lift[] = ['squat', 'bench', 'deadlift', 'press'];
          const newWorkout: WorkoutLog[] = lifts.map((lift) => ({
            lift,
            sets: WEEK_SCHEMES[state.currentWeek as 1 | 2 | 3].map((scheme) => ({
              weight: Math.round((state.lifts[lift].trainingMax * scheme.percentage) / 100),
              targetReps: scheme.reps,
              actualReps: 0,
              isAmrap: scheme.isAmrap,
              completed: false,
            })),
            date: new Date().toISOString(),
          }));

          return {
            currentWorkout: newWorkout,
          };
        }),

      startDayWorkout: (day: 1 | 2 | 3) =>
        set((state) => {
          const updatedDayWorkouts = [...state.dayWorkouts];
          const dayIndex = updatedDayWorkouts.findIndex(workout => workout.day === day);
          
          if (dayIndex !== -1) {
            // Initialize set status for each lift
            const setStatus: Record<Lift, SetStatus[]> = {};
            updatedDayWorkouts[dayIndex].mainLifts.forEach(lift => {
              setStatus[lift] = Array(8).fill(null).map(() => ({
                completed: false,
                actualReps: 0
              }));
            });

            updatedDayWorkouts[dayIndex] = {
              ...updatedDayWorkouts[dayIndex],
              date: new Date().toISOString(),
              completed: false,
              setStatus,
              assistance: updatedDayWorkouts[dayIndex].assistance.map(exercise => ({
                ...exercise,
                repsCompleted: 0
              }))
            };
          }

          return {
            dayWorkouts: updatedDayWorkouts,
            currentDay: day
          };
        }),

      updateAssistanceExercise: (day: 1 | 2 | 3, category: AssistanceCategory, name: string) =>
        set((state) => {
          const updatedDayWorkouts = [...state.dayWorkouts];
          const dayIndex = updatedDayWorkouts.findIndex(workout => workout.day === day);
          
          if (dayIndex !== -1) {
            const assistanceIndex = updatedDayWorkouts[dayIndex].assistance.findIndex(
              exercise => exercise.category === category
            );
            
            if (assistanceIndex !== -1) {
              updatedDayWorkouts[dayIndex].assistance[assistanceIndex] = {
                ...updatedDayWorkouts[dayIndex].assistance[assistanceIndex],
                name
              };
            }
          }

          return {
            dayWorkouts: updatedDayWorkouts
          };
        }),

      logAssistanceReps: (day: 1 | 2 | 3, category: AssistanceCategory, reps: number) =>
        set((state) => {
          const updatedDayWorkouts = [...state.dayWorkouts];
          const dayIndex = updatedDayWorkouts.findIndex(workout => workout.day === day);
          
          if (dayIndex !== -1) {
            const assistanceIndex = updatedDayWorkouts[dayIndex].assistance.findIndex(
              exercise => exercise.category === category
            );
            
            if (assistanceIndex !== -1) {
              updatedDayWorkouts[dayIndex].assistance[assistanceIndex] = {
                ...updatedDayWorkouts[dayIndex].assistance[assistanceIndex],
                repsCompleted: reps
              };
            }
          }

          return {
            dayWorkouts: updatedDayWorkouts
          };
        }),

      completeDayWorkout: (day: 1 | 2 | 3) =>
        set((state) => {
          const updatedDayWorkouts = [...state.dayWorkouts];
          const dayIndex = updatedDayWorkouts.findIndex(workout => workout.day === day);
          
          if (dayIndex !== -1) {
            updatedDayWorkouts[dayIndex] = {
              ...updatedDayWorkouts[dayIndex],
              completed: true
            };
          }

          return {
            dayWorkouts: updatedDayWorkouts,
            currentDay: null
          };
        }),

      toggleSetCompleted: (day: number, lift: Lift, setIndex: number) =>
        set((state) => {
          const updatedDayWorkouts = [...state.dayWorkouts];
          const dayIndex = updatedDayWorkouts.findIndex(workout => workout.day === day);
          
          if (dayIndex !== -1 && updatedDayWorkouts[dayIndex].setStatus) {
            const currentStatus = updatedDayWorkouts[dayIndex].setStatus![lift][setIndex].completed;
            
            updatedDayWorkouts[dayIndex].setStatus![lift][setIndex] = {
              ...updatedDayWorkouts[dayIndex].setStatus![lift][setIndex],
              completed: !currentStatus
            };
          }

          return {
            dayWorkouts: updatedDayWorkouts
          };
        }),

      logSetReps: (day: number, lift: Lift, setIndex: number, reps: number) =>
        set((state) => {
          const updatedDayWorkouts = [...state.dayWorkouts];
          const dayIndex = updatedDayWorkouts.findIndex(workout => workout.day === day);
          
          if (dayIndex !== -1 && updatedDayWorkouts[dayIndex].setStatus) {
            updatedDayWorkouts[dayIndex].setStatus![lift][setIndex] = {
              ...updatedDayWorkouts[dayIndex].setStatus![lift][setIndex],
              actualReps: reps,
              completed: reps > 0
            };
          }

          return {
            dayWorkouts: updatedDayWorkouts
          };
        }),

      logSet: (lift: Lift, setIndex: number, reps: number) =>
        set((state) => {
          const workoutIndex = state.currentWorkout.findIndex((w) => w.lift === lift);
          if (workoutIndex === -1) return state;

          const newWorkout = [...state.currentWorkout];
          newWorkout[workoutIndex] = {
            ...newWorkout[workoutIndex],
            sets: newWorkout[workoutIndex].sets.map((set, i) =>
              i === setIndex ? { ...set, actualReps: reps, completed: true } : set
            ),
          };

          return {
            currentWorkout: newWorkout,
          };
        }),
    }),
    {
      name: '531-workout-store',
    }
  )
);