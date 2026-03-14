import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  totalIncome: number;
  totalExpense: number;
}

export function BalanceCard({ balance, totalIncome, totalExpense }: BalanceCardProps) {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-8 -mb-8 blur-xl"></div>
      
      <div className="relative z-10">
        <p className="text-blue-100/80 text-sm font-medium mb-1">ยอดเงินคงเหลือ</p>
        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          ฿{balance.toLocaleString()}
        </h2>

        <div className="flex justify-between items-center bg-white/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
          <div className="flex items-center gap-3">
            <div className="bg-green-500/20 text-green-300 p-2 rounded-full">
              <ArrowDownCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-blue-100/70 mb-0.5">รายรับ</p>
              <p className="font-semibold text-sm">฿{totalIncome.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="w-px h-8 bg-white/20"></div>

          <div className="flex items-center gap-3">
            <div className="bg-red-500/20 text-red-300 p-2 rounded-full">
              <ArrowUpCircle size={20} />
            </div>
            <div>
              <p className="text-xs text-blue-100/70 mb-0.5">รายจ่าย</p>
              <p className="font-semibold text-sm">฿{totalExpense.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
