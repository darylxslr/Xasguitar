"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && <label className="text-sm text-text-secondary">{label}</label>}
        <input
          ref={ref}
          className={`w-full px-4 py-2.5 bg-bg-tertiary text-text-primary rounded-lg border border-bg-tertiary focus:border-accent-amber focus:outline-none text-sm transition-colors placeholder:text-text-muted ${className}`}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";
