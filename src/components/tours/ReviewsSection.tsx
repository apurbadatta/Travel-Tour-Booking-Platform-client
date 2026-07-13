'use client';

import { useState, useEffect } from 'react';
import { Star, User } from 'lucide-react';
import api from '@/lib/api';

interface Review {
  _id: string;
  user: {
    name: string;
    image?: string;
  };
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  tourId: string;
  averageRating: number;
  totalReviews: number;
}

interface RatingBreakdown {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export default function ReviewsSection({
  tourId,
  averageRating,
  totalReviews,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [breakdown, setBreakdown] = useState<RatingBreakdown>({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/tours/${tourId}/reviews`, {
          params: { page, limit: 5 },
        });
        const data = response.data.data;
        setReviews(data.reviews);
        setBreakdown(data.ratingBreakdown);
        setHasMore(data.pagination.hasNext);
      } catch (error) {
        console.error('Failed to fetch reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tourId, page]);

  const maxCount = Math.max(...Object.values(breakdown), 1);

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-6">Reviews & Ratings</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="md:col-span-1">
          <div className="text-center p-6 bg-background rounded-xl">
            <div className="text-5xl font-bold text-text-primary mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center justify-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${
                    star <= Math.round(averageRating)
                      ? 'text-accent fill-accent'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-text-secondary text-sm">
              {totalReviews} review{totalReviews !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Rating Breakdown */}
          <div className="mt-4 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => (
              <div key={star} className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary w-8">{star}★</span>
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all"
                    style={{
                      width: `${(breakdown[star as keyof RatingBreakdown] / maxCount) * 100}%`,
                    }}
                  />
                </div>
                <span className="text-sm text-text-secondary w-8 text-right">
                  {breakdown[star as keyof RatingBreakdown]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="md:col-span-2">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                    <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                  </div>
                  <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                  <div className="h-16 w-full bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <Star className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <p className="text-text-secondary">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b border-gray-100 dark:border-gray-700 pb-6 last:border-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      {review.user?.image ? (
                        <img
                          src={review.user.image}
                          alt={review.user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">
                        {review.user?.name || 'Anonymous'}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= review.rating
                            ? 'text-accent fill-accent'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  <h4 className="font-medium text-text-primary mb-1">{review.title}</h4>
                  <p className="text-text-secondary text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {hasMore && (
            <button
              onClick={() => setPage((p) => p + 1)}
              className="mt-4 px-4 py-2 text-primary hover:text-primary/80 font-medium text-sm"
            >
              Load more reviews
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
