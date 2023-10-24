import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ProfileHeaderProps {
  accountId: string;
  authUserId: string;
  name: string;
  username: string;
  imgUrl: string;
  bio: string;
}
function ProfileHeader({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
}: ProfileHeaderProps) {
  return (
    <div className="flex items-start p-10 rounded-sm bg-dark-3">
      <div className="relative object-cover w-20 h-20">
        <Image
          src={imgUrl}
          alt="profile photo"
          className="object-cover rounded-full shadow-2xl"
          fill
        />
      </div>
      <div className="flex flex-col ml-3">
        <h1 className="text-white text-heading3-bold">{name}</h1>
        <p className="text-sm text-zinc-500">@{username}</p>
        <p className="mt-4 text-md text-zinc-400">{bio}</p>
      </div>
      <div className="ml-auto">
        <Button>
          <Image
            src="/assets/edit.svg"
            alt="edit profile"
            width={24}
            height={24}
            className="mr-2"
          />
          Edit Profile
        </Button>
      </div>
    </div>
  );
}

export default ProfileHeader;
