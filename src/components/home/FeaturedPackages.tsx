'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TourCard from '@/components/ui/TourCard';
import TourCardSkeleton from '@/components/ui/TourCardSkeleton';
import { Tour, TourListResponse } from '@/types';
import api from '@/lib/api';

export default function FeaturedPackages() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/tours', {
          params: { limit: 8, sortBy: '-createdAt' },
        });
        const data: TourListResponse = response.data.data;
        setTours(data.tours);
      } catch (err) {
        console.error('Failed to fetch tours:', err);
        setError('Failed to load tours');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
    <section className="py-16 px-4 bg-surface dark:bg-[#0F172A] transition-colors duration-300">
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
        {error ? (
          <div className="text-center py-12">
            <p className="text-text-secondary">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <TourCardSkeleton key={i} />
                ))
              : tours.map((tour) => (
                  <TourCard key={tour._id} tour={tour} />
                ))}
          </div>
        )}
      </div>
    </section>
  );
}
