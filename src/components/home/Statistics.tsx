'use client';

import { useEffect, useState, useRef } from 'react';
import { Users, MapPin, CheckCircle, Star } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
}

function Counter({ end, duration = 2000, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-white">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

const stats = [
  {
    icon: Users,
    value: 12500,
    suffix: '+',
    label: 'Happy Travelers',
  },
  {
    icon: MapPin,
    value: 64,
    suffix: '+',
    label: 'Destinations',
  },
  {
    icon: CheckCircle,
    value: 850,
    suffix: '+',
    label: 'Tours Completed',
  },
  {
    icon: Star,
    value: 4,
    suffix: '.9',
    label: 'Average Rating',
  },
];

export default function Statistics() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Our Journey in Numbers
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join thousands of satisfied travelers who have explored Bangladesh with us.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <Counter end={stat.value} suffix={stat.suffix} />
              <p className="text-white/80 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}