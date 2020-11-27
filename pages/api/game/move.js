import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";
import map from "../../../data/map";

export default async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.json({ success: false, message: "METHOD mismatch" });
    }

    const session = await getSession({ req });
    const { direction } = JSON.parse(req.body);

    if (
      !direction ||
      ["up", "down", "left", "right"].indexOf(direction) === -1
    ) {
      return res.json({ success: false, message: "Bad request" });
    }

    if (!session) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const u = await prisma.userMeta.findOne({
      where: { email: session.user.email },
    });

    if (u.dq) {
      return res.json({ success: false, message: "Disqualified" });
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

    const options = map[u.currentNode].options;
    const n = options[direction];
    const node = map[options[direction]];
    if (!node) {
      return res.json({
        success: false,
        message: "Invalid option",
      });
    }

    let keys = u.keys,
      nodeSpecificActionTaken = u.nodeSpecificActionTaken;

    if (node.type === "OpenLevel") {
      const l = await prisma.userLevel.findFirst({
        where: { userId: u.id, level: node.level },
      });

      if (!l) {
        await prisma.userLevel.create({
          data: { user: { connect: { id: u.id } }, level: node.level },
        });
      }
    }

    if (node.type === "LockedLevel") {
      if (u.keys > 0) {
        const l = await prisma.userLevel.findFirst({
          where: { userId: u.id, level: node.level },
        });

        if (!l) {
          keys = keys - 1;
          nodeSpecificActionTaken = true;
          // Create the level
          await prisma.userLevel.create({
            data: { user: { connect: { id: u.id } }, level: node.level },
          });
        } else {
          nodeSpecificActionTaken = true;
        }
      } else {
        nodeSpecificActionTaken = false;
      }
    }

    if (node.type === "Key") {
      const k = await prisma.visitedNodes.count({
        where: { userId: u.id, node: n },
      });

      if (k === 0) {
        keys = keys + 1;
      }
    }

    await Promise.all([
      prisma.userMeta.update({
        where: {
          id: u.id,
        },
        data: {
          currentNode: parseInt(n),
          keys: keys,
          nodeSpecificActionTaken: nodeSpecificActionTaken,
        },
      }),
      prisma.visitedNodes.create({
        data: { user: { connect: { id: u.id } }, node: n },
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
