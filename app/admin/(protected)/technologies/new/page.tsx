import PageHeader from "@/components/admin/page-header";
import TechForm, { emptyTech } from "../_form";
import { createTechnology } from "../actions";

export default function NewTechPage() {
  return (
    <>
      <PageHeader eyebrow="Technologies" title="New technology" />
      <TechForm
        action={createTechnology}
        initial={emptyTech}
        submitLabel="Create"
      />
    </>
  );
}
