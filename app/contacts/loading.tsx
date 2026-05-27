import { FormSkeleton, TableSkeleton } from "@/components/skeleton";

export default function ContactsLoading() {
  return (
    <div className="max-w-screen-lg mx-auto mt-5">
      <div className="flex flex-col items-center justify-between gap-2 p-2 max-w-sm m-auto">
        <div className="relative flex flex-1 flex-col gap-2 w-full">
          <div className="h-9 rounded-sm bg-gray-100 animate-pulse" />
          <div className="h-9 rounded-sm bg-gray-100 animate-pulse" />
        </div>
        <FormSkeleton />
      </div>
      <TableSkeleton />
    </div>
  );
}
