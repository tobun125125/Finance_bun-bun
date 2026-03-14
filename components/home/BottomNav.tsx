import Link from 'next/link';
import { Home, BarChart2, Wallet, User, LogOut } from 'lucide-react';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-100 dark:border-slate-800 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md px-6 pb-6 pt-3 z-50">
      <div className="flex justify-between items-center max-w-sm mx-auto">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <Home size={20} />
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
          <BarChart2 size={20} />
          <span className="text-[10px] font-medium">Insights</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
          <Wallet size={20} />
          <span className="text-[10px] font-medium">Wallet</span>
        </Link>
        <Link href="#" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
          <User size={20} />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
        <form action="/auth/signout" method="post" className="flex">
          <button type="submit" className="flex flex-col items-center gap-1 text-slate-400 dark:text-slate-500 hover:text-primary transition-colors">
            <LogOut size={20} />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        </form>
      </div>
    </nav>
  );
}
