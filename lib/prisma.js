import { PrismaClient } from "@prisma/client";

/** @type {PrismaClient} */
let prisma;
if (!prisma) {
  prisma = new PrismaClient();
}

export default prisma;
