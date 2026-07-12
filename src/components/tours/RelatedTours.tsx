'use client';

import { useState, useEffect } from 'react';
import TourCard from '@/components/ui/TourCard';
import TourCardSkeleton from '@/components/ui/TourCardSkeleton';
import { Tour } from '@/types';
import api from '@/lib/api';

interface RelatedToursProps {
  tourId: string;
}

export default function RelatedTours({ tourId }: RelatedToursProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/tours/${tourId}/related`);
        setTours(response.data.data);
      } catch (error) {
        console.error('Failed to fetch related tours:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [tourId]);

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6">Related Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <TourCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (tours.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Related Tours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tours.map((tour) => (
          <TourCard key={tour._id} tour={tour} />
        ))}
      </div>
    </div>
  );
}
