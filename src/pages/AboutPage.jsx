import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Target, Users, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-emerald-600" />,
      title: 'Our Mission',
      description: 'To make sports accessible for everyone by simplifying turf bookings and eliminating the hassle of manual coordination.'
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: 'Community First',
      description: 'We believe in building strong sports communities by connecting players and turf owners through our platform.'
    },
    {
      icon: <Award className="w-8 h-8 text-emerald-600" />,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our service, from user experience to customer support.'
    },
    {
      icon: <Heart className="w-8 h-8 text-emerald-600" />,
      title: 'Passion for Sports',
      description: 'Our love for sports drives us to create the best possible experience for athletes and sports enthusiasts.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Customers' },
    { number: '50+', label: 'Partner Turfs' },
    { number: '1000+', label: 'Bookings Completed' },
    { number: '4.8', label: 'User Rating' }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-emerald-600">TurfEase</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're passionate about making sports more accessible and enjoyable for everyone.
            Our platform bridges the gap between players and turf owners, creating seamless
            booking experiences that save time and eliminate confusion.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
                <p>
                  TurfEase was born from a simple frustration - the endless phone calls,
                  WhatsApp messages, and confusion that came with booking a turf for a game.
                  We realized that in our digital age, sports booking was still stuck in the past.
                </p>
                <p>
                  Our founders, avid football players themselves, experienced firsthand the
                  challenges of coordinating games, dealing with double bookings, and managing
                  payments. They envisioned a platform that would make sports booking as easy
                  as ordering food online.
                </p>
                <p>
                  Today, TurfEase serves hundreds of players and turf owners, making sports
                  more accessible and enjoyable for communities across the city.
                </p>
              </div>
            </div>
            <div className="relative w-full">
              {/* Background Layer */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-emerald-200 rounded-2xl opacity-30 z-0"></div>

              {/* Image on Top */}
              <img
                src="https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg"
                alt="Sports team celebrating"
                className="relative rounded-2xl shadow-2xl w-full h-auto z-10"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Impact</h2>
            <p className="text-xl text-emerald-100">
              Numbers that reflect our commitment to the sports community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-emerald-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind TurfEase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Founder & CEO', image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg' },
              { name: 'Priya Singh', role: 'CTO', image: 'https://images.pexels.com/photos/3586798/pexels-photo-3586798.jpeg' },
              { name: 'Amit Sharma', role: 'Head of Operations', image: 'https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-emerald-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;