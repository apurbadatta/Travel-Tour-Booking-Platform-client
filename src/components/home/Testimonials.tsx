'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Ahmed',
    role: 'Travel Enthusiast',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
    comment: 'An absolutely amazing experience! The Sundarbans tour was well-organized, and our guide was incredibly knowledgeable. Will definitely book again!',
  },
  {
    id: 2,
    name: 'Rahman Khan',
    role: 'Adventure Seeker',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 5,
    comment: 'The Sajek Valley trek was a dream come true. Watching the sunrise above the clouds was magical. Tourify made everything so easy!',
  },
  {
    id: 3,
    name: 'Fatima Rahman',
    role: 'Family Traveler',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
    comment: 'We took our family to Cox\'s Bazar through Tourify. The kids had a blast! Everything was perfectly arranged, from hotel to activities.',
  },
  {
    id: 4,
    name: 'Tanvir Hassan',
    role: 'Solo Traveler',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    rating: 5,
    comment: 'As a solo traveler, safety was my priority. Tourify provided excellent guides and the group was fantastic. Highly recommended!',
  },
  {
    id: 5,
    name: 'Nusrat Jahan',
    role: 'Photography Lover',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    rating: 5,
    comment: 'The Bandarban tour was a photographer\'s paradise. Every corner was picture-perfect. Thank you Tourify for this incredible experience!',
  },
];

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const updateSlidesPerView = () => {
      setSlidesPerView(window.innerWidth >= 768 ? 3 : 1);
    };
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => 
      prev + slidesPerView >= testimonials.length ? 0 : prev + slidesPerView
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => 
      prev - slidesPerView < 0 ? testimonials.length - slidesPerView : prev - slidesPerView
    );
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            What Our Travelers Say
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Real stories from real travelers who explored Bangladesh with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * (100 / slidesPerView)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-surface dark:bg-[#1E293B] p-6 rounded-xl shadow-md h-full border border-gray-100 dark:border-gray-700">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-text-secondary mb-6">{testimonial.comment}</p>
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold text-text-primary">
                          {testimonial.name}
                        </h4>
                        <p className="text-sm text-text-secondary">{testimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 bg-surface dark:bg-[#1E293B] rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            <ChevronLeft className="h-6 w-6 text-text-primary" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 bg-surface dark:bg-[#1E293B] rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
          >
            <ChevronRight className="h-6 w-6 text-text-primary" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {Array.from({ length: Math.ceil(testimonials.length / slidesPerView) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index * slidesPerView)}
              className={`w-3 h-3 rounded-full transition-colors ${
                Math.floor(currentSlide / slidesPerView) === index
                  ? 'bg-primary'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}