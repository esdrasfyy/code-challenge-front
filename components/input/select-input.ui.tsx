import React from "react";
import ReactSelect, { SingleValue, MultiValue, ActionMeta, StylesConfig } from "react-select";
import { theme } from "../ui/theme.ui";
import { ErrorUi } from "../ui/error.ui";

type SelectItem = { label: string; value: string };

interface SelectUiProps {
  items: SelectItem[];
  onChange: (value: string) => void;
  defaultValue?: string;
  width?: string;
  error?: string;
  label?: string;
  tag_required?: boolean;
  value?: string;
}

export function SelectUi({ items, onChange, defaultValue, width = "w-[320px]", label, error, tag_required, value }: SelectUiProps) {
  const defaultOption = items.find((item) => item.value === defaultValue) || null;

  const customStyles: StylesConfig<SelectItem> = {
    control: (base) => ({
      ...base,
      backgroundColor: theme.colors.bg.secondary,
      borderRadius: 6,
      minHeight: 48,
      fontSize: 16,
      boxShadow: "none",
      cursor: "pointer",
      border: `none`,
      animationDuration: "300ms",
    }),
    singleValue: (base) => ({
      ...base,
      color: theme.colors.text.secondary,
    }),
    menu: (base) => ({
      ...base,
      borderRadius: 6,
      backgroundColor: theme.colors.bg.tertiary,
      marginTop: 6,
      border: `1px solid ${theme.colors.brand.primary}`,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected || state.isFocused ? theme.colors.brand.tertiary : theme.colors.bg.secondary,
      color: state.isSelected || state.isFocused ? "#FF4D4D" : theme.colors.text.secondary,
      cursor: "pointer",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#FF4D4D",
    }),
    indicatorSeparator: () => ({ display: "none" }),
  };

  const handleChange = (newValue: SingleValue<SelectItem> | MultiValue<SelectItem>, _actionMeta: ActionMeta<SelectItem>) => {
    const option = newValue as SingleValue<SelectItem>;
    if (option) onChange(option.value);
  };

  return (
    <div className={`${width} relative shadow-2xl`}>
      <label className={`${error === "required" ? "text-red-300" : "text-textColor"} block text-sm font-medium mb-2`}>
        {label}
        {tag_required && <span className="text-secondary-brand"> *</span>}
      </label>
      <ReactSelect instanceId="uniqueId" isSearchable={false} options={items} defaultValue={defaultOption} onChange={handleChange} styles={customStyles} />
      {error && error !== "required" && <ErrorUi message={error} />}
    </div>
  );
}
