import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Clock, Star, Users, Wifi, Car, Shirt, Coffee, Calendar, CreditCard } from 'lucide-react';
import { useLocalStorage } from '../context/useLocalStorage';

const BookingPage = () => {
  const { turfs, addBooking, user, setCurrentPage } = useApp();
  const [selectedTurf, setSelectedTurf] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    players: '',
    specialRequests: ''
  });

  const amenityIcons = {
    'Floodlights': <Clock className="w-4 h-4" />,
    'Parking': <Car className="w-4 h-4" />,
    'Changing Room': <Shirt className="w-4 h-4" />,
    'Water': <Users className="w-4 h-4" />,
    'Cafeteria': <Coffee className="w-4 h-4" />,
    'WiFi': <Wifi className="w-4 h-4" />,
    'Natural Grass': <Users className="w-4 h-4" />
  };

  const handleBookNow = (turf) => {
    if (!user) {
      setCurrentPage('login');
      return;
    }
    setSelectedTurf(turf);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    const booking = {
      turfId: selectedTurf.id,
      turfName: selectedTurf.name,
      date: selectedDate,
      time: selectedTime,
      price: selectedTurf.price,
      userDetails: bookingDetails,
      userId: user.id || user.name
    };

    addBooking(booking);
    alert('Booking confirmed! Check your dashboard for details.');
    setShowBookingForm(false);
    setSelectedTurf(null);
    setBookingDetails({
      name: '',
      phone: '',
      email: '',
      players: '',
      specialRequests: ''
    });
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (showBookingForm && selectedTurf) {
    return (
      <div className="min-h-screen bg-orange-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
              <p className="text-gray-600">You're booking {selectedTurf.name}</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Date and Time Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    min={getTomorrowDate()}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  >
                    <option value="">Choose time slot</option>
                    {selectedTurf.availableHours.map(hour => (
                      <option key={hour} value={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={bookingDetails.name}
                    onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={bookingDetails.phone}
                    onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={bookingDetails.email}
                    onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number of Players
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="22"
                    value={bookingDetails.players}
                    onChange={(e) => setBookingDetails({...bookingDetails, players: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Special Requests (Optional)
                </label>
                <textarea
                  rows="3"
                  value={bookingDetails.specialRequests}
                  onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Any special requirements or requests..."
                />
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Turf:</span>
                    <span className="font-medium">{selectedTurf.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">{selectedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2">
                    <span className="text-gray-900 font-semibold">Total Amount:</span>
                    <span className="text-emerald-600 font-bold text-lg">₹{selectedTurf.price}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Back to Turfs
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Confirm & Pay ₹{selectedTurf.price}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      
      {/* Header Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Perfect <span className="text-emerald-600">Turf</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose from our premium turf locations and secure your slot in just a few clicks
          </p>
        </div>
      </section>

      {/* Turfs Grid */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {turfs.map((turf) => (
              <div key={turf.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Turf Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={turf.image} 
                    alt={turf.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{turf.rating}</span>
                  </div>
                </div>

                {/* Turf Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{turf.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{turf.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-emerald-600">₹{turf.price}</span>
                      <span className="text-sm text-gray-500">per hour</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {turf.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                          {amenityIcons[amenity] || <Users className="w-3 h-3" />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Available Hours */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Available Hours</h4>
                    <div className="flex flex-wrap gap-1">
                      {turf.availableHours.slice(0, 4).map((hour, index) => (
                        <span key={index} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                          {hour}
                        </span>
                      ))}
                      {turf.availableHours.length > 4 && (
                        <span className="text-gray-500 text-xs px-2 py-1">
                          +{turf.availableHours.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                      <span>{turf.rating} ({turf.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleBookNow(turf)}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors font-semibold flex items-center justify-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;