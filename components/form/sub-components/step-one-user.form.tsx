import { PrimaryButtonUi } from "@/components/button/primary-button.ui";
import { InputDefaultUi } from "@/components/input/default-input.ui";
import { useFormStore } from "@/store/create-user.store";
import { formatPhone } from "@/utils/masks";
import { motion } from "framer-motion";
import React from "react";

export function StepOneUser() {
  const { formData, formErrors, setPersonalData, validatePersonalStep, nextStep } = useFormStore();
  const { full_name, email, phone } = formData.personal;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let new_value = value;
    if (name === "phone") new_value = formatPhone(value);
    setPersonalData({ [name]: new_value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validatePersonalStep();
    if (isValid) nextStep();
  };

  return (
    <form onSubmit={handleNextStep} className="space-y-6 w-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <InputDefaultUi name="full_name" label="Fullname" value={full_name} onChange={handleChange} error={formErrors.personal?.full_name} tag_required />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <InputDefaultUi name="email" label="Email" value={email} onChange={handleChange} error={formErrors.personal?.email} tag_required />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <InputDefaultUi name="phone" label="Phone" value={phone} onChange={handleChange} error={formErrors.personal?.phone} tag_required />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex gap-5 justify-end mt-20">
        <PrimaryButtonUi type="submit" content="Next" classname="max-w-44" />
      </motion.div>
    </form>
  );
}
