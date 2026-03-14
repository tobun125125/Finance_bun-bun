"use server";

import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { transaction_type } from "@prisma/client";

export async function getTransactions() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const transactions = await prisma.transactions.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        categories: true, // Join with categories to get the name and type
      },
      orderBy: {
        transaction_date: "desc", // Newest first
      },
    });

    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Failed to fetch transactions");
  }
}

export async function addTransaction(data: {
  amount: number;
  transaction_date: Date;
  note?: string;
  category_id?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    const transaction = await prisma.transactions.create({
      data: {
        user_id: user.id,
        amount: data.amount,
        transaction_date: data.transaction_date,
        note: data.note,
        category_id: data.category_id,
      },
    });

    revalidatePath("/"); // Revalidate the home page to show the new data
    return { success: true, transaction };
  } catch (error) {
    console.error("Error adding transaction:", error);
    return { success: false, error: "Failed to add transaction" };
  }
}

export async function deleteTransaction(id: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
  
    if (!user) {
      throw new Error("Unauthorized");
    }
  
    try {
      // Ensure the transaction belongs to the user before deleting
      await prisma.transactions.delete({
        where: {
          id: id,
          user_id: user.id 
        },
      });
  
      revalidatePath("/");
      return { success: true };
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return { success: false, error: "Failed to delete transaction" };
    }
}
