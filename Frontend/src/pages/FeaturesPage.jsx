import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Clock, CreditCard, MapPin, Users, Star, Shield, Smartphone, Bell, BarChart3 } from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: 'Real-time Availability',
      description: 'Check live availability across all turf locations instantly. No more calling multiple venues or waiting for confirmations.',
      benefits: ['Live slot updates', 'Instant availability check', 'No double bookings', 'Real-time notifications']
    },
    {
      icon: <CreditCard className="w-8 h-8 text-emerald-600" />,
      title: 'Secure Online Payments',
      description: 'Multiple payment options with bank-level security. Pay online and get instant booking confirmation.',
      benefits: ['Multiple payment methods', 'Secure transactions', 'Instant receipts', 'Refund protection']
    },
    {
      icon: <MapPin className="w-8 h-8 text-emerald-600" />,
      title: 'Multiple Locations',
      description: 'Access turfs across the city from a single platform. Find the perfect location based on your convenience.',
      benefits: ['City-wide coverage', 'Location filters', 'Distance-based search', 'Detailed venue info']
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: 'Easy Booking Management',
      description: 'Manage all your bookings from one dashboard. Cancel, reschedule, or modify bookings with ease.',
      benefits: ['Booking history', 'Easy cancellations', 'Rescheduling options', 'Group booking features']
    },
    {
      icon: <Star className="w-8 h-8 text-emerald-600" />,
      title: 'Ratings & Reviews',
      description: 'Make informed decisions with authentic user reviews and ratings for every turf location.',
      benefits: ['User reviews', 'Photo uploads', 'Rating system', 'Quality assurance']
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-600" />,
      title: 'Booking Protection',
      description: 'Your bookings are protected with our guarantee. Issues? We\'ll make it right or refund your money.',
      benefits: ['Booking guarantee', 'Issue resolution', 'Customer support', 'Refund policy']
    },
    {
      icon: <Smartphone className="w-8 h-8 text-emerald-600" />,
      title: 'Mobile Optimized',
      description: 'Fully responsive design that works perfectly on all devices. Book on the go, anytime, anywhere.',
      benefits: ['Mobile responsive', 'App-like experience', 'Offline capabilities', 'Touch optimized']
    },
    {
      icon: <Bell className="w-8 h-8 text-emerald-600" />,
      title: 'Smart Notifications',
      description: 'Stay updated with booking confirmations, reminders, and important updates via SMS and email.',
      benefits: ['Booking confirmations', 'Reminder alerts', 'Schedule updates', 'Payment notifications']
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-emerald-600" />,
      title: 'Analytics Dashboard',
      description: 'For turf owners: Comprehensive analytics to track bookings, revenue, and customer preferences.',
      benefits: ['Revenue tracking', 'Booking analytics', 'Customer insights', 'Performance metrics']
    }
  ];

  const adminFeatures = [
    {
      title: 'Turf Management',
      description: 'Complete control over your turf listings, pricing, and availability.',
      icon: <MapPin className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Booking Oversight',
      description: 'Approve, reject, or manage all incoming booking requests efficiently.',
      icon: <Calendar className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Revenue Tracking',
      description: 'Monitor your earnings with detailed financial reports and analytics.',
      icon: <BarChart3 className="w-6 h-6 text-emerald-600" />
    },
    {
      title: 'Customer Communication',
      description: 'Direct communication with customers for better service delivery.',
      icon: <Users className="w-6 h-6 text-emerald-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Powerful <span className="text-emerald-600">Features</span> for Everyone
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the features that make TurfEase the ultimate platform for turf bookings and management
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Features</h2>
            <p className="text-xl text-gray-600">Everything you need for seamless turf booking experience</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-orange-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-2">
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                For Turf <span className="text-emerald-600">Owners</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Comprehensive tools to manage your turf business efficiently and grow your revenue.
              </p>
              
              <div className="space-y-6">
                {adminFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7181619/pexels-photo-7181619.jpeg" 
                alt="Turf management dashboard" 
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-teal-200 rounded-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to book your perfect turf</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Choose & Explore',
                description: 'Browse available turfs, check amenities, read reviews, and compare prices to find your perfect match.',
                icon: <MapPin className="w-8 h-8 text-emerald-600" />
              },
              {
                step: '02',
                title: 'Select & Schedule',
                description: 'Pick your preferred date and time slot from real-time availability. All slots are updated instantly.',
                icon: <Calendar className="w-8 h-8 text-emerald-600" />
              },
              {
                step: '03',
                title: 'Pay & Play',
                description: 'Complete secure payment and receive instant confirmation. Show up and enjoy your game!',
                icon: <CreditCard className="w-8 h-8 text-emerald-600" />
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
                    {step.icon}
                  </div>
                  <div className="text-6xl font-bold text-emerald-100 mb-4">{step.step}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <div className="w-full h-0.5 bg-emerald-200"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience TurfEase?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of happy customers who trust TurfEase for their sporting needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Booking
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-colors">
              For Turf Owners
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FeaturesPage;