import { PrismaClient } from '@/generated/prisma';
import { PrismaNeonHttp } from '@prisma/adapter-neon';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Direct Neon connection URL - Prisma 7 can override process.env.DATABASE_URL in dev
const NEON_DATABASE_URL = 'postgresql://neondb_owner:npg_Mw01RlrmTzuh@ep-icy-heart-a4pph84x-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

function createPrismaClient() {
  // Use Vercel's DATABASE_URL in production, otherwise use direct Neon URL
  const connectionString = process.env.VERCEL 
    ? process.env.DATABASE_URL! 
    : NEON_DATABASE_URL;
  
  // @ts-expect-error - Prisma adapter type mismatch
  const adapter = new PrismaNeonHttp(connectionString);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
