"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import Link from "next/link";
import { transaction_type } from "@prisma/client";
import { getCategories, createCategory } from "@/app/actions/category";
import { addTransaction } from "@/app/actions/transaction";

export default function AddTransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  
  // Default to EXPENSE if not specified or invalid
  const transactionType: transaction_type = typeParam === "INCOME" ? "INCOME" : "EXPENSE";
  const isIncome = transactionType === "INCOME";

  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [note, setNote] = useState("");
  
  // Category state
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  
  // UI state
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      try {
        const fetchedCategories = await getCategories(transactionType);
        setCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
          setSelectedCategoryId(fetchedCategories[0].id);
        }
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    }
    loadCategories();
  }, [transactionType]);

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    startTransition(async () => {
      try {
        const newCat = await createCategory(newCategoryName.trim(), transactionType);
        setCategories([...categories, newCat]);
        setSelectedCategoryId(newCat.id);
        setNewCategoryName("");
        setIsCreatingCategory(false);
      } catch (err) {
        setError("ไม่สามารถสร้างหมวดหมู่ใหม่ได้");
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      setError("กรุณากรอกจำนวนเงินให้ถูกต้อง");
      return;
    }

    startTransition(async () => {
      try {
        const result = await addTransaction({
          amount: Number(amount),
          transaction_date: new Date(date),
          note: note.trim() || undefined,
          category_id: selectedCategoryId || undefined,
        });

        if (result.success) {
          router.push("/");
        } else {
          setError(result.error || "เกิดข้อผิดพลาดในการบันทึก");
        }
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการบันทึก");
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans">
      {/* Header */}
      <header className={`px-4 py-5 flex items-center justify-between sticky top-0 z-10 transition-colors ${
        isIncome ? "bg-green-600 dark:bg-green-700" : "bg-red-600 dark:bg-red-700"
      } text-white shadow-md`}>
        <Link href="/" className="p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors active:scale-95">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-semibold">
          {isIncome ? "เพิ่มรายรับ" : "เพิ่มรายจ่าย"}
        </h1>
        <div className="w-10"></div> {/* Spacer for alignment */}
      </header>

      <main className="max-w-md mx-auto p-4 flex flex-col gap-6 -mt-4">
        {/* Amount Input */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 shadow-sm border border-zinc-200 dark:border-zinc-800 text-center relative z-20">
          <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-2">ระบุจำนวนเงิน</p>
          <div className="flex items-center justify-center gap-2">
            <span className={`text-3xl font-bold ${isIncome ? 'text-green-500' : 'text-red-500'}`}>฿</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="text-5xl font-bold bg-transparent border-none outline-none w-full text-center max-w-[200px] placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
              autoFocus
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800">
              {error}
            </div>
          )}

          {/* Details Section */}
          <div className="bg-white dark:bg-zinc-900 rounded-3xl p-5 shadow-sm border border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
            
            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">หมวดหมู่</label>
              
              {!isCreatingCategory ? (
                <div className="flex gap-2">
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => {
                      if (e.target.value === "NEW") {
                        setIsCreatingCategory(true);
                      } else {
                        setSelectedCategoryId(e.target.value);
                      }
                    }}
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 rounded-xl px-4 py-3 outline-none transition-all appearance-none"
                  >
                    <option value="" disabled>เลือกหมวดหมู่</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                    <option value="NEW" className="font-semibold text-blue-500">+ เพิ่มหมวดหมู่ใหม่</option>
                  </select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    placeholder="ชื่อหมวดหมู่ใหม่"
                    className="flex-1 bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 rounded-xl px-4 py-3 outline-none transition-all"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleCreateCategory}
                    disabled={isPending || !newCategoryName.trim()}
                    className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    <Check size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                        setIsCreatingCategory(false);
                        setNewCategoryName("");
                    }}
                    className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 p-3 rounded-xl hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                  >
                    ยกเลิก
                  </button>
                </div>
              )}
            </div>

            {/* Date Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">วันที่</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 rounded-xl px-4 py-3 outline-none transition-all"
              />
            </div>

            {/* Note Input */}
            <div className="flex flex-col gap-2 mb-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">บันทึกช่วยจำ</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="รายละเอียดเพิ่มเติม (ถ้ามี)"
                rows={2}
                className="w-full bg-zinc-100 dark:bg-zinc-800 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 rounded-xl px-4 py-3 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 ${
              isIncome 
                ? "bg-green-500 hover:bg-green-600 shadow-green-500/30" 
                : "bg-red-500 hover:bg-red-600 shadow-red-500/30"
            }`}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin" size={24} />
                กำลังบันทึก...
              </>
            ) : (
              "บันทึกรายการ"
            )}
          </button>
        </form>
      </main>
    </div>
  );
}
