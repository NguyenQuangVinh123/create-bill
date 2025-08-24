"use client";

import { saveContactIncome } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/buttons";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
const CreateForm = ({ customers }: { customers: any }) => {
  const action = saveContactIncome;
  const [state, formAction] = useFormState(action, null);
  const [form, setForm] = useState({
    customerId: ""
  });
  const mappingCustomer = customers.map((i: any) => ({
    value: i.id,
    label: i.name,
  }));


  const handleSelectChange = (e: any) => {
    const { value } = e;
    setForm((prevForm) => ({
      ...prevForm,
      customerId: value,
    }));
  };

  return (
    <form action={formAction} className="w-full flex flex-col gap-1">
      <div>
        <label
          htmlFor="customerId"
          className="block text-sm font-medium text-gray-900"
        >
          Customer Name
        </label>
        <CreatableSelect
          onChange={handleSelectChange}
          options={mappingCustomer}
          name="customerId"
          className="mt-1 text-sm border rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <SubmitButton label="save" disabled={false} />
    </form>
  );
};

export default CreateForm;
