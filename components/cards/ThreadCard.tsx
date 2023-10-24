import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import Link from "next/link";

interface ThreadCardProps {
  id: string;
  currentUserId: string | undefined;
  parentId: string | null;
  content: string;
  author: {
    id: string;
    name: string;
    image: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
}
function ThreadCard({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: ThreadCardProps) {
  return (
    <article className={`flex flex-col w-full mb-5 rounded-xl  p-7 bg-dark-2`}>
      <div className="flex">
        <div className="flex flex-col items-center mr-3">
          <Link href={`/profile/${author.id}`}>
            <div className="relative h-11 w-11">
              <Image
                className="object-contain rounded-full cursor-pointer"
                alt="author image"
                src={author.image}
                fill
              />
            </div>
          </Link>
          <div className="w-0.5 h-full mt-3 bg-dark-4 rounded-full"></div>
        </div>
        <div className="flex flex-col">
          <Link href={`/profile/${author.id}`}>
            <h1 className="mb-2 text-white">{author.name}</h1>
          </Link>
          <p className="text-small-regular text-light-2">{content}</p>
          <div className="flex mt-5 mb-1 gap-x-4">
            <Image
              alt="heart icon"
              src="/assets/heart-gray.svg"
              width={25}
              height={25}
              className="cursor-pointer"
            />
            <Link href={`/threads/${id}`}>
              <Image
                alt="reply icon"
                src="/assets/reply.svg"
                width={25}
                height={25}
                className="cursor-pointer"
              />
            </Link>
            <Image
              alt="repost icon"
              src="/assets/repost.svg"
              width={25}
              height={25}
              className="cursor-pointer"
            />
            <Image
              alt="share icon"
              src="/assets/share.svg"
              width={25}
              height={25}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      {comments.length > 0 && (
        <Link href={`/threads/${id}`}>
          {" "}
          <p className="mt-1 text-sm text-zinc-500">
            {comments.length} replies
          </p>{" "}
        </Link>
      )}
      <div className="mt-4 text-xs font-light text-zinc-400">
        {formatDateString(createdAt)}
      </div>
    </article>
  );
}

export default ThreadCard;
