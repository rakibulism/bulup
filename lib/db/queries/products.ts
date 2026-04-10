import { prisma } from "@/lib/db/prisma" // I need to create this lib/db/prisma.ts

export async function createProduct(userId: string, data: { name: string, brief: string, architecture: any }) {
  // Find internal user ID from Clerk ID
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) throw new Error("User not found in database")

  return await prisma.product.create({
    data: {
      userId: user.id,
      name: data.name,
      brief: data.brief,
      architecture: data.architecture,
    }
  })
}

export async function getProducts(userId: string) {
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  })

  if (!user) return []

  return await prisma.product.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: "desc" }
  })
}
