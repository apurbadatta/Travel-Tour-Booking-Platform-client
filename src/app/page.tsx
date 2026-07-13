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
import ListYourTourCTA from '@/components/home/ListYourTourCTA';

export const metadata = {
  title: 'Tourify - Discover Bangladesh with Unforgettable Travel Experiences',
  description:
    'Explore the beauty of Bangladesh with Tourify. Book guided tours, discover hidden destinations, and create memories that last a lifetime. Adventure starts here.',
  openGraph: {
    title: 'Tourify - Discover Bangladesh',
    description: 'Explore the beauty of Bangladesh with guided tours and unforgettable travel experiences.',
    type: 'website',
  },
};

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularDestinations />
      <FeaturedPackages />
      <ListYourTourCTA />
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