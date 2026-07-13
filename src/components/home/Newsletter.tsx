'use client';

import { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <section className="py-16 px-4 bg-surface dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 md:p-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Get Travel Updates
            </h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter for exclusive deals, travel tips, and the latest
              updates on upcoming tours.
            </p>

            {isSubscribed ? (
              <div className="flex items-center justify-center space-x-2 text-white">
                <CheckCircle className="h-6 w-6" />
                <span className="text-lg font-medium">
                  Thank you for subscribing!
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            )}

            <p className="text-white/60 text-sm mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}