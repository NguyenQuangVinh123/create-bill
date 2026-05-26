import { getCustomers } from "@/lib/data";
import CreateForm from "@/components/create-form";

export default async function CreateFormSection() {
  const customers = await getCustomers("");
  return <CreateForm customers={customers} />;
}
