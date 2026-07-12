import Hero from '@/components/home/Hero';
import PopularDestinations from '@/components/home/PopularDestinations';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TourCategories from '@/components/home/TourCategories';
import FeaturedPackages from '@/components/home/FeaturedPackages';
import Statistics from '@/components/home/Statistics';
import Testimonials from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';
import FAQ from '@/components/home/FAQ';
import CTABanner from '@/components/home/CTABanner';

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularDestinations />
      <FeaturedPackages />
      <WhyChooseUs />
      <TourCategories />
      <Statistics />
      <Testimonials />
      <CTABanner />
      <Newsletter />
      <FAQ />
    </div>
  );
}