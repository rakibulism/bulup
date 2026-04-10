"use server"

import { auth } from "@clerk/nextjs/server"
import { createDecision as createDbDecision } from "@/lib/db/queries/products"
import { revalidatePath } from "next/cache"

export async function addDecision(productId: string, data: { type: any, statement: string, rationale?: string }) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  try {
    await createDbDecision(userId, productId, data)
    revalidatePath(`/brain`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
