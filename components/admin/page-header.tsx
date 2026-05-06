import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  children?: ReactNode;
};

const PageHeader = ({ eyebrow, title, description, action, children }: Props) => (
  <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-8 border-b border-white/10 mb-10">
    <div>
      {eyebrow && (
        <p className="text-label-caps text-fg-muted mb-3 uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="text-headline-lg uppercase">{title}</h1>
      {description && (
        <p className="text-body-md text-fg-muted mt-3 max-w-xl">
          {description}
        </p>
      )}
    </div>
    <div className="flex items-center gap-3">
      {children}
      {action && (
        <Link
          href={action.href}
          className="text-label-caps uppercase bg-white text-black border border-white px-6 py-3.5 hover:bg-black hover:text-white transition-all duration-300 ease-button active:scale-[0.98]"
        >
          {action.label}
        </Link>
      )}
    </div>
  </header>
);

export default PageHeader;
