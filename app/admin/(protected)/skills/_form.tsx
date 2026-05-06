import Link from "next/link";
import { Field, inputCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";

export type SkillFormData = {
  name: string;
  slug: string;
  category: string;
  level: number | null;
  icon: string;
  order: number;
  published: boolean;
};

export const emptySkill: SkillFormData = {
  name: "",
  slug: "",
  category: "",
  level: null,
  icon: "",
  order: 0,
  published: true,
};

export default function SkillForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial: SkillFormData;
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
            placeholder="React"
          />
        </Field>
        <Field label="Slug" hint="Auto-generated if blank.">
          <input name="slug" defaultValue={initial.slug} className={inputCls} />
        </Field>
        <Field label="Category" hint="frontend, backend, design, soft, etc.">
          <input
            name="category"
            defaultValue={initial.category}
            className={inputCls}
          />
        </Field>
        <Field label="Level" hint="1–5 (optional).">
          <input
            type="number"
            min="1"
            max="5"
            name="level"
            defaultValue={initial.level ?? ""}
            className={inputCls}
          />
        </Field>
        <Field label="Icon URL" className="md:col-span-2">
          <input name="icon" defaultValue={initial.icon} className={inputCls} />
        </Field>
        <Field label="Order">
          <input
            type="number"
            name="order"
            defaultValue={initial.order}
            className={inputCls}
          />
        </Field>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="published"
              defaultChecked={initial.published}
              className="accent-white w-4 h-4"
            />
            <span className="text-label-caps uppercase">Published</span>
          </label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/skills"
          className="text-label-caps uppercase text-fg-muted hover:text-fg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
