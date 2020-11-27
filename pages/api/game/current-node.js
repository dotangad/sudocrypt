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
      return res.json({ success: false, message: "Disqualified" });
    }

    return res.json({
      success: true,
      node: map[u.currentNode],
      nodeN: u.currentNode,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message || "Internal Server Error",
    });
  }
};
