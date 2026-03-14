import { Wallet } from "lucide-react";

interface HeaderProps {
  userInitial: string;
}

export function Header({ userInitial }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-2 rounded-xl">
            <Wallet size={20} />
          </div>
          <h1 className="font-bold text-xl tracking-tight">Finance Bun-Bun</h1>
        </div>
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
          <span className="font-medium text-sm">{userInitial}</span>
        </div>
      </div>
    </header>
  );
}
