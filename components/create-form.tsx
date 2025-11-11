"use client";

import { saveContactIncome } from "@/lib/actions";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/components/buttons";
import CreatableSelect from "react-select/creatable";
import { useState, useEffect, useRef } from "react";
const CreateForm = ({ customers }: { customers: any }) => {
  const action = saveContactIncome;
  const [state, formAction] = useFormState(action, null);
  const [form, setForm] = useState({
    customerId: "",
    note: "",
  });
  const formRef = useRef<HTMLFormElement>(null);
  const mappingCustomer = customers.map((i: any) => ({
    value: i.id,
    label: i.name,
  }));

  // Clear form after successful submission
  useEffect(() => {
    if (state === null) {
      setForm({
        customerId: "",
        note: "",
      });
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [state]);

  const handleSelectChange = (e: any) => {
    const value = e ? e.value : "";
    setForm((prevForm) => ({
      ...prevForm,
      customerId: value,
    }));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    // Clear form immediately when form is submitted
    setTimeout(() => {
      setForm({
        customerId: "",
        note: "",
      });
    }, 0);
  };

  return (
    <form ref={formRef} action={formAction} onSubmit={handleSubmit} className="w-full flex flex-col gap-1">
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
          value={form.customerId ? mappingCustomer.find((c: any) => c.value === Number(form.customerId)) : null}
          className="mt-1 text-sm border rounded-md w-full focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-900"
        >
          Note
        </label>
        <input
          type="text"
          name="note"
          id="note"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-3 transition-all duration-300 ease-in-out"
          placeholder="Note"
          onChange={handleInputChange}
          value={form.note}
        />
      </div>
      <SubmitButton label="save" disabled={false} />
    </form>
  );
};

export default CreateForm;
