import React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  id,
  name,
  className = "",
  ...props
}) => {
  const inputId = id || name;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[#1c1c1c]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`w-full px-4 py-3 rounded-[18px] bg-[#ecedf1] text-[#1c1c1c] placeholder:text-[#8c909e] shadow-neu-badge focus:outline-none focus:ring-2 focus:ring-[#46bab4] transition-all text-sm sm:text-base border border-white/30 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;

