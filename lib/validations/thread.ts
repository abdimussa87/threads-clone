import * as z from "zod";

export const ThreadValidation = z.object({
  thread: z
    .string()

    .min(2, {
      message: "A Thread must be at least 2 characters.",
    })
    .max(1000, {
      message: "A Thread cannot be more than 1000 characters",
    }),

  accountId: z.string(),
});

export const CommentValidation = z.object({
  thread: z
    .string()

    .min(2, {
      message: "Thread must be at least 2 characters.",
    })
    .max(1000, {
      message: "A Thread cannot be more than 1000 characters",
    }),
});
