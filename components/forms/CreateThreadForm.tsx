"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { ThreadValidation } from "@/lib/validations/thread";
import { usePathname, useRouter } from "next/navigation";
import { createThread } from "@/lib/actions/thread.actions";

function CreateThreadForm({ userId }: { userId: string }) {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof ThreadValidation>>({
    resolver: zodResolver(ThreadValidation),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof ThreadValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createThread({ text: values.thread, author: userId, path: pathname });

    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-light text-white">Content</FormLabel>
              <FormControl className="text-white border no-focus border-dark-4 bg-dark-3">
                <Textarea
                  rows={15}
                  placeholder="What's on your mind?"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
}
export default CreateThreadForm;
