import { Update } from "./../node_modules/next/dist/build/swc/types.d";
import { api } from "@/lib/axios.lib";
import { create } from "zustand";
import * as yup from "yup";
import { AddressSchema, PersonalSchema, UserSchema } from "@/schemas/user.schema";
import { AxiosError, AxiosResponse } from "axios";
import { UserAPI } from "@/api/user.api";
import { StatesBR } from "@/enums/form.enum";

type FormData = {
  personal: User.Personal;
  address: User.Address;
  terms_accepted: boolean;
};

type SubmissionStatus = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string | null;
};

type FormErrors = {
  personal?: Partial<Record<keyof User.Personal, string>>;
  address?: Partial<Record<keyof User.Address, string>>;
};

type FormState = {
  step: number;
  formData: FormData;
  submission: SubmissionStatus;
  formErrors: FormErrors;
  setPersonalData: (data: Partial<User.Personal>) => void;
  setAddressData: (data: Partial<User.Address>) => void;
  setTermsAccepted: (accepted: boolean) => void;
  setFormErrors: (errors: FormErrors) => void;
  clearFormErrors: () => void;
  validatePersonalStep: () => boolean;
  validateAddressStep: () => boolean;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  submitForm: () => Promise<AxiosResponse<any>>;
  updateUser: (id: number) => Promise<AxiosResponse<any>>;
};

const INITIAL_FORM_DATA: FormData = {
  personal: { full_name: "", email: "", phone: "" },
  address: { zip_code: "", address: "", number: "", city: "", state: "" },
  terms_accepted: false,
};

const INITIAL_SUBMISSION_STATUS: SubmissionStatus = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

const MAX_STEP = 3;
const MIN_STEP = 1;

export const useFormStore = create<FormState>((set, get) => ({
  step: 1,
  formData: { ...INITIAL_FORM_DATA },
  submission: { ...INITIAL_SUBMISSION_STATUS },
  formErrors: {},

  setFormErrors: (errors) => set({ formErrors: errors }),
  clearFormErrors: () => set({ formErrors: {} }),

  setPersonalData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        personal: { ...state.formData.personal, ...data },
      },
    })),

  setAddressData: (data) =>
    set((state) => ({
      formData: {
        ...state.formData,
        address: { ...state.formData.address, ...data },
      },
    })),

  setTermsAccepted: (accepted) =>
    set((state) => ({
      formData: {
        ...state.formData,
        terms_accepted: accepted,
      },
    })),

  nextStep: () =>
    set((state) => ({
      step: Math.min(state.step + 1, MAX_STEP),
    })),

  prevStep: () =>
    set((state) => ({
      step: Math.max(state.step - 1, MIN_STEP),
    })),

  resetForm: () =>
    set(() => ({
      step: MIN_STEP,
      formData: { ...INITIAL_FORM_DATA },
      submission: { ...INITIAL_SUBMISSION_STATUS },
      formErrors: {},
    })),

  validatePersonalStep: () => {
    const { formData, setFormErrors } = get();

    try {
      PersonalSchema.validateSync(formData.personal, { abortEarly: false });
      set({ formErrors: {} });
      return true;
    } catch (err: any) {
      if (err.inner) {
        const errors: FormErrors = { personal: {} };
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) errors.personal![e.path as keyof User.Personal] = e.message;
        });
        setFormErrors(errors);
      }
      return false;
    }
  },
  validateAddressStep: () => {
    const { formData, setFormErrors } = get();

    try {
      AddressSchema.validateSync(formData.address, { abortEarly: false });
      set({ formErrors: {} });
      return true;
    } catch (err: any) {
      if (err.inner) {
        const errors: FormErrors = { address: {} };
        err.inner.forEach((e: yup.ValidationError) => {
          if (e.path) errors.address![e.path as keyof User.Address] = e.message;
        });
        setFormErrors(errors);
      }
      return false;
    }
  },

  submitForm: async (): Promise<AxiosResponse<any>> => {
    const { formData } = get();

    set({ submission: { ...INITIAL_SUBMISSION_STATUS, isLoading: true } });

    try {
      await UserSchema.validate(formData, { abortEarly: true });
      const state = Object.keys(StatesBR).find((key) => StatesBR[key as keyof typeof StatesBR] === formData.address.state) as string;
      const response = await UserAPI.Create({ data: { ...formData.personal, ...formData.address, terms_accepted: formData.terms_accepted, state } });
      set({ submission: { ...INITIAL_SUBMISSION_STATUS, isSuccess: true } });
      return response;
    } catch (error: any) {
      set({ submission: { ...INITIAL_SUBMISSION_STATUS, isSuccess: false, isError: true } });
      const errorMessage = (typeof error?.message === "string" && error.message) || "Erro desconhecido";
      set({ submission: { ...INITIAL_SUBMISSION_STATUS, isSuccess: false, isError: true, errorMessage } });
      throw error;
    }
  },

  updateUser: async (id: number): Promise<AxiosResponse<any>> => {
    const { formData } = get();

    set({ submission: { ...INITIAL_SUBMISSION_STATUS, isLoading: true } });

    try {
      get().validatePersonalStep();
      get().validateAddressStep();
      const response = await UserAPI.Update({ ...formData.personal, ...formData.address, id });
      set({ submission: { ...INITIAL_SUBMISSION_STATUS, isSuccess: true } });
      return response;
    } catch (error: any) {
      set({ submission: { ...INITIAL_SUBMISSION_STATUS, isSuccess: false, isError: true } });
      const errorMessage = (typeof error?.message === "string" && error.message) || "Erro desconhecido";
      set({ submission: { ...INITIAL_SUBMISSION_STATUS, isSuccess: false, isError: true, errorMessage } });
      throw error;
    }
  },
}));
