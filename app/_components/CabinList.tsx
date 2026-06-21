import { getCabins } from "@/app/_lib/data-service";
import CabinCard from "@/app/_components/CabinCard";
import { unstable_noStore } from "next/cache";

export default async function CabinList() {
  // By default, Next.js caches the results of server components. 
  // This means that the first time a user visits the page, the data is fetched and cached.
  // The next time a user visits the page, the cached data is returned instead of fetching new data.
  // To disable caching, use unstable_noStore().
  // unstable_noStore();

  const cabins = await getCabins();

  if (cabins.length === 0) {
    return <p className="text-lg">No cabins found.</p>;
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {cabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
