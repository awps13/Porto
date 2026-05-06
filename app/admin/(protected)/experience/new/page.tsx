import PageHeader from "@/components/admin/page-header";
import ExpForm, { emptyExp } from "../_form";
import { createExperience } from "../actions";

export default function NewExpPage() {
  return (
    <>
      <PageHeader eyebrow="Experience" title="New entry" />
      <ExpForm
        action={createExperience}
        initial={emptyExp}
        submitLabel="Create entry"
      />
    </>
  );
}
