"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  function handleFilter(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-y-primary-800 flex">
      <FilterButton
        filter="small"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        1&mdash;3 guests
      </FilterButton>

      <FilterButton
        filter="medium"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        4&mdash;7 guests
      </FilterButton>

      <FilterButton
        filter="large"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        8+ guests
      </FilterButton>

      <FilterButton
        filter="all"
        activeFilter={activeFilter}
        handleFilter={handleFilter}
      >
        All
      </FilterButton>
    </div>
  );
}
