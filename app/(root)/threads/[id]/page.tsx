import ThreadCard from "@/components/cards/ThreadCard";
import CommentForm from "@/components/forms/CommentForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function ThreadDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  if (!id) {
    return null;
  }
  const user = await currentUser();
  if (!user) return;

  const userInfo = await fetchUser(user.id);
  const thread = await fetchThreadById(id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <>
      <div>
        <ThreadCard
          key={thread._id}
          id={thread._id}
          currentUserId={user?.id}
          parentId={thread.parentId}
          content={thread.text}
          author={thread.author}
          community={thread.community}
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      </div>
      <CommentForm
        threadId={thread._id.toString()}
        currentUserImg={userInfo.image}
        currentUserId={userInfo._id.toString()}
      />
      {thread.children.map((comment: any) => {
        return (
          <ThreadCard
            key={comment._id}
            id={comment._id}
            currentUserId={user?.id}
            parentId={comment.parentId}
            content={comment.text}
            author={comment.author}
            community={comment.community}
            createdAt={comment.createdAt}
            comments={comment.children}
            isComment
          />
        );
      })}
    </>
  );
}

export default ThreadDetailPage;
