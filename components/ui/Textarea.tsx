import React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  id,
  name,
  rows = 4,
  className = "",
  ...props
}) => {
  const textareaId = id || name;

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[#1c1c1c]"
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        className={`w-full px-4 py-3 rounded-[18px] bg-[#ecedf1] text-[#1c1c1c] placeholder:text-[#8c909e] shadow-neu-badge focus:outline-none focus:ring-2 focus:ring-[#46bab4] transition-all text-sm sm:text-base border border-white/30 resize-none ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;

