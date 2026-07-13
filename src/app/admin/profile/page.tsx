'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Loader2,
  User,
  Mail,
  Phone,
  Calendar,
  Camera,
  Save,
  ArrowLeft,
  Shield,
  CreditCard,
  CheckCircle,
  MapPin,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';

interface ProfileData {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
    role: string;
    createdAt: string;
  };
  profile: {
    phone: string;
  };
  stats: {
    totalBookings: number;
    completedTrips: number;
    totalSpent: number;
  };
}

export default function AdminProfilePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, user, addToast } = useAuth();

  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/login?redirect=/admin/profile');
      return;
    }
    fetchProfile();
  }, [isAuthenticated, authLoading, router]);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/api/profile');
      const data = response.data.data;
      setProfileData(data);
      setName(data.user.name || '');
      setPhone(data.profile.phone || '');
      setImage(data.user.image || '');
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      addToast('Failed to load profile.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await api.put('/api/profile', { name, phone, image });
      const data = response.data.data;
      setProfileData((prev) =>
        prev
          ? {
              ...prev,
              user: { ...prev.user, name: data.user.name, image: data.user.image },
              profile: { phone: data.profile.phone },
            }
          : prev
      );
      addToast('Profile updated successfully!', 'success');
    } catch (err: any) {
      addToast(err.response?.data?.message || 'Failed to update profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-teal-400" />
      </div>
    );
  }

  if (!isAuthenticated || !profileData) return null;

  const { user: u, profile, stats } = profileData;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-teal-400 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-medium">Back to Dashboard</span>
        </Link>
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <p className="text-slate-400 mt-1">Manage your account settings and personal information.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500/10 rounded-lg flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-teal-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Bookings</p>
              <p className="text-2xl font-bold text-white">{stats.totalBookings}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Completed Trips</p>
              <p className="text-2xl font-bold text-white">{stats.completedTrips}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <MapPin className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Total Spent</p>
              <p className="text-2xl font-bold text-white">৳{stats.totalSpent.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto mb-4">
                {image ? (
                  <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover border-4 border-teal-500/20" />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-teal-500/10 flex items-center justify-center border-4 border-teal-500/20">
                    <User className="h-10 w-10 text-teal-400" />
                  </div>
                )}
              </div>
              <h2 className="text-xl font-bold text-white">{u.name}</h2>
              <p className="text-slate-400 text-sm mt-1">{u.email}</p>
              <div className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-400">
                <Shield className="h-3 w-3" />
                Administrator
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">Email:</span>
                <span className="text-white font-medium ml-auto">{u.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">Phone:</span>
                <span className="text-white font-medium ml-auto">{profile.phone || 'Not set'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-slate-400" />
                <span className="text-slate-400">Joined:</span>
                <span className="text-white font-medium ml-auto">
                  {new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h3 className="text-lg font-semibold text-white mb-6">Edit Profile</h3>

            <form onSubmit={handleSave} className="space-y-5">
              {/* Avatar URL */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Profile Image URL
                </label>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full pl-10 pr-4 py-2.5 border border-slate-600 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-600 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Email (read-only) */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={u.email}
                    disabled
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-600 bg-slate-700 text-slate-400 rounded-lg cursor-not-allowed"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">Email cannot be changed here.</p>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-white mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXXXXXXXX"
                    className="w-full pl-10 pr-4 py-2.5 border border-slate-600 bg-slate-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-colors"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-400 disabled:opacity-50 transition-colors"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
