import dynamic from "next/dynamic";
import { getCustomers } from "@/lib/data";
import { FormSkeleton } from "@/components/skeleton";

const CreateForm = dynamic(() => import("@/components/create-form"), {
  loading: () => <FormSkeleton />,
});

export default async function CreateFormSection() {
  const customers = await getCustomers("");
  return <CreateForm customers={customers} />;
}
