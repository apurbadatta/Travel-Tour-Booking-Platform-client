'use client';

import Link from 'next/link';
import { Mountain, Waves, TreePine, Landmark, Tent, Ship } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Adventure',
    icon: Mountain,
    tourCount: 24,
    color: 'bg-blue-500',
    slug: 'adventure',
  },
  {
    id: 2,
    name: 'Beach & Coastal',
    icon: Waves,
    tourCount: 18,
    color: 'bg-cyan-500',
    slug: 'beach',
  },
  {
    id: 3,
    name: 'Nature & Wildlife',
    icon: TreePine,
    tourCount: 15,
    color: 'bg-green-500',
    slug: 'nature',
  },
  {
    id: 4,
    name: 'Cultural Heritage',
    icon: Landmark,
    tourCount: 12,
    color: 'bg-amber-500',
    slug: 'cultural',
  },
  {
    id: 5,
    name: 'Camping & Trekking',
    icon: Tent,
    tourCount: 20,
    color: 'bg-orange-500',
    slug: 'camping',
  },
  {
    id: 6,
    name: 'River Cruises',
    icon: Ship,
    tourCount: 8,
    color: 'bg-indigo-500',
    slug: 'river-cruise',
  },
];

export default function TourCategories() {
  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Explore by Category
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Choose from a variety of tour categories that suit your interests and adventure level.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/tours?category=${category.slug}`}
              className="group p-6 bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm text-center hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div
                className={`w-14 h-14 mx-auto mb-3 ${category.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform`}
              >
                <category.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-text-primary mb-1">{category.name}</h3>
              <p className="text-sm text-text-secondary">{category.tourCount} tours</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}