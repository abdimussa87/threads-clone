import CreateThreadForm from "@/components/forms/CreateThreadForm";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <h1 className="text-white text-heading2-bold">Create Thread</h1>;
      <CreateThreadForm userId={userInfo._id.toString()} />
    </>
  );
}

export default Page;
