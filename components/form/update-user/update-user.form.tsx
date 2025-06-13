"use client";

import React, { useState } from "react";
import { ModalUi } from "@/components/ui/modal.ui";
import { useToast } from "@/components/ui/toast";
import { StepOneUser } from "../sub-components/step-one-user.form";
import { StepTwoUser } from "../sub-components/step-two-user.form";
import { useFormStore } from "@/store/create-user.store";
import { IoCheckmarkOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { StepConfirmUpdateUser } from "./step-confirm-update-user.form";

export function UpdateUserForm({ user, refetch }: { user: User.I; refetch: () => void }) {
  const { addToast } = useToast();
  const { formData, updateUser, step: stepCurr, resetForm, setPersonalData, setAddressData, setTermsAccepted } = useFormStore();
  const [open, setOpen] = useState<boolean>(false);

  const steps = [
    { step: 1, title: "Personal", description: "Edit the user's personal details" },
    { step: 2, title: "Address", description: "Edit the user's address information" },
    { step: 3, title: "Review", description: "Review all details before submitting changes" },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms_accepted) return addToast({ title: "Terms not accepted", description: "Please accept the terms and conditions to continue.", type: "error", duration: 5000 });

    try {
      const response = await updateUser(user.id);
      if (response.status === 200 || response.status === 201) {
        setOpen(false);
        refetch();
        resetForm();
        addToast({ title: "User Updated", description: "The user has been successfully updated.", type: "success", duration: 5000 });
      } else {
        addToast({ title: "Update Error", description: "Something went wrong. Please try again.", type: "error", duration: 5000 });
      }
    } catch (error: any) {
      const status = error?.response?.status;
      switch (status) {
        case 400:
          addToast({ title: "Invalid Data", description: error.response.data.message ?? "Please review the fields and try again.", type: "error", duration: 5000 });
          break;
        case 404:
          addToast({ title: "User Not Found", description: error.response.data.message ?? "Could not find the user to update.", type: "error", duration: 5000 });
          break;
        case 409:
          addToast({ title: "Conflict", description: error.response.data.message ?? "This email is already registered.", type: "error", duration: 5000 });
          break;
        case 500:
          addToast({ title: "Server Error", description: error.response.data.message ?? "An internal error occurred. Please try again later.", type: "error", duration: 5000 });
          break;
        default:
          addToast({ title: "Unknown Error", description: error?.message || "An unexpected error occurred. Please try again.", type: "error", duration: 5000 });
          break;
      }
    }
  };

  const onOpen = () => {
    setPersonalData({ full_name: user.full_name, email: user.email, phone: user.phone });

    setAddressData({ zip_code: user.zip_code, address: user.address, number: user.number, city: user.city, state: user.state });

    setTermsAccepted(true);

    setOpen(true);
  };

  return (
    <>
      <ModalUi isVisible={open} onClose={() => setOpen(false)} title="Update User" description="Edit and update user details">
        <div className="flex space-x-36 w-full py-14 items-center max-md:flex-col max-md:space-x-0 max-md:py-4">
          <aside className="space-y-5 flex flex-col justify-end items-end max-md:flex-row max-md:space-y-0 max-md:w-full max-md:items-center max-md:justify-between max-md:mb-16">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-between gap-5 w-80 max-md:items-center max-md:w-fit max-md:flex-row-reverse">
                  <div className="flex w-full flex-col items-end justify-end">
                    <h4 className="text-lg font-semibold max-md:text-sm">{step.title}</h4>
                    <p className="opacity-45 w-fit text-sm max-md:hidden">{step.description}</p>
                  </div>
                  <div className={`duration-300 rounded-full text-2xl min-w-[50px] h-[50px] max-md:min-w-[20px] max-md:h-[20px] max-md:text-sm ${stepCurr === step.step ? "bg-secondary-brand" : "bg-bg-primary"} flex justify-center items-center`}>
                    {stepCurr <= step.step ? step.step : <IoCheckmarkOutline size={25} />}
                  </div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex justify-center mr-6 max-md:mr-0">
                    <div className="w-[1px] h-[60px] max-md:h-[1px] max-md:w-[20px] bg-primary-brand overflow-hidden">
                      <div className={`w-full transition-all duration-300 ${stepCurr > step.step ? "h-full bg-secondary-brand" : "h-0"}`} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </aside>

          {stepCurr === 1 && <StepOneUser />}
          {stepCurr === 2 && <StepTwoUser />}
          {stepCurr === 3 && <StepConfirmUpdateUser onSubmit={onSubmit} />}
        </div>
      </ModalUi>

      <button className="p-1 cursor-pointer rounded hover:bg-white/10 text-white/60 hover:text-blue-400 transition-colors duration-300" onClick={onOpen}>
        <CiEdit size={18} />
      </button>
    </>
  );
}
