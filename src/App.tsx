import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { WorkoutPage } from './pages/WorkoutPage';
import { MobileWorkoutPage } from './pages/MobileWorkoutPage';
import { ProgressPage } from './pages/ProgressPage';
import { HistoryPage } from './pages/HistoryPage';
import { SettingsPage } from './pages/SettingsPage';
import { ReferencePage } from './pages/ReferencePage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <header className="bg-gray-800 border-b border-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-3">
                <Dumbbell className="w-8 h-8 text-blue-500" />
                <h1 className="text-xl font-bold">5/3/1 Tracker</h1>
              </div>
              <div className="flex items-center space-x-4">
                <button className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                  Help
                </button>
                <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Share Progress
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex">
          <Navigation />
          <main className="flex-1 p-8">
            <Routes>
              <Route path="/" element={<WorkoutPage />} />
              <Route path="/mobile" element={<MobileWorkoutPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/reference" element={<ReferencePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;