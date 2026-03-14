import React from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "@/components/home/Header";
import { BalanceCard } from "@/components/home/BalanceCard";
import { SpendingTrend } from "@/components/home/SpendingTrend";
import { RecentTransactions } from "@/components/home/RecentTransactions";
import { BottomNav } from "@/components/home/BottomNav";
import { getTransactions } from "@/app/actions/transaction";

export default async function Home() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: { user } } = await supabase.auth.getUser();
  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User";
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  // Fetch real data from database via server action
  const transactions = await getTransactions();

  // Calculate totals based on the fetched database transactions
  let totalIncome = 0;
  let totalExpense = 0;

  transactions.forEach((t) => {
    const amountNum = Number(t.amount); // Prisma Decimal to JS Number
    if (t.categories && t.categories.type === "INCOME") {
      totalIncome += amountNum;
    } else if (t.categories && t.categories.type === "EXPENSE") {
      totalExpense += amountNum;
    }
  });

  const balance = totalIncome - totalExpense;

  return (
    <div className="relative flex min-h-screen w-full flex-col max-w-md mx-auto bg-white dark:bg-background-dark shadow-2xl font-display overflow-hidden">
      <Header userName={userName} userInitial={userInitial} />

      <main className="flex-1 overflow-y-auto px-6 pb-24">
        <BalanceCard balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />
        <SpendingTrend />
        <RecentTransactions transactions={transactions} />
      </main>
      
      <BottomNav />
    </div>
  );
}
