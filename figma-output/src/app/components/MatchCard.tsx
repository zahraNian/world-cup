import { Clock, Trophy, Zap, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface MatchCardProps {
  teamA: string;
  teamB: string;
  flagA: string;
  flagB: string;
  date: string;
  time: string;
  reward: number;
  theme: 'orange' | 'green';
  prediction?: 'A' | 'draw' | 'B';
  onPredict?: (prediction: 'A' | 'draw' | 'B') => void;
  hasStarted?: boolean;
}

export function MatchCard({
  teamA,
  teamB,
  flagA,
  flagB,
  date,
  time,
  reward,
  theme,
  prediction,
  onPredict,
  hasStarted = false,
}: MatchCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const themeGradient = theme === 'orange'
    ? 'bg-gradient-to-r from-[#FF6600] to-[#FF4500]'
    : 'bg-gradient-to-r from-[#28A745] to-[#218838]';
  const themeBorder = theme === 'orange' ? 'border-[#FF6600]' : 'border-[#28A745]';
  const themeBg = theme === 'orange' ? 'bg-[#FF6600]' : 'bg-[#28A745]';

  const handleVote = async (vote: 'A' | 'draw' | 'B') => {
    if (hasStarted || isLoading) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    onPredict?.(vote);
    setIsLoading(false);
    setShowSuccess(true);

    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className={`relative bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-xl hover:border-gray-200 transition-all ${hasStarted ? 'opacity-60' : ''}`}>
      {/* Success Notification */}
      {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4" />
          <span className="text-xs font-medium">رای شما ثبت شد</span>
        </div>
      )}

      {/* Header */}
      <div className={`flex items-center justify-between mb-4 ${hasStarted ? 'blur-[0.5px]' : ''}`}>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>{date} • {time}</span>
        </div>
        <div className={`${themeGradient} text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg`}>
          <Trophy className="w-3.5 h-3.5" />
          <span>{reward.toLocaleString('fa-IR')} تومان</span>
        </div>
      </div>

      {/* Teams */}
      <div className={`flex items-center justify-between mb-6 ${hasStarted ? 'blur-[0.5px]' : ''}`}>
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="text-4xl">{flagA}</div>
          <div className="text-sm font-bold text-gray-800 text-center">{teamA}</div>
        </div>

        <div className="px-4 flex flex-col items-center gap-2">
          <Zap className={`w-6 h-6 ${theme === 'orange' ? 'text-orange-500' : 'text-green-500'}`} />
          <div className="text-sm font-bold text-gray-400">VS</div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="text-4xl">{flagB}</div>
          <div className="text-sm font-bold text-gray-800 text-center">{teamB}</div>
        </div>
      </div>

      {/* Prediction Buttons or Started Message */}
      {hasStarted ? (
        <div className={`${themeBg} bg-opacity-10 border-2 ${themeBorder} rounded-lg py-3 text-center`}>
          <span className="text-sm font-bold text-gray-700">مسابقه شروع شده است</span>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleVote('A')}
            disabled={isLoading}
            className={`py-3 rounded-lg transition-all text-sm font-medium relative ${
              prediction === 'A'
                ? `${themeGradient} text-white shadow-lg`
                : `bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 shadow-sm hover:shadow-md`
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              `برد ${teamA.split(' ')[0]}`
            )}
          </button>
          <button
            onClick={() => handleVote('draw')}
            disabled={isLoading}
            className={`py-3 rounded-lg transition-all text-sm font-medium relative ${
              prediction === 'draw'
                ? `${themeGradient} text-white shadow-lg`
                : `bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 shadow-sm hover:shadow-md`
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              'مساوی'
            )}
          </button>
          <button
            onClick={() => handleVote('B')}
            disabled={isLoading}
            className={`py-3 rounded-lg transition-all text-sm font-medium relative ${
              prediction === 'B'
                ? `${themeGradient} text-white shadow-lg`
                : `bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 shadow-sm hover:shadow-md`
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin mx-auto" />
            ) : (
              `برد ${teamB.split(' ')[0]}`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
