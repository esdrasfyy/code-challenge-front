import * as yup from "yup";

export const PersonalSchema = yup.object().shape({
  full_name: yup.string().required("Nome completo é obrigatório").min(3),
  email: yup.string().required("Email é obrigatório").email("Email inválido"),
  phone: yup.string().required("Telefone é obrigatório").min(10, "Telefone inválido"),
});

export const AddressSchema = yup.object().shape({
  zip_code: yup.string().required("CEP é obrigatório").min(8, "CEP inválido"),
  address: yup.string().required("Rua é obrigatória"),
  number: yup.string().required("Número é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup.string().required("Estado é obrigatório"),
});

export const UserSchema = yup.object().shape({
  personal: PersonalSchema,
  address: AddressSchema,
  terms_accepted: yup.boolean().oneOf([true], "Você precisa aceitar os termos para continuar"),
});
