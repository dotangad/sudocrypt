import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import map from "../../../data/map";

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const u = await prisma.userMeta.findOne({
      where: { email: session.user.email },
      select: {
        currentNode: true,
      },
    });

    if (u.dq) {
      return res.json({ success: false, mesage: "Disqualified" });
    }

    const openCnt = await prisma.userLevel.count({
      where: {
        user: { email: session.user.email },
        active: true,
        solved: false,
      },
    });

    if (openCnt !== 0) {
      return res.json({
        success: false,
        message: "Your movement is restricted",
      });
    }

    return res.json({
      success: true,
      options: map[u.currentNode].options,
    });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};
