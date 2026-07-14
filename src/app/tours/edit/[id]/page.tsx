'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Plus,
  X,
  ChevronDown,
  Info,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import api from '@/lib/api';
import type { Tour } from '@/types';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

interface Destination {
  _id: string;
  name: string;
  slug: string;
  region: string;
}

interface FormData {
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  discountPrice: string;
  durationDays: string;
  durationNights: string;
  category: string;
  destination: string;
  thumbnail: string;
  maxGroupSize: string;
  difficulty: string;
  departureLocation: string;
  startPoint: string;
  endPoint: string;
  highlights: string[];
  included: string[];
  excluded: string[];
}

interface FormErrors {
  [key: string]: string;
}

export default function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const tourId = resolvedParams.id;
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading, addToast, user } = useAuth();
  const isAdmin = (user as any)?.role === 'admin';

  const [formData, setFormData] = useState<FormData>({
    title: '',
    shortDescription: '',
    description: '',
    price: '',
    discountPrice: '',
    durationDays: '',
    durationNights: '',
    category: '',
    destination: '',
    thumbnail: '',
    maxGroupSize: '',
    difficulty: 'moderate',
    departureLocation: '',
    startPoint: '',
    endPoint: '',
    highlights: [],
    included: [],
    excluded: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [fetchingTour, setFetchingTour] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [highlightInput, setHighlightInput] = useState('');
  const [includedInput, setIncludedInput] = useState('');
  const [excludedInput, setExcludedInput] = useState('');
  const [tourNotFound, setTourNotFound] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push(`/login?redirect=/tours/edit/${tourId}`);
    }
  }, [isAuthenticated, authLoading, router, tourId]);

  // Fetch tour data, categories and destinations
  useEffect(() => {
    if (!isAuthenticated || authLoading) return;

    const fetchData = async () => {
      try {
        const [tourRes, catRes, destRes] = await Promise.all([
          api.get(`/api/tours/${tourId}`),
          api.get('/api/tours/categories'),
          api.get('/api/tours/destinations'),
        ]);

        const tour: Tour = tourRes.data.data;

        if (!tour) {
          setTourNotFound(true);
          return;
        }

        setFormData({
          title: tour.title || '',
          shortDescription: tour.shortDescription || '',
          description: tour.description || '',
          price: tour.price?.toString() || '',
          discountPrice: tour.discountPrice?.toString() || '',
          durationDays: tour.duration?.days?.toString() || '',
          durationNights: tour.duration?.nights?.toString() || '',
          category: tour.category?._id || '',
          destination: tour.destination?._id || '',
          thumbnail: tour.thumbnail || '',
          maxGroupSize: tour.maxGroupSize?.toString() || '',
          difficulty: tour.difficulty || 'moderate',
          departureLocation: tour.departureLocation || '',
          startPoint: tour.startPoint || '',
          endPoint: tour.endPoint || '',
          highlights: tour.highlights || [],
          included: tour.included || [],
          excluded: tour.excluded || [],
        });

        setCategories(catRes.data.data);
        setDestinations(destRes.data.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setTourNotFound(true);
      } finally {
        setFetchingTour(false);
      }
    };

    fetchData();
  }, [tourId, isAuthenticated, authLoading]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be under 100 characters';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    } else if (formData.shortDescription.length > 200) {
      newErrors.shortDescription = 'Short description must be under 200 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Full description is required';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) < 0) {
      newErrors.price = 'Price cannot be negative';
    }

    if (formData.discountPrice && parseFloat(formData.discountPrice) < 0) {
      newErrors.discountPrice = 'Discount price cannot be negative';
    }

    if (!formData.durationDays) {
      newErrors.durationDays = 'Duration (days) is required';
    } else if (parseInt(formData.durationDays) < 1) {
      newErrors.durationDays = 'Must be at least 1 day';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.destination) {
      newErrors.destination = 'Destination is required';
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = 'Thumbnail image URL is required';
    } else if (!/^https?:\/\/.+/.test(formData.thumbnail)) {
      newErrors.thumbnail = 'Please enter a valid URL';
    }

    if (!formData.maxGroupSize) {
      newErrors.maxGroupSize = 'Max group size is required';
    } else if (parseInt(formData.maxGroupSize) < 1) {
      newErrors.maxGroupSize = 'Must be at least 1';
    }

    if (!formData.departureLocation.trim()) {
      newErrors.departureLocation = 'Departure location is required';
    }

    if (!formData.startPoint.trim()) {
      newErrors.startPoint = 'Start point is required';
    }

    if (!formData.endPoint.trim()) {
      newErrors.endPoint = 'End point is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const addItem = (field: 'highlights' | 'included' | 'excluded', value: string, setter: (v: string) => void) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setter('');
    }
  };

  const removeItem = (field: 'highlights' | 'included' | 'excluded', index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const payload = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        duration: {
          days: parseInt(formData.durationDays),
          nights: parseInt(formData.durationNights) || 0,
        },
        category: formData.category,
        destination: formData.destination,
        thumbnail: formData.thumbnail.trim(),
        maxGroupSize: parseInt(formData.maxGroupSize),
        difficulty: formData.difficulty,
        departureLocation: formData.departureLocation.trim(),
        startPoint: formData.startPoint.trim(),
        endPoint: formData.endPoint.trim(),
        highlights: formData.highlights,
        included: formData.included,
        excluded: formData.excluded,
      };

      await api.put(`/api/tours/${tourId}`, payload);

      addToast(
        isAdmin
          ? 'Tour updated successfully and changes are now live!'
          : 'Tour updated successfully. Pending admin re-approval.',
        'success'
      );
      router.push('/tours/manage');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update tour';
      addToast(message);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || fetchingTour) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (tourNotFound) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h2 className="text-xl font-semibold text-text-primary mb-2">Tour Not Found</h2>
            <p className="text-text-secondary mb-6">The tour you're trying to edit doesn't exist.</p>
            <Link
              href="/tours/manage"
              className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Go to Manage Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/tours/manage"
            className="inline-flex items-center space-x-2 text-text-secondary hover:text-primary transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Manage Tours</span>
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
            Edit Tour
          </h1>
          <p className="text-text-secondary mt-2">
            {isAdmin
              ? 'Update your tour details. Changes will be published live immediately.'
              : 'Update your tour details. Changes will require admin re-approval before going live.'}
          </p>
        </div>

        {/* Re-Approval Notice - only for non-admin users */}
        {!isAdmin && (
          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-xl p-4 mb-8 flex items-start space-x-3">
            <Info className="h-5 w-5 text-amber-500 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">Re-Approval Required</p>
              <p className="text-sm text-amber-600 dark:text-amber-300 mt-1">
                After updating, your tour will be reviewed again by an admin. It will temporarily go offline until re-approved.
                You can track the status from your <Link href="/tours/manage" className="underline font-medium">Manage Tours</Link> page.
              </p>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Basic Information
            </h2>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-primary mb-1.5">
                  Tour Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. Sundarbans Mangrove Explorer"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.title ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.title && <p className="mt-1 text-sm text-error">{errors.title}</p>}
              </div>

              {/* Short Description */}
              <div>
                <label htmlFor="shortDescription" className="block text-sm font-medium text-text-primary mb-1.5">
                  Short Description *
                </label>
                <input
                  id="shortDescription"
                  name="shortDescription"
                  type="text"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief summary (max 200 characters)"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.shortDescription ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                <div className="flex justify-between mt-1">
                  {errors.shortDescription && <p className="text-sm text-error">{errors.shortDescription}</p>}
                  <p className="text-xs text-text-secondary ml-auto">
                    {formData.shortDescription.length}/200
                  </p>
                </div>
              </div>

              {/* Full Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-primary mb-1.5">
                  Full Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Detailed description of the tour..."
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none ${
                    errors.description ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Pricing & Duration */}
          <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Pricing & Duration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-text-primary mb-1.5">
                  Price (BDT) *
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.price ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.price && <p className="mt-1 text-sm text-error">{errors.price}</p>}
              </div>

              {/* Discount Price */}
              <div>
                <label htmlFor="discountPrice" className="block text-sm font-medium text-text-primary mb-1.5">
                  Discount Price (BDT)
                </label>
                <input
                  id="discountPrice"
                  name="discountPrice"
                  type="number"
                  value={formData.discountPrice}
                  onChange={handleChange}
                  placeholder="Optional"
                  min="0"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.discountPrice ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.discountPrice && <p className="mt-1 text-sm text-error">{errors.discountPrice}</p>}
              </div>

              {/* Duration Days */}
              <div>
                <label htmlFor="durationDays" className="block text-sm font-medium text-text-primary mb-1.5">
                  Duration (Days) *
                </label>
                <input
                  id="durationDays"
                  name="durationDays"
                  type="number"
                  value={formData.durationDays}
                  onChange={handleChange}
                  placeholder="1"
                  min="1"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.durationDays ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.durationDays && <p className="mt-1 text-sm text-error">{errors.durationDays}</p>}
              </div>

              {/* Duration Nights */}
              <div>
                <label htmlFor="durationNights" className="block text-sm font-medium text-text-primary mb-1.5">
                  Duration (Nights)
                </label>
                <input
                  id="durationNights"
                  name="durationNights"
                  type="number"
                  value={formData.durationNights}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>

              {/* Max Group Size */}
              <div>
                <label htmlFor="maxGroupSize" className="block text-sm font-medium text-text-primary mb-1.5">
                  Max Group Size *
                </label>
                <input
                  id="maxGroupSize"
                  name="maxGroupSize"
                  type="number"
                  value={formData.maxGroupSize}
                  onChange={handleChange}
                  placeholder="15"
                  min="1"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.maxGroupSize ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.maxGroupSize && <p className="mt-1 text-sm text-error">{errors.maxGroupSize}</p>}
              </div>

              {/* Difficulty */}
              <div>
                <label htmlFor="difficulty" className="block text-sm font-medium text-text-primary mb-1.5">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Category & Location */}
          <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Category & Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-text-primary mb-1.5">
                  Category *
                </label>
                <div className="relative">
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none ${
                      errors.category ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
                </div>
                {errors.category && <p className="mt-1 text-sm text-error">{errors.category}</p>}
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-text-primary mb-1.5">
                  Destination *
                </label>
                <div className="relative">
                  <select
                    id="destination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none ${
                      errors.destination ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                    }`}
                  >
                    <option value="">Select destination</option>
                    {destinations.map((dest) => (
                      <option key={dest._id} value={dest._id}>
                        {dest.name} - {dest.region}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary pointer-events-none" />
                </div>
                {errors.destination && <p className="mt-1 text-sm text-error">{errors.destination}</p>}
              </div>

              {/* Departure Location */}
              <div>
                <label htmlFor="departureLocation" className="block text-sm font-medium text-text-primary mb-1.5">
                  Departure Location *
                </label>
                <input
                  id="departureLocation"
                  name="departureLocation"
                  type="text"
                  value={formData.departureLocation}
                  onChange={handleChange}
                  placeholder="e.g. Dhaka"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.departureLocation ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.departureLocation && <p className="mt-1 text-sm text-error">{errors.departureLocation}</p>}
              </div>

              {/* Start Point */}
              <div>
                <label htmlFor="startPoint" className="block text-sm font-medium text-text-primary mb-1.5">
                  Start Point *
                </label>
                <input
                  id="startPoint"
                  name="startPoint"
                  type="text"
                  value={formData.startPoint}
                  onChange={handleChange}
                  placeholder="e.g. Tour Operator Office"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.startPoint ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.startPoint && <p className="mt-1 text-sm text-error">{errors.startPoint}</p>}
              </div>

              {/* End Point */}
              <div>
                <label htmlFor="endPoint" className="block text-sm font-medium text-text-primary mb-1.5">
                  End Point *
                </label>
                <input
                  id="endPoint"
                  name="endPoint"
                  type="text"
                  value={formData.endPoint}
                  onChange={handleChange}
                  placeholder="e.g. Same as start"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.endPoint ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.endPoint && <p className="mt-1 text-sm text-error">{errors.endPoint}</p>}
              </div>

              {/* Thumbnail URL */}
              <div className="md:col-span-2">
                <label htmlFor="thumbnail" className="block text-sm font-medium text-text-primary mb-1.5">
                  Thumbnail Image URL *
                </label>
                <input
                  id="thumbnail"
                  name="thumbnail"
                  type="url"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary ${
                    errors.thumbnail ? 'border-error' : 'border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100'
                  }`}
                />
                {errors.thumbnail && <p className="mt-1 text-sm text-error">{errors.thumbnail}</p>}
                {formData.thumbnail && (
                  <div className="mt-2">
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="h-32 w-48 object-cover rounded-lg"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Lists (Highlights, Included, Excluded) */}
          <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">
              Tour Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Highlights */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Highlights
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={highlightInput}
                    onChange={(e) => setHighlightInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('highlights', highlightInput, setHighlightInput);
                      }
                    }}
                    placeholder="Add item"
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => addItem('highlights', highlightInput, setHighlightInput)}
                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {formData.highlights.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-background px-2 py-1 rounded text-sm">
                      <span className="truncate">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('highlights', index)}
                        className="text-text-secondary hover:text-error ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Included */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Included
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={includedInput}
                    onChange={(e) => setIncludedInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('included', includedInput, setIncludedInput);
                      }
                    }}
                    placeholder="Add item"
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => addItem('included', includedInput, setIncludedInput)}
                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {formData.included.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-background px-2 py-1 rounded text-sm">
                      <span className="truncate">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('included', index)}
                        className="text-text-secondary hover:text-error ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excluded */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-1.5">
                  Excluded
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={excludedInput}
                    onChange={(e) => setExcludedInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addItem('excluded', excludedInput, setExcludedInput);
                      }
                    }}
                    placeholder="Add item"
                    className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => addItem('excluded', excludedInput, setExcludedInput)}
                    className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 space-y-1">
                  {formData.excluded.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-background px-2 py-1 rounded text-sm">
                      <span className="truncate">{item}</span>
                      <button
                        type="button"
                        onClick={() => removeItem('excluded', index)}
                        className="text-text-secondary hover:text-error ml-2"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end space-x-4">
            <Link
              href="/tours/manage"
              className="px-6 py-2.5 border border-gray-200 dark:border-gray-700 dark:bg-[#1E293B] dark:text-gray-100 text-text-primary rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4" />
                  <span>{isAdmin ? 'Update & Publish' : 'Update Tour'}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
