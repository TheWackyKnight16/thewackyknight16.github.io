export type Lift = 'squat' | 'bench' | 'deadlift' | 'press';

export interface WorkoutSet {
  percentage: number;
  reps: number;
  isAmrap: boolean;
}

export interface LiftData {
  oneRepMax: number;
  trainingMax: number;
}

export interface SetLog {
  weight: number;
  targetReps: number;
  actualReps: number;
  isAmrap: boolean;
  completed: boolean;
}

export interface WorkoutLog {
  lift: Lift;
  sets: SetLog[];
  date: string;
}

export interface HistoryEntry {
  date: string;
  week: number;
  lifts: Record<Lift, LiftData>;
}

export type AssistanceCategory = 'push' | 'pull' | 'singleLegCore';

export interface AssistanceExercise {
  name: string;
  category: AssistanceCategory;
  repsCompleted: number;
  targetReps: number;
}

export interface SetStatus {
  completed: boolean;
  actualReps: number;
}

export interface DayWorkout {
  day: 1 | 2 | 3;
  name: string;
  mainLifts: Lift[];
  assistance: AssistanceExercise[];
  completed: boolean;
  date: string;
  setStatus?: Record<Lift, SetStatus[]>;
}

export interface WorkoutState {
  lifts: Record<Lift, LiftData>;
  currentWeek: number;
  history: HistoryEntry[];
  currentWorkout: WorkoutLog[];
  dayWorkouts: DayWorkout[];
  currentDay: number | null;
  assistanceExercises: Record<AssistanceCategory, string[]>;
  setLiftData: (lift: Lift, data: LiftData) => void;
  calculateTrainingMax: (lift: Lift, oneRepMax: number) => void;
  incrementCycle: () => void;
  clearHistory: () => void;
  logSet: (lift: Lift, setIndex: number, reps: number) => void;
  startNewWorkout: () => void;
  startDayWorkout: (day: 1 | 2 | 3) => void;
  updateAssistanceExercise: (day: 1 | 2 | 3, category: AssistanceCategory, name: string) => void;
  logAssistanceReps: (day: 1 | 2 | 3, category: AssistanceCategory, reps: number) => void;
  completeDayWorkout: (day: 1 | 2 | 3) => void;
  toggleSetCompleted: (day: number, lift: Lift, setIndex: number) => void;
  logSetReps: (day: number, lift: Lift, setIndex: number, reps: number) => void;
}