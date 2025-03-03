import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, LineChart, History, Settings, Smartphone, BookOpen } from 'lucide-react';

export function Navigation() {
  const location = useLocation();
  
  const links = [
    { to: '/', icon: Dumbbell, label: 'Workout' },
    { to: '/mobile', icon: Smartphone, label: 'Mobile View' },
    { to: '/progress', icon: LineChart, label: 'Progress' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/reference', icon: BookOpen, label: 'Reference' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="w-64 bg-gray-800 min-h-[calc(100vh-4rem)] p-4">
      <div className="space-y-2">
        {links.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-colors
              ${location.pathname === to 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
          >
            <Icon className="w-5 h-5" />
            <span className="font-medium">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}