import { userService } from "@/services";
import { useCurrentUserStore } from "@/stores";
import { useQuery } from "@tanstack/react-query";

export type TGetUserListDTO = {
  searchText?: string;
  role?: string;
  isActive?: boolean;
};

export const useGetCurrentUser = () => {
  const { signIn } = useCurrentUserStore();

  const { data, isFetching } = useQuery({
    queryKey: ["GET_CURRENT_USER"],
    queryFn: async () => {
      const { data } = await userService.currentUser();
      signIn(data.data);
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { currentUserData: data, isFetchingCurrentUserData: isFetching };
};

export const useGetUsers = (filter: TGetUserListDTO) => {
  const { data, isFetching } = useQuery({
    queryKey: ["GET_ALL_USER", { ...filter }],
    queryFn: async () => {
      const { data } = await userService.getAllUsers(filter);
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { users: data, isFetchingUsers: isFetching };
};

export const useGetUserInfo = (id: string) => {
  const { data, isFetching } = useQuery({
    queryKey: ["GET_USER_INFO", id],
    queryFn: async () => {
      const { data } = await userService.getUserInfo(id);
      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return { userInfo: data, isFetchingUserInfo: isFetching };
};
