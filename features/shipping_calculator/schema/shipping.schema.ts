import * as yup from "yup";

export const shippingFormSchema = yup.object().shape({
  dimension: yup.object().shape({
    length: yup
      .number()
      .min(1)
      .typeError("Package length must be a number")
      .positive("Package length must be positive")
      .required("Package length is required"),
    width: yup
      .number()
      .typeError("Package width must be a number")
      .positive("Package width must be positive")
      .required("Package width is required"),
    height: yup
      .number()
      .typeError("Package height must be a number")
      .positive("Package height must be positive")
      .required("Package height is required"),
    weight: yup
      .number()
      .typeError("Package weight must be a number")
      .positive("Package weight must be positive")
      .required("Package weight is required"),
    weight_unit: yup
      .string()
      .oneOf(["lbs", "kg", "oz", "g"], "Invalid weight unit")
      .required("Weight unit is required"),
    dimension_unit: yup
      .string()
      .oneOf(["in", "cm", "m", "ft"], "Invalid dimension unit")
      .required("Dimension unit is required"),
  }),

  shipped_from: yup.object().shape({
    country: yup.string(),
    state: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    address: yup.string(),
    address2: yup.string(),
    warehouse_code: yup.string(),
  }),

  shipped_to: yup.object().shape({
    name: yup.string(),
    country: yup.string().required("Destination country is required"),
    state: yup.string().required("Destination state is required"),
    city: yup.string().required("Destination city is required"),
    zip: yup.string().required("Destination zip code is required"),
    address: yup.string().required("Destination address is required"),
    address2: yup.string(),
    email: yup.string().email("Invalid email format"),
    phone: yup.string(),
  }),

  shippingType: yup.string(),
  warehouse_destination: yup.string(),
  warehouse_destination_country: yup.string(),
  mailboxSelected: yup.string(),

  package_content: yup.array().of(
    yup.object({
      id: yup.string(),
      tracking_id: yup.string().nullable(),
      qty: yup.number().min(0),
      value: yup.number().min(0),
      desc: yup.string(),
      hs_desc: yup.string().nullable(),
      hs_code: yup.string().nullable(),
      made_in: yup.string().nullable(),
      currency: yup.string(),
      subtotal: yup.number().min(0),
    })
  ),

  total_package_value: yup
    .number()
    .typeError("Total package value must be a number")
    .min(0, "Total package value cannot be negative"),
  currency_package_value: yup.string(),
});

export type ShippingFormSchema = yup.InferType<typeof shippingFormSchema>;

export const SHIPPING_FORM_DEFAULTS: ShippingFormSchema = {
  dimension: {
    weight_unit: "lbs",
    dimension_unit: "in",
    weight: 0,
    length: 0,
    width: 0,
    height: 0,
  },
  shipped_to: {
    name: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    address: "",
    address2: "",
    email: "",
    phone: "",
  },
  shipped_from: {
    address2: "",
  },
  shippingType: "",
  warehouse_destination: "",
  warehouse_destination_country: "",
  mailboxSelected: "VRN",
  package_content: [],
  currency_package_value: "CAD",
  total_package_value: 0,
};
