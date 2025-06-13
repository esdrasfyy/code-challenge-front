import { TbLoader3 } from "react-icons/tb";

type PrimaryButtonUiProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  content: string;
  loading?: boolean;
  disable?: boolean;
  classname?: string;
};

export function PrimaryButtonUi({ loading = false, disable = false, classname = "", content, onClick, type = "button" }: PrimaryButtonUiProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disable || loading}
      className={`cursor-pointer font-extrabold relative w-full bg-secondary-brand text-white py-3 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-secondary-brand/80 disabled:opacity-60 disabled:cursor-not-allowed ${classname}`}
    >
      {loading ? <TbLoader3 className="animate-spin" size={22} /> : content}
    </button>
  );
}
