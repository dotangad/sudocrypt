import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  if (req.method !== "POST") {
    return res.json({ success: false, message: "METHOD mismatch" });
  }

  try {
    const session = await getSession({ req });
    const { command } = JSON.parse(req.body);
    const ip = req.headers["x-real-ip"] || req.headers["host"];
    const userAgent = req.headers["user-agent"];

    if (!session || !command) {
      return res.json({ success: false, message: "Bad Request" });
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

    await prisma.command.create({
      data: {
        command,
        ip,
        userAgent,
        user: { connect: { email: session.user.email } },
      },
    });

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
    return res.json({
      success: false,
      message: e.message || "Internal Server Error",
    });
  }
};
