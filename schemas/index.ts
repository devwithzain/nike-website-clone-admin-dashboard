import * as z from "zod";

export const resetFormSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const newPasswordFormSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string())
});

export const settingSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string().email()),
  password: z.optional(z.string()),
  newPassword: z.optional(z.string()),
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }

  return true;
}, {
  message: "New password is required!",
  path: ["newPassword"]
})
  .refine((data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  }, {
    message: "Password is required!",
    path: ["password"]
  });

export type TsettingData = z.infer<typeof settingSchema>;
export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TresetFormData = z.infer<typeof resetFormSchema>;
export type TnewPasswordFormData = z.infer<typeof newPasswordFormSchema>;