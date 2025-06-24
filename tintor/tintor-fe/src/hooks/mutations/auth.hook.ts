import { TSignInForm } from "@/components/pages/(auth)/sign-in/SignInForm";
import { TSignUpForm } from "@/components/pages/(auth)/sign-up/SignUpForm";
import { auth, db } from "@/configs/firebase";
import { authService, userService } from "@/services";
import { useCurrentUserStore } from "@/stores";
import { useMutation } from "@tanstack/react-query";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const useSignIn = () => {
  const { signIn } = useCurrentUserStore();
  const navigate = useNavigate();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (form: TSignInForm) => {
      const { data } = await authService.signIn(form);

      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);

      const { data: currentUser } = await userService.currentUser();
      signIn(currentUser.data);

      return currentUser.data;
    },
    onSuccess: (data) => {
      data.isFirstLogin ? navigate("/welcome") : navigate("/");
    },
  });

  return {
    mutateSignIn: mutateAsync,
    isPendingSignIn: isPending,
  };
};

export const useSignUp = () => {
  const navigate = useNavigate();
  const { signIn } = useCurrentUserStore();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (form: TSignUpForm) => {
      const { data } = await authService.signUp(form);
      const { user: firebaseUser } = await createUserWithEmailAndPassword(
        auth,
        form.email || "",
        form.password || ""
      );

      Cookies.set("fireBaseUid", firebaseUser.uid);
      Cookies.set("accessToken", data.accessToken);
      Cookies.set("refreshToken", data.refreshToken);

      const { data: currentUser } = await userService.currentUser();
      const userDocRef = doc(db, "users", firebaseUser.uid);
      await setDoc(userDocRef, {
        uid: firebaseUser.uid,
        email: form.email,
        fullName: currentUser.data.fullName,
        createdAt: new Date().toISOString(),
      });

      signIn(currentUser.data);
    },
    onSuccess: () => {
      navigate("/welcome");
    },
  });

  return {
    mutateSignUp: mutateAsync,
    isPendingSignUp: isPending,
  };
};
