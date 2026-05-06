import { prisma } from "@/lib/prisma";
import PageHeader from "@/components/admin/page-header";
import { Field, inputCls, textareaCls } from "@/components/admin/field";
import SubmitButton from "@/components/admin/submit-button";
import { saveProfile } from "./actions";

export default async function ProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <>
      <PageHeader
        eyebrow="Content"
        title="Profile"
        description="The single source of truth describing the portfolio owner. Used in hero, about, and metadata."
      />

      <form action={saveProfile} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Full name" required className="md:col-span-2">
            <input
              name="fullName"
              required
              defaultValue={profile?.fullName ?? ""}
              className={inputCls}
              placeholder="Ahmad Wildan Putro Santoso"
            />
          </Field>
          <Field label="Headline" hint="Short role description.">
            <input
              name="headline"
              defaultValue={profile?.headline ?? ""}
              className={inputCls}
              placeholder="Frontend Developer"
            />
          </Field>
          <Field label="Tagline" hint="Hero subtitle / personal motto.">
            <input
              name="tagline"
              defaultValue={profile?.tagline ?? ""}
              className={inputCls}
            />
          </Field>
          <Field label="Bio" className="md:col-span-2">
            <textarea
              name="bio"
              defaultValue={profile?.bio ?? ""}
              className={textareaCls}
              rows={5}
            />
          </Field>
          <Field label="Avatar URL">
            <input
              name="avatar"
              defaultValue={profile?.avatar ?? ""}
              className={inputCls}
              placeholder="/Foto.jpeg"
            />
          </Field>
          <Field label="Resume / CV URL">
            <input
              name="resumeUrl"
              defaultValue={profile?.resumeUrl ?? ""}
              className={inputCls}
            />
          </Field>
          <Field label="Email">
            <input
              type="email"
              name="email"
              defaultValue={profile?.email ?? ""}
              className={inputCls}
            />
          </Field>
          <Field label="Phone">
            <input
              name="phone"
              defaultValue={profile?.phone ?? ""}
              className={inputCls}
            />
          </Field>
          <Field label="Location" className="md:col-span-2">
            <input
              name="location"
              defaultValue={profile?.location ?? ""}
              className={inputCls}
              placeholder="Malang, Indonesia"
            />
          </Field>
          <div className="flex items-end pb-2 md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="available"
                defaultChecked={profile?.available ?? true}
                className="accent-white w-4 h-4"
              />
              <span className="text-label-caps uppercase">
                Available for work
              </span>
            </label>
          </div>
        </div>

        <SubmitButton>Save profile</SubmitButton>
      </form>
    </>
  );
}
