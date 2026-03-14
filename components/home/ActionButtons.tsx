import { PlusCircle } from "lucide-react";
import Link from "next/link";

export function ActionButtons() {
  return (
    <section className="grid grid-cols-2 gap-4 mt-6">
      <Link href="/add-transaction?type=INCOME" className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm active:scale-95">
        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-full">
          <PlusCircle size={24} />
        </div>
        <span className="font-medium text-sm">รับเงิน</span>
      </Link>
      
      <Link href="/add-transaction?type=EXPENSE" className="flex flex-col items-center justify-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm active:scale-95">
        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-full">
          <PlusCircle size={24} className="transform rotate-45" />
        </div>
        <span className="font-medium text-sm">จ่ายเงิน</span>
      </Link>
    </section>
  );
}
