import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({
      required_error: "Email is required. Please enter your access email.",
    })
    .email({
      message: "Invalid email format. Please enter a valid email address.",
    }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

export const signUpFormSchema = z.object({
  fullName: z
    .string({
      required_error: "Full name is required. Please enter your Full name.",
    })
    .min(2, {
      message: "Full name must have at least 2 characters",
    })
    .max(50, {
      message: "Full name can have at most 50 characters",
    }),
  email: z
    .string({
      required_error: "Email is required. Please enter your access email.",
    })
    .email({
      message: "Invalid email format. Please enter a valid email address.",
    }),
  password: z.string({
    required_error: "Password is required.",
  }),
});

export const welcomeStepOneFormSchema = z.object({
  role: z.string({
    required_error: "Role is required. Please select your role.",
  }),
  employeeNumber: z.string({
    required_error: "Employee Code is required.",
  }),
});

export const welcomeStepTwoFormSchema = z.object({
  skills: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
      {
        required_error: "This field is required.",
      }
    )
    .min(1, {
      message: "You must input at least 1 skills.",
    }),
});

export const welcomeStepThreeFormSchema = z.object({
  experience: z
    .string({
      required_error: "Years of experiences is required",
    }),
    // .int("Value must be an integer.")
    // .positive("Value must be a positive number.")
    // .max(99, "Value must be a number with a maximum of 2 digits."),
  learningGoal: z.string({
    required_error: "Learning goal is required.",
  }),
  interest: z.string({
    required_error: "Interest is required.",
  }),
});

export const welcomeStepFourFormSchema = z.object({
  availability: z
    .string({
      required_error: "Availability is required",
    }),
    // .int("Value must be an integer.")
    // .positive("Value must be a positive number.")
    // .max(99, "Value must be a number with a maximum of 2 digits."),
  department: z.string({
    required_error: "Department is required.",
  }),
  phoneNumber: z.string({
    required_error: "PhoneNumber is required.",
  }),
});
