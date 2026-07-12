'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TourCard from '@/components/ui/TourCard';
import { Tour } from '@/types';

// Placeholder featured tours data
const featuredTours: Tour[] = [
  {
    _id: '1',
    title: 'Sundarbans Mangrove Explorer',
    slug: 'sundarbans-mangrove-explorer',
    description: 'Experience the wilderness of the world\'s largest mangrove forest.',
    shortDescription: '3-day adventure through the Sundarbans with wildlife spotting.',
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    price: 15000,
    discountPrice: 12500,
    duration: { days: 3, nights: 2 },
    maxGroupSize: 15,
    ratings: { average: 4.8, count: 124 },
    destination: { _id: '1', name: 'Sundarbans', slug: 'sundarbans' },
    category: { _id: '1', name: 'Adventure', slug: 'adventure' },
    isFeatured: true,
    isActive: true,
  },
  {
    _id: '2',
    title: 'Sajek Valley Sunrise Trek',
    slug: 'sajek-valley-sunrise-trek',
    description: 'Witness the magical sunrise above the clouds in Sajek.',
    shortDescription: '2-day trek to the majestic Sajek Valley.',
    thumbnail: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
    price: 8500,
    duration: { days: 2, nights: 1 },
    maxGroupSize: 12,
    ratings: { average: 4.9, count: 89 },
    destination: { _id: '2', name: 'Sajek Valley', slug: 'sajek-valley' },
    category: { _id: '2', name: 'Nature', slug: 'nature' },
    isFeatured: true,
    isActive: true,
  },
  {
    _id: '3',
    title: "Cox's Bazar Beach Retreat",
    slug: 'coxs-bazar-beach-retreat',
    description: 'Relax at the world\'s longest natural sandy beach.',
    shortDescription: '3-day beach vacation with water sports.',
    thumbnail: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    price: 10000,
    discountPrice: 8500,
    duration: { days: 3, nights: 2 },
    maxGroupSize: 20,
    ratings: { average: 4.7, count: 156 },
    destination: { _id: '3', name: "Cox's Bazar", slug: 'coxs-bazar' },
    category: { _id: '3', name: 'Beach', slug: 'beach' },
    isFeatured: true,
    isActive: true,
  },
  {
    _id: '4',
    title: 'Bandarban Hill Tracts',
    slug: 'bandarban-hill-tracts',
    description: 'Explore the pristine hills and tribal culture of Bandarban.',
    shortDescription: '4-day cultural immersion in the Chittagong Hill Tracts.',
    thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
    price: 18000,
    duration: { days: 4, nights: 3 },
    maxGroupSize: 10,
    ratings: { average: 4.9, count: 67 },
    destination: { _id: '4', name: 'Bandarban', slug: 'bandarban' },
    category: { _id: '4', name: 'Cultural', slug: 'cultural' },
    isFeatured: true,
    isActive: true,
  },
];

export default function FeaturedPackages() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">
              Featured Tour Packages
            </h2>
            <p className="text-text-secondary">
              Handpicked tours that offer the best value and experience.
            </p>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium mt-4 md:mt-0"
          >
            <span>View All Tours</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredTours.map((tour) => (
            <TourCard key={tour._id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}