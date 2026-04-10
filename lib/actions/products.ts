"use server"

import { auth } from "@clerk/nextjs/server"
import { createProduct as createProductDB } from "@/lib/db/queries/products"
import { revalidatePath } from "next/cache"

export async function saveProduct(data: { name: string, brief: string, architecture: any }) {
  const { userId } = await auth()
  if (!userId) throw new Error("Unauthorized")

  try {
    const product = await createProductDB(userId, data)
    revalidatePath("/dashboard")
    return { success: true, product }
  } catch (error: any) {
    console.error("Save Product Error:", error)
    return { success: false, error: error.message }
  }
}
