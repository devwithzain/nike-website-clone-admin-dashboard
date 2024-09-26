"use server";

import bcrypt from 'bcryptjs';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { loginFormSchema, TloginFormData } from "@/schemas";

export const login = async (data: TloginFormData) => {
   const validatedFields = loginFormSchema.safeParse(data);

   if (!validatedFields.success) {
      return {
         error: "Invalid Fields"
      };
   }

   const { email, password } = validatedFields.data;

   const existingUser = await getUserByEmail(email);
   if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
         error: "Email does not exist"
      };
   }

   try {
      if (!existingUser.password || typeof existingUser.password !== 'string') {
         return {
            error: "Invalid Credentials"
         };
      }

      const passwordsMatch = await bcrypt.compare(password, existingUser.password);

      if (!passwordsMatch) {
         return {
            error: "Passwords do not match"
         };
      }

      await signIn("credentials", {
         email,
         password,
         redirectTo: DEFAULT_LOGIN_REDIRECT
      });

      return { success: "LogIn" };
   } catch (error) {
      if (error instanceof AuthError) {
         switch (error.type) {
            case "CredentialsSignin":
               return {
                  error: "Invalid Credentials"
               };
            default:
               return {
                  error: "Something went wrong"
               };
         }
      }
      throw error;
   }
};