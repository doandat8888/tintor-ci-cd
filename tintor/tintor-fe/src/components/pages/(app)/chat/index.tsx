import { UserCard } from "@/components/pages/(app)/chat/UserCard";
import { UserFilter } from "@/components/pages/(app)/chat/UserFilter";
import { useDebounce } from "@/components/ui/multi-selector";
import { db } from "@/configs/firebase";
import { useGetUsers } from "@/hooks/queries";
import { useCurrentUserStore } from "@/stores";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export type TEmployeeData = {
  employeeID: string;
  name: string;
  skills: string[];
  experience: number;
  department: string;
  learningGoal: string;
  availability: string;
  email: string;
  interest: string;
  phoneNumber: string;
};

export const ChatPage = () => {
  const { currentUser } = useCurrentUserStore();

  if (!currentUser) {
    return <Navigate to="/sign-in" />;
  }

  return <PageContent />;
};

const PageContent = () => {
  const [searchText, setSearchText] = useState<string>("");
  const debounceText = useDebounce(searchText, 500);

  const { currentUser } = useCurrentUserStore();
  const { users } = useGetUsers({
    isActive: true,
    searchText: debounceText,
  });
  const [chatRooms, setChatRooms] = useState<any[]>([]);

  useEffect(() => {
    const chatroomsRef = collection(db, "chatrooms");
    const q = query(
      chatroomsRef,
      where("members", "array-contains", currentUser?._id)
    );
    onSnapshot(q, (snapshot: any) => {
      const rs = snapshot.docs.map((doc: any) => doc.data());
      const adjChatRoomArr = [
        ...rs.map((item: any) => {
          const receiveUserId = item.members.find(
            (item: string) => item != currentUser?._id
          );
          const userInfo = (users || []).find(
            (user: any) => user._id == receiveUserId
          );
          return { ...item, fullName: userInfo?.fullName || "" };
        }),
      ];

      setChatRooms(() => {
        return debounceText
          ? adjChatRoomArr.filter((item) =>
              item.fullName.toLowerCase().includes(debounceText.toLowerCase())
            )
          : adjChatRoomArr;
      });
    });
  }, [debounceText, users]);

  return (
    <div className="bg-[#e4dbd3] w-full h-[calc(100vh-3rem)] flex p-6 pb-4">
      <div className="h-full border-zinc-500 border-r-2 pl-2 min-w-80 max-w-80">
        <div className="flex flex-col gap-1 h-full pr-4 overflow-auto relative">
          <UserFilter setSearchText={setSearchText} text={searchText} />
          <>
            {(chatRooms || []).length > 0 ? (
              chatRooms
                .filter((item: any) => item._id != currentUser?._id)
                .map((item: any, index) => <UserCard key={index} data={item} />)
            ) : (users || []).filter(
                (item: any) => item._id != currentUser?._id
              ).length > 0 ? (
              (users || [])
                .filter((item: any) => item._id != currentUser?._id)
                .map((item: any, index: number) => (
                  <UserCard key={index} data={item} isChatRoom={true} />
                ))
            ) : (
              <h4 className="w-full text-center text-sm font-medium">
                No results.
              </h4>
            )}
          </>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
