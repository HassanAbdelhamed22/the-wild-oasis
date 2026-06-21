"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams?.get("capacity") ?? "all";

  function handleClick(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex gap-2 border border-primary-800 rounded-md px-4 py-2">
      <Button
        filter="all"
        handleClick={handleClick}
        activeFilter={activeFilter}
      >
        All
      </Button>
      <Button
        filter="small"
        handleClick={handleClick}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleClick={handleClick}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleClick={handleClick}
        activeFilter={activeFilter}
      >
        8+ guests
      </Button>
    </div>
  );
}

function Button({
  filter,
  handleClick,
  activeFilter,
  children,
}: {
  filter: string;
  handleClick: (filter: string) => void;
  activeFilter: string;
  children: React.ReactNode;
}) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-800 transition-colors rounded-md duration-200 cursor-pointer ${activeFilter === filter ? "bg-primary-700 text-primary-50" : ""}`}
      onClick={() => handleClick(filter)}
    >
      {children}
    </button>
  );
}
