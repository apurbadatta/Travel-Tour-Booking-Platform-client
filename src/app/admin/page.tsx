'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Users, Compass, DollarSign, Settings, Clock, CheckCircle2, AlertOctagon, TrendingUp } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';

interface TourStatusCounts {
  pending: number;
  approved: number;
  rejected: number;
}

interface StatsData {
  totalUsers: number;
  totalTours: number;
  totalRevenue: number;
  tourStatusCounts: TourStatusCounts;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, isAdmin, addToast } = useAuth();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/api/admin/stats');
      setStats(response.data.data);
    } catch (err) {
      console.error('Failed to fetch admin stats:', err);
      addToast('Failed to load dashboard statistics.', 'error');
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
    fetchStats();
  }, [isAuthenticated, authLoading, isAdmin, router, addToast, fetchStats]);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin || !stats) {
    return null;
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-teal-700 to-emerald-600 rounded-3xl p-6 md:p-10 shadow-lg text-white mb-8 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 translate-x-12 translate-y-12">
            <TrendingUp className="w-80 h-80" />
          </div>
          <div className="relative z-10">
            <span className="bg-teal-500/30 text-teal-100 font-semibold text-xs px-3 py-1.5 rounded-full border border-teal-400/20 uppercase tracking-wider">
              Control Panel
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-4 tracking-tight">Admin Control Center</h1>
            <p className="text-teal-50/90 mt-2 max-w-xl text-sm md:text-base">
              Monitor user accounts, update roles, manage and verify booking payments, and approve tour packages.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Card 1: Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Registered Users</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalUsers}</h3>
              <p className="text-slate-400 text-xs mt-1">Platform-wide accounts</p>
            </div>
            <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center border border-teal-100">
              <Users className="w-7 h-7" />
            </div>
          </div>

          {/* Card 2: Tours */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Tour Packages</p>
              <h3 className="text-3xl font-extrabold text-slate-900">{stats.totalTours}</h3>
              <div className="flex gap-2.5 text-xs text-slate-400 mt-1.5 font-medium">
                <span className="flex items-center text-emerald-600 gap-0.5"><CheckCircle2 className="w-3.5 h-3.5" />{stats.tourStatusCounts.approved}</span>
                <span className="flex items-center text-amber-500 gap-0.5"><Clock className="w-3.5 h-3.5" />{stats.tourStatusCounts.pending}</span>
                <span className="flex items-center text-rose-500 gap-0.5"><AlertOctagon className="w-3.5 h-3.5" />{stats.tourStatusCounts.rejected}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center border border-blue-100">
              <Compass className="w-7 h-7" />
            </div>
          </div>

          {/* Card 3: Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Total Earnings / Revenue</p>
              <h3 className="text-3xl font-extrabold text-slate-900">৳{stats.totalRevenue.toLocaleString()}</h3>
              <p className="text-emerald-600 text-xs mt-1 font-medium">From fully verified bookings</p>
            </div>
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100">
              <DollarSign className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* Quick Links / Actions */}
        <h2 className="text-xl font-bold text-slate-900 mb-6">Management Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Action 1: Users */}
          <Link href="/admin/users" className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-50 group-hover:bg-teal-600 group-hover:text-white text-teal-600 flex items-center justify-center transition-colors mb-5 border border-teal-100/50">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Manage Users</h3>
            <p className="text-slate-500 text-sm mt-1.5">View all user accounts, active roles, and change roles to admin or standard user.</p>
          </Link>

          {/* Action 2: Bookings */}
          <Link href="/admin/bookings" className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white text-emerald-600 flex items-center justify-center transition-colors mb-5 border border-emerald-100/50">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">Manage Bookings & Payments</h3>
            <p className="text-slate-500 text-sm mt-1.5">Review booking history, transaction IDs, payment details, and total revenue collected.</p>
          </Link>

          {/* Action 3: Tours */}
          <Link href="/admin/tours" className="group bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-teal-500/30 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-blue-600 group-hover:text-white text-blue-600 flex items-center justify-center transition-colors mb-5 border border-blue-100/50">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Approve & Manage Tours</h3>
            <p className="text-slate-500 text-sm mt-1.5">Approve pending tour places submitted by users, reject them, or edit existing listings.</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
