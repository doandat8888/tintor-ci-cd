import { TSignInForm } from "@/components/pages/(auth)/sign-in/SignInForm";
import { TSignUpForm } from "@/components/pages/(auth)/sign-up/SignUpForm";
import api from "@/configs/axios";

class AuthService {
  signIn = async (form: TSignInForm) => {
    return await api.post("auth/login", form);
  };
  signUp = async (form: TSignUpForm) => {
    return await api.post("auth/register", {
      ...form,
      role: "unknown",
    });
  };
}

export const authService = new AuthService();
