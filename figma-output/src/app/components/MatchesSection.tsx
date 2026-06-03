import { useState } from 'react';
import { MatchCard } from './MatchCard';
import { TrendingUp, Award, Target, Users, Sparkles } from 'lucide-react';

interface MatchesSectionProps {
  theme: 'orange' | 'green';
}

const matches = [
  {
    id: 1,
    teamA: 'آرژانتین',
    teamB: 'برزیل',
    flagA: '🇦🇷',
    flagB: '🇧🇷',
    date: '۱۵ خرداد ۱۴۰۵',
    time: '۲۱:۳۰',
    reward: 50000,
    hasStarted: true,
  },
  {
    id: 2,
    teamA: 'فرانسه',
    teamB: 'آلمان',
    flagA: '🇫🇷',
    flagB: '🇩🇪',
    date: '۱۶ خرداد ۱۴۰۵',
    time: '۱۸:۰۰',
    reward: 45000,
    hasStarted: false,
  },
  {
    id: 3,
    teamA: 'اسپانیا',
    teamB: 'ایتالیا',
    flagA: '🇪🇸',
    flagB: '🇮🇹',
    date: '۱۶ خرداد ۱۴۰۵',
    time: '۲۲:۰۰',
    reward: 40000,
    hasStarted: false,
  },
  {
    id: 4,
    teamA: 'انگلیس',
    teamB: 'پرتغال',
    flagA: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    flagB: '🇵🇹',
    date: '۱۷ خرداد ۱۴۰۵',
    time: '۲۰:۳۰',
    reward: 42000,
    hasStarted: false,
  },
  {
    id: 5,
    teamA: 'هلند',
    teamB: 'بلژیک',
    flagA: '🇳🇱',
    flagB: '🇧🇪',
    date: '۱۷ خرداد ۱۴۰۵',
    time: '۱۹:۰۰',
    reward: 38000,
    hasStarted: false,
  },
  {
    id: 6,
    teamA: 'اروگوئه',
    teamB: 'کلمبیا',
    flagA: '🇺🇾',
    flagB: '🇨🇴',
    date: '۱۸ خرداد ۱۴۰۵',
    time: '۲۱:۰۰',
    reward: 35000,
    hasStarted: false,
  },
];

export function MatchesSection({ theme }: MatchesSectionProps) {
  const [filter, setFilter] = useState<string>('همه مسابقات');
  const [predictions, setPredictions] = useState<Record<number, 'A' | 'draw' | 'B'>>({});

  const themeGradient = theme === 'orange'
    ? 'bg-gradient-to-br from-[#FF6600] to-[#FF4500]'
    : 'bg-gradient-to-br from-[#28A745] to-[#218838]';

  const filters = ['همه مسابقات', 'امروز', 'فردا', 'گروهی', 'حذفی'];

  const handlePredict = (matchId: number, prediction: 'A' | 'draw' | 'B') => {
    setPredictions((prev) => ({ ...prev, [matchId]: prediction }));
  };

  const stats = [
    { icon: TrendingUp, label: 'مجموع جوایز', value: '۲,۵۰۰,۰۰۰', gradient: 'from-blue-500 to-blue-600' },
    { icon: Award, label: 'جوایز در انتظار تسویه', value: '۳۵۰,۰۰۰', gradient: 'from-purple-500 to-purple-600' },
    { icon: Target, label: 'پیش‌بینی‌های صحیح', value: '۲۸ مورد', gradient: theme === 'orange' ? 'from-[#FF6600] to-[#FF4500]' : 'from-[#28A745] to-[#218838]' },
    { icon: Users, label: 'دوستان دعوت شده', value: '۱۲ نفر', gradient: 'from-pink-500 to-pink-600' },
  ];

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md border border-gray-100 p-3 hover:shadow-lg transition-all">
            <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.gradient} w-fit mb-2`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
            <div className="text-[10px] text-gray-600 mb-1">{stat.label}</div>
            <div className="text-sm font-bold text-gray-800">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className={`${themeGradient} bg-opacity-20 rounded-xl p-3 border border-gray-200 relative overflow-hidden`}>
        <div className="relative z-10 flex items-start gap-2">
          <Sparkles className={`w-4 h-4 flex-shrink-0 mt-0.5 ${theme === 'orange' ? 'text-orange-600' : 'text-green-600'}`} />
          <p className={`text-xs leading-relaxed ${theme === 'orange' ? 'text-orange-900' : 'text-green-900'}`}>
            <strong>نحوه محاسبه پاداش:</strong> برای هر پیش‌بینی صحیح، مبلغ جایزه به حساب شما واریز می‌شود. دعوت از دوستان نیز امتیاز اضافی دارد.
          </p>
        </div>
      </div>

      {/* Match List Section */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        {/* Section Title */}
        <h2 className="text-base font-bold text-gray-800 mb-4">لیست مسابقات و پیش‌بینی رویدادهای زنده</h2>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin mb-4">
          {filters.map((filterName) => (
            <button
              key={filterName}
              onClick={() => setFilter(filterName)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all text-xs font-medium shadow-sm ${
                filter === filterName
                  ? `${themeGradient} text-white shadow-md`
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filterName}
            </button>
          ))}
        </div>

        {/* Matches - 2 Cards Per Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              {...match}
              theme={theme}
              prediction={predictions[match.id]}
              onPredict={(prediction) => handlePredict(match.id, prediction)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
