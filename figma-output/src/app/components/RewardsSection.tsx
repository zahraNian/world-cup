import { Wallet, Lock, Copy, CheckCircle, UserPlus, Shield, Coins, TrendingUp } from 'lucide-react';
import { useState } from 'react';

interface RewardsSectionProps {
  theme: 'orange' | 'green';
}

const referredUsers = [
  { name: 'علی رضایی', status: 'verified', statusText: 'احراز هویت', reward: 25000 },
  { name: 'سارا محمدی', status: 'kyc', statusText: 'KYC تکمیل', reward: 50000 },
  { name: 'رضا احمدی', status: 'registered', statusText: 'ثبت‌نام', reward: 10000 },
  { name: 'فاطمه کریمی', status: 'kyc', statusText: 'KYC تکمیل', reward: 50000 },
  { name: 'محمد حسینی', status: 'registered', statusText: 'ثبت‌نام', reward: 10000 },
  { name: 'نازنین احمدی', status: 'verified', statusText: 'احراز هویت', reward: 25000 },
  { name: 'امیر کریمی', status: 'kyc', statusText: 'KYC تکمیل', reward: 50000 },
];

export function RewardsSection({ theme }: RewardsSectionProps) {
  const [copied, setCopied] = useState(false);
  const themeGradient = theme === 'orange'
    ? 'bg-gradient-to-br from-[#FF6600] to-[#FF4500]'
    : 'bg-gradient-to-br from-[#28A745] to-[#218838]';
  const themeText = theme === 'orange' ? 'text-[#FF6600]' : 'text-[#28A745]';

  const referralLink = 'https://exchange.ir/ref/YOUR_CODE';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string; icon: any }> = {
      verified: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Shield },
      kyc: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      registered: { bg: 'bg-gray-100', text: 'text-gray-700', icon: UserPlus },
    };
    return badges[status] || badges.registered;
  };

  return (
    <div className="space-y-4">
      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Wallet className={`w-4 h-4 ${themeText}`} />
          <h3 className="text-sm font-bold text-gray-800">موجودی و تسویه جوایز</h3>
        </div>

        <div className="space-y-3">
          {/* Available Balance */}
          <div className={`${themeGradient} rounded-xl p-3 shadow-lg relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            <div className="relative z-10 flex items-center gap-2 mb-1">
              <Coins className="w-3.5 h-3.5 text-white" />
              <div className="text-[10px] text-white/90">موجودی قابل برداشت</div>
            </div>
            <div className="text-xl font-bold text-white">۸۹۰,۰۰۰ تومان</div>
          </div>

          {/* Pending Rewards */}
          <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
            <Lock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-600 mb-0.5">جوایز در انتظار تسویه</div>
              <div className="text-sm font-bold text-gray-800">۳۵۰,۰۰۰ تومان</div>
              <div className="text-[10px] text-gray-500 mt-0.5">پس از قطعی شدن نتایج آزاد می‌شود</div>
            </div>
          </div>

          {/* CTA Button */}
          <button className={`w-full ${themeGradient} text-white py-2.5 rounded-lg transition-all shadow-lg hover:shadow-xl hover:opacity-90 flex items-center justify-center gap-2`}>
            <Shield className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">تکمیل احراز هویت و فعال‌سازی تسویه</span>
          </button>
        </div>
      </div>

      {/* Referral Card */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-3">
          <UserPlus className={`w-4 h-4 ${themeText}`} />
          <h3 className="text-sm font-bold text-gray-800">دعوت از دوستان</h3>
        </div>

        <div className="space-y-3">
          {/* Referral Stats - Softer Colors */}
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <TrendingUp className="w-3 h-3 text-blue-600" />
                <div className="text-[10px] text-blue-600">کل درآمد</div>
              </div>
              <div className="text-sm font-bold text-blue-700">۴۵۰,۰۰۰</div>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
              <div className="flex items-center gap-1 mb-1">
                <UserPlus className="w-3 h-3 text-purple-600" />
                <div className="text-[10px] text-purple-600">افراد دعوت شده</div>
              </div>
              <div className="text-sm font-bold text-purple-700">۱۲ نفر</div>
            </div>
          </div>

          {/* Referral Link */}
          <div>
            <label className="text-xs text-gray-600 mb-1.5 block">لینک دعوت شما</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-2 ${themeGradient} text-white rounded-lg transition-all shadow-md hover:shadow-lg hover:opacity-90 flex items-center gap-1.5`}
              >
                {copied ? <CheckCircle className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-xs">{copied ? 'کپی شد' : 'کپی'}</span>
              </button>
            </div>
          </div>

          {/* Referred Users List */}
          <div>
            <div className="text-xs font-bold text-gray-700 mb-2">افراد دعوت شده</div>
            <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
              {referredUsers.map((user, index) => {
                const badge = getStatusBadge(user.status);
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg hover:bg-gray-100 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-xs shadow-sm flex-shrink-0">
                        👤
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-medium text-gray-800 truncate">{user.name}</div>
                        <div className={`text-[10px] ${badge.text} flex items-center gap-0.5 mt-0.5`}>
                          <badge.icon className="w-2.5 h-2.5 flex-shrink-0" />
                          <span className="truncate">{user.statusText}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-xs font-bold ${themeText} flex-shrink-0 mr-2`}>
                      +{user.reward.toLocaleString('fa-IR')}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
