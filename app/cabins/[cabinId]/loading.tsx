export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto mt-8 animate-pulse">
      {/* Skeleton Grid matching the Cabin Detail Layout */}
      <div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 py-3 px-10 mb-24 h-[400px] bg-primary-950">
        
        {/* Left Column: Image Skeleton */}
        <div className="relative bg-primary-900 scale-[1.15] -translate-x-3 h-full"></div>

        {/* Right Column: Details Skeleton */}
        <div className="flex flex-col justify-between py-6">
          <div>
            {/* Title Skeleton */}
            <div className="h-16 bg-primary-900 rounded-sm mb-6 translate-x-[-254px] w-[130%]"></div>
            
            {/* Description Lines Skeleton */}
            <div className="space-y-3 mb-10">
              <div className="h-4 bg-primary-900 rounded w-full"></div>
              <div className="h-4 bg-primary-900 rounded w-5/6"></div>
              <div className="h-4 bg-primary-900 rounded w-4/5"></div>
            </div>

            {/* List Skeleton */}
            <ul className="flex flex-col gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex gap-3 items-center">
                  <div className="h-5 w-5 bg-primary-900 rounded-full"></div>
                  <div className="h-4 bg-primary-900 rounded w-1/3"></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Header Skeleton */}
      <div className="h-10 bg-primary-900 rounded w-1/2 mx-auto mt-6"></div>
    </div>
  );
}
