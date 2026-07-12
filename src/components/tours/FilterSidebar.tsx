'use client';

import { Star } from 'lucide-react';

interface FilterSidebarProps {
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

const ratingOptions = [
  { value: '', label: 'All Ratings' },
  { value: '4.5', label: '4.5 & above' },
  { value: '4.0', label: '4.0 & above' },
  { value: '3.5', label: '3.5 & above' },
  { value: '3.0', label: '3.0 & above' },
];

export default function FilterSidebar({
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
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategory || minPrice || maxPrice || minRating;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-text-primary">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-primary hover:text-primary/80"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ''}
              onChange={() => onCategoryChange('')}
              className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
            />
            <span className="text-sm text-text-secondary">All Categories</span>
          </label>
          {categories.map((cat) => (
            <label key={cat._id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat._id}
                onChange={() => onCategoryChange(cat._id)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              <span className="text-sm text-text-secondary">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Price Range (BDT)</h4>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            min="0"
          />
          <span className="text-text-secondary">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            min="0"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <h4 className="text-sm font-medium text-text-primary mb-3">Minimum Rating</h4>
        <div className="space-y-2">
          {ratingOptions.map((option) => (
            <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={minRating === option.value}
                onChange={() => onMinRatingChange(option.value)}
                className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
              />
              {option.value ? (
                <span className="flex items-center space-x-1 text-sm text-text-secondary">
                  <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                  <span>{option.label}</span>
                </span>
              ) : (
                <span className="text-sm text-text-secondary">{option.label}</span>
              )}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
