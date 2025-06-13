import React from "react";

interface CheckboxPropsI {
  children: React.ReactNode;
  disabled?: boolean;
  classname?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputCheckboxUi(data: CheckboxPropsI) {
  return (
    <div className={`flex w-fit container items-center relative ${data.classname}`}>
      <input type="checkbox" id="cbx" style={{ display: "none" }} onChange={data.onChange} />
      <label htmlFor="cbx" className="check">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
      <label htmlFor="cbx" className="flex flex-wrap w-full items-center cursor-pointer ml-5 max-sm:text-sm">
        {data.children}
      </label>
    </div>
  );
}
