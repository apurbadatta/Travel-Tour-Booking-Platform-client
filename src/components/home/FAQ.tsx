'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book a tour?',
    answer: 'Simply browse our tours, select your preferred package, choose your travel date, and complete the booking form. You will receive a confirmation email with all the details.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit/debit cards, bKash, Nagad, Rocket, and bank transfers. You can also pay in installments for tours above ৳10,000.',
  },
  {
    question: 'Can I cancel or reschedule my booking?',
    answer: 'Yes! You can cancel up to 7 days before the tour for a full refund. Rescheduling is free up to 3 days before the tour date, subject to availability.',
  },
  {
    question: 'Are the tours suitable for families?',
    answer: 'Absolutely! We have family-friendly tours with activities for all ages. Many of our tours include kid-friendly activities and comfortable accommodations.',
  },
  {
    question: 'What should I bring on the tour?',
    answer: 'We recommend bringing comfortable clothing, sunscreen, a hat, personal medications, and a camera. A detailed packing list is provided after booking.',
  },
  {
    question: 'Is travel insurance included?',
    answer: 'Basic travel insurance is included in all our tour packages. You can upgrade to premium coverage for additional protection at a nominal fee.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-text-secondary">
            Got questions? We have got answers. Find everything you need to know about our tours.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-text-primary pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-text-secondary flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-40 pb-4' : 'max-h-0'
                }`}
              >
                <p className="text-text-secondary">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}