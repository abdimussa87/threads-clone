"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

interface UpdateUserParams {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}

export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: UpdateUserParams): Promise<void> {
  try {
    await connectToDB();

    await User.findOneAndUpdate(
      { id: userId },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      {
        upsert: true,
      }
    );

    if (path === "/profile/edit") {
      revalidatePath(path);
    }
  } catch (err: any) {
    throw new Error("Failed to update/create user: " + err.message);
  }
}

export async function fetchUser(userId: string) {
  try {
    await connectToDB();
    const user = await User.findOne({ id: userId });
    // .populate({
    //   path:'communities',
    //   model:Community
    // })
    return user;
  } catch (error: any) {
    console.log(`Failed to fetch user: ${error.message}`);
  }
}
export async function fetchUserThreads(userId: string) {
  try {
    await connectToDB();

    // TODO: populate community
    const user = await User.findOne({ id: userId })
      .populate({
        path: "threads",
        model: Thread,
        populate: {
          path: "children",
          model: Thread,
          populate: {
            path: "author",
            model: User,
            select: "id name image ",
          },
        },
      })
      .sort({ "threads.createdAt": -1 });
    // .populate({
    //   path:'communities',
    //   model:Community
    // })
    return user;
  } catch (error: any) {
    console.log(`Failed to fetch user threads: ${error.message}`);
  }
}

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    await connectToDB();
    const skipAmount = (pageNumber - 1) * pageSize;
    const regex = new RegExp(searchString, "i");
    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };
    if (searchString) {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
      ];
    }
    const sortOptions = { createdAt: sortBy };
    const users = await User.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const totalUsersCount = await User.countDocuments(query);

    const hasNextPage = totalUsersCount > skipAmount + users.length;
    return { users, hasNextPage };
  } catch (error: any) {
    console.log(`Failed to fetch users: ${error.message}`);
  }
}

export async function getActivity(userId: string) {
  try {
    await connectToDB();

    const userThreads = await User.findById(userId);

    const replies = await Thread.find({
      parentId: { $in: userThreads.threads },
      author: { $ne: userId },
    })
      .sort({ createdAt: -1 })
      .populate({ path: "author", model: User, select: "_id id name image" });

    return replies;
  } catch (error: any) {
    console.log(`Failed to get activity: ${error.message}`);
  }
}
