import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: [
    {
      emit: 'stdout',
      level: process.env.NODE_ENV === 'production' ? 'error' : 'query',
    },
  ],
});

export default prisma;
