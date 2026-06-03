import { History, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useState } from 'react';

interface PredictionHistoryProps {
  theme: 'orange' | 'green';
}

interface PredictionRecord {
  id: number;
  date: string;
  match: string;
  userChoice: string;
  result: string;
  status: 'won' | 'lost' | 'pending';
  reward: number;
}

const historyData: PredictionRecord[] = [
  {
    id: 1,
    date: '۱۴ خرداد ۱۴۰۵',
    match: 'آرژانتین vs برزیل',
    userChoice: 'برد آرژانتین',
    result: 'آرژانتین ۲-۱ برزیل',
    status: 'won',
    reward: 50000,
  },
  {
    id: 2,
    date: '۱۳ خرداد ۱۴۰۵',
    match: 'فرانسه vs آلمان',
    userChoice: 'مساوی',
    result: 'فرانسه ۲-۰ آلمان',
    status: 'lost',
    reward: 0,
  },
  {
    id: 3,
    date: '۱۳ خرداد ۱۴۰۵',
    match: 'اسپانیا vs ایتالیا',
    userChoice: 'برد اسپانیا',
    result: 'اسپانیا ۳-۱ ایتالیا',
    status: 'won',
    reward: 40000,
  },
  {
    id: 4,
    date: '۱۲ خرداد ۱۴۰۵',
    match: 'انگلیس vs پرتغال',
    userChoice: 'برد انگلیس',
    result: 'در حال برگزاری',
    status: 'pending',
    reward: 0,
  },
  {
    id: 5,
    date: '۱۲ خرداد ۱۴۰۵',
    match: 'هلند vs بلژیک',
    userChoice: 'برد هلند',
    result: 'هلند ۱-۱ بلژیک',
    status: 'lost',
    reward: 0,
  },
  {
    id: 6,
    date: '۱۱ خرداد ۱۴۰۵',
    match: 'اروگوئه vs کلمبیا',
    userChoice: 'برد کلمبیا',
    result: 'کلمبیا ۲-۰ اروگوئه',
    status: 'won',
    reward: 35000,
  },
];

export function PredictionHistory({ theme }: PredictionHistoryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(historyData.length / itemsPerPage);

  const themeText = theme === 'orange' ? 'text-[#FF6600]' : 'text-[#28A745]';
  const themeBg = theme === 'orange' ? 'bg-[#FF6600]' : 'bg-[#28A745]';
  const themeGradient = theme === 'orange'
    ? 'bg-gradient-to-r from-[#FF6600] to-[#FF4500]'
    : 'bg-gradient-to-r from-[#28A745] to-[#218838]';

  const getStatusBadge = (status: 'won' | 'lost' | 'pending') => {
    const badges = {
      won: { bg: 'bg-green-100', text: 'text-green-700', label: 'برنده' },
      lost: { bg: 'bg-red-100', text: 'text-red-700', label: 'بازنده' },
      pending: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'در انتظار نتیجه' },
    };
    return badges[status];
  };

  const paginatedData = historyData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const currentUserPredictionId = 1;

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <History className={`w-5 h-5 ${themeText}`} />
        <h2 className="text-sm md:text-base font-bold text-gray-800">تاریخچه کامل پیش‌بینی‌های شما</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-right py-2.5 px-3 text-xs font-bold text-gray-600">تاریخ</th>
              <th className="text-right py-2.5 px-3 text-xs font-bold text-gray-600">مسابقه</th>
              <th className="text-right py-2.5 px-3 text-xs font-bold text-gray-600">انتخاب شما</th>
              <th className="text-right py-2.5 px-3 text-xs font-bold text-gray-600">نتیجه نهایی</th>
              <th className="text-right py-2.5 px-3 text-xs font-bold text-gray-600">وضعیت</th>
              <th className="text-left py-2.5 px-3 text-xs font-bold text-gray-600">پاداش</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((record) => {
              const badge = getStatusBadge(record.status);
              const isCurrentUser = record.id === currentUserPredictionId;
              return (
                <tr
                  key={record.id}
                  className={`border-b border-gray-100 hover:bg-gray-50 transition-all ${
                    isCurrentUser
                      ? `${themeBg} bg-opacity-5 border-r-4 ${themeBg === 'bg-[#FF6600]' ? 'border-r-[#FF6600]' : 'border-r-[#28A745]'}`
                      : ''
                  }`}
                >
                  <td className="py-3 px-3 text-xs text-gray-700">{record.date}</td>
                  <td className="py-3 px-3 text-xs text-gray-800 font-medium">
                    <div className="flex items-center gap-1.5">
                      {isCurrentUser && <Star className={`w-3 h-3 ${themeText} fill-current`} />}
                      {record.match}
                    </div>
                  </td>
                  <td className="py-3 px-3 text-xs text-gray-700">{record.userChoice}</td>
                  <td className="py-3 px-3 text-xs text-gray-700">{record.result}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-left">
                    {record.reward > 0 ? (
                      <span className={`text-xs font-bold ${themeText}`}>
                        +{record.reward.toLocaleString('fa-IR')}
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-2">
        {paginatedData.map((record) => {
          const badge = getStatusBadge(record.status);
          const isCurrentUser = record.id === currentUserPredictionId;
          return (
            <div
              key={record.id}
              className={`rounded-lg p-3 space-y-2 transition-all ${
                isCurrentUser
                  ? `${themeBg} bg-opacity-10 border-2 ${themeBg === 'bg-[#FF6600]' ? 'border-[#FF6600]' : 'border-[#28A745]'}`
                  : 'bg-gray-50 border border-transparent'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-gray-500">{record.date}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${badge.bg} ${badge.text}`}>
                  {badge.label}
                </span>
              </div>
              <div className="text-xs font-bold text-gray-800 flex items-center gap-1.5">
                {isCurrentUser && <Star className={`w-3 h-3 ${themeText} fill-current`} />}
                {record.match}
              </div>
              <div className="text-xs text-gray-600">
                <span className="text-gray-500">انتخاب:</span> {record.userChoice}
              </div>
              <div className="text-xs text-gray-600">
                <span className="text-gray-500">نتیجه:</span> {record.result}
              </div>
              {record.reward > 0 && (
                <div className={`text-xs font-bold ${themeText}`}>
                  +{record.reward.toLocaleString('fa-IR')} تومان
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-7 h-7 rounded-lg transition-all text-xs font-bold ${
                currentPage === page
                  ? `${themeGradient} text-white shadow-md`
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
