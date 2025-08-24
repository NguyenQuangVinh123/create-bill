import Search from "@/components/search";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/skeleton";
import ContactTable from "@/components/contact-table";
import CreateForm from "@/components/create-form";
import { getCustomers } from "@/lib/data";
const Contacts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    date?: string;
  };
}) => {
  const customers = await getCustomers("");
  const query = searchParams?.query || "";
  const date = searchParams?.date || ""
  return (
    <div className="max-w-screen-lg mx-auto mt-5">
      <div className="flex flex-col items-center justify-between gap-2 p-2 max-w-sm m-auto">
        <Search />
        <CreateForm customers={customers} />

      </div>
      <Suspense key={`${query}-${date}`} fallback={<TableSkeleton />}>
        <ContactTable query={query} date={date} />
      </Suspense>
    </div>
  );
};

export default Contacts;
