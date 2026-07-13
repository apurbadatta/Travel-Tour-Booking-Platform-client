'use client';

import { Suspense, useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Calendar, Users, DollarSign, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';

interface Tour {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
  discountPrice?: number;
  duration: {
    days: number;
    nights: number;
  };
}

interface Booking {
  _id: string;
  tour: Tour;
  travelDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
}

function BookingsListContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading, isAdmin, addToast } = useAuth();
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);

  const fetchBookings = useCallback(async () => {
    try {
      const response = await api.get('/api/bookings/my-bookings');
      setBookings(response.data.data || []);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      addToast('Failed to load bookings.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  // Handle Stripe Payment Redirect verification
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/login?redirect=/dashboard/bookings');
      return;
    }
    if (isAdmin) {
      router.push('/admin');
      addToast('Access denied. Admins cannot access user dashboard.', 'error');
      return;
    }

    const success = searchParams.get('success');
    const bookingId = searchParams.get('booking_id');
    const sessionId = searchParams.get('session_id');

    if (success === 'true' && bookingId && sessionId) {
      const verifyPayment = async () => {
        setVerifying(true);
        try {
          await api.post('/api/bookings/verify-payment', {
            bookingId,
            sessionId,
          });
          addToast('Payment successful! Your booking is now confirmed.', 'success');
          // Clear query params without reloading
          router.replace('/dashboard/bookings');
        } catch (err: any) {
          console.error('Payment verification failed:', err);
          addToast(err.response?.data?.message || 'Payment verification failed.', 'error');
        } finally {
          setVerifying(false);
          fetchBookings();
        }
      };
      verifyPayment();
    } else {
      fetchBookings();
    }
  }, [isAuthenticated, authLoading, isAdmin, searchParams, router, addToast, fetchBookings]);

  if (authLoading || verifying) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
        <p className="text-gray-600 font-medium animate-pulse">
          {verifying ? 'Verifying your payment securely...' : 'Loading your dashboard...'}
        </p>
      </div>
    );
  }

  if (!isAuthenticated || isAdmin) {
    return null;
  }

  const getStatusBadge = (status: Booking['status']) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-700 border-amber-200',
      confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      cancelled: 'bg-rose-50 text-rose-700 border-rose-200',
      completed: 'bg-sky-50 text-sky-700 border-sky-200',
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: Booking['paymentStatus']) => {
    const styles = {
      unpaid: 'bg-red-50 text-red-700 border-red-200',
      partial: 'bg-amber-50 text-amber-700 border-amber-200',
      paid: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      refunded: 'bg-gray-100 text-gray-700 border-gray-300',
    };

    return (
      <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Dashboard Header */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              User Dashboard <span className="text-sm font-normal text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Traveler</span>
            </h1>
            <p className="text-slate-500 mt-1">Manage your bookings, explore places, and track your payment history.</p>
          </div>
          <Link
            href="/tours"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md transition-all text-sm"
          >
            <span>Book Another Tour</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Bookings Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-teal-600" />
              My Bookings ({bookings.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-12 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-16 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-slate-200">
                <Calendar className="h-6 w-6 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">No bookings yet</h3>
              <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                You haven&apos;t booked any tours yet. Explore our featured destinations and book your first trip!
              </p>
              <Link
                href="/tours"
                className="mt-6 inline-flex px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-xl text-sm transition-colors"
              >
                Explore Tours
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Tour Package</th>
                    <th className="px-6 py-4">Travel Details</th>
                    <th className="px-6 py-4">Total Cost</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Payment</th>
                    <th className="px-6 py-4">Transaction ID</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Tour Package */}
                      <td className="px-6 py-4 min-w-[280px]">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100">
                            <img
                              src={booking.tour?.thumbnail || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200'}
                              alt={booking.tour?.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900 line-clamp-1">{booking.tour?.title}</p>
                            <p className="text-xs text-slate-500 mt-0.5">
                              {booking.tour?.duration ? `${booking.tour.duration.days}D / ${booking.tour.duration.nights}N` : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Travel Details */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <span className="flex items-center text-xs text-slate-600 gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            {new Date(booking.travelDate).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                          <span className="flex items-center text-xs text-slate-600 gap-1.5">
                            <Users className="h-3.5 w-3.5 text-slate-400" />
                            {booking.numberOfPeople} traveler{booking.numberOfPeople > 1 ? 's' : ''}
                          </span>
                        </div>
                      </td>

                      {/* Total Cost */}
                      <td className="px-6 py-4 font-bold text-slate-900">
                        ৳{booking.totalPrice.toLocaleString()}
                      </td>

                      {/* Booking Status */}
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(booking.status)}
                      </td>

                      {/* Payment Status */}
                      <td className="px-6 py-4 text-center">
                        {getPaymentStatusBadge(booking.paymentStatus)}
                      </td>

                      {/* Transaction ID */}
                      <td className="px-6 py-4">
                        {booking.paymentStatus === 'paid' ? (
                          <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded w-fit max-w-[150px]">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                            <span className="font-mono truncate">{booking.transactionId || 'Confirmed'}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded w-fit">
                            <AlertTriangle className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>Payment Pending</span>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookingsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
        </div>
      }
    >
      <BookingsListContent />
    </Suspense>
  );
}
