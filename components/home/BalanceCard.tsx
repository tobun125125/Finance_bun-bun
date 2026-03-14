interface BalanceCardProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export function BalanceCard({ balance, totalIncome, totalExpense }: BalanceCardProps) {
  return (
    <section className="mt-4">
      <div className="relative overflow-hidden rounded-2xl bg-primary p-6 text-white shadow-lg shadow-primary/20">
        <div className="relative z-10">
          <p className="text-sm font-medium opacity-80">Total Balance</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight">
            ฿{balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider opacity-70">Monthly Income</p>
              <p className="text-sm font-semibold">+฿{totalIncome.toLocaleString()}</p>
            </div>
            
            <div className="w-px h-8 bg-white/20"></div>

            <div className="flex-1">
              <p className="text-[10px] uppercase tracking-wider opacity-70">Monthly Spend</p>
              <p className="text-sm font-semibold">-฿{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Abstract background shapes */}
        <div className="absolute -right-8 -top-8 size-32 rounded-full bg-white/10"></div>
        <div className="absolute -left-4 -bottom-12 size-24 rounded-full bg-black/5"></div>
      </div>
    </section>
  );
}
