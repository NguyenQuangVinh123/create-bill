import Search from "@/components/search";
import { Suspense } from "react";
import { FormSkeleton, TableSkeleton } from "@/components/skeleton";
import ContactTable from "@/components/contact-table";
import CreateFormSection from "@/components/create-form-section";

/** DB-backed page: skip static prerender at build time (avoids Prerender Error when DB is unavailable during `next build`). */
export const dynamic = "force-dynamic";

const Contacts = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    date?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const date = searchParams?.date || ""
  return (
    <div className="max-w-screen-lg mx-auto mt-5">
      <div className="flex flex-col items-center justify-between gap-2 p-2 max-w-sm m-auto">
        <Search />
        <Suspense fallback={<FormSkeleton />}>
          <CreateFormSection />
        </Suspense>
      </div>
      <Suspense key={`${query}-${date}`} fallback={<TableSkeleton />}>
        <ContactTable query={query} date={date} />
      </Suspense>
    </div>
  );
};

export default Contacts;
