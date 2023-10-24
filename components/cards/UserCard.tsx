"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface UserCardProps {
  userId: string;
  image: string;
  name: string;
  username: string;
}

function UserCard({ userId, image, name, username }: UserCardProps) {
  const router = useRouter();
  return (
    <div
      key={userId}
      className="flex items-center gap-3 px-4 py-3 mb-4 rounded-md bg-dark-2"
    >
      <div className="relative w-10 h-10">
        <Image alt="user image" src={image} fill className="rounded-full" />
      </div>
      <div className="flex flex-col flex-1 ">
        <h1 className="text-white text-heading5-bold text-ellipsis line-clamp-1">
          {name}
        </h1>
        <p className="text-sm text-zinc-500">@{username}</p>
      </div>
      <Button
        className="w-24 bg-primary-500"
        onClick={() => router.push(`/profile/${userId}`)}
      >
        View
      </Button>
    </div>
  );
}

export default UserCard;
