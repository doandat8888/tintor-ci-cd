import { AppLayout } from "@/components/layouts/AppLayout";
import {
  HomePage,
  MentorsPage,
  NotFound,
  SignInPage,
  SignUpPage,
  WelcomePage,
} from "@/components/pages";
import { ChatPage } from "@/components/pages/(app)/chat";
import { ChatBanner } from "@/components/pages/(app)/chat/chat-banner";
import { ChatInfoPage } from "@/components/pages/(app)/chat/chat-info";
import { MentorDetailPage } from "@/components/pages/(app)/mentors/mentor-detail";
import { createBrowserRouter, Outlet } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
        children: [
          { path: "", element: <ChatBanner /> },
          {
            path: ":id",
            element: <ChatInfoPage />,
          },
        ],
      },
      {
        path: "mentors",
        element: <Outlet />,
        children: [
          {
            path: "",
            element: <MentorsPage />,
          },
          {
            path: ":id",
            element: <MentorDetailPage />,
          },
        ],
      },
      {
        path: "sign-in",
        element: <SignInPage />,
      },
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
