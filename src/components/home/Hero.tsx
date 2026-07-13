'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: 'Discover the Sundarbans',
    subtitle: 'Explore the world\'s largest mangrove forest',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
  },
  {
    id: 2,
    title: 'Sajek Valley Adventures',
    subtitle: 'Experience the clouds at Sajek',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80',
  },
  {
    id: 3,
    title: 'Cox\'s Bazar Beach Paradise',
    subtitle: 'World\'s longest natural sandy beach',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl">
          {slides[currentSlide].title}
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          {slides[currentSlide].subtitle}
        </p>

        {/* Search Box */}
        <div className="w-full max-w-2xl bg-surface dark:bg-[#1E293B] rounded-lg p-2 flex items-center shadow-lg border border-gray-200 dark:border-gray-600">
          <div className="flex-1 flex items-center px-4">
            <MapPin className="h-5 w-5 text-text-secondary mr-2" />
            <input
              type="text"
              placeholder="Where do you want to go?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 outline-none text-text-primary"
            />
          </div>
          <Link
            href={`/tours${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Search className="h-5 w-5" />
            <span className="font-medium">Search</span>
          </Link>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center space-x-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Scroll Down Cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <Link href="#destinations" className="text-white/80 hover:text-white">
          <ChevronDown className="h-8 w-8" />
        </Link>
      </div>
    </section>
  );
}