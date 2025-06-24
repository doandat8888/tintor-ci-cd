import { HeaderLogo } from "@/components/layouts/Header/HeaderLogo";
import { SignInForm } from "@/components/pages/(auth)/sign-in/SignInForm";
import { Separator } from "@/components/ui/separator";
import { useCurrentUserStore } from "@/stores";
import { Link, Navigate } from "react-router-dom";

export const SignInPage = () => {
  const { currentUser } = useCurrentUserStore();
  if (currentUser) {
    return <Navigate to={currentUser.isFirstLogin ? "/welcome" : "/"} />;
  }

  return (
    <div className="bg-[#e4dbd3] w-full h-full p-6 flex items-center">
      <div className="flex flex-col items-center w-[30rem] mx-auto py-6 px-8 bg-white shadow-lg rounded-lg">
        <HeaderLogo className="h-8 mb-2" />
        <h2 className="text-sm text-zinc-500">
          Hello, welcome back to CyberLogitec connection!
        </h2>
        <Separator className="my-4 bg-zinc-500 w-1/2" />
        <SignInForm />
        <h2 className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/sign-up" className="underline font-semibold">
            Sign up
          </Link>
        </h2>
      </div>
    </div>
  );
};
