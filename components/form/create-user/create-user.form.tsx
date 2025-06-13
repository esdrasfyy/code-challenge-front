"use client";

import { ModalUi } from "@/components/ui/modal.ui";
import React, { useState } from "react";
import { LiaPlusSolid } from "react-icons/lia";
import { IoCheckmarkOutline } from "react-icons/io5";
import { StepOneUser } from "../sub-components/step-one-user.form";
import { useFormStore } from "@/store/create-user.store";
import { StepConfirmCreateUser } from "./step-confirm-create-user.form";
import { useToast } from "@/components/ui/toast";
import { StepTwoUser } from "../sub-components/step-two-user.form";

export function CreateUserForm({ refetch }: { refetch: () => void }) {
  const { addToast } = useToast();
  const { formData, submitForm, step: stepCurr, resetForm } = useFormStore();
  const [open, setOpen] = useState<boolean>(false);

  const steps = [
    { step: 1, title: "Personal Information", description: "Enter the user's personal details" },
    { step: 2, title: "Address", description: "Enter the user's address information" },
    { step: 3, title: "Review & Submit", description: "Review all details before submitting" },
  ];

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms_accepted) {
      return addToast({ title: "Terms not accepted", description: "Please accept the terms and conditions to continue.", type: "error", duration: 5000 });
    }

    try {
      const response = await submitForm();
      if (response.status === 201 || response.status === 200) {
        setOpen(false);
        refetch();
        resetForm();
        addToast({ title: "User Created", description: "The user has been successfully added to the system.", type: "success", duration: 5000 });
      } else {
        addToast({ title: "Submission Error", description: "Something went wrong. Please try again.", type: "error", duration: 5000 });
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

  return (
    <>
      <button onClick={() => setOpen(true)} className="bg-secondary-brand min-w-16 h-16 text-2xl rounded-full font-bold flex justify-center items-center cursor-pointer hover:-rotate-180 hover:bg-secondary-brand/60 duration-500">
        <LiaPlusSolid />
      </button>

      <ModalUi isVisible={open} onClose={() => setOpen(false)} title="Create New User" description="Fill in the details to create a new user">
        <div className="flex space-x-36 w-full py-14 items-center">
          <aside className="space-y-5 flex flex-col justify-end items-end">
            {steps.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex justify-between gap-5 w-80">
                  <div className="flex w-full flex-col items-end justify-end">
                    <h4 className="text-lg font-semibold">{step.title}</h4>
                    <p className="opacity-45 w-fit text-sm">{step.description}</p>
                  </div>
                  <div className={`duration-300 rounded-full text-2xl min-w-[50px] h-[50px] ${stepCurr === step.step ? "bg-secondary-brand" : "bg-bg-primary"} flex justify-center items-center`}>{stepCurr <= step.step ? step.step : <IoCheckmarkOutline size={25} />}</div>
                </div>

                {i < steps.length - 1 && (
                  <div className="flex justify-center mr-6">
                    <div className="w-[1px] h-[60px] bg-primary-brand overflow-hidden">
                      <div className={`w-full transition-all duration-300 ${stepCurr > step.step ? "h-full bg-secondary-brand" : "h-0"}`} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </aside>

          {stepCurr === 1 && <StepOneUser />}
          {stepCurr === 2 && <StepTwoUser />}
          {stepCurr === 3 && <StepConfirmCreateUser onSubmit={onSubmit} />}
        </div>
      </ModalUi>
    </>
  );
}
