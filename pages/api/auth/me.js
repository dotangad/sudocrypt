import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const [user, record, openLvls] = await Promise.all([
      prisma.userMeta.findOne({
        where: { email: session.user.email },
        select: {
          name: true,
          admin: true,
          exunite: true,
          institution: true,
          username: true,
          points: true,
          email: true,
          dq: true,
          discord: true,
          keys: true,
          nodeSpecificActionTaken: true,
          currentNode: true,
          lastPointChange: true,
        },
      }),
      prisma.user.findOne({
        where: { email: session.user.email },
        select: { email: true, image: true },
      }),
      prisma.userLevel.count({
        where: {
          user: { email: session.user.email },
          active: true,
          solved: false,
        },
      }),
    ]);

    return res.json({
      success: true,
      user: { ...user, record },
      activeLevel: openLvls > 0,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message || "Internal Server Error",
    });
  }
};
