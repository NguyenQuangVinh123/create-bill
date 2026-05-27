"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

function SearchIcon() {
  return (
    <svg
      className="absolute left-3 top-2 h-5 w-5 text-gray-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"
      />
    </svg>
  );
}

const Search = () => {
  const searchParams: any = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  const handleChange = (e: any) => {
    const params = new URLSearchParams(searchParams);
    params.set("date", e);
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="relative flex flex-1 flex-col gap-2">
      <div>
        <input
          type="text"
          className="w-full border border-gray-200 py-2 pl-10 text-sm outline-2 rounded-sm"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get("query")?.toString()}
        />
        <SearchIcon />
      </div>

      <input
        max={new Date().toISOString().split("T")[0]}
        className="w-full border border-gray-200 py-1 pl-2 text-sm outline-2 rounded-sm"
        type="date"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default Search;
