import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loader-button";
import { signInFormSchema } from "@/constants/zod-schemas";
import { useSignIn } from "@/hooks/mutations/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type TSignInForm = {
  email?: string;
  password?: string;
};

export const SignInForm = () => {
  const { isPendingSignIn, mutateSignIn } = useSignIn();
  const form = useForm<TSignInForm>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {},
  });

  async function onSubmit(values: TSignInForm) {
    try {
      await mutateSignIn(values);
    } catch (ex: any) {
      toast.error(ex.response.data.msg);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input
                  size={10}
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Password</FormLabel>
              <FormControl>
                <Input
                  size={10}
                  type="password"
                  placeholder="Enter a password"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-4">
          <LoadingButton
            loading={isPendingSignIn}
            type="submit"
            className="text-xs w-full mx-auto font-semibold"
          >
            Sign in
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
