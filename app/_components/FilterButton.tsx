"use client";

interface FilterButtonProps {
  filter: string;
  activeFilter: string;
  handleFilter: (filter: string) => void;
  children: string;
}

export default function FilterButton({
  filter,
  handleFilter,
  activeFilter,
  children,
}: FilterButtonProps) {
  return (
    <button
      className={`px-5 py-2 ${
        filter === activeFilter
          ? "bg-primary-900 text-primary-50"
          : "hover:bg-primary-700"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}
