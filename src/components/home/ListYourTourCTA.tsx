'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { PlusCircle, CheckCircle, ArrowRight, Star, Globe, Shield } from 'lucide-react';

const perks = [
  { icon: Globe, title: 'Global Reach', desc: 'Reach thousands of travelers across Bangladesh and beyond.' },
  { icon: Star, title: 'Admin Curated', desc: 'Your tour gets reviewed and featured once approved.' },
  { icon: Shield, title: 'Secure Payments', desc: 'Payments are handled securely via Stripe checkout.' },
];

export default function ListYourTourCTA() {
  const { isAuthenticated } = useAuth();

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Label */}
        <div className="flex justify-center mb-6">
          <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold text-xs uppercase tracking-widest px-4 py-2 rounded-full">
            For Tour Hosts & Operators
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white text-center leading-tight mb-5 max-w-3xl mx-auto">
          Have a Tour Destination?{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">
            Share It With the World
          </span>
        </h2>
        <p className="text-slate-400 text-center text-base md:text-lg max-w-2xl mx-auto mb-12">
          List your tour packages on Tourify. Once our admin team reviews and approves your submission,
          it goes live and travelers from across the platform can book it — with payments processed automatically.
        </p>

        {/* Perks row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {perks.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5 backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href={isAuthenticated ? '/tours/add' : '/login?redirect=/tours/add'}
            className="group inline-flex items-center gap-2.5 bg-teal-500 hover:bg-teal-400 text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-teal-500/20 hover:shadow-teal-400/30 transition-all text-base"
          >
            <PlusCircle className="h-5 w-5 group-hover:rotate-90 transition-transform duration-300" />
            {isAuthenticated ? 'Submit Your Tour Place' : 'Sign In & Submit Tour'}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            href="/tours"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white border border-white/15 hover:border-white/30 font-semibold px-8 py-4 rounded-2xl transition-all text-base"
          >
            Browse Existing Tours
          </Link>
        </div>

        {/* How it works */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-3">
          {['Submit tour details', 'Admin reviews your listing', 'Get approved & go live', 'Earn from bookings'].map(
            (step, i) => (
              <div key={step} className="flex items-center gap-2 text-slate-400 text-sm">
                <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </span>
                <span>{step}</span>
                {i < 3 && <span className="text-slate-600 hidden md:block">→</span>}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
