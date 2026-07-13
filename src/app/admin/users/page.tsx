'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Users, Shield, User, Search, RefreshCw } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';

interface UserItem {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  createdAt: string;
}

export default function AdminUsersPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, isAdmin, user: currentUser, addToast } = useAuth();
  
  const [users, setUsers] = useState<UserItem[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get('/api/admin/users');
      const data = response.data.data || [];
      setUsers(data);
      setFilteredUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      addToast('Failed to load users list.', 'error');
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
    fetchUsers();
  }, [isAuthenticated, authLoading, isAdmin, router, addToast, fetchUsers]);

  // Handle Search Filtering
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(
        (u) =>
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleRoleChange = async (userId: string, currentRole: 'user' | 'admin') => {
    if (userId === currentUser?.id) {
      addToast('You cannot change your own role.', 'error');
      return;
    }

    const newRole = currentRole === 'user' ? 'admin' : 'user';
    setUpdatingId(userId);
    try {
      await api.put(`/api/admin/users/${userId}/role`, { role: newRole });
      addToast(`User role updated to ${newRole} successfully.`, 'success');
      
      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err: any) {
      console.error('Failed to update role:', err);
      addToast(err.response?.data?.message || 'Failed to update user role.', 'error');
    } finally {
      setUpdatingId(null);
    }
  };

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

  return (
    <div>
      <div className="max-w-6xl mx-auto">
        {/* Header and Search */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <Users className="h-6 w-6 text-teal-600" />
              Manage Users
            </h1>
            <p className="text-slate-500 text-sm mt-1">Review accounts, roles, and change access permissions.</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 text-sm transition-all"
            />
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-16 text-center text-slate-500">
              <p className="font-semibold text-lg text-slate-700">No users found</p>
              <p className="text-sm mt-1">No user accounts matched your search terms.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-600 text-xs font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Role</th>
                    <th className="px-6 py-4">Registered Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                  {filteredUsers.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Name & Image */}
                      <td className="px-6 py-4 min-w-[240px]">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200 flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <User className="h-5 w-5 text-slate-400" />
                            )}
                          </div>
                          <div>
                            <span className="font-bold text-slate-900 block">{item.name}</span>
                            {item._id === currentUser?.id && (
                              <span className="text-[10px] bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded border border-teal-200 uppercase tracking-wide w-fit block mt-0.5">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 font-medium text-slate-600">
                        {item.email}
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        {item.role === 'admin' ? (
                          <span className="inline-flex items-center gap-1 bg-red-50 text-red-700 border border-red-200 px-2.5 py-1 text-xs font-bold rounded-full">
                            <Shield className="h-3 w-3" />
                            Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 border border-slate-200 px-2.5 py-1 text-xs font-bold rounded-full">
                            <User className="h-3 w-3" />
                            User
                          </span>
                        )}
                      </td>

                      {/* Created At */}
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {new Date(item.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </td>

                      {/* Action buttons */}
                      <td className="px-6 py-4 text-right">
                        {updatingId === item._id ? (
                          <div className="flex justify-end pr-4">
                            <Loader2 className="h-5 w-5 animate-spin text-teal-600" />
                          </div>
                        ) : (
                          <button
                            onClick={() => handleRoleChange(item._id, item.role)}
                            disabled={item._id === currentUser?.id}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                              item._id === currentUser?.id
                                ? 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'
                                : item.role === 'admin'
                                ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-300'
                                : 'bg-teal-600 hover:bg-teal-700 text-white border-transparent shadow-sm'
                            }`}
                          >
                            <RefreshCw className="h-3 w-3" />
                            <span>{item.role === 'admin' ? 'Demote to User' : 'Promote to Admin'}</span>
                          </button>
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
