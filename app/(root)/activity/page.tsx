import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function ActivityPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const replies = await getActivity(userInfo._id);

  return (
    <div className="flex flex-col">
      <h1 className="text-white text-heading2-bold">Activity</h1>;
      {replies?.length === 0 ? (
        <p className="grid min-h-screen text-white place-items-center">
          No activity yet
        </p>
      ) : (
        replies?.map((reply) => (
          <Link
            href={`/threads/${reply.parentId}`}
            key={reply._id}
            className="mb-5"
          >
            <div className="flex items-center mt-4">
              <div className="relative w-5 h-5 mr-4 ">
                <Image
                  alt="profile image"
                  src={reply.author.image}
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <p className="text-sm text-white">
                <span className="text-sm text-primary-500">
                  {reply.author.name}
                </span>{" "}
                replied to your thread
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ActivityPage;
