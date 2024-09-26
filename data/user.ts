import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.admin.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | any) => {
  try {
    const user = await prisma.admin.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};
