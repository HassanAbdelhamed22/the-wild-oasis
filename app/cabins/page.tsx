import { Metadata } from "next";
import CabinList from "../_components/CabinList";
import { Suspense } from "react";

import CabinListSkeleton from "./loading";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

export const revalidate = 60 * 24 * 30; //1 day (ISR)

export const metadata: Metadata = {
  title: "Cabins",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ capacity?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const filter = resolvedSearchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>

      <div className="mb-8 flex justify-end">
        <Filter />
      </div>

      <Suspense fallback={<CabinListSkeleton />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
