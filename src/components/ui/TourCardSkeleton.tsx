export default function TourCardSkeleton() {
  return (
    <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-md overflow-hidden animate-pulse border border-gray-100 dark:border-gray-700">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200 dark:bg-gray-700 dark:bg-gray-700" />

      {/* Content skeleton */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-14 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Title */}
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-3" />

        {/* Location */}
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3" />

        {/* Duration & Group Size */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="h-7 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
