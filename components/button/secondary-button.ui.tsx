import { TbLoader3 } from "react-icons/tb";

type SecondaryButtonUiProps = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  content: string;
  loading?: boolean;
  disable?: boolean;
  classname?: string;
};

export function SecondaryButtonUi({ loading = false, disable = false, classname = "", content, onClick, type = "button" }: SecondaryButtonUiProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disable || loading}
      className={`cursor-pointer font-extrabold relative w-full border border-secondary-brand text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors duration-200 hover:bg-secondary-brand disabled:opacity-60 disabled:cursor-not-allowed ${classname}`}
    >
      {loading ? <TbLoader3 className="animate-spin" size={22} /> : content}
    </button>
  );
}
