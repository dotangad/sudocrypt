import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import map from "../../../data/map";
import levels from "../../../data/levels";

export default async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.json({ success: false, message: "METHOD mismatch" });
    }

    const session = await getSession({ req });
    const { answer } = JSON.parse(req.body);
    const at = new Date();

    if (!session || !answer) {
      return res.json({ success: false, message: "Bad Request" });
    }

    const u = await prisma.userMeta.findOne({
      where: { email: session.user.email },
    });

    if (u.dq) {
      return res.json({ success: false, message: "Disqualified" });
    }

    const n = map[u.currentNode];
    if (["OpenLevel", "LockedLevel"].indexOf(n.type) === -1) {
      return res.json({
        success: false,
        message: "You are currently not on a level",
      });
    }

    const lvl = await prisma.userLevel.findFirst({
      where: { userId: u.id, level: n.level, active: true, solved: false },
    });

    if (!lvl) {
      return res.json({
        success: false,
        message: "You are currently not on a level",
      });
    }

    let correct = false;
    let sus = false;

    if (levels[n.level].answer === answer) {
      const flagTime = levels[n.level].flagging.time;
      const flagAttempts = levels[n.level].flagging.attempts;
      const userTime = (at.getTime() - lvl.createdAt.getTime()) / (60 * 1000);
      const userAttempts = await prisma.userAttempts.count({
        where: { userId: u.id, level: n.level },
      });

      if (flagTime > userTime || flagAttempts > userAttempts) {
        sus = true;
      }

      await prisma.userLevel.update({
        where: { id: lvl.id },
        data: { active: false, solved: true, solvedAt: new Date() },
      });

      await prisma.userMeta.update({
        where: { id: u.id },
        data: {
          points: u.points + parseInt(levels[n.level].points),
          lastPointChange: at,
        },
      });

      correct = true;
    }

    await prisma.userAttempts.create({
      data: {
        createdAt: at,
        updatedAt: at,
        user: { connect: { id: u.id } },
        level: n.level,
        attempt: answer,
        sus,
      },
    });

    return res.json({ success: true, correct });
  } catch (e) {
    console.error(e);
    return res.json({ success: false, message: "Internal Server Error" });
  }
};
