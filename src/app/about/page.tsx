import Link from 'next/link';
import { MapPin, Shield, Leaf, Heart, Users, Star, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Authenticity',
    description:
      'Every tour is designed to give you genuine, immersive experiences — not tourist traps. We partner with local guides who live and breathe their communities.',
  },
  {
    icon: Shield,
    title: 'Safety',
    description:
      'All our tours are led by licensed, certified guides. We carry full insurance, maintain strict safety protocols, and provide 24/7 emergency support.',
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description:
      'We practice eco-friendly tourism, support local economies, and invest in community development projects at every destination we serve.',
  },
  {
    icon: Heart,
    title: 'Accessibility',
    description:
      'From budget backpackers to luxury seekers, we curate tours for every budget and fitness level — because travel should be for everyone.',
  },
];

const team = [
  {
    name: 'Tanvir Hossain',
    role: 'Founder & CEO',
    bio: 'Former travel journalist who visited every district in Bangladesh before founding Tourify. Passionate about connecting people with authentic experiences.',
    initials: 'TH',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Head of Operations',
    bio: '10 years in hospitality management. Oversees tour logistics, guide training, and partner relationships across all destinations.',
    initials: 'NJ',
  },
  {
    name: 'Rafiq Rahman',
    role: 'Lead Tour Designer',
    bio: 'Geography graduate and adventure enthusiast. Designs unique itineraries that balance thrill, culture, and comfort.',
    initials: 'RR',
  },
  {
    name: 'Sabrina Ahmed',
    role: 'Marketing Director',
    bio: 'Digital marketing expert who has built Tourify\'s brand from zero to thousands of social media followers and a loyal customer base.',
    initials: 'SA',
  },
  {
    name: 'Kamal Uddin',
    role: 'Customer Experience Lead',
    bio: 'Ensures every traveler gets prompt, personalized support — before, during, and after their trip. Manages our 24/7 helpline.',
    initials: 'KU',
  },
  {
    name: 'Farhana Begum',
    role: 'Tech Lead',
    bio: 'Full-stack developer who built Tourify\'s booking platform. Obsessed with seamless user experiences and reliable systems.',
    initials: 'FB',
  },
];

const stats = [
  { value: '5,000+', label: 'Happy Travelers' },
  { value: '200+', label: 'Curated Tours' },
  { value: '50+', label: 'Destinations' },
  { value: '98%', label: 'Satisfaction Rate' },
];

export const metadata = {
  title: 'About Us - Tourify',
  description:
    'Learn about Tourify — Bangladesh\'s trusted travel booking platform connecting travelers with authentic, curated tour experiences.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            About Tourify
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            We believe travel has the power to transform lives, bridge cultures,
            and create memories that last a lifetime. Tourify was built to make
            those experiences accessible to everyone.
          </p>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Story</h2>
          <div className="space-y-4 text-text-secondary leading-relaxed">
            <p>
              Tourify started in 2022 in a small office in Dhanmondi, Dhaka — born
              from a simple observation: Bangladesh is home to some of the most
              breathtaking landscapes and rich cultures in the world, yet finding
              reliable, well-organized tours was surprisingly difficult.
            </p>
            <p>
              Our founder, Tanvir Hossain, had spent years traveling to every
              corner of the country — from the mangrove forests of the Sundarbans
              to the rolling hills of the Chittagong Hill Tracts. Along the way,
              he met incredible local guides, discovered hidden gems, and realized
              that the real magic of travel lies in authentic, human connections.
            </p>
            <p>
              That vision became Tourify: a platform that connects curious
              travelers with handpicked, locally-guided tours across Bangladesh
              and South Asia. In just a few years, we&apos;ve grown from a team of
              three to a thriving community of over 5,000 happy travelers, 200+
              curated tours, and partnerships with guides in 50+ destinations.
            </p>
            <p>
              Today, Tourify is one of Bangladesh&apos;s fastest-growing travel
              platforms — but we still operate with the same passion and
              personal touch that started it all.
            </p>
          </div>
        </div>

        {/* Our Mission */}
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            To empower travelers with curated, authentic, and affordable tour
            experiences while supporting local communities and sustainable
            tourism practices. We envision a world where travel creates
            positive change — for travelers, for guides, and for the places
            we visit.
          </p>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl shadow-sm p-6 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-text-secondary">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary">{member.role}</p>
                  </div>
                </div>
                <p className="text-sm text-text-secondary">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">
            Ready to Explore?
          </h2>
          <p className="text-text-secondary mb-6 max-w-lg mx-auto">
            Browse our curated collection of tours and find your next
            unforgettable adventure.
          </p>
          <Link
            href="/tours"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <span>Explore Tours</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
