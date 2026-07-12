'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MapPin, Star, Share2, Heart } from 'lucide-react';
import ImageGallery from '@/components/tours/ImageGallery';
import TourSpecifications from '@/components/tours/TourSpecifications';
import ReviewsSection from '@/components/tours/ReviewsSection';
import RelatedTours from '@/components/tours/RelatedTours';
import BookingSidebar from '@/components/tours/BookingSidebar';
import BookingModal from '@/components/tours/BookingModal';
import { Tour } from '@/types';
import api from '@/lib/api';

export default function TourDetailPage() {
  const params = useParams();
  const tourId = params.id as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/tours/${tourId}`);
        setTour(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load tour');
      } finally {
        setLoading(false);
      }
    };

    if (tourId) {
      fetchTour();
    }
  }, [tourId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb skeleton */}
          <div className="h-4 w-48 bg-gray-200 rounded mb-6 animate-pulse" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Image skeleton */}
              <div className="h-[450px] bg-gray-200 rounded-xl animate-pulse" />
              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                <div className="h-32 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-96 bg-gray-200 rounded-xl animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Tour Not Found</h1>
          <p className="text-text-secondary mb-6">
            {error || 'The tour you are looking for does not exist.'}
          </p>
          <Link
            href="/tours"
            className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
          >
            Browse All Tours
          </Link>
        </div>
      </div>
    );
  }

  // Build all gallery images: thumbnail + images array
  const galleryImages = [tour.thumbnail, ...(tour.images || [])].filter(Boolean);

  const price = tour.discountPrice || tour.price;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/tours" className="hover:text-primary transition-colors">
            Tours
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-text-primary font-medium truncate max-w-[200px]">
            {tour.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={galleryImages} title={tour.title} />

            {/* Title & Meta */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-xs font-medium text-secondary bg-secondary/10 px-2 py-1 rounded">
                      {tour.category?.name}
                    </span>
                    <span className="flex items-center space-x-1 text-sm">
                      <Star className="h-4 w-4 text-accent fill-accent" />
                      <span className="font-medium">{tour.ratings.average.toFixed(1)}</span>
                      <span className="text-text-secondary">
                        ({tour.ratings.count} reviews)
                      </span>
                    </span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
                    {tour.title}
                  </h1>
                  <div className="flex items-center text-text-secondary mt-2">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{tour.destination?.name}, {tour.destination?.region}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="h-5 w-5 text-text-secondary" />
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <Heart className="h-5 w-5 text-text-secondary" />
                  </button>
                </div>
              </div>

              {/* Price on mobile */}
              <div className="mt-4 p-4 bg-white rounded-xl shadow-sm lg:hidden">
                <div className="flex items-center space-x-2">
                  {tour.discountPrice && (
                    <span className="text-sm text-text-secondary line-through">
                      ৳{tour.price.toLocaleString()}
                    </span>
                  )}
                  <span className="text-2xl font-bold text-primary">
                    ৳{price.toLocaleString()}
                  </span>
                  <span className="text-sm text-text-secondary">/person</span>
                </div>
              </div>
            </div>

            {/* Tabs / Sections */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <TourSpecifications tour={tour} />
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ReviewsSection
                tourId={tourId}
                averageRating={tour.ratings.average}
                totalReviews={tour.ratings.count}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BookingSidebar
              tour={tour}
              onBookNow={() => setBookingModalOpen(true)}
            />
          </div>
        </div>

        {/* Related Tours */}
        <div className="mt-16">
          <RelatedTours tourId={tourId} />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        tourId={tourId}
        tourTitle={tour.title}
        pricePerPerson={price}
        maxGroupSize={tour.maxGroupSize}
      />
    </div>
  );
}
