'use client';

import { useState } from 'react';
import {
  Clock,
  Users,
  MapPin,
  Mountain,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
} from 'lucide-react';
import { Tour } from '@/types';

interface TourSpecificationsProps {
  tour: Tour;
}

export default function TourSpecifications({ tour }: TourSpecificationsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  const difficultyColors = {
    easy: 'bg-success/10 text-success',
    moderate: 'bg-warning/10 text-warning',
    challenging: 'bg-error/10 text-error',
  };

  // Generate placeholder itinerary from duration if none exists
  const itinerary = (tour as any).itinerary || [];
  const hasItinerary = itinerary.length > 0;

  return (
    <div className="space-y-8">
      {/* Overview */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">Overview</h2>
        <div className="text-text-secondary leading-relaxed">
          <p className={showFullDescription ? '' : 'line-clamp-3'}>
            {tour.description}
          </p>
          {tour.description.length > 200 && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="text-primary hover:text-primary/80 font-medium mt-2 flex items-center"
            >
              {showFullDescription ? (
                <>
                  Show less <ChevronUp className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Key Specifications */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">Key Information</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <Clock className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-secondary">Duration</p>
              <p className="font-medium text-text-primary">
                {tour.duration.days}D / {tour.duration.nights}N
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-secondary">Group Size</p>
              <p className="font-medium text-text-primary">
                Max {tour.maxGroupSize} people
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-secondary">Destination</p>
              <p className="font-medium text-text-primary">
                {tour.destination?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <Mountain className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-secondary">Difficulty</p>
              <span
                className={`inline-block px-2 py-0.5 rounded text-xs font-medium capitalize ${
                  difficultyColors[tour.difficulty]
                }`}
              >
                {tour.difficulty}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-secondary">Start Point</p>
              <p className="font-medium text-text-primary text-sm">
                {(tour as any).departureLocation || 'Dhaka'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-background rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-xs text-text-secondary">End Point</p>
              <p className="font-medium text-text-primary text-sm">
                {(tour as any).endPoint || (tour as any).departureLocation || 'Dhaka'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Included / Excluded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Included */}
        {tour.included && tour.included.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              What's Included
            </h3>
            <ul className="space-y-2">
              {tour.included.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Excluded */}
        {tour.excluded && tour.excluded.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              What's Not Included
            </h3>
            <ul className="space-y-2">
              {tour.excluded.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <X className="h-4 w-4 text-error mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-text-secondary">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Highlights */}
      {tour.highlights && tour.highlights.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">Highlights</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {tour.highlights.map((highlight, index) => (
              <li key={index} className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                <span className="text-text-secondary">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Itinerary */}
      {hasItinerary && (
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">Itinerary</h2>
          <div className="space-y-3">
            {itinerary.map((day: any) => (
              <div
                key={day.day}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setExpandedDay(expandedDay === day.day ? null : day.day)
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center font-medium text-sm">
                      {day.day}
                    </span>
                    <span className="font-medium text-text-primary">{day.title}</span>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-text-secondary transition-transform ${
                      expandedDay === day.day ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedDay === day.day && (
                  <div className="px-4 pb-4 border-t">
                    <p className="text-text-secondary mt-3">{day.description}</p>
                    {day.accommodation && (
                      <p className="text-sm text-text-secondary mt-2">
                        <span className="font-medium">Accommodation:</span>{' '}
                        {day.accommodation}
                      </p>
                    )}
                    {day.meals && (
                      <p className="text-sm text-text-secondary mt-1">
                        <span className="font-medium">Meals:</span> {day.meals}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start Dates */}
      {(tour as any).startDates && (tour as any).startDates.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-text-primary mb-4">Available Dates</h2>
          <div className="flex flex-wrap gap-2">
            {(tour as any).startDates.map((date: string, index: number) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-3 py-2 bg-background rounded-lg border border-gray-200"
              >
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm text-text-primary">
                  {new Date(date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
