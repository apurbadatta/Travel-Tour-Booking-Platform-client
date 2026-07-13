'use client';

import Link from 'next/link';
import { MapPin, Clock, Users, Star, Heart } from 'lucide-react';
import { Tour } from '@/types';

interface TourCardProps {
  tour: Tour;
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700">
      {/* Image */}
      <div className="relative h-48">
        <img
          src={tour.thumbnail}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        {tour.discountPrice && (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded text-sm font-medium">
            {Math.round((1 - tour.discountPrice / tour.price) * 100)}% OFF
          </div>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded-full hover:bg-white dark:hover:bg-gray-700 transition-colors">
          <Heart className="h-5 w-5 text-text-secondary" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Rating */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
            {tour.category?.name || 'Adventure'}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-accent fill-accent" />
            <span className="text-sm font-medium text-text-primary">
              {tour.ratings?.average?.toFixed(1) || '4.8'}
            </span>
            <span className="text-xs text-text-secondary">
              ({tour.ratings?.count || 0})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
          {tour.title}
        </h3>

        {/* Location */}
        <div className="flex items-center text-text-secondary text-sm mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{tour.destination?.name || 'Bangladesh'}</span>
        </div>

        {/* Duration & Group Size */}
        <div className="flex items-center space-x-4 text-sm text-text-secondary mb-4">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{tour.duration?.days}D/{tour.duration?.nights}N</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>Max {tour.maxGroupSize || 15}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div>
            {tour.discountPrice ? (
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  ৳{tour.discountPrice.toLocaleString()}
                </span>
                <span className="text-sm text-text-secondary line-through">
                  ৳{tour.price.toLocaleString()}
                </span>
              </div>
            ) : (
              <span className="text-xl font-bold text-primary">
                ৳{tour.price.toLocaleString()}
              </span>
            )}
            <span className="text-xs text-text-secondary">/person</span>
          </div>
          <Link
            href={`/tours/${tour._id}`}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}