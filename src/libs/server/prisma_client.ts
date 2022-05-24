import { PrismaClient } from '@prisma/client';

// declare global {
//   var client: PrismaClient | undefined;
// }

// const client =
//   global.client ||
//   new PrismaClient({
//     log: ['query'],
//   });

// export default client;
// import { PrismaClient } from '@prisma/client'

// add prisma to the NodeJS global type
interface CustomNodeJsGlobal {
  prisma: PrismaClient;
}

// Prevent multiple instances of Prisma Client in development
declare const global: CustomNodeJsGlobal;

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = client;

export default client;
