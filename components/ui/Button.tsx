import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isLoading = false,
  loadingText,
  disabled,
  className = "",
  ...props
}) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center px-8 py-3.5 rounded-[50px] text-base font-normal text-white bg-[#46bab4] hover:bg-black disabled:opacity-60 transition-all duration-300 shadow-neu-button active:shadow-neu-button-inset cursor-pointer ${className}`}
      {...props}
    >
      <span>{isLoading && loadingText ? loadingText : children}</span>
    </button>
  );
};

export default Button;

