import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="relative mb-8">
          <span className="text-[10rem] font-extrabold leading-none text-transparent bg-clip-text bg-gradient-to-br from-[#0EA5E9] to-[#0D9488] select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-24 h-24 text-[#0EA5E9] opacity-20 animate-bounce"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-text-primary mb-3">
          Destination Not Found
        </h1>
        <p className="text-text-secondary text-lg mb-8 leading-relaxed">
          Looks like this page took an unexpected detour. The page you&apos;re
          looking for doesn&apos;t exist or has been moved to a new location.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0EA5E9] to-[#0D9488] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center justify-center gap-2 border-2 border-[#0EA5E9] text-[#0EA5E9] px-8 py-3 rounded-xl font-semibold hover:bg-[#0EA5E9] hover:text-white transition-all duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Explore Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
