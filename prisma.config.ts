import 'dotenv/config';

// Minimal Prisma CLI config for Prisma 7+.
// The CLI will read this file for the datasource URL used by migrate/db push.
export default {
  datasource: {
    url: process.env.DATABASE_URL || '',
  },
} as any;
