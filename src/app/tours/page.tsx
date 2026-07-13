'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { SlidersHorizontal, SearchX, AlertCircle } from 'lucide-react';
import TourCard from '@/components/ui/TourCard';
import TourCardSkeleton from '@/components/ui/TourCardSkeleton';
import SearchBar from '@/components/tours/SearchBar';
import FilterSidebar from '@/components/tours/FilterSidebar';
import SortSelect from '@/components/tours/SortSelect';
import Pagination from '@/components/tours/Pagination';
import MobileFilterDrawer from '@/components/tours/MobileFilterDrawer';
import { Tour, TourListResponse } from '@/types';
import api from '@/lib/api';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

function ToursContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialMinPrice = searchParams.get('minPrice') || '';
  const initialMaxPrice = searchParams.get('maxPrice') || '';
  const initialRating = searchParams.get('rating') || '';
  const initialSort = searchParams.get('sortBy') || '-createdAt';
  const initialPage = parseInt(searchParams.get('page') || '1', 10);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState(initialMinPrice);
  const [maxPrice, setMaxPrice] = useState(initialMaxPrice);
  const [minRating, setMinRating] = useState(initialRating);
  const [sortBy, setSortBy] = useState(initialSort);
  const [page, setPage] = useState(initialPage);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [tours, setTours] = useState<Tour[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category) params.set('category', category);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minRating) params.set('rating', minRating);
    if (sortBy !== '-createdAt') params.set('sortBy', sortBy);
    if (page > 1) params.set('page', page.toString());

    const queryString = params.toString();
    router.push(`/tours${queryString ? `?${queryString}` : ''}`, { scroll: false });
  }, [search, category, minPrice, maxPrice, minRating, sortBy, page, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/api/tours/categories');
        setCategories(response.data.data);
      } catch {
        // Fallback to hardcoded categories if API fails
        setCategories([
          { _id: 'adventure', name: 'Adventure', slug: 'adventure' },
          { _id: 'nature', name: 'Nature', slug: 'nature' },
          { _id: 'beach', name: 'Beach', slug: 'beach' },
          { _id: 'cultural', name: 'Cultural', slug: 'cultural' },
          { _id: 'trekking', name: 'Trekking', slug: 'trekking' },
          { _id: 'wildlife', name: 'Wildlife', slug: 'wildlife' },
          { _id: 'spiritual', name: 'Spiritual', slug: 'spiritual' },
          { _id: 'luxury', name: 'Luxury', slug: 'luxury' },
        ]);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setFetchError('');
      try {
        const params: Record<string, string> = {
          page: page.toString(),
          limit: '12',
          sortBy,
        };

        if (search) params.search = search;
        if (category) params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (minRating) params.rating = minRating;

        const response = await api.get('/api/tours', { params });
        const data: TourListResponse = response.data.data;
        setTours(data.tours);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Failed to fetch tours:', error);
        setFetchError('Failed to load tours. Please check your connection and try again.');
        setTours([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [search, category, minPrice, maxPrice, minRating, sortBy, page]);

  useEffect(() => {
    updateURL();
  }, [updateURL]);

  useEffect(() => {
    setPage(1);
  }, [search, category, minPrice, maxPrice, minRating, sortBy]);

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setMinRating('');
    setSortBy('-createdAt');
    setPage(1);
  };

  const activeFilterCount = [category, minPrice, maxPrice, minRating].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Explore Tours
              </h1>
              <p className="text-text-secondary mt-1">
                {pagination.total > 0
                  ? `${pagination.total} tours available`
                  : 'Discover your next adventure'}
              </p>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="md:hidden flex items-center space-x-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="h-5 w-5 text-text-secondary" />
              <span className="text-sm font-medium text-text-primary">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <SortSelect value={sortBy} onChange={setSortBy} />
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-xl p-5 shadow-sm">
              {!categoriesLoading && (
                <FilterSidebar
                  categories={categories}
                  selectedCategory={category}
                  onCategoryChange={setCategory}
                  minPrice={minPrice}
                  maxPrice={maxPrice}
                  onMinPriceChange={setMinPrice}
                  onMaxPriceChange={setMaxPrice}
                  minRating={minRating}
                  onMinRatingChange={setMinRating}
                  onClearFilters={handleClearFilters}
                />
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Active Filter Tags */}
            {(category || minPrice || maxPrice || minRating) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-sm text-text-secondary">Active:</span>
                {category && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    {categories.find((c) => c._id === category)?.name || category}
                    <button
                      onClick={() => setCategory('')}
                      className="ml-1.5 hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                )}
                {minPrice && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Min: ৳{Number(minPrice).toLocaleString()}
                    <button
                      onClick={() => setMinPrice('')}
                      className="ml-1.5 hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                )}
                {maxPrice && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Max: ৳{Number(maxPrice).toLocaleString()}
                    <button
                      onClick={() => setMaxPrice('')}
                      className="ml-1.5 hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                )}
                {minRating && (
                  <span className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                    Rating: {minRating}+
                    <button
                      onClick={() => setMinRating('')}
                      className="ml-1.5 hover:text-primary/70"
                    >
                      ×
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Tour Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <TourCardSkeleton key={i} />
                ))}
              </div>
            ) : fetchError ? (
              <div className="flex flex-col items-center justify-center py-20">
                <AlertCircle className="h-16 w-16 text-error/50 mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  Something went wrong
                </h3>
                <p className="text-text-secondary mb-6 text-center max-w-md">
                  {fetchError}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : tours.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <SearchX className="h-16 w-16 text-text-secondary/50 mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">
                  No tours found
                </h3>
                <p className="text-text-secondary mb-6 text-center max-w-md">
                  We could not find any tours matching your filters. Try adjusting
                  your search criteria or clear all filters.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tours.map((tour) => (
                    <TourCard key={tour._id} tour={tour} />
                  ))}
                </div>

                <div className="mt-10">
                  <Pagination
                    currentPage={pagination.page}
                    totalPages={pagination.totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        categories={categories}
        selectedCategory={category}
        onCategoryChange={setCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        onClearFilters={handleClearFilters}
      />
    </div>
  );
}

export default function ToursPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background">
          <div className="bg-white border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                Explore Tours
              </h1>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <TourCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <ToursContent />
    </Suspense>
  );
}
