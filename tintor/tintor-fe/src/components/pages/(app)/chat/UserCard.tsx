import image from "@/assets/avt.jpg";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useGetPathName } from "@/hooks";
import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/stores";
import { Link } from "react-router-dom";

export const UserCard = ({
  data,
  isChatRoom,
}: {
  data: any;
  isChatRoom?: boolean;
}) => {
  const pathName = useGetPathName();
  const { currentUser } = useCurrentUserStore();

  if (!isChatRoom) {
    const senderId = data.members.find(
      (item: string) => item != currentUser?._id
    );

    return (
      <Link to={`/chat/${senderId}`}>
        <div
          className={cn(
            "flex gap-2 items-center px-4 py-2 rounded-lg w-full",
            pathName == `/chat/${senderId}`
              ? "bg-my-blue/20 hover:bg-my-blue/20"
              : "hover:bg-zinc-600/10"
          )}
        >
          <Avatar className="border-2 h-12 w-12">
            <AvatarImage
              src={
                "https://res.cloudinary.com/dlo17fgwe/image/upload/v1734250463/mentor110_uethkn.jpg"
              }
              alt="User Avatar"
              className="object-cover"
            />
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm text-my-blue font-bold">{data.fullName}</h3>
            <span className="text-xs text-zinc-500 line-clamp-1">
              <span className="text-black font-semibold">
                {data.lastMessage.sender == currentUser?._id && "You: "}
              </span>
              {data.lastMessage.content}
            </span>
          </div>
        </div>
      </Link>
    );
  } else {
    return (
      <Link to={`/chat/${data._id}`}>
        <div
          className={cn(
            "flex gap-2 items-center px-4 py-2 rounded-lg w-full",
            pathName == `/chat/${data._id}`
              ? "bg-my-blue/20 hover:bg-my-blue/20"
              : "hover:bg-zinc-600/10"
          )}
        >
          <Avatar className="border-2 h-12 w-12">
            <AvatarImage src={image} alt="User Avatar" />
          </Avatar>
          <div className="flex flex-col">
            <h3 className="text-sm text-my-blue font-bold">{data.fullName}</h3>
            <span className="text-xs text-zinc-500 line-clamp-1">
              {data.department}
            </span>
          </div>
        </div>
      </Link>
    );
  }
};

// const UserSkeleton = () => (
//   <div className="flex gap-2 items-center mb-3">
//     <Skeleton className="rounded-full w-12 h-12 bg-zinc-500/20" />
//     <div className="flex flex-col gap-2">
//       <Skeleton className="rounded-full w-56 h-5 bg-zinc-500/20" />
//       <Skeleton className="rounded-full w-24 h-4 bg-zinc-500/20" />
//     </div>
//   </div>
// );
