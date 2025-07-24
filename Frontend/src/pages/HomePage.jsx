import React from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, CheckCircle, MapPin, Clock, Star, Users } from 'lucide-react';

const HomePage = () => {
  const { setCurrentPage } = useApp();

  const features = [
    {
      icon: <Clock className="w-8 h-8 text-emerald-600" />,
      title: 'Real-time Availability',
      description: 'Check live availability and book instantly without any delays or confusion.'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-emerald-600" />,
      title: 'Online Payments',
      description: 'Secure payment gateway with multiple payment options for your convenience.'
    },
    {
      icon: <MapPin className="w-8 h-8 text-emerald-600" />,
      title: 'Multiple Locations',
      description: 'Find and book turfs across various locations in your city.'
    },
    {
      icon: <Users className="w-8 h-8 text-emerald-600" />,
      title: 'Easy Management',
      description: 'Simple booking management with cancel and reschedule options.'
    }
  ];

  const steps = [
    {
      icon: <MapPin className="w-12 h-12 text-emerald-600" />,
      title: 'Choose Location & Turf Type',
      description: 'Browse available turfs in your area and select your preferred type.'
    },
    {
      icon: <Calendar className="w-12 h-12 text-emerald-600" />,
      title: 'Select Time Slot & Check Availability',
      description: 'Pick your preferred date and time from available slots.'
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-emerald-600" />,
      title: 'Instant Booking & Payment',
      description: 'Complete your booking with secure payment and get instant confirmation.'
    }
  ];

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Book Your Perfect
                  <span className="text-emerald-600"> Turf</span> in Seconds
                </h1>
                <p className="text-xl text-gray-600 max-w-lg">
                  TurfEase is your ultimate solution for quick, hassle-free turf bookings and 
                  real-time availability. Whether you're planning a game or managing a turf - we've got you covered.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setCurrentPage('booking')}
                  className="bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Book a Turf
                </button>
                <button 
                  onClick={() => setCurrentPage('booking')}
                  className="border-2 border-emerald-600 text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-600 hover:text-white transition-all duration-300"
                >
                  Check Availability
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg" 
                  alt="Football players on turf" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-full h-full bg-emerald-200 rounded-2xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* What is TurfEase Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg" 
                  alt="Team playing football" 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -left-4 w-full h-full bg-teal-200 rounded-2xl opacity-30"></div>
            </div>

            {/* Right Content */}
            <div className="space-y-8 order-1 lg:order-2">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  What is TurfEase?
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  TurfEase is your ultimate solution for quick, hassle-free turf bookings and 
                  real-time availability. Whether you're planning a turf space or managing a turf - 
                  we've got you all covered.
                </p>
              </div>

              <div className="bg-orange-50 p-6 rounded-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">How It Works</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-center space-y-4">
                  <div className="flex justify-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover what makes TurfEase the perfect solution for all your turf booking needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center space-y-4 p-6 rounded-xl hover:bg-orange-50 transition-colors duration-300">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Book Your Next Game?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Join thousands of players who trust TurfEase for their sporting needs
          </p>
          <button 
            onClick={() => setCurrentPage('booking')}
            className="bg-white text-emerald-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Start Booking Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;