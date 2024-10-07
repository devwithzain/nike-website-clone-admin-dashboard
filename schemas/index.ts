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

export const createStoreSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const settingFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const billboardFormSchema = z.object({
  label: z.string().min(1, {
    message: "Label is required",
  }),
  imageUrl: z.string(),
});

export const categoryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  billboardId: z.string().min(1, {
    message: "BillboardId is required",
  })
});

export const subCategoryFormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  categoryId: z.string().min(1, {
    message: "CategoryId is required",
  })
});

export const colorFormSchema = z.object({
  name: z.string().min(2),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});

export const sizeFormSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1),
});

export const productFormSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  subcategoryId: z.string().min(1),
  productColor: z.array(z.string()),
  productSize: z.array(z.string()),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});

export type TsettingData = z.infer<typeof settingSchema>;
export type TsizeFormData = z.infer<typeof sizeFormSchema>;
export type TcolorFormData = z.infer<typeof colorFormSchema>;
export type TloginFormData = z.infer<typeof loginFormSchema>;
export type TresetFormData = z.infer<typeof resetFormSchema>;
export type TcreateStoreData = z.infer<typeof createStoreSchema>;
export type TsettingFormData = z.infer<typeof settingFormSchema>;
export type TproductFormData = z.infer<typeof productFormSchema>;
export type TcategoryFormData = z.infer<typeof categoryFormSchema>;
export type TbillboardFormData = z.infer<typeof billboardFormSchema>;
export type TsubCategoryFormData = z.infer<typeof subCategoryFormSchema>;
export type TnewPasswordFormData = z.infer<typeof newPasswordFormSchema>;