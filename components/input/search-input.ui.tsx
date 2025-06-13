"use client";

import { useRef, useState, KeyboardEvent } from "react";
import { LiaSearchSolid, LiaTimesSolid } from "react-icons/lia";

interface SearchUiProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onSubmit?: (value: string) => void;
  onChange?: (value: string) => void;
  onClear: () => void;
}

export const SearchUi = ({ placeholder = "Search by name or email", defaultValue = "", onSubmit, onChange, value, onClear }: SearchUiProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit?.(value ?? "");
    }
  };

  const handleSubmitClick = () => {
    onSubmit?.(value ?? "");
  };

  const handleClear = () => {
    onClear();
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full max-w-md mt-[7px]">
      <button type="button" onClick={handleSubmitClick} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FF4D4D]">
        <LiaSearchSolid size={20} />
      </button>
      <input ref={inputRef} type="text" placeholder={placeholder} value={value} onChange={(e) => onChange?.(e.target.value)} onKeyDown={handleKeyDown} className="w-full bg-bg-secondary text-text-secondary py-[11.5px] max-h-[48px] pl-12 pr-12 rounded-md text-[17px] outline-none" />
      {value && (
        <button type="button" onClick={handleClear} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF4D4D]">
          <LiaTimesSolid size={20} />
        </button>
      )}
    </div>
  );
};
