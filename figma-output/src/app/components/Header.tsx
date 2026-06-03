import { Palette, LogIn } from 'lucide-react';

interface HeaderProps {
  theme: 'orange' | 'green';
  onThemeToggle: () => void;
  isLoggedIn: boolean;
  userEmail?: string;
}

export function Header({ theme, onThemeToggle, isLoggedIn, userEmail }: HeaderProps) {
  const themeGradient = theme === 'orange'
    ? 'bg-gradient-to-r from-[#FF6600] to-[#FF4500]'
    : 'bg-gradient-to-r from-[#28A745] to-[#218838]';
  const themeHover = theme === 'orange' ? 'hover:from-[#E55A00] hover:to-[#E03E00]' : 'hover:from-[#218838] hover:to-[#1AB080]';

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Left: User Info / Login */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <span className="text-xs sm:text-sm">👤</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-700 hidden sm:inline">{userEmail}</span>
              </div>
            ) : (
              <button className={`${themeGradient} text-white px-4 sm:px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg hover:opacity-90 flex items-center gap-2`}>
                <LogIn className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">ورود</span>
              </button>
            )}
            <button
              onClick={onThemeToggle}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title="تغییر تم"
            >
              <Palette className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Center: Campaign Title */}
          <div className="text-center flex-1">
            <h1 className="text-sm sm:text-lg md:text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              کمپین پیش‌بینی جام جهانی ۲۰۲۶
            </h1>
          </div>

          {/* Right: Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="#" className="text-xs sm:text-sm text-gray-600 hover:text-gray-800 hidden sm:inline">
              صرافی
            </a>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-base sm:text-lg">⚽</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
