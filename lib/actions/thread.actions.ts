"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface CreateThreadParams {
  text: string;
  author: string;
  communityId?: string;
  path: string;
}

interface AddCommentToThreadParams {
  threadId: string;
  commentText: string;
  userId: string;
  path: string;
  communityId?: string;
}
export async function createThread({
  text,
  author,
  communityId,
  path,
}: CreateThreadParams) {
  try {
    await connectToDB();
    const createdThread = await Thread.create({
      text,
      author,
      community: communityId,
    });

    // add the thread to the list of created threads by the author
    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create a thread: ${error.message}`);
  }
}
export async function fetchThreads(pageNumber = 1, pageSize = 20) {
  try {
    await connectToDB();

    const skipAmount = (pageNumber - 1) * pageSize;

    // fetch threads that have now parentId's = top-level threads
    const threads = await Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: -1 })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalThreadsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const hasNextPage = totalThreadsCount > skipAmount + threads.length;
    return { threads, hasNextPage };
  } catch (error: any) {
    throw new Error(`Failed fetching threads: ${error.message}`);
  }
}

export async function fetchThreadById(id: string) {
  try {
    await connectToDB();

    // TODO: populate community
    const thread = await Thread.findById(id)
      .populate({ path: "author", model: User, select: "_id id name image" })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      });

    return thread;
  } catch (error: any) {
    throw new Error(`Failed fetching thread by id: ${error.message}`);
  }
}

export async function addCommentToThread({
  threadId,
  commentText,
  userId,
  communityId,
  path,
}: AddCommentToThreadParams) {
  try {
    await connectToDB();

    const parentThread = await Thread.findById(threadId);

    if (!parentThread) {
      throw new Error("Thread not found");
    }

    const createdThread = await Thread.create({
      parentId: parentThread._id,
      text: commentText,
      author: userId,
      community: communityId,
    });

    parentThread.children.push(createdThread._id);
    parentThread.save();

    // add the thread to the list of created threads by the author
    await User.findByIdAndUpdate(userId, {
      $push: { threads: createdThread._id },
    });

    revalidatePath(path);
  } catch (error: any) {
    throw new Error(`Failed to create a comment: ${error.message}`);
  }
}
