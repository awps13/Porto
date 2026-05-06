import Link from "next/link";
import { Field, inputCls, textareaCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";

export type CertFormData = {
  title: string;
  slug: string;
  subtitle: string;
  issuer: string;
  description: string;
  image: string;
  certificateUrl: string;
  credentialId: string;
  issuedAt: Date | null;
  expiresAt: Date | null;
  featured: boolean;
  published: boolean;
  order: number;
};

export const emptyCert: CertFormData = {
  title: "",
  slug: "",
  subtitle: "",
  issuer: "",
  description: "",
  image: "",
  certificateUrl: "",
  credentialId: "",
  issuedAt: null,
  expiresAt: null,
  featured: false,
  published: true,
  order: 0,
};

const toDate = (d: Date | null) => (d ? d.toISOString().slice(0, 10) : "");

export default function CertForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial: CertFormData;
  submitLabel?: string;
}) {
  return (
    <form action={action} className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Title" name="title" required className="md:col-span-2">
          <input
            id="title"
            name="title"
            required
            defaultValue={initial.title}
            className={inputCls}
            placeholder="Cisco IT Essentials"
          />
        </Field>
        <Field label="Slug" hint="Auto-generated if blank.">
          <input name="slug" defaultValue={initial.slug} className={inputCls} />
        </Field>
        <Field label="Subtitle">
          <input
            name="subtitle"
            defaultValue={initial.subtitle}
            className={inputCls}
            placeholder="Cisco Networking Academy"
          />
        </Field>
        <Field label="Issuer">
          <input
            name="issuer"
            defaultValue={initial.issuer}
            className={inputCls}
          />
        </Field>
        <Field label="Credential ID">
          <input
            name="credentialId"
            defaultValue={initial.credentialId}
            className={inputCls}
          />
        </Field>
        <Field label="Description" className="md:col-span-2">
          <textarea
            name="description"
            defaultValue={initial.description}
            className={textareaCls}
            rows={5}
          />
        </Field>
        <Field label="Image URL">
          <input
            name="image"
            defaultValue={initial.image}
            className={inputCls}
            placeholder="/certifications/cisco.jpeg"
          />
        </Field>
        <Field label="Certificate URL">
          <input
            name="certificateUrl"
            defaultValue={initial.certificateUrl}
            className={inputCls}
          />
        </Field>
        <Field label="Issued at">
          <input
            type="date"
            name="issuedAt"
            defaultValue={toDate(initial.issuedAt)}
            className={inputCls}
          />
        </Field>
        <Field label="Expires at">
          <input
            type="date"
            name="expiresAt"
            defaultValue={toDate(initial.expiresAt)}
            className={inputCls}
          />
        </Field>
        <Field label="Order" hint="Lower numbers appear first.">
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
              name="featured"
              defaultChecked={initial.featured}
              className="accent-white w-4 h-4"
            />
            <span className="text-label-caps uppercase">Featured</span>
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
          href="/admin/certificates"
          className="text-label-caps uppercase text-fg-muted hover:text-fg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
