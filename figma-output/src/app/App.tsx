import { useState } from 'react';
import { Header } from './components/Header';
import { Leaderboard } from './components/Leaderboard';
import { MatchesSection } from './components/MatchesSection';
import { RewardsSection } from './components/RewardsSection';
import { PredictionHistory } from './components/PredictionHistory';

export default function App() {
  const [theme, setTheme] = useState<'orange' | 'green'>('orange');
  const [isLoggedIn] = useState(true);
  const [userEmail] = useState('user@example.com');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'orange' ? 'green' : 'orange'));
  };

  return (
    <div className="h-screen flex flex-col bg-white" dir="rtl">
      {/* Header */}
      <Header
        theme={theme}
        onThemeToggle={toggleTheme}
        isLoggedIn={isLoggedIn}
        userEmail={userEmail}
      />

      {/* Main Content - Scrollable */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Three Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Right Column - Leaderboard */}
            <div className="lg:col-span-3 order-1">
              <Leaderboard theme={theme} />
            </div>

            {/* Center Column - Matches */}
            <div className="lg:col-span-6 order-3 lg:order-2">
              <MatchesSection theme={theme} />
            </div>

            {/* Left Column - Rewards */}
            <div className="lg:col-span-3 order-2 lg:order-3">
              <RewardsSection theme={theme} />
            </div>
          </div>

          {/* Bottom Section - Prediction History */}
          <div className="mt-4">
            <PredictionHistory theme={theme} />
          </div>
        </div>
      </main>
    </div>
  );
}