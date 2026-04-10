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

export async function getDesignSystemByProductId(productId: string) {
  return await prisma.designSystem.findUnique({
    where: { productId }
  })
}

export async function saveDesignSystem(productId: string, data: { brandInputs: any, palette: any, typography: any, spacing: any, components: any }) {
  return await prisma.designSystem.upsert({
    where: { productId },
    update: {
      brandInputs: data.brandInputs,
      colorTokens: data.palette,
      typography: data.typography,
      spacing: data.spacing,
      components: data.components,
    },
    create: {
      productId,
      brandInputs: data.brandInputs,
      colorTokens: data.palette,
      typography: data.typography,
      spacing: data.spacing,
      components: data.components,
    }
  })
}
