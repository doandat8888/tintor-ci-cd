import { create } from "zustand";

export enum UserRole {
  USER = "user",
  MENTOR = "mentor",
}

export interface User {
  _id: string;
  fullName: string;
  role: UserRole;
  email: string;
  isActive: boolean;
  isFirstLogin: boolean;
  [key: string]: any;
}

interface UserState {
  currentUser?: User;
  signIn: (user: User) => void;
  signOut: () => void;
}

export const useCurrentUserStore = create<UserState>((set) => ({
  currentUser: undefined,
  signIn: (user) => set({ currentUser: user }),
  signOut: () => set({ currentUser: undefined }),
}));
