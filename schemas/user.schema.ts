import * as yup from "yup";

export const PersonalSchema = yup.object().shape({
  full_name: yup.string().required("required").min(3, "Full name must be at least 3 characters"),
  email: yup.string().required("required").email("Invalid email"),
  phone: yup
    .string()
    .required("required")
    .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, "Invalid phone number"),
});

export const AddressSchema = yup.object().shape({
  zip_code: yup
    .string()
    .required("required")
    .matches(/^\d{5}-?\d{3}$/, "Invalid ZIP code"),
  address: yup.string().required("required"),
  number: yup.string().required("required"),
  city: yup.string().required("required"),
  state: yup.string().required("required").oneOf(["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"], "Invalid state"),
});

export const UserSchema = yup.object().shape({
  personal: PersonalSchema,
  address: AddressSchema,
  terms_accepted: yup.boolean().oneOf([true], "You must accept the terms to continue"),
});
