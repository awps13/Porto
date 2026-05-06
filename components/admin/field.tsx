import { ReactNode } from "react";

type Props = {
  label: string;
  name?: string;
  children?: ReactNode;
  hint?: string;
  required?: boolean;
  className?: string;
};

export const Field = ({
  label,
  name,
  children,
  hint,
  required,
  className,
}: Props) => (
  <label className={`block ${className ?? ""}`} htmlFor={name}>
    <span className="text-label-caps uppercase block mb-2 text-fg-muted">
      {label}
      {required && <span className="text-fg ml-1">*</span>}
    </span>
    {children}
    {hint && (
      <span className="text-xs text-fg-muted/70 mt-2 block">{hint}</span>
    )}
  </label>
);

export const inputCls =
  "w-full bg-black border border-white/20 px-4 py-3 text-fg text-sm placeholder:text-fg-muted/40 focus:border-white focus:outline-none transition-colors duration-300 ease-architect";

export const textareaCls = `${inputCls} resize-y min-h-[120px] leading-relaxed`;

export const selectCls = inputCls;
