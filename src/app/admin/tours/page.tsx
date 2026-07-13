"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Loader2,
  CheckCircle,
  XCircle,
  Clock,
  Pencil,
  Trash2,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Search,
  Eye,
  Shield,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import type { Tour } from "@/types/index";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface StatusCounts {
  pending: number;
  approved: number;
  rejected: number;
  all: number;
}

type StatusFilter = "all" | "pending" | "approved" | "rejected";

export default function AdminToursPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <AdminToursContent />
    </Suspense>
  );
}

function AdminToursContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isAuthenticated, isLoading: authLoading, isAdmin, addToast } = useAuth();

  const [tours, setTours] = useState<Tour[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 1,
  });
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    pending: 0,
    approved: 0,
    rejected: 0,
    all: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<StatusFilter>(
    (searchParams.get("status") as StatusFilter) || "all"
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );

  const [rejectModal, setRejectModal] = useState<{
    open: boolean;
    tourId: string;
    tourTitle: string;
  }>({ open: false, tourId: "", tourTitle: "" });
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    tourId: string;
    tourTitle: string;
  }>({ open: false, tourId: "", tourTitle: "" });
  const [deleting, setDeleting] = useState(false);

  const [approvingId, setApprovingId] = useState<string | null>(null);

  const updateURLParams = useCallback(
    (status: StatusFilter, page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      if (status === "all") {
        params.delete("status");
      } else {
        params.set("status", status);
      }
      if (page <= 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const fetchTours = useCallback(
    async (page: number, status: StatusFilter, search: string) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", "20");
        if (status !== "all") params.set("status", status);
        if (search.trim()) params.set("search", search.trim());

        const response = await api.get(`/api/admin/tours?${params.toString()}`);
        const data = response.data.data;
        setTours(data.tours || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
        setStatusCounts(data.statusCounts || { pending: 0, approved: 0, rejected: 0, all: 0 });
      } catch {
        addToast("Failed to fetch tours.", "error");
      } finally {
        setLoading(false);
      }
    },
    [addToast]
  );

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated || !isAdmin) {
      router.push("/");
      addToast("Access denied. Admin privileges required.", "error");
      return;
    }
    fetchTours(currentPage, activeTab, searchQuery);
  }, [isAuthenticated, authLoading, isAdmin, router, addToast, currentPage, activeTab, searchQuery, fetchTours]);

  useEffect(() => {
    const status = (searchParams.get("status") as StatusFilter) || "all";
    const page = Number(searchParams.get("page")) || 1;
    setActiveTab(status);
    setCurrentPage(page);
  }, [searchParams]);

  const handleTabChange = (tab: StatusFilter) => {
    setActiveTab(tab);
    setCurrentPage(1);
    updateURLParams(tab, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURLParams(activeTab, page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchTours(1, activeTab, searchQuery);
  };

  const handleApprove = async (id: string) => {
    setApprovingId(id);
    try {
      await api.patch(`/api/admin/tours/${id}/approve`);
      addToast("Tour approved successfully.", "success");
      fetchTours(currentPage, activeTab, searchQuery);
    } catch {
      addToast("Failed to approve tour.", "error");
    } finally {
      setApprovingId(null);
    }
  };

  const openRejectModal = (id: string, title: string) => {
    setRejectModal({ open: true, tourId: id, tourTitle: title });
    setRejectReason("");
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) return;
    setRejecting(true);
    try {
      await api.patch(`/api/admin/tours/${rejectModal.tourId}/reject`, {
        reason: rejectReason.trim(),
      });
      addToast("Tour rejected.", "success");
      setRejectModal({ open: false, tourId: "", tourTitle: "" });
      setRejectReason("");
      fetchTours(currentPage, activeTab, searchQuery);
    } catch {
      addToast("Failed to reject tour.", "error");
    } finally {
      setRejecting(false);
    }
  };

  const openDeleteModal = (id: string, title: string) => {
    setDeleteModal({ open: true, tourId: id, tourTitle: title });
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/api/tours/${deleteModal.tourId}`);
      addToast("Tour deleted successfully.", "success");
      setDeleteModal({ open: false, tourId: "", tourTitle: "" });
      fetchTours(currentPage, activeTab, searchQuery);
    } catch {
      addToast("Failed to delete tour.", "error");
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3" />
            Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3" />
            Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="w-3 h-3" />
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCreatorName = (createdBy: Tour["createdBy"]) => {
    if (!createdBy) return "Unknown";
    if (typeof createdBy === "string") return createdBy;
    return createdBy.name || createdBy.email || "Unknown";
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    return null;
  }

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-text-primary">
              Tour Management
            </h1>
          </div>
          <p className="text-text-secondary">
            Review, approve, and manage all tour submissions.
          </p>
        </div>

        {/* Status Counts */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-4 text-center">
            <p className="text-sm text-text-secondary">Pending</p>
            <p className="text-2xl font-bold text-amber-600">
              {statusCounts.pending}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-4 text-center">
            <p className="text-sm text-text-secondary">Approved</p>
            <p className="text-2xl font-bold text-green-600">
              {statusCounts.approved}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-4 text-center">
            <p className="text-sm text-text-secondary">Rejected</p>
            <p className="text-2xl font-bold text-red-600">
              {statusCounts.rejected}
            </p>
          </div>
          <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-4 text-center">
            <p className="text-sm text-text-secondary">Total</p>
            <p className="text-2xl font-bold text-primary">
              {statusCounts.all}
            </p>
          </div>
        </div>

        {/* Filter Tabs + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex gap-2">
            {(["all", "pending", "approved", "rejected"] as StatusFilter[]).map(
              (tab) => {
                const count =
                  tab === "all"
                    ? statusCounts.all
                    : statusCounts[tab] || 0;
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)} ({count})
                  </button>
                );
              }
            )}
          </div>

          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-full sm:w-64 bg-surface dark:bg-[#0F172A] text-text-primary"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white dark:bg-[#1E293B] rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-700">
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                    Tour
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                    Submitted By
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-text-secondary">
                    Date
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-gray-50 dark:border-gray-700">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 animate-pulse" />
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-40" />
                            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded animate-pulse w-56" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-24" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-20" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-16" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded-full animate-pulse w-20" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-20" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-8" />
                          <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-8" />
                          <div className="h-8 bg-gray-200 dark:bg-gray-600 rounded animate-pulse w-8" />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : tours.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center">
                      <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                      <p className="text-text-secondary text-lg">
                        No tours found
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                        Try adjusting your filters or search query.
                      </p>
                    </td>
                  </tr>
                ) : (
                  tours.map((tour) => (
                    <tr
                      key={tour._id}
                      className="border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                            {tour.thumbnail ? (
                              <img
                                src={tour.thumbnail}
                                alt={tour.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                                <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate max-w-[240px]">
                              {tour.title}
                            </p>
                            <p className="text-xs text-text-secondary truncate max-w-[240px]">
                              {tour.shortDescription}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-primary">
                          {getCreatorName(tour.createdBy)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-secondary">
                          {tour.category?.name || "N/A"}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-text-primary">
                          ৳{tour.price.toLocaleString()}
                        </p>
                      </td>
                      <td className="px-6 py-4">{getStatusBadge(tour.status)}</td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-secondary">
                          {formatDate(tour.createdAt)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {tour.status === "pending" && (
                            <button
                              onClick={() => handleApprove(tour._id)}
                              disabled={approvingId === tour._id}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                              title="Approve"
                            >
                              {approvingId === tour._id ? (
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              ) : (
                                <CheckCircle className="w-3.5 h-3.5" />
                              )}
                              <span className="hidden xl:inline">Approve</span>
                            </button>
                          )}
                          {(tour.status === "pending" ||
                            tour.status === "approved") && (
                            <button
                              onClick={() =>
                                openRejectModal(tour._id, tour.title)
                              }
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span className="hidden xl:inline">Reject</span>
                            </button>
                          )}
                          <Link
                            href={`/tours/edit/${tour._id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                            <span className="hidden xl:inline">Edit</span>
                          </Link>
                          <button
                            onClick={() =>
                              openDeleteModal(tour._id, tour.title)
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span className="hidden xl:inline">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card List */}
        <div className="lg:hidden space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-4 animate-pulse"
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-600 flex-shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                    <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full w-16" />
                      <div className="h-5 bg-gray-200 dark:bg-gray-600 rounded-full w-20" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : tours.length === 0 ? (
            <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-text-secondary text-lg">No tours found</p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                Try adjusting your filters or search query.
              </p>
            </div>
          ) : (
            tours.map((tour) => (
              <div
                key={tour._id}
                className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm p-4"
              >
                <div className="flex gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                    {tour.thumbnail ? (
                      <img
                        src={tour.thumbnail}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-600">
                        <Eye className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">
                      {tour.title}
                    </p>
                    <p className="text-xs text-text-secondary truncate">
                      {tour.shortDescription}
                    </p>
                  </div>
                  {getStatusBadge(tour.status)}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-text-secondary mb-3">
                  <div>
                    <span className="text-gray-400 dark:text-gray-500">By: </span>
                    <span className="text-text-primary">
                      {getCreatorName(tour.createdBy)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-gray-500">Category: </span>
                    <span className="text-text-primary">
                      {tour.category?.name || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-gray-500">Price: </span>
                    <span className="text-text-primary font-medium">
                      ৳{tour.price.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400 dark:text-gray-500">Date: </span>
                    <span className="text-text-primary">
                      {formatDate(tour.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-100 dark:border-gray-700">
                  {tour.status === "pending" && (
                    <button
                      onClick={() => handleApprove(tour._id)}
                      disabled={approvingId === tour._id}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg text-xs font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {approvingId === tour._id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle className="w-3.5 h-3.5" />
                      )}
                      Approve
                    </button>
                  )}
                  {(tour.status === "pending" ||
                    tour.status === "approved") && (
                    <button
                      onClick={() => openRejectModal(tour._id, tour.title)}
                      className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  )}
                  <Link
                    href={`/tours/edit/${tour._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => openDeleteModal(tour._id, tour.title)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-2 bg-gray-100 dark:bg-gray-700 text-red-600 rounded-lg text-xs font-medium hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && pagination.totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg bg-white dark:bg-[#1E293B] shadow-sm text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (pagination.totalPages <= 7) return true;
                if (page === 1 || page === pagination.totalPages) return true;
                if (Math.abs(page - currentPage) <= 1) return true;
                return false;
              })
              .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
                if (idx > 0) {
                  const prev = arr[idx - 1];
                  if (page - prev > 1) acc.push("ellipsis");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, idx) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="px-2 text-text-secondary"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item)}
                    className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item
                        ? "bg-primary text-white"
                        : "bg-white dark:bg-[#1E293B] shadow-sm text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= pagination.totalPages}
              className="p-2 rounded-lg bg-white dark:bg-[#1E293B] shadow-sm text-text-secondary hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectModal.open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() =>
            setRejectModal({ open: false, tourId: "", tourTitle: "" })
          }
        >
          <div
            className="bg-white dark:bg-[#1E293B] rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Reject Tour
                </h3>
                <p className="text-sm text-text-secondary truncate max-w-[250px]">
                  {rejectModal.tourTitle}
                </p>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="rejectReason"
                className="block text-sm font-medium text-text-primary mb-2"
              >
                Reason for rejection <span className="text-red-500">*</span>
              </label>
              <textarea
                id="rejectReason"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
                placeholder="Provide a reason for rejecting this tour..."
                className="w-full px-3 py-2 border border-gray-200 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 resize-none bg-surface dark:bg-[#0F172A] text-text-primary"
              />
              {!rejectReason.trim() && (
                <p className="text-xs text-red-500 mt-1">
                  Reason is required.
                </p>
              )}
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setRejectModal({ open: false, tourId: "", tourTitle: "" })
                }
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={!rejectReason.trim() || rejecting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {rejecting && <Loader2 className="w-4 h-4 animate-spin" />}
                Reject
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() =>
            setDeleteModal({ open: false, tourId: "", tourTitle: "" })
          }
        >
          <div
            className="bg-white dark:bg-[#1E293B] rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  Delete Tour
                </h3>
              </div>
            </div>
            <p className="text-sm text-text-secondary mb-1">
              Are you sure you want to delete this tour?
            </p>
            <p className="text-sm font-medium text-text-primary mb-6 truncate">
              &quot;{deleteModal.tourTitle}&quot;
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() =>
                  setDeleteModal({ open: false, tourId: "", tourTitle: "" })
                }
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-text-secondary rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {deleting && <Loader2 className="w-4 h-4 animate-spin" />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
