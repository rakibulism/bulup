"use server"

import { auth } from "@clerk/nextjs/server"
import { saveDesignSystem as saveDBSys } from "@/lib/db/queries/products"
import { revalidatePath } from "next/cache"

export async function persistDesignSystem(productId: string, data: any) {
  // const { userId } = await auth()
  const userId = "mock-user-id"
  if (!userId) throw new Error("Unauthorized")

  try {
    await saveDBSys(productId, data)
    revalidatePath(`/design-system`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
