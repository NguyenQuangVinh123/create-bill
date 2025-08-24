"use client";

import { useFormStatus } from "react-dom";
import clsx from "clsx";

export const SubmitButton = ({
  label,
  disabled,
}: {
  label: string;
  disabled: boolean;
}) => {
  const { pending } = useFormStatus();
  const className = clsx(
    "w-full py-3 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded-md transition-all duration-300 ease-in-out",
    {
      "opacity-50": disabled || pending,
    }
  );

  return (
    <button type="submit" className={className} disabled={disabled}>
      {label === "save" && <span>{pending ? "Saving..." : "Save"}</span>}
    </button>
  );
};
