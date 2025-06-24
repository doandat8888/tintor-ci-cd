import { cn } from "@/lib/utils";
import { useCurrentUserStore } from "@/stores";

export const MessageList = ({ data }: { data: any[] }) => {
  const { currentUser } = useCurrentUserStore();

  return (
    <>
      {data.map((item, index) => {
        return item.sender == currentUser?._id ? (
          <MessageRightBubble message={item} key={index} />
        ) : (
          <MessageLeftBubble message={item} />
        );
      })}
    </>
  );
};

export const MessageRightBubble = ({ message }: { message: any }) => (
  <div className={cn("flex gap-2 items-center")}>
    <p
      className={cn(
        "bg-my-blue/50 text-sm text-white py-1 px-3 rounded-lg rounded-br-none transition-all max-w-96"
      )}
    >
      {message.content}
    </p>
  </div>
);

export const MessageLeftBubble = ({ message }: { message: any }) => (
  <div className={cn("flex gap-2 items-center justify-start w-full")}>
    <p
      className={cn(
        "bg-gray-200/80 text-sm dark:bg-accent py-1 px-3 rounded-lg rounded-tl-none transition-all max-w-96"
      )}
    >
      {message.content}
    </p>
  </div>
);
