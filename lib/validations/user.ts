import * as z from "zod";

export const UserValidation = z.object({
  profile_photo: z.string().url().min(1),
  name: z.string().min(3).max(30),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 2 characters.",
    })
    .max(30),
  bio: z
    .string()
    .min(3, { message: "Bio must be at least 3 characters" })
    .max(1000),
});
