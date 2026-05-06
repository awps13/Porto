import PageHeader from "@/components/admin/page-header";
import SkillForm, { emptySkill } from "../_form";
import { createSkill } from "../actions";

export default function NewSkillPage() {
  return (
    <>
      <PageHeader eyebrow="Skills" title="New skill" />
      <SkillForm
        action={createSkill}
        initial={emptySkill}
        submitLabel="Create skill"
      />
    </>
  );
}
