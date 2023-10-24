import { fetchUserThreads } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

interface ThreadsTabProps {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: ThreadsTabProps) {
  let result = await fetchUserThreads(accountId);
  if (!result) redirect("/");
  return (
    <div>
      {result.threads.map((thread: any) => (
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={currentUserId}
          parentId={thread.parentId}
          content={thread.text}
          author={
            accountType == "User"
              ? {
                  id: result.id,
                  name: result.name,
                  image: result.image,
                }
              : {
                  id: thread.author.id,
                  name: thread.author.name,
                  image: thread.author.image,
                }
          }
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </div>
  );
}

export default ThreadsTab;
