import { PrimaryButtonUi } from "@/components/button/primary-button.ui";
import { SecondaryButtonUi } from "@/components/button/secondary-button.ui";
import { InputDefaultUi } from "@/components/input/default-input.ui";
import { SelectUi } from "@/components/input/select-input.ui";
import { StatesBR } from "@/enums/form.enum";
import { useFormStore } from "@/store/create-user.store";
import { formatCEP } from "@/utils/masks";
import axios from "axios";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { theme } from "@/components/ui/theme.ui";

export function StepTwoUser() {
  const [loadingCep, setLoadingCep] = useState(false);
  const { formData, formErrors, setAddressData, validateAddressStep, nextStep, prevStep } = useFormStore();
  const { zip_code, address, number, city, state } = formData.address;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let new_value = value;
    if (name === "zip_code") new_value = formatCEP(value);
    setAddressData({ [name]: new_value });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = validateAddressStep();
    if (isValid) nextStep();
  };

  return (
    <form onSubmit={handleNextStep} className="space-y-6 w-full">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <InputDefaultUi
          name="zip_code"
          label="ZIP CODE"
          value={zip_code}
          onChange={handleChange}
          error={formErrors.address?.zip_code}
          tag_required
          loading={loadingCep}
          onBlur={async (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value.replace(/\D/g, "");
            if (value.length === 8) {
              try {
                setLoadingCep(true);
                const { data } = await axios.get(`https://viacep.com.br/ws/${value}/json/`);
                if (!data.erro) {
                  setAddressData({ ["address"]: data.logradouro });
                  setAddressData({ ["city"]: data.localidade });
                  setAddressData({ state: data.uf });
                }
              } catch (error) {
              } finally {
                setLoadingCep(false);
              }
            }
          }}
        />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <InputDefaultUi name="address" label="Address" value={address} onChange={handleChange} error={formErrors.address?.address} tag_required />
      </motion.div>

      <motion.div className="flex gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }}>
        <InputDefaultUi name="number" label="Number" value={number} onChange={handleChange} error={formErrors.address?.number} tag_required />
        <InputDefaultUi name="city" label="City" value={city} onChange={handleChange} error={formErrors.address?.city} tag_required />
        <SelectUi bg={theme.colors.bg.primary} items={Object.entries(StatesBR).map(([uf, name]) => ({ label: name, value: uf }))} error={formErrors.address?.state} label="State" tag_required value={state} onChange={(selected) => setAddressData({ ["state"]: selected })} width="w-full" />
      </motion.div>

      <motion.div className="flex gap-5 justify-end mt-20" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <SecondaryButtonUi onClick={prevStep} content="Prev" classname="max-w-44" />
        <PrimaryButtonUi type="submit" content="Next" classname="max-w-44" />
      </motion.div>
    </form>
  );
}
