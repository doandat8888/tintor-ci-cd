import {
  TStepFourForm,
  TStepOneForm,
  TStepThreeForm,
  TStepTwoForm,
} from "@/components/pages/(app)/welcome";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import MultipleSelector, { Option } from "@/components/ui/multi-selector";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCurrentUserStore } from "@/stores";
import { UseFormReturn } from "react-hook-form";

export const UpdateUserForm = ({ step, form }: { step: number; form: any }) => {
  switch (step) {
    case 1:
      return <FormStepOne form={form} />;
    case 2:
      return <FormStepTwo form={form} />;
    case 3:
      return <FormStepThree form={form} />;
    case 4:
      return <FormStepFour form={form} />;
  }
};

const FormStepOne = ({
  form,
}: {
  form: UseFormReturn<TStepOneForm, any, undefined>;
}) => {
  const { currentUser } = useCurrentUserStore();

  return (
    <div className="flex flex-col w-full mt-6">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <h2 className="text-zinc-500 text-sm">
                  Dear{" "}
                  <span className="text-my-blue font-semibold">
                    {currentUser?.fullName}
                  </span>
                  , which role are you?
                </h2>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="mentor">Mentor</SelectItem>
                      <SelectItem value="mentee">Mentee</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="employeeNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Employee Code
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 123456" {...field} />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

const FormStepTwo = ({
  form,
}: {
  form: UseFormReturn<TStepTwoForm, any, undefined>;
}) => {
  const options: Option[] = [
    { "label": "Python", "value": "Python" },
    { "label": "Leadership", "value": "Leadership" },
    { "label": "Time Management", "value": "Time Management" },
    { "label": "Data Analysis", "value": "Data Analysis" },
    { "label": "Java", "value": "Java" },
    { "label": "Teamwork", "value": "Teamwork" },
    { "label": "Project Management", "value": "Project Management" },
    { "label": "UI/UX Design", "value": "UI/UX Design" },
    { "label": "Public Speaking", "value": "Public Speaking" },
    { "label": "Creative Thinking", "value": "Creative Thinking" },
    { "label": "Marketing", "value": "Marketing" }
  ];

  return (
    <div className="flex flex-col w-full mt-6">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="skills"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Personal skills
                </FormLabel>
                <FormControl>
                  <MultipleSelector
                    {...field}
                    placeholder="Select you options ..."
                    defaultOptions={options}
                    badgeClassName="bg-my-blue hover:bg-my-blue/90"
                    emptyIndicator={
                      <p className="text-center text-xs leading-10 text-gray-600 dark:text-gray-400">
                        No results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

const FormStepThree = ({
  form,
}: {
  form: UseFormReturn<TStepThreeForm, any, undefined>;
}) => {
  const learningGoals: string[] = [
    "Leadership",
    "AI",
    "Python",
    "Automation Test",
    "Soft Skills",
    "Others",
  ];
  const interests: string[] = [
    "Sports",
    "Swimming",
    "Reading",
    "Traveling",
    "Technology",
    "Cooking",
    "Singing",
    "Others",
  ];
  return (
    <div className="flex flex-col w-full mt-6">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 w-full">
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Year of experiences
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 3" {...field} />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="learningGoal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Learning Goal
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select learning goal" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {learningGoals.map((goal) => (
                        <SelectItem key={goal} value={goal}>
                          {goal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Interest
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your interest" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {interests.map((interest) => (
                        <SelectItem key={interest} value={interest}>
                          {interest}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

const FormStepFour = ({
  form,
}: {
  form: UseFormReturn<TStepFourForm, any, undefined>;
}) => {
  const availabilities: string[] = [
    "Flexible",
    "Specific hours",
  ];
  const departments: string[] = [
    "LSG",
    "DSG",
    "SSG",
    "DAS",
    "EDS",
    "AIC",
    "TS",
  ];
  return (
    <div className="flex flex-col w-full mt-6">
      <Form {...form}>
        <form onSubmit={() => {}} className="space-y-4 w-full">
        <FormField
            control={form.control}
            name="availability"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Availability
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your availability" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availabilities.map((availability) => (
                        <SelectItem key={availability} value={availability}>
                          {availability}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Department
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your Department" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {departments.map((department) => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-zinc-500 font-normal">
                  Phone number
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 3" {...field} />
                </FormControl>
                <FormMessage className="text-xs font-normal" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
