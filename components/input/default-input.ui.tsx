import { TbLoader3 } from "react-icons/tb";
import { ErrorUi } from "../ui/error.ui";

type InputDefaultUiProps = {
  label: string;
  error?: string;
  tag_required?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name: string;
  loading?: boolean;
  disable?: boolean;
  classname?: string;
};

export function InputDefaultUi({ label, error, onChange, required, value, name, loading, disable, tag_required, onBlur, classname }: InputDefaultUiProps) {
  return (
    <div className={`relative w-full ${classname}`}>
      <label className={`${error === "required" ? "text-red-300" : "text-textColor"} block text-sm font-medium mb-2`}>
        {label}
        {tag_required && <span className="text-secondary-brand"> *</span>}
      </label>
      <input name={name} disabled={disable} value={value} required={required} onBlur={onBlur} onChange={onChange} className="w-full bg-bg-primary border border-secondary-brand rounded-lg p-3 text-text-primary focus:border-secondary-brand transition-colors ring-0 outline-0" />
      {loading && (
        <p className="absolute right-4 top-[43px]">
          <TbLoader3 className="animate-spin" size={22} />
        </p>
      )}
      {error && error !== "required" && <ErrorUi message={error} />}
    </div>
  );
}
