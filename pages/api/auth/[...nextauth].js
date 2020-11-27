import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";

export default (req, res) =>
  NextAuth(req, res, {
    providers: [
      Providers.Discord({
        clientId: process.env.DISCORD_CLIENT_ID,
        clientSecret: process.env.DISCORD_CLIENT_SECRET,
      }),
    ],
    pages: {
      error: "/error",
    },
    callbacks: {
      signIn: async (_user, _account, profile) => {
        try {
          const { id } = await prisma.userMeta.upsert({
            where: { email: profile.email },
            create: {
              email: profile.email,
              discord: `${profile.username}#${profile.discriminator}`,
            },
            update: {
              discord: `${profile.username}#${profile.discriminator}`,
            },
          });

          const n = await prisma.visitedNodes.findFirst({
            where: { userId: id, node: 0 },
          });

          if (!n) {
            await prisma.visitedNodes.create({
              data: { user: { connect: { id: id } }, node: 0 },
            });
          }

          const u = await prisma.userLevel.findFirst({
            where: { userId: id, level: 0 },
          });

          if (!u) {
            await prisma.userLevel.create({
              data: { user: { connect: { id: id } }, level: 0 },
            });
          }

          return Promise.resolve(true);
        } catch (e) {
          console.error(e);
          return Promise.reject(e);
        }
      },
    },
    adapter: Adapters.Prisma.Adapter({ prisma }),
  });
