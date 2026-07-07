"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

interface SubmitButtonProps {
  pendingLabel: string;
  children: React.ReactNode;
}

export default function SubmitButton({
  pendingLabel,
  children,
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <SpinnerMini />
          <span>{pendingLabel}</span>
        </span>
      ) : (
        children
      )}
    </button>
  );
}
