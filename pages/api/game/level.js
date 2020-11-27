import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import map from "../../../data/map";
import levels from "../../../data/levels";

export default async (req, res) => {
  try {
    const session = await getSession({ req });

    if (!session) {
      return res.json({
        success: false,
        message: "Unauthorized",
        solved: false,
      });
    }

    const u = await prisma.userMeta.findOne({
      where: { email: session.user.email },
      select: {
        id: true,
        currentNode: true,
        nodeSpecificActionTaken: true,
        keys: true,
        dq: true,
      },
    });

    if (u.dq) {
      return res.json({ success: false, message: "Disqualified" });
    }

    const n = map[u.currentNode];
    if (n.type && n.type === "OpenLevel") {
      let lvl = await prisma.userLevel.findFirst({
        where: { userId: u.id, level: parseInt(n.level) },
      });

      if (!lvl) {
        lvl = await prisma.userLevel.create({
          data: { user: { connect: { id: u.id } }, level: parseInt(n.level) },
        });
      }

      if (lvl.solved || !lvl.active) {
        return res.json({ success: true, solved: true, level: "" });
      }

      return res.json({
        success: true,
        solved: false,
        level: levels[n.level].level,
      });
    }

    if (n.type && n.type === "LockedLevel") {
      const lvl = await prisma.userLevel.findFirst({
        where: { userId: u.id, level: n.level, active: true, solved: false },
      });

      if (!lvl) {
        return res.json({
          success: false,
          message: "You do not have enough keys to unlock this level",
          level: "",
          solved: false,
        });
      }

      return res.json({
        success: true,
        solved: false,
        level: levels[n.level].level,
      });
    }

    return res.json({
      success: true,
      message: "Currently not on a level",
      level: "",
      solved: false,
    });
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: e.message || "Internal Server Error",
    });
  }
};
