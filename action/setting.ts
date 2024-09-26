"use server";
import bcrypt from "bcryptjs";
import { prisma } from '@/lib/prisma';
import { TsettingData } from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/current-user";

export const settings = async (data: TsettingData) => {
   const user = await currentUser();

   if (!user) {
      return { error: "Unauthorized" };
   };

   const dbUser = await getUserById(user.id);

   if (!dbUser) {
      return { error: "User not found" };
   }

   if (data.password && data.newPassword && dbUser.password) {

      const passwordsMatch = await bcrypt.compare(
         data.password,
         dbUser.password,
      );

      if (!passwordsMatch) {
         return { error: "Incorrect current password!" };
      }

      const isSameAsOldPassword = await bcrypt.compare(
         data.newPassword,
         dbUser.password,
      );

      if (isSameAsOldPassword) {
         return { error: "New password must be different!" };
      }

      const hashedPassword = await bcrypt.hash(
         data.newPassword,
         10,
      );
      data.password = hashedPassword;
      data.newPassword = undefined;
   }


   await prisma.admin.update({
      where: {
         id: dbUser.id
      },
      data: {
         ...data
      }
   });

   return { success: "Settings Updated" };

};