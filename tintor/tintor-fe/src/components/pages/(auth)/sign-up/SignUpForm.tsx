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
import { signUpFormSchema } from "@/constants/zod-schemas";
import { useSignUp } from "@/hooks/mutations/auth.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type TSignUpForm = {
  fullName?: string;
  email?: string;
  password?: string;
};

export const SignUpForm = () => {
  const { isPendingSignUp, mutateSignUp } = useSignUp();
  const form = useForm<TSignUpForm>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {},
  });

  async function onSubmit(values: TSignUpForm) {
    try {
      await mutateSignUp(values);
    } catch (ex: any) {
      toast.error(ex.response.data.msg);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Full name</FormLabel>
              <FormControl>
                <Input placeholder="Type your name" {...field} />
              </FormControl>
              <FormMessage className="text-xs font-normal" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-semibold">Email</FormLabel>
              <FormControl>
                <Input
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
            loading={isPendingSignUp}
            type="submit"
            className="text-xs w-full mx-auto font-semibold"
          >
            Create a account
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};
