import Link from "next/link";
import { Field, inputCls, selectCls, textareaCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";
import { ExperienceType } from "@/lib/generated/prisma/enums";

const typeOptions: ExperienceType[] = [
  "WORK",
  "INTERNSHIP",
  "EDUCATION",
  "VOLUNTEER",
  "FREELANCE",
];

export type ExpFormData = {
  type: ExperienceType;
  role: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  logo: string;
  url: string;
  startDate: Date | null;
  endDate: Date | null;
  current: boolean;
  published: boolean;
  order: number;
};

export const emptyExp: ExpFormData = {
  type: "WORK",
  role: "",
  organization: "",
  location: "",
  description: "",
  highlights: [],
  logo: "",
  url: "",
  startDate: null,
  endDate: null,
  current: false,
  published: true,
  order: 0,
};

const toDate = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");

export default function ExpForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial: ExpFormData;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Type" required>
          <select
            name="type"
            defaultValue={initial.type}
            className={selectCls}
          >
            {typeOptions.map((t) => (
              <option key={t} value={t} className="bg-black">
                {t}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Role / Title" required>
          <input
            name="role"
            required
            defaultValue={initial.role}
            className={inputCls}
            placeholder="Frontend Developer"
          />
        </Field>

        <Field label="Organization" required>
          <input
            name="organization"
            required
            defaultValue={initial.organization}
            className={inputCls}
            placeholder="Universitas Negeri Malang"
          />
        </Field>

        <Field label="Location">
          <input
            name="location"
            defaultValue={initial.location}
            className={inputCls}
            placeholder="Malang, Indonesia"
          />
        </Field>

        <Field label="Description" className="md:col-span-2">
          <textarea
            name="description"
            defaultValue={initial.description}
            className={textareaCls}
            rows={4}
          />
        </Field>

        <Field
          label="Highlights"
          hint="One bullet per line."
          className="md:col-span-2"
        >
          <textarea
            name="highlights"
            defaultValue={initial.highlights.join("\n")}
            className={textareaCls}
            rows={4}
            placeholder={"Shipped 5 production landing pages.\nMentored 2 juniors."}
          />
        </Field>

        <Field label="Logo URL">
          <input name="logo" defaultValue={initial.logo} className={inputCls} />
        </Field>

        <Field label="Website">
          <input name="url" defaultValue={initial.url} className={inputCls} />
        </Field>

        <Field label="Start date" required>
          <input
            type="date"
            name="startDate"
            required
            defaultValue={toDate(initial.startDate)}
            className={inputCls}
          />
        </Field>

        <Field label="End date" hint="Leave blank if currently active.">
          <input
            type="date"
            name="endDate"
            defaultValue={toDate(initial.endDate)}
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

        <div className="flex flex-wrap gap-6 items-end pb-2">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="current"
              defaultChecked={initial.current}
              className="accent-white w-4 h-4"
            />
            <span className="text-label-caps uppercase">Current</span>
          </label>
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
          href="/admin/experience"
          className="text-label-caps uppercase text-fg-muted hover:text-fg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
