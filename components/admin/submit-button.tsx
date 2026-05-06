"use client";

import { useFormStatus } from "react-dom";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  pendingLabel?: string;
  variant?: "primary" | "danger" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-white text-black border border-white hover:bg-black hover:text-white",
  danger:
    "bg-transparent text-red-300 border border-red-300/40 hover:bg-red-300 hover:text-black",
  ghost:
    "bg-transparent text-fg border border-white/20 hover:bg-white hover:text-black",
};

const SubmitButton = ({
  children,
  pendingLabel = "Saving…",
  variant = "primary",
  className,
}: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`text-label-caps uppercase px-8 py-3.5 transition-all duration-300 ease-button active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${variants[variant]} ${className ?? ""}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
};

export default SubmitButton;
