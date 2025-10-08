import * as yup from "yup"

export const declareFormSchema = yup.object({
  warehouse_id: yup.string().required("Origin warehouse is required"),
  warehouse_id_destination: yup.string().required("Destination warehouse is required"),

  addressTo: yup.object({
    name: yup.string().required("Name is required"),
    company: yup.string().nullable(),
    street1: yup.string().required("Address line 1 is required"),
    street2: yup.string().nullable(),
    city: yup.string().required("City is required"),
    state: yup.string().required("State/Province is required"),
    zip: yup.string().required("Postal code is required"),
    country: yup.string().required("Country is required"),
    phone: yup.string().required("Phone number is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
  }),

  parcels: yup.object({
    length: yup
      .number()
      .positive("Length must be greater than 0")
      .required("Length is required"),
    width: yup
      .number()
      .positive("Width must be greater than 0")
      .required("Width is required"),
    height: yup
      .number()
      .positive("Height must be greater than 0")
      .required("Height is required"),
    distance_unit: yup.string().required("Distance unit is required"), // cm, inch, etc.
    weight: yup
      .number()
      .positive("Weight must be greater than 0")
      .required("Weight is required"),
    mass_unit: yup.string().required("Mass unit is required"), // kg, lb, etc.
  }),

  shippingType: yup.string(),
  warehouse_destination: yup.string(),
  warehouse_destination_country: yup.string(),
  mailboxSelected: yup.string(),

  package_content: yup.array().of(
    yup.object({
      id: yup.string(),
      tracking_id: yup.string().nullable(),
      qty: yup
        .number()
        .min(1, "Minimum quantity is 1")
        .required("Quantity is required"),
      value: yup
        .number()
        .min(0, "Value cannot be negative")
        .required("Value is required"),
      desc: yup.string().required("Description is required"),
      hs_desc: yup.string().nullable(),
      hs_code: yup.string().nullable(),
      made_in: yup.string().nullable(),
      currency: yup.string(),
      subtotal: yup.number(),
    })
  ),
})
