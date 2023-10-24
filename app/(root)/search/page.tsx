import UserCard from "@/components/cards/UserCard";
import { Button } from "@/components/ui/button";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import { use } from "react";

async function SearchPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    pageNumber: 1,
    pageSize: 25,
  });
  if (result != null)
    return (
      <div className="flex flex-col">
        {result.users.length === 0 ? (
          <p>No users found</p>
        ) : (
          result.users.map((user) => (
            <UserCard
              key={user.id}
              userId={user.id}
              image={user.image}
              name={user.name}
              username={user.username}
            />
          ))
        )}
      </div>
    );
}

export default SearchPage;
