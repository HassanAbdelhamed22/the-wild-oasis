export default function Loading() {
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

      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14 animate-pulse">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="flex border border-primary-800 h-[195px] bg-primary-950 rounded-sm overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="flex-1 bg-primary-900 border-r border-primary-800"></div>

            {/* Details placeholder */}
            <div className="grow p-6 flex flex-col justify-between">
              <div>
                <div className="h-6 bg-primary-900 rounded w-2/3 mb-4"></div>
                <div className="flex gap-3 items-center mb-2">
                  <div className="h-5 w-5 bg-primary-900 rounded-full"></div>
                  <div className="h-4 bg-primary-900 rounded w-1/2"></div>
                </div>
              </div>
              <div className="flex justify-end items-center gap-2">
                <div className="h-6 bg-primary-900 rounded w-20"></div>
                <div className="h-4 bg-primary-900 rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
