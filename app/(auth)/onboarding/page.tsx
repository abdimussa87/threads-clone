import AccountProfile from "@/components/forms/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Onboarding() {
  const user = await currentUser();
  if (!user) return null;
  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");
  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  };
  return (
    <div className="flex flex-col max-w-3xl my-4">
      <h1 className="text-white text-heading2-bold">Onboarding</h1>
      <p className="text-zinc-500">Complete your profile now to use Threads</p>
      <section className="p-10 mt-9 bg-dark-2">
        <AccountProfile user={userData} btnTitle="Continue" />
      </section>
    </div>
  );
}

export default Onboarding;
