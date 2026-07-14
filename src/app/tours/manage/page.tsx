'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Loader2,
  Eye,
  Pencil,
  Trash2,
  Plus,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  DollarSign,
  MapPin,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';
import { Tour } from '@/types';

interface DeleteModalProps {
  isOpen: boolean;
  tour: Tour | null;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

function DeleteModal({ isOpen, tour, onConfirm, onCancel, isDeleting }: DeleteModalProps) {
  if (!isOpen || !tour) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-surface dark:bg-[#1E293B] rounded-xl p-6 max-w-md w-full mx-4 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary">Are you sure?</h3>
        </div>
        <p className="text-text-secondary mb-6">
          You are about to delete <span className="font-medium text-text-primary">{tour.title}</span>.
          This action cannot be undone.
        </p>
        <div className="flex items-center justify-end space-x-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 border border-gray-200 rounded-lg text-text-primary font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ tour }: { tour: Tour }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const statusConfig = {
    pending: {
      icon: Clock,
      label: 'Pending',
      className: 'bg-amber-100 text-amber-800',
    },
    approved: {
      icon: CheckCircle,
      label: 'Approved',
      className: 'bg-green-100 text-green-800',
    },
    rejected: {
      icon: XCircle,
      label: 'Rejected',
      className: 'bg-red-100 text-red-800',
    },
  };

  const config = statusConfig[tour.status];
  const Icon = config.icon;

  return (
    <div className="relative inline-flex">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className} ${
          tour.status === 'rejected' ? 'cursor-help' : ''
        }`}
        onMouseEnter={() => tour.status === 'rejected' && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
      {tour.status === 'rejected' && tour.rejectionReason && showTooltip && (
        <div
          ref={tooltipRef}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg shadow-lg z-10"
        >
          <div className="font-medium mb-1">Rejection Reason:</div>
          <div className="text-gray-300">{tour.rejectionReason}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-900 rotate-45" />
        </div>
      )}
    </div>
  );
}

export default function ManageToursPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, addToast } = useAuth();

  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    tour: Tour | null;
  }>({ isOpen: false, tour: null });
  const [isDeleting, setIsDeleting] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login?redirect=/tours/manage');
    }
  }, [isAuthenticated, authLoading, router]);

  // Fetch user's tours
  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await api.get('/api/tours/my-tours');
        setTours(response.data.data.tours);
      } catch (error) {
        console.error('Failed to fetch tours:', error);
        addToast('Failed to load your tours. Please try again.', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchTours();
    }
  }, [isAuthenticated, addToast]);

  const handleDelete = async () => {
    if (!deleteModal.tour) return;

    setIsDeleting(true);
    try {
      await api.delete(`/api/tours/${deleteModal.tour._id}`);
      setTours((prev) => prev.filter((t) => t._id !== deleteModal.tour!._id));
      setDeleteModal({ isOpen: false, tour: null });
      addToast('Tour deleted successfully.', 'success');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete tour';
      addToast(message, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
              Manage Your Tours
            </h1>
            <p className="text-text-secondary mt-1">
              View and manage all the tours you have submitted.
            </p>
          </div>
          <Link
            href="/tours/add"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add New Tour</span>
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-1 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="col-span-3 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="col-span-1 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="col-span-1 h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="px-6 py-4 border-t border-gray-100"
              >
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 h-12 w-12 bg-gray-200 rounded-lg animate-pulse" />
                  <div className="col-span-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
                  </div>
                  <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="col-span-2 h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="col-span-1 h-6 bg-gray-200 rounded-full animate-pulse" />
                  <div className="col-span-1 flex items-center justify-end space-x-2">
                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                    <div className="h-8 w-8 bg-gray-200 rounded-lg animate-pulse" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : tours.length === 0 ? (
          <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <MapPin className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                You haven&apos;t added any tours yet
              </h3>
              <p className="text-text-secondary text-center max-w-md mb-6">
                Start sharing your travel experiences by adding your first tour. It will be reviewed by an admin before going live.
              </p>
              <Link
                href="/tours/add"
                className="inline-flex items-center space-x-2 px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Your First Tour</span>
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-3 border-b border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-12 gap-4 text-xs font-medium text-text-secondary uppercase tracking-wider">
                  <div className="col-span-1">Image</div>
                  <div className="col-span-3">Title</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Category</div>
                  <div className="col-span-2">Date Added</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {tours.map((tour) => (
                  <div key={tour._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      {/* Image Thumbnail */}
                      <div className="col-span-1">
                        <img
                          src={tour.thumbnail}
                          alt={tour.title}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </div>

                      {/* Title */}
                      <div className="col-span-3">
                        <p className="font-medium text-text-primary truncate">
                          {tour.title}
                        </p>
                        <p className="text-sm text-text-secondary truncate">
                          {tour.destination?.name || 'N/A'}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-3.5 w-3.5 text-text-secondary" />
                          <span className="font-medium text-text-primary">
                            ৳{tour.price.toLocaleString()}
                          </span>
                        </div>
                        {tour.discountPrice && (
                          <p className="text-xs text-green-600">
                            Discount: ৳{tour.discountPrice.toLocaleString()}
                          </p>
                        )}
                      </div>

                      {/* Category */}
                      <div className="col-span-2">
                        <span className="text-sm text-text-secondary">
                          {tour.category?.name || 'N/A'}
                        </span>
                      </div>

                      {/* Date Added */}
                      <div className="col-span-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3.5 w-3.5 text-text-secondary" />
                          <span className="text-sm text-text-secondary">
                            {formatDate(tour.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Status */}
                      <div className="col-span-1">
                        <StatusBadge tour={tour} />
                      </div>

                      {/* Actions */}
                      <div className="col-span-1 flex items-center justify-end space-x-1">
                        {tour.status === 'approved' ? (
                          <Link
                            href={`/tours/${tour.slug || tour._id}`}
                            className="p-2 text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/5"
                            title="View tour"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        ) : (
                          <div className="relative group">
                            <span className="p-2 text-text-secondary opacity-50 cursor-not-allowed rounded-lg inline-flex">
                              <Eye className="h-4 w-4" />
                            </span>
                            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Awaiting approval
                            </div>
                          </div>
                        )}
                        <Link
                          href={`/tours/edit/${tour._id}`}
                          className="p-2 text-amber-600 hover:text-amber-800 transition-colors rounded-lg hover:bg-amber-50"
                          title="Edit tour"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, tour })
                          }
                          className="p-2 text-red-600 hover:text-red-800 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete tour"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden space-y-4">
              {tours.map((tour) => (
                <div
                  key={tour._id}
                  className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700"
                >
                  <div className="p-4">
                    <div className="flex items-start space-x-4">
                      <img
                        src={tour.thumbnail}
                        alt={tour.title}
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-text-primary truncate">
                          {tour.title}
                        </h3>
                        <p className="text-sm text-text-secondary truncate mt-0.5">
                          {tour.destination?.name || 'N/A'}
                        </p>
                        <div className="flex items-center flex-wrap gap-2 mt-2">
                          <StatusBadge tour={tour} />
                          <span className="text-sm font-medium text-text-primary">
                            ৳{tour.price.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-1 text-sm text-text-secondary">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>{formatDate(tour.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        {tour.status === 'approved' ? (
                          <Link
                            href={`/tours/${tour.slug || tour._id}`}
                            className="p-2 text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/5"
                            title="View tour"
                          >
                            <Eye className="h-4 w-4" />
                          </Link>
                        ) : (
                          <div className="relative group">
                            <span className="p-2 text-text-secondary opacity-50 cursor-not-allowed rounded-lg inline-flex">
                              <Eye className="h-4 w-4" />
                            </span>
                            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Awaiting approval
                            </div>
                          </div>
                        )}
                        <Link
                          href={`/tours/edit/${tour._id}`}
                          className="p-2 text-amber-600 hover:text-amber-800 transition-colors rounded-lg hover:bg-amber-50"
                          title="Edit tour"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() =>
                            setDeleteModal({ isOpen: true, tour })
                          }
                          className="p-2 text-red-600 hover:text-red-800 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete tour"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        tour={deleteModal.tour}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ isOpen: false, tour: null })}
        isDeleting={isDeleting}
      />
    </div>
  );
}
