"use client";
import React from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { CommentValidation } from "@/lib/validations/thread";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addCommentToThread } from "@/lib/actions/thread.actions";
import { usePathname, useRouter } from "next/navigation";

interface CommentFormProps {
  threadId: string;
  currentUserImg: string;
  currentUserId: string;
}

function CommentForm({
  threadId,
  currentUserImg,
  currentUserId,
}: CommentFormProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof CommentValidation>>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      thread: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof CommentValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await addCommentToThread({
      threadId,
      commentText: values.thread,
      userId: currentUserId,
      path: pathname,
    });

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3 py-5 border-y-dark-4 max-sm:flex-col"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  alt="profile image"
                  className="object-cover rounded-full "
                  width={48}
                  height={48}
                />
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Comment..."
                  className="text-white border-none bg-dark-3 no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-24 px-8 py-2 mt-6 mb-4 rounded-full bg-primary-500 max-sm:w-full"
        >
          Reply
        </Button>
      </form>
    </Form>
  );
}

export default CommentForm;
