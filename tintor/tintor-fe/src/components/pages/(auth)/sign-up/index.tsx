import { SignUpForm } from "@/components/pages/(auth)/sign-up/SignUpForm";
import { Separator } from "@/components/ui/separator";
import { useCurrentUserStore } from "@/stores";
import { Link, Navigate } from "react-router-dom";

export const SignUpPage = () => {
  const { currentUser } = useCurrentUserStore();
  if (currentUser) {
    return <Navigate to={currentUser.isFirstLogin ? "/welcome" : "/"} />;
  }

  return (
    <div className="bg-[#e4dbd3] w-full h-full p-6 flex items-center">
      <div className="flex flex-col items-center w-[30rem] mx-auto py-6 px-8 bg-white shadow-lg rounded-lg">
        <h1 className="uppercase font-bold text-xl mb-2">
          Sign up your account
        </h1>
        <h2 className="text-sm text-zinc-500 text-center">
          Join the Tinter Community — Where Mentorship Meets Opportunity!
        </h2>
        <Separator className="my-4 bg-zinc-500 w-1/2" />
        <SignUpForm />
        <h2 className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/sign-in" className="underline font-semibold">
            Sign in
          </Link>
        </h2>
      </div>
    </div>
  );
};
