import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import debug from 'debug';
import accessTokenUtils from './utils/usersAccessToken';

dotenv.config();

const devDebug = debug('advent_calendar:seed');

const prisma = new PrismaClient({
  errorFormat: 'pretty',
  log: [
    {
      emit: 'stdout',
      level: process.env.NODE_ENV === 'production' ? 'error' : 'query',
    },
  ],
});

const seedAdmin = async () => {
  if (!process.env.ADMIN_EMAIL) {
    throw new Error('admin mail not found');
  }
  const adminExist = await prisma.merchant.findFirst({ where: { email: process.env.ADMIN_EMAIL, role: 'Admin' } });
  if (adminExist) {
    return null;
  }

  if (!process.env.ADMIN_NAME) {
    throw new Error('admin first name not found');
  } 
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('admin password not found');
  } 
  const { accessToken, hashedToken } = await accessTokenUtils.generateUserAccessToken(process.env.ADMIN_PASSWORD);
  await prisma.merchant.create({
    data: {
      email: process.env.ADMIN_EMAIL,
      name: process.env.ADMIN_NAME,

      contact: process.env.ADMIN_CONTACT,
      role: 'Admin',
      password: hashedToken,
    },
  });
  // eslint-disable-next-line no-console
  console.log('Seeding of Admin done');
  return null;
};



const appSeed = async () => {
  await seedAdmin();
  return null;
};

appSeed().then().catch().finally(async () => {
  await prisma.$disconnect();
  return process.exit(0);
});