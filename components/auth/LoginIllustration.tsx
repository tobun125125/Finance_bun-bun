import { User, TrendingUp } from "lucide-react";

export function LoginIllustration() {
  return (
    <div className="mb-6 w-full h-36 flex items-center justify-center relative">
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-24 h-24 bg-blue-500 rounded-full blur-xl"></div>
      </div>
      <div className="relative z-10 flex gap-4 items-end">
        <div className="flex flex-col items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-yellow-400 border-[3px] border-white relative">
             <div className="absolute -top-1 -right-2 w-2 h-2 text-blue-500">✦</div>
          </div>
          <div className="w-16 h-16 bg-blue-600 rounded-t-2xl rounded-bl-2xl rounded-br flex items-center justify-center text-white mt-1 shadow-inner">
            <User size={28} strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex gap-2 items-end h-full mt-4">
          <div className="w-4 h-8 bg-blue-800 rounded-t-sm"></div>
          <div className="w-4 h-16 bg-[#1a1f36] rounded-t-sm relative">
            <div className="absolute -top-6 -right-3 text-yellow-400">✦</div>
          </div>
          <TrendingUp size={24} className="text-blue-500 mb-6" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
