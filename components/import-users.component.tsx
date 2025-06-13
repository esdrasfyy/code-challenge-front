"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { UserAPI } from "@/api/user.api";
import { AddressSchema, PersonalSchema, UserSchema } from "@/schemas/user.schema";
import { useToast } from "@/components/ui/toast";
import { TbLoader2, TbUpload } from "react-icons/tb";

export function ImportUserCsv({ refetch }: { refetch: () => void }) {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async (file: File) => {
    setIsLoading(true);

    try {
      const text = await file.text();
      const { data, errors: parseErrors } = Papa.parse(text, { header: true, skipEmptyLines: true });

      if (parseErrors.length > 0) throw new Error("Failed to parse CSV file.");

      let success = 0;
      let failed = 0;

      for (let i = 0; i < data.length; i++) {
        const user: any = data[i];

        try {
          await PersonalSchema.validate(user, { abortEarly: false });
          await AddressSchema.validate(user, { abortEarly: false });
          await UserAPI.Create({ data: { ...user, terms_accepted: true } });

          success++;
        } catch (err: any) {
          failed++;
        }
      }
      refetch();
      addToast({ title: "Import Finished", description: `${success} users imported successfully. ${failed} failed.`, type: failed > 0 ? "warning" : "success", duration: 5000 });
    } catch (error: any) {
      addToast({ title: "Import Error", description: error?.message || "Something went wrong while importing users.", type: "error", duration: 5000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <label className="relative group cursor-pointer">
      <input
        type="file"
        accept=".csv"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleImport(file);
        }}
        className="hidden"
      />
      <div className="bg-secondary-brand min-w-16 h-16 text-2xl rounded-full font-bold flex justify-center items-center cursor-pointer hover:-rotate-180 hover:bg-secondary-brand/60 duration-500">
        {isLoading ? <TbLoader2 className="animate-spin w-6 h-6 text-white" /> : <TbUpload className="w-6 h-6 text-white" />}
      </div>
    </label>
  );
}
