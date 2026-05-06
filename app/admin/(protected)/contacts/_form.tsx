import Link from "next/link";
import { Field, inputCls, selectCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";
import { ContactType } from "@/lib/generated/prisma/enums";

const types: ContactType[] = [
  "EMAIL",
  "PHONE",
  "WHATSAPP",
  "LINKEDIN",
  "GITHUB",
  "INSTAGRAM",
  "TIKTOK",
  "TWITTER",
  "YOUTUBE",
  "WEBSITE",
  "OTHER",
];

export type ContactFormData = {
  type: ContactType;
  label: string;
  value: string;
  icon: string;
  order: number;
  primary: boolean;
  active: boolean;
};

export const emptyContact: ContactFormData = {
  type: "EMAIL",
  label: "",
  value: "",
  icon: "",
  order: 0,
  primary: false,
  active: true,
};

export default function ContactForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial: ContactFormData;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Type" required>
          <select name="type" defaultValue={initial.type} className={selectCls}>
            {types.map((t) => (
              <option key={t} value={t} className="bg-black">
                {t}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Label" required>
          <input
            name="label"
            required
            defaultValue={initial.label}
            className={inputCls}
            placeholder="LinkedIn"
          />
        </Field>
        <Field label="Value" required hint="URL, email, or phone." className="md:col-span-2">
          <input
            name="value"
            required
            defaultValue={initial.value}
            className={inputCls}
            placeholder="https://linkedin.com/in/handle"
          />
        </Field>
        <Field label="Icon URL" hint="e.g. /contacts/linkedin.svg">
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
        <div className="flex flex-wrap gap-6 items-end pb-2 md:col-span-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="primary"
              defaultChecked={initial.primary}
              className="accent-white w-4 h-4"
            />
            <span className="text-label-caps uppercase">Primary</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="active"
              defaultChecked={initial.active}
              className="accent-white w-4 h-4"
            />
            <span className="text-label-caps uppercase">Active</span>
          </label>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/contacts"
          className="text-label-caps uppercase text-fg-muted hover:text-fg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
