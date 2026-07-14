'use client';

import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: 'Sundarbans',
    country: 'Bangladesh',
    tourCount: 12,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    slug: 'sundarbans',
  },
  {
    id: 2,
    name: 'Sajek Valley',
    country: 'Bangladesh',
    tourCount: 8,
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
    slug: 'sajek-valley',
  },
  {
    id: 3,
    name: "Cox's Bazar",
    country: 'Bangladesh',
    tourCount: 15,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80',
    slug: 'coxs-bazar',
  },
  {
    id: 4,
    name: 'Bandarban',
    country: 'Bangladesh',
    tourCount: 10,
    image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=80',
    slug: 'bandarban',
  },
  {
    id: 5,
    name: 'Saint Martin',
    country: 'Bangladesh',
    tourCount: 6,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&q=80',
    slug: 'saint-martin',
  },
  {
    id: 6,
    name: 'Rangamati',
    country: 'Bangladesh',
    tourCount: 9,
    image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=600&q=80',
    slug: 'rangamati',
  },
];

export default function PopularDestinations() {
  return (
    <section id="destinations" className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Popular Destinations
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore the most breathtaking destinations in Bangladesh. From serene beaches
            to majestic hills, your adventure awaits.
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((destination) => (
            <Link
              key={destination.id}
              href={`/tours?search=${encodeURIComponent(destination.name)}`}
              className="group relative h-64 rounded-xl overflow-hidden"
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="flex items-center text-white/80 text-sm mb-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{destination.country}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{destination.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white/80 text-sm">
                    {destination.tourCount} tours available
                  </span>
                  <ArrowRight className="h-5 w-5 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            href="/tours"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium"
          >
            <span>View All Destinations</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}