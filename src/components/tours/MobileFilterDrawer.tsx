'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import FilterSidebar from './FilterSidebar';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: { _id: string; name: string; slug: string }[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
  minRating: string;
  onMinRatingChange: (value: string) => void;
  onClearFilters: () => void;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  minRating,
  onMinRatingChange,
  onClearFilters,
}: MobileFilterDrawerProps) {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        <div className="p-4">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(cat) => {
              onCategoryChange(cat);
            }}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={onMinPriceChange}
            onMaxPriceChange={onMaxPriceChange}
            minRating={minRating}
            onMinRatingChange={onMinRatingChange}
            onClearFilters={onClearFilters}
          />
        </div>

        <div className="p-4 border-t">
          <button
            onClick={onClose}
            className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
