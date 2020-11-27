import prisma from "../../lib/prisma";

export default async (_, res) => {
  try {
    const users = await prisma.userMeta.findMany({
      where: { admin: false, username: { not: "" }, dq: false },
      select: {
        points: true,
        username: true,
        exunite: true,
      },
      take: 50,
      orderBy: [{ points: "desc" }, { lastPointChange: "asc" }],
    });

    return res.json({
      success: true,
      users,
    });
  } catch (e) {
    return res.json({
      success: false,
      message: e.message || "Internal Server Error",
    });
  }
};

// export default (_, res) => res.json([]);
