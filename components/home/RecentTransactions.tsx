import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import { transactions, categories } from "@prisma/client";

type TransactionWithCategory = transactions & {
  categories: categories | null;
};

interface RecentTransactionsProps {
  transactions: TransactionWithCategory[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
  if (transactions.length === 0) {
    return (
      <section className="mt-8">
        <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-4">Recent Transactions</h3>
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-8 text-center text-sm text-slate-500">
          <p>No recent transactions</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-slate-800 dark:text-slate-200">Recent Transactions</h3>
        <button className="text-xs font-semibold text-primary">See all</button>
      </div>
      
      <div className="space-y-4">
        {transactions.slice(0, 5).map((tx) => {
          const isIncome = tx.categories?.type === 'INCOME';
          const amountDisplay = Number(tx.amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
          const categoryName = tx.categories?.name || 'Uncategorized';
          const titleDisplay = tx.note ? `${categoryName} (${tx.note})` : categoryName;
          
          return (
            <div 
              key={tx.id} 
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50"
            >
              <div className="flex items-center gap-3">
                <div className={`size-10 rounded-full flex items-center justify-center ${isIncome ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600'}`}>
                  {isIncome ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{titleDisplay}</p>
                  <p className="text-[10px] text-slate-500">
                    {new Date(tx.transaction_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className={`text-sm font-bold ${isIncome ? 'text-green-600' : 'text-slate-800 dark:text-slate-100'}`}>
                {isIncome ? '+' : '-'}฿{amountDisplay}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
