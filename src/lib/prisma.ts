import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client"

const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set")
}

// Reuse one client across hot reloads in development; otherwise every reload
// opens a new connection pool and eventually exhausts the database.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
