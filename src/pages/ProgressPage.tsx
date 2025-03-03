import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useWorkoutStore } from '../store';

export function ProgressPage() {
  const { history } = useWorkoutStore();

  const data = history.map((entry) => ({
    date: new Date(entry.date).toLocaleDateString(),
    squat: entry.lifts.squat.trainingMax,
    bench: entry.lifts.bench.trainingMax,
    deadlift: entry.lifts.deadlift.trainingMax,
    press: entry.lifts.press.trainingMax,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold mb-1">Progress Overview</h1>
        <p className="text-gray-400">Track your strength gains over time</p>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid #374151',
                  borderRadius: '0.375rem',
                }}
                itemStyle={{ color: '#E5E7EB' }}
                labelStyle={{ color: '#9CA3AF' }}
              />
              <Legend wrapperStyle={{ color: '#E5E7EB' }} />
              <Line type="monotone" dataKey="squat" stroke="#3B82F6" name="Squat" />
              <Line type="monotone" dataKey="bench" stroke="#EF4444" name="Bench" />
              <Line type="monotone" dataKey="deadlift" stroke="#10B981" name="Deadlift" />
              <Line type="monotone" dataKey="press" stroke="#8B5CF6" name="Press" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}