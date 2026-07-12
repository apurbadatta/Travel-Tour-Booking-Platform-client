'use client';

import { ChevronDown } from 'lucide-react';

interface SortSelectProps {
  value: string;
  onChange: (value: string) => void;
}

const sortOptions = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-ratings.average', label: 'Highest Rated' },
  { value: 'ratings.average', label: 'Lowest Rated' },
];

export default function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary cursor-pointer"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
    </div>
  );
}
