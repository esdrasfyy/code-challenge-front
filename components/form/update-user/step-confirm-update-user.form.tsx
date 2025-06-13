import { PrimaryButtonUi } from "@/components/button/primary-button.ui";
import { SecondaryButtonUi } from "@/components/button/secondary-button.ui";
import { useFormStore } from "@/store/create-user.store";
import { motion } from "framer-motion";
import React from "react";

export function StepConfirmUpdateUser({ onSubmit }: { onSubmit: (e: React.FormEvent) => Promise<any> }) {
  const { formData, prevStep, submission } = useFormStore();

  return (
    <form onSubmit={onSubmit} className="space-y-8 w-full">
      <motion.div className="bg-bg-primary p-6 rounded-xl shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h3 className="font-semibold text-lg text-white mb-4 border-b border-secondary-brand/30 pb-2">Confirme seus dados</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-6 text-sm text-slate-200 mt-8">
          <p>
            <span className="font-semibold">Nome:</span> {formData.personal.full_name}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {formData.personal.email}
          </p>
          <p>
            <span className="font-semibold">Telefone:</span> {formData.personal.phone}
          </p>
          <p>
            <span className="font-semibold">CEP:</span> {formData.address.zip_code}
          </p>
          <p>
            <span className="font-semibold">Endereço:</span> {formData.address.address}, Nº {formData.address.number}
          </p>
          <p>
            <span className="font-semibold">Cidade:</span> {formData.address.city}
          </p>
          <p>
            <span className="font-semibold">Estado:</span> {formData.address.state}
          </p>
        </div>
      </motion.div>

      <motion.div className="flex gap-5 justify-end mt-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
        <SecondaryButtonUi onClick={prevStep} content="Prev" classname="max-w-44" />
        <PrimaryButtonUi type="submit" content="Next" classname="max-w-44" disable={submission.isLoading} loading={submission.isLoading} />
      </motion.div>
    </form>
  );
}
