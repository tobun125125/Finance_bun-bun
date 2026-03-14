import { Bell } from "lucide-react";

interface HeaderProps {
  userName?: string;
  userInitial: string;
}

export function Header({ userName, userInitial }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pt-8 pb-4">
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
          {userInitial}
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Good morning,</p>
          <h1 className="text-lg font-bold leading-tight text-slate-900 dark:text-slate-100">
            {userName || "Alex Rivera"}
          </h1>
        </div>
      </div>
      <button className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
        <Bell size={20} />
        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-background-dark"></span>
      </button>
    </header>
  );
}
