'use client';

import { Shield, HeartHandshake, Map, Headphones, CreditCard, Compass } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our priority. All tours are guided by certified professionals.',
  },
  {
    icon: HeartHandshake,
    title: 'Trusted by Thousands',
    description: 'Over 10,000 happy travelers have explored Bangladesh with us.',
  },
  {
    icon: Map,
    title: 'Curated Experiences',
    description: 'Handpicked destinations and itineraries for unforgettable journeys.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Round-the-clock customer support before, during, and after your trip.',
  },
  {
    icon: CreditCard,
    title: 'Flexible Payments',
    description: 'Multiple payment options with easy installment plans available.',
  },
  {
    icon: Compass,
    title: 'Expert Guides',
    description: 'Local guides who know every corner of the destination.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-4 bg-surface dark:bg-[#0F172A] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Why Choose Tourify?
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            We are committed to providing the best travel experience in Bangladesh.
            Here is why thousands trust us with their adventures.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 bg-surface dark:bg-[#1E293B] rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-text-secondary">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}