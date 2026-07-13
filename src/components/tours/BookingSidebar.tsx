'use client';

import { useRouter } from 'next/navigation';
import { Star, MapPin, Clock, Users, Calendar } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { Tour } from '@/types';

interface BookingSidebarProps {
  tour: Tour;
  onBookNow: () => void;
}

export default function BookingSidebar({ tour, onBookNow }: BookingSidebarProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const handleBookClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    onBookNow();
  };

  const price = tour.discountPrice || tour.price;
  const hasDiscount = !!tour.discountPrice;

  return (
    <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-md p-6 sticky top-24 border border-gray-100 dark:border-gray-700 transition-colors duration-300">
      {/* Price */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-1">
          {hasDiscount && (
            <span className="text-sm text-text-secondary line-through">
              ৳{tour.price.toLocaleString()}
            </span>
          )}
          <span className="text-3xl font-bold text-primary">
            ৳{price.toLocaleString()}
          </span>
        </div>
        <p className="text-sm text-text-secondary">per person</p>
        {hasDiscount && (
          <span className="inline-block mt-2 px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
            {Math.round((1 - tour.discountPrice! / tour.price) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Quick Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Duration</p>
            <p className="text-sm font-medium text-text-primary">
              {tour.duration.days}D / {tour.duration.nights}N
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Group Size</p>
            <p className="text-sm font-medium text-text-primary">
              Max {tour.maxGroupSize} people
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <MapPin className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Destination</p>
            <p className="text-sm font-medium text-text-primary">
              {tour.destination?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Star className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-xs text-text-secondary">Rating</p>
            <p className="text-sm font-medium text-text-primary">
              {tour.ratings.average.toFixed(1)} ({tour.ratings.count} reviews)
            </p>
          </div>
        </div>
      </div>

      {/* Start Dates */}
      {(tour as any).startDates && (tour as any).startDates.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="h-4 w-4 text-text-secondary" />
            <span className="text-sm font-medium text-text-primary">Available Dates</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(tour as any).startDates.slice(0, 3).map((date: string, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-background text-xs text-text-secondary rounded"
              >
                {new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      <button
        onClick={handleBookClick}
        className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
      >
        {isAuthenticated ? 'Book Now' : 'Login to Book'}
      </button>

      <p className="text-xs text-text-secondary text-center mt-3">
        Free cancellation up to 48 hours before departure
      </p>
    </div>
  );
}
