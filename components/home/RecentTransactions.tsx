import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

type Transaction = {
  id: number;
  type: string;
  title: string;
  amount: number;
  date: string;
};

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">รายการล่าสุด</h3>
        <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">ดูทั้งหมด</button>
      </div>
      
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl overflow-hidden shadow-sm">
        {transactions.map((tx, index) => (
          <div 
            key={tx.id} 
            className={`flex justify-between items-center p-4 ${index !== transactions.length - 1 ? 'border-b border-zinc-100 dark:border-zinc-800' : ''} hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${tx.type === 'income' ? 'bg-green-100/50 text-green-600 dark:bg-green-900/20 dark:text-green-400' : 'bg-red-100/50 text-red-600 dark:bg-red-900/20 dark:text-red-400'}`}>
                {tx.type === 'income' ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
              </div>
              <div>
                <h4 className="font-medium text-sm">{tx.title}</h4>
                <p className="text-xs text-zinc-500 mt-0.5">{new Date(tx.date).toLocaleDateString('th-TH', { month: 'short', day: 'numeric' })}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`font-semibold ${tx.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                {tx.type === 'income' ? '+' : '-'}฿{tx.amount.toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
