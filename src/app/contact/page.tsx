"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import api from "@/lib/api";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const { addToast } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.post("/api/contact", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
      });

      addToast(
        "Thank you! Your message has been sent. We'll get back to you within 24 hours.",
        "success"
      );

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      addToast("Failed to send message. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Have questions about your next adventure? We're here to help you plan
            the perfect trip.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-background dark:bg-[#0F172A] text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-error">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-background dark:bg-[#0F172A] text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-error">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-background dark:bg-[#0F172A] text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-text-primary mb-1.5"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 bg-background dark:bg-[#0F172A] text-text-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                    placeholder="Tell us about your travel plans or questions..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-error">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-text-primary mb-6">
                Company Info
              </h2>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">Address</h3>
                    <p className="text-text-secondary mt-1">
                      House 42, Road 11, Dhanmondi,
                      <br />
                      Dhaka 1205, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">Phone</h3>
                    <p className="text-text-secondary mt-1">
                      +880 123 456 789
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">Email</h3>
                    <p className="text-text-secondary mt-1">
                      info@tourify.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-text-primary">
                      Working Hours
                    </h3>
                    <p className="text-text-secondary mt-1">
                      Sat-Thu, 9:00 AM - 6:00 PM
                      <br />
                      <span className="text-sm">(Bangladesh time)</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
              <div className="h-48 bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTRWMjhIMjR2Mmgxem0tNC0ydi0yaC0ydjJoMnptLTItMmgtMnYyaDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
                <div className="text-center z-10">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-text-secondary font-medium">
                    Dhanmondi, Dhaka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
