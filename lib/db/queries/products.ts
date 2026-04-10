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

export async function getFlowsByProductId(productId: string) {
  return await prisma.flow.findMany({
    where: { productId },
    orderBy: { createdAt: "asc" }
  })
}

export async function saveFlows(productId: string, flows: any[]) {
  // Simple approach: delete existing and create new for MVP
  await prisma.flow.deleteMany({
    where: { productId }
  })

  return await prisma.flow.createMany({
    data: flows.map(f => ({
      productId,
      name: f.name,
      type: f.type,
      screens: f.screens,
    }))
  })
}

export async function getProductById(productId: string, userId: string) {
  const user = await prisma.user.findUnique({ where: { clerkId: userId } })
  if (!user) return null

  return await prisma.product.findUnique({
    where: { id: productId, userId: user.id },
    include: { flows: true }
  })
}
