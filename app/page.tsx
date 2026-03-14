import React from "react";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Header } from "@/components/home/Header";
import { BalanceCard } from "@/components/home/BalanceCard";
import { ActionButtons } from "@/components/home/ActionButtons";
import { RecentTransactions } from "@/components/home/RecentTransactions";

export default async function Home() {
  const supabase = await createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: { user } } = await supabase.auth.getUser();
  const userInitial = user?.email ? user.email.charAt(0).toUpperCase() : "U";

  // Mock data for UI presentation
  const transactions = [
    { id: 1, type: "income", title: "เงินเดือน", amount: 35000, date: "2026-03-01" },
    { id: 2, type: "expense", title: "ค่าเช่าห้อง", amount: 6500, date: "2026-03-02" },
    { id: 3, type: "expense", title: "ค่ากิน", amount: 1200, date: "2026-03-03" },
    { id: 4, type: "expense", title: "ค่าน้ำมัน", amount: 800, date: "2026-03-05" },
    { id: 5, type: "income", title: "ขายของออนไลน์", amount: 2500, date: "2026-03-10" },
  ];

  const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === "expense").reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans pb-20">
      <Header userInitial={userInitial} />

      <main className="max-w-md mx-auto px-4 mt-6">
        <BalanceCard balance={balance} totalIncome={totalIncome} totalExpense={totalExpense} />
        <ActionButtons />
        <RecentTransactions transactions={transactions} />
      </main>
    </div>
  );
}
