'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, DollarSign, Calendar, Users, ShieldCheck, AlertCircle, Search, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';

interface Tour {
  _id: string;
  title: string;
  thumbnail: string;
  price: number;
}

interface UserDetails {
  name: string;
  email: string;
  image?: string;
  role: string;
}

interface BookingItem {
  _id: string;
  tour: Tour;
  user: UserDetails;
  travelDate: string;
  numberOfPeople: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'refunded';
  paymentMethod?: string;
  transactionId?: string;
  createdAt: string;
}

export default function AdminBookingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, isAdmin, addToast } = useAuth();

  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/bookings');
      const data = response.data.data || [];
      setBookings(data);
      setFilteredBookings(data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      addToast('Failed to load bookings list.', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !isAdmin) {
      router.push('/');
      addToast('Access denied. Admin privileges required.', 'error');
      return;
    }
    fetchBookings();
  }, [isAuthenticated, authLoading, isAdmin, router, addToast, fetchBookings]);

  // Handle Search Filtering (User Name, User Email, Tour Title, Transaction ID)
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (b) =>
          b.user?.name?.toLowerCase().includes(query) ||
          b.user?.email?.toLowerCase().includes(query) ||
          b.tour?.title?.toLowerCase().includes(query) ||
          b.transactionId?.toLowerCase().includes(query)
      );
      setFilteredBookings(filtered);
    }
  }, [searchQuery, bookings]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  const getStatusBadge = (status: BookingItem['status']) => {
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

  const getPaymentStatusBadge = (status: BookingItem['paymentStatus']) => {
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
    <div>
      <div className="max-w-6xl mx-auto">
        {/* Header and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 dark:bg-[#1E293B]">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <DollarSign className="h-6 w-6 text-teal-600" />
              Manage Bookings & Payments
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Monitor bookings, track total payments, and transaction records.</p>
          </div>

          <div className="relative w-full md:w-85">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by customer, tour, or tx-id..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 text-sm transition-all bg-surface dark:bg-[#0F172A] text-text-primary"
            />
          </div>
        </div>

        {/* Bookings Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden dark:bg-[#1E293B]">
          {filteredBookings.length === 0 ? (
            <div className="p-16 text-center text-slate-500 dark:text-slate-400">
              <p className="font-semibold text-lg text-slate-700 dark:text-slate-200">No bookings found</p>
              <p className="text-sm mt-1">No booking logs match your search parameters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Tour Package</th>
                    <th className="px-6 py-4">Booking Date</th>
                    <th className="px-6 py-4">Travel Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-center">Payment</th>
                    <th className="px-6 py-4">Transaction / Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm text-slate-700 dark:text-slate-300">
                  {filteredBookings.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                      {/* Customer Info */}
                      <td className="px-6 py-4 min-w-[200px]">
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-600 flex-shrink-0">
                            {item.user?.image ? (
                              <img src={item.user.image} alt={item.user.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="h-4.5 w-4.5 text-slate-400 dark:text-slate-500" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 dark:text-white block">{item.user?.name || 'Unknown User'}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 block">{item.user?.email || 'N/A'}</span>
                          </div>
                        </div>
                      </td>

                      {/* Tour Info */}
                      <td className="px-6 py-4 min-w-[200px]">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0">
                            <img src={item.tour?.thumbnail || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100'} alt={item.tour?.title} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 dark:text-white block line-clamp-1">{item.tour?.title || 'Unknown Tour'}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                              <Users className="h-3 w-3" /> {item.numberOfPeople} traveler{item.numberOfPeople > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Booking Date */}
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>

                      {/* Travel Date */}
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium whitespace-nowrap">
                        <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
                          <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
                          {new Date(item.travelDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </td>

                      {/* Cost */}
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                        ৳{item.totalPrice.toLocaleString()}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        {getStatusBadge(item.status)}
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-4 text-center">
                        {getPaymentStatusBadge(item.paymentStatus)}
                      </td>

                      {/* Transaction info */}
                      <td className="px-6 py-4">
                        {item.paymentStatus === 'paid' ? (
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-600 w-fit max-w-[150px]">
                              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />
                              <span className="font-mono truncate">{item.transactionId || 'Confirmed'}</span>
                            </div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider block ml-1">
                              via {item.paymentMethod === 'mock_stripe' ? 'Mock Stripe' : 'Stripe'}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-1 rounded w-fit">
                            <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                            <span>Unpaid Booking</span>
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
