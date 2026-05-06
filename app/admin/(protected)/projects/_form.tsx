import Link from "next/link";
import { Field, inputCls, textareaCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";

type Tech = { id: string; name: string };
type Tag = { id: string; name: string };

export type ProjectFormData = {
  id?: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  role: string;
  cover: string;
  gallery: string[];
  linkCode: string;
  linkWebsite: string;
  linkDemo: string;
  featured: boolean;
  published: boolean;
  order: number;
  startedAt: Date | null;
  finishedAt: Date | null;
  technologyIds: string[];
  tagIds: string[];
};

export const emptyProject: ProjectFormData = {
  title: "",
  slug: "",
  category: "",
  summary: "",
  description: "",
  role: "",
  cover: "",
  gallery: [],
  linkCode: "",
  linkWebsite: "",
  linkDemo: "",
  featured: false,
  published: true,
  order: 0,
  startedAt: null,
  finishedAt: null,
  technologyIds: [],
  tagIds: [],
};

const toDateInput = (d: Date | null) =>
  d ? d.toISOString().slice(0, 10) : "";

export default function ProjectForm({
  action,
  initial,
  technologies,
  tags,
  submitLabel = "Save",
}: {
  action: (formData: FormData) => void | Promise<void>;
  initial: ProjectFormData;
  technologies: Tech[];
  tags: Tag[];
  submitLabel?: string;
}) {
  return (
    <form action={action} encType="multipart/form-data" className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Title" name="title" required className="md:col-span-2">
          <input
            id="title"
            name="title"
            required
            defaultValue={initial.title}
            className={inputCls}
            placeholder="Vantage Monolith"
          />
        </Field>

        <Field label="Slug" name="slug" hint="Auto-generated from title if left blank.">
          <input
            id="slug"
            name="slug"
            defaultValue={initial.slug}
            className={inputCls}
            placeholder="vantage-monolith"
          />
        </Field>

        <Field label="Category">
          <input
            name="category"
            defaultValue={initial.category}
            className={inputCls}
            placeholder="Residential / Berlin"
          />
        </Field>

        <Field label="Summary" hint="Short blurb shown on project cards." className="md:col-span-2">
          <input
            name="summary"
            defaultValue={initial.summary}
            className={inputCls}
            maxLength={200}
          />
        </Field>

        <Field label="Description" className="md:col-span-2">
          <textarea
            name="description"
            defaultValue={initial.description}
            className={textareaCls}
            rows={6}
          />
        </Field>

        <Field label="Your role" className="md:col-span-2">
          <textarea
            name="role"
            defaultValue={initial.role}
            className={textareaCls}
            rows={3}
            placeholder="Lead developer responsible for the front-end and CMS integration."
          />
        </Field>
      </div>

      <fieldset className="border border-white/15 p-6 space-y-6">
        <legend className="text-label-caps uppercase px-2 text-fg-muted">
          Media
        </legend>
        {initial.cover && (
          <div className="overflow-hidden border border-white/15 bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={initial.cover}
              alt=""
              className="h-56 w-full object-cover"
            />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Upload cover image"
            hint="JPG, PNG, WEBP, or GIF. Max 5MB. Uploaded to Cloudinary and replaces the cover URL when saved."
          >
            <input
              type="file"
              name="coverFile"
              accept="image/jpeg,image/png,image/webp,image/gif"
              className={inputCls}
            />
          </Field>
          <Field label="Cover image URL" hint="Optional public URL or /path inside /public.">
            <input
              name="cover"
              defaultValue={initial.cover}
              className={inputCls}
              placeholder="/projects/vantage.jpg"
            />
          </Field>
        </div>
        <Field label="Gallery URLs" hint="One URL per line.">
          <textarea
            name="gallery"
            defaultValue={initial.gallery.join("\n")}
            className={textareaCls}
            rows={4}
          />
        </Field>
      </fieldset>

      <fieldset className="border border-white/15 p-6 space-y-6">
        <legend className="text-label-caps uppercase px-2 text-fg-muted">
          Links
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Code">
            <input name="linkCode" defaultValue={initial.linkCode} className={inputCls} />
          </Field>
          <Field label="Website">
            <input name="linkWebsite" defaultValue={initial.linkWebsite} className={inputCls} />
          </Field>
          <Field label="Demo">
            <input name="linkDemo" defaultValue={initial.linkDemo} className={inputCls} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border border-white/15 p-6 space-y-6">
        <legend className="text-label-caps uppercase px-2 text-fg-muted">
          Relations
        </legend>

        <div>
          <p className="text-label-caps uppercase text-fg-muted mb-3">
            Technologies
          </p>
          {technologies.length === 0 ? (
            <p className="text-body-md text-fg-muted">
              No technologies yet. <Link href="/admin/technologies/new" className="underline">Add one</Link>.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {technologies.map((t) => (
                <label
                  key={t.id}
                  className="flex items-center gap-2 px-3 py-2 border border-white/15 cursor-pointer hover:border-white/40"
                >
                  <input
                    type="checkbox"
                    name="technologyIds"
                    value={t.id}
                    defaultChecked={initial.technologyIds.includes(t.id)}
                    className="accent-white"
                  />
                  <span className="text-sm">{t.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-label-caps uppercase text-fg-muted mb-3">Tags</p>
          {tags.length === 0 ? (
            <p className="text-body-md text-fg-muted">No tags yet.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <label
                  key={t.id}
                  className="flex items-center gap-2 px-3 py-2 border border-white/15 cursor-pointer hover:border-white/40"
                >
                  <input
                    type="checkbox"
                    name="tagIds"
                    value={t.id}
                    defaultChecked={initial.tagIds.includes(t.id)}
                    className="accent-white"
                  />
                  <span className="text-sm">{t.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </fieldset>

      <fieldset className="border border-white/15 p-6 space-y-6">
        <legend className="text-label-caps uppercase px-2 text-fg-muted">
          Timeline & Visibility
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Started">
            <input
              type="date"
              name="startedAt"
              defaultValue={toDateInput(initial.startedAt)}
              className={inputCls}
            />
          </Field>
          <Field label="Finished">
            <input
              type="date"
              name="finishedAt"
              defaultValue={toDateInput(initial.finishedAt)}
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
        </div>
        <div className="flex flex-wrap gap-6">
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
      </fieldset>

      <div className="flex items-center gap-4">
        <SubmitButton>{submitLabel}</SubmitButton>
        <Link
          href="/admin/projects"
          className="text-label-caps uppercase text-fg-muted hover:text-fg transition-colors"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
