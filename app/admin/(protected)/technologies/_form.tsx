import Link from "next/link";
import { Field, inputCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";

export type TechFormData = {
  name: string;
  slug: string;
  icon: string;
  category: string;
  order: number;
};

export const emptyTech: TechFormData = {
  name: "",
  slug: "",
  icon: "",
  category: "",
  order: 0,
};

export default function TechForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial: TechFormData;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Name" required>
          <input
            name="name"
            required
            defaultValue={initial.name}
            className={inputCls}
            placeholder="Next.js"
          />
        </Field>
        <Field label="Slug" hint="Auto-generated if blank.">
          <input name="slug" defaultValue={initial.slug} className={inputCls} />
        </Field>
        <Field label="Icon URL" hint="e.g. /technologies/nextjs.svg">
          <input name="icon" defaultValue={initial.icon} className={inputCls} />
        </Field>
        <Field label="Category" hint="frontend, backend, tools, etc.">
          <input
            name="category"
            defaultValue={initial.category}
            className={inputCls}
          />
        </Field>
        <Field label="Order">
          <input
            type="number"
            name="order"
            defaultValue={initial.order}
            className={inputCls}
          />
        </Field>
      </div>
      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/technologies"
          className="text-label-caps uppercase text-fg-muted hover:text-fg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
