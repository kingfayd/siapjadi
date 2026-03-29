import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new PrismaClient({
        datasource: {
            url: process.env.DATABASE_URL,
        },
    } as any)
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
