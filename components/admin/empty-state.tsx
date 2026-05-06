import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  action?: { label: string; href: string };
};

const EmptyState = ({ title, description, action }: Props) => (
  <div className="border border-white/15 px-8 py-20 text-center bg-surface-lowest">
    <h2 className="text-headline-md uppercase mb-3">{title}</h2>
    {description && (
      <p className="text-body-md text-fg-muted max-w-md mx-auto mb-8">
        {description}
      </p>
    )}
    {action && (
      <Link
        href={action.href}
        className="text-label-caps uppercase inline-block bg-white text-black border border-white px-8 py-3.5 hover:bg-black hover:text-white transition-all duration-300 ease-button active:scale-[0.98]"
      >
        {action.label}
      </Link>
    )}
  </div>
);

export default EmptyState;
