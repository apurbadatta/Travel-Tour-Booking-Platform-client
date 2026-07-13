'use client';

import { useState } from 'react';
import { X, Calendar, Users, CreditCard, CheckCircle } from 'lucide-react';
import api from '@/lib/api';
import { useAuth } from '@/lib/auth-context';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tourId: string;
  tourTitle: string;
  pricePerPerson: number;
  maxGroupSize: number;
}

export default function BookingModal({
  isOpen,
  onClose,
  tourId,
  tourTitle,
  pricePerPerson,
  maxGroupSize,
}: BookingModalProps) {
  const { user } = useAuth();
  const [travelDate, setTravelDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [contactName, setContactName] = useState(user?.name || '');
  const [contactEmail, setContactEmail] = useState(user?.email || '');
  const [contactPhone, setContactPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const totalPrice = pricePerPerson * numberOfPeople;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/bookings', {
        tourId,
        travelDate,
        numberOfPeople,
        contactName,
        contactEmail,
        contactPhone,
        specialRequests,
      });
      
      const { checkoutUrl } = response.data.data;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError('');
    setTravelDate('');
    setNumberOfPeople(1);
    setSpecialRequests('');
    onClose();
  };

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={handleClose} />

      {/* Modal */}
      <div className="relative bg-surface dark:bg-[#1E293B] rounded-xl shadow-xl w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-600">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-text-primary">Book This Tour</h3>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-text-secondary" />
          </button>
        </div>

        {success ? (
          <div className="p-8 text-center">
            <CheckCircle className="h-16 w-16 text-success mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-text-primary mb-2">
              Booking Submitted!
            </h4>
            <p className="text-text-secondary mb-6">
              Your booking request has been received. We will confirm your booking shortly.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Tour Info */}
            <div className="p-3 bg-background rounded-lg">
              <p className="font-medium text-text-primary text-sm">{tourTitle}</p>
              <p className="text-primary font-semibold">
                ৳{pricePerPerson.toLocaleString()} / person
              </p>
            </div>

            {/* Travel Date */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Travel Date *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  min={minDate}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-surface dark:bg-[#0F172A] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-text-primary"
                />
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Number of Travelers *
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <select
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(parseInt(e.target.value))}
                  required
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary appearance-none"
                >
                  {Array.from({ length: Math.min(maxGroupSize, 20) }, (_, i) => i + 1).map(
                    (num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'person' : 'people'}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            {/* Contact Name */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Full Name *
              </label>
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Contact Email */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Email *
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Phone *
              </label>
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                required
                placeholder="+880"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Special Requests (optional)
              </label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="p-3 bg-error/10 text-error rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Price Summary */}
            <div className="p-4 bg-background rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">
                  ৳{pricePerPerson.toLocaleString()} × {numberOfPeople} person
                  {numberOfPeople > 1 ? 's' : ''}
                </span>
                <span className="text-text-primary font-medium">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t">
                <span className="text-text-primary">Total</span>
                <span className="text-primary text-lg">
                  ৳{totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              <CreditCard className="h-5 w-5" />
              <span>{loading ? 'Processing...' : 'Confirm Booking'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
