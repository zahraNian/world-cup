import { Trophy, Medal, Target, Users as UsersIcon, Crown } from 'lucide-react';

interface User {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  correctPredictions: number;
  referredFriends: number;
}

const topUsers: User[] = [
  { rank: 1, name: 'علی محمدی', score: 2850, avatar: '👨', correctPredictions: 42, referredFriends: 8 },
  { rank: 2, name: 'سارا احمدی', score: 2720, avatar: '👩', correctPredictions: 38, referredFriends: 12 },
  { rank: 3, name: 'رضا کریمی', score: 2610, avatar: '👨‍💼', correctPredictions: 35, referredFriends: 10 },
  { rank: 4, name: 'فاطمه رضایی', score: 2480, avatar: '👩‍💼', correctPredictions: 32, referredFriends: 9 },
  { rank: 5, name: 'محمد حسینی', score: 2350, avatar: '👨‍🎓', correctPredictions: 30, referredFriends: 7 },
  { rank: 6, name: 'زهرا اکبری', score: 2180, avatar: '👩‍🎓', correctPredictions: 28, referredFriends: 6 },
  { rank: 7, name: 'حسین جعفری', score: 2050, avatar: '👨‍💻', correctPredictions: 26, referredFriends: 5 },
  { rank: 8, name: 'مریم موسوی', score: 1920, avatar: '👩‍💻', correctPredictions: 24, referredFriends: 4 },
  { rank: 9, name: 'امیر نوری', score: 1780, avatar: '👨‍🔬', correctPredictions: 22, referredFriends: 3 },
  { rank: 10, name: 'نرگس صادقی', score: 1650, avatar: '👩‍🔬', correctPredictions: 20, referredFriends: 2 },
];

interface LeaderboardProps {
  theme: 'orange' | 'green';
  currentUserRank?: number;
  currentUserScore?: number;
}

export function Leaderboard({ theme, currentUserRank = 45, currentUserScore = 890 }: LeaderboardProps) {
  const themeGradient = theme === 'orange'
    ? 'bg-gradient-to-br from-[#FF6600] to-[#FF4500]'
    : 'bg-gradient-to-br from-[#28A745] to-[#218838]';
  const themeText = theme === 'orange' ? 'text-[#FF6600]' : 'text-[#28A745]';

  const getBadge = (rank: number) => {
    if (rank === 1) return <div className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-md"><Crown className="w-3.5 h-3.5 text-white" /></div>;
    if (rank === 2) return <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center shadow-md"><Medal className="w-3.5 h-3.5 text-white" /></div>;
    if (rank === 3) return <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center shadow-md"><Medal className="w-3.5 h-3.5 text-white" /></div>;
    return null;
  };

  const getRowBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-l from-orange-50 to-transparent';
    if (rank === 2) return 'bg-gradient-to-l from-gray-50 to-transparent';
    if (rank === 3) return 'bg-gradient-to-l from-amber-50 to-transparent';
    return '';
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-3 md:p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs md:text-sm font-bold text-gray-800">جدول رتبه‌بندی</h2>
        <Trophy className={`w-4 h-4 ${themeText}`} />
      </div>

      {/* Current User Rank - Compact */}
      <div className={`${themeGradient} rounded-lg p-3 mb-3 shadow-md relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        <div className="text-center relative z-10">
          <div className="text-[10px] text-white/90 mb-0.5">رتبه شما</div>
          <div className="text-xl md:text-2xl font-bold text-white">{currentUserRank}</div>
          <div className="text-[10px] text-white/90 mt-0.5">{currentUserScore.toLocaleString('fa-IR')} امتیاز</div>
        </div>
      </div>

      {/* Top 10 Table */}
      <div className="space-y-1.5 overflow-hidden">
        {topUsers.map((user) => (
          <div
            key={user.rank}
            className={`flex items-center gap-2 p-2.5 rounded-lg hover:bg-gray-50 transition-all ${getRowBg(user.rank)}`}
          >
            <div className="w-7 flex justify-center">
              {getBadge(user.rank) || (
                <span className="text-xs font-bold text-gray-400">{user.rank}</span>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-sm shadow-sm">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-gray-800 truncate">{user.name}</div>
              <div className="flex items-center gap-2 mt-0.5">
                <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
                  <Target className="w-2.5 h-2.5" />
                  <span>{user.correctPredictions}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[10px] text-gray-500">
                  <UsersIcon className="w-2.5 h-2.5" />
                  <span>{user.referredFriends}</span>
                </div>
              </div>
            </div>
            <div className={`text-xs font-bold ${themeText}`}>
              {user.score.toLocaleString('fa-IR')}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-[10px] text-gray-500 text-center leading-relaxed">
          امتیاز از مجموع پیش‌بینی‌های صحیح و دعوت از دوستان محاسبه می‌شود.
        </p>
      </div>
    </div>
  );
}
