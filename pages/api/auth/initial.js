import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async (req, res) => {
  if (req.method === "POST") {
    const session = await getSession({ req });
    const body = JSON.parse(req.body);

    if (
      !session ||
      !body.Username ||
      !body.Name ||
      !body.Institution ||
      !/^[a-zA-Z0-9_.]+$/g.test(String(body.Username))
    ) {
      return res.json({ success: false, message: "Invalid inputs" });
    }

    try {
      await prisma.userMeta.update({
        where: { email: session.user.email },
        data: {
          username: body.Username,
          name: body.Name,
          institution: body.Institution,
        },
      });
    } catch (e) {
      if (
        e.message.indexOf("Invalid `prisma.user.update()` invocation") !== -1
      ) {
        return res.json({
          success: false,
          message: "This username is already in use",
        });
      }

      return res.json({
        success: false,
        message: e.message || "Internal Server Error",
      });
    }

    return res.json({ success: true });
  } else {
    return res.json({ sucess: false, message: "Bad Request" });
  }
};
