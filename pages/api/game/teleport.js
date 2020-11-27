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
    });

    if (u.dq) {
      return res.json({
        success: false,
        message: "You have been disqualified",
      });
    }

    const cn = map[u.currentNode];
    if (cn.type !== "Portal") {
      return res.json({
        success: false,
        message: "Not on a portal node",
      });
    }

    await Promise.all([
      prisma.userMeta.update({
        where: {
          id: u.id,
        },
        data: {
          currentNode: parseInt(cn.portalTo),
        },
      }),
      prisma.visitedNodes.create({
        data: { user: { connect: { id: u.id } }, node: parseInt(cn.portalTo) },
      }),
    ]);

    return res.json({
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};
