"use client";

import { ReactNode } from "react";
import SubmitButton from "./submit-button";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
  children?: ReactNode;
  confirm?: string;
};

const DeleteForm = ({
  action,
  id,
  children,
  confirm = "Delete this entry permanently?",
}: Props) => {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirm)) e.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton variant="danger" pendingLabel="Deleting…">
        {children ?? "Delete"}
      </SubmitButton>
    </form>
  );
};

export default DeleteForm;
