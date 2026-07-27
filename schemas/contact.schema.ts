import * as yup from "yup";

export const contactSchema = yup.object({
  full_name: yup.string().required("Full name is required").max(100, "Full name must be less than 100 characters"),

  email: yup.string().email("Invalid email address").required("Email is required"),

  phone_number: yup
    .string()
    .nullable()
    .transform((value) => value || null)
    .matches(/^[+]?[\d\s()-]*$/, "Please enter a valid phone number"),

  subject: yup.string().required("Subject is required").max(150),

  message: yup
    .string()
    .required("Message is required")
    .min(20, "Message should contain at least 20 characters")
    .max(2000),
});

export type ContactFormValues = yup.InferType<typeof contactSchema>;
