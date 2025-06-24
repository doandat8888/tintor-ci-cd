import image from "@/assets/avt.jpg";
import { LeaveChatRequest } from "@/components/pages/(app)/chat/chat-info/LeaveChatRequest";
import { MessageInput } from "@/components/pages/(app)/chat/chat-info/MessageInput";
import { MessageList } from "@/components/pages/(app)/chat/chat-info/MessageList";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Calendar from "@/components/ui/calendar/calendar";
import { Separator } from "@/components/ui/separator";
import { db } from "@/configs/firebase";
import { useGetPathName, useToggle } from "@/hooks/customs";
import { useGetUserInfo } from "@/hooks/queries";
import { useCurrentUserStore } from "@/stores";
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ChatInfoPage = () => {
  const { currentUser } = useCurrentUserStore();
  const { id } = useParams();
  const { toggle, isToggle } = useToggle();
  const pathname = useGetPathName();

  const { userInfo, isFetchingUserInfo } = useGetUserInfo(id || "");

  const [messages, setMessages] = useState<DocumentData[]>([]);

  const updateMessage = () => {
    const chatroomsRef = collection(db, "chatrooms");
    const combinedUser = [currentUser?._id, id].sort().join(":");
    const q = query(chatroomsRef, where("roomId", "==", combinedUser));

    getDocs(q).then((snapshot) => {
      const chatroom = snapshot.docs[0];
      if (chatroom) {
        const messageRef = collection(chatroom.ref, "messages");
        const q2 = query(messageRef, orderBy("createdAt"));
        onSnapshot(q2, (snapshot: any) => {
          setMessages(
            snapshot.docs.map((doc: DocumentData) => doc.data()) || []
          );
        });
      }
    });
  };

  const handleSendMessage = async (message: string) => {
    const chatroomsRef = collection(db, "chatrooms");
    const combinedUser = [currentUser?._id, id].sort().join(":");

    const q = query(chatroomsRef, where("roomId", "==", combinedUser));
    const snapshot = await getDocs(q);
    const chatroom = snapshot.docs[0];

    const newMessage = {
      sender: currentUser?._id,
      receiver: id,
      content: message.trim(),
      createdAt: serverTimestamp(),
    };

    try {
      if (chatroom) {
        await addDoc(collection(chatroom.ref, "messages"), newMessage);
        await updateDoc(chatroom.ref, {
          lastMessage: newMessage,
          updatedAt: serverTimestamp(),
        });
      } else {
        const newChatroomRef = await addDoc(chatroomsRef, {
          roomId: combinedUser,
          members: [currentUser?._id, id],
          senderUserId: currentUser?._id,
          receiveUserId: id,
          lastMessage: newMessage,
          updatedAt: serverTimestamp(),
        });
        await addDoc(collection(newChatroomRef, "messages"), newMessage);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (currentUser && userInfo) {
      setMessages([]);
      updateMessage();
    }
  }, [setMessages, currentUser, userInfo]);

  useEffect(() => {
    isToggle && toggle();
  }, [pathname]);

  if (!userInfo && isFetchingUserInfo) {
    return <></>;
  }

  return (
    <div className="px-6 h-full flex flex-col gap-2 w-full">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-start">
            <Avatar className="border-2 h-12 w-12">
              <AvatarImage
                src={
                  "https://res.cloudinary.com/dlo17fgwe/image/upload/v1734250463/mentor110_uethkn.jpg"
                }
                className="object-cover"
                alt="User Avatar"
              />
            </Avatar>
            <div className="flex flex-col gap-2 justify-between h-full">
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{userInfo.fullName}</h3>
                <span className="text-xs text-zinc-500 line-clamp-1">
                  {userInfo.department}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Button className="text-xs" onClick={toggle}>
              Schedule
            </Button>
            <LeaveChatRequest />
          </div>
        </div>
      </div>
      <Separator className="bg-zinc-500" />
      {isToggle ? (
        <div className="bg-white rounded-lg h-[calc(100vh-9rem)]">
          <Calendar />
        </div>
      ) : (
        <div className="flex flex-col gap-2 h-[calc(100vh-9rem)]">
          <div className="h-[calc(100vh-12.5rem)]">
            <div className="h-full flex flex-col gap-1.5 items-end overflow-auto">
              <MessageList data={messages} />
            </div>
          </div>
          <MessageInput sendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};
