import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Plus, MapPin, Clock, Users, Star, Calendar, BarChart3, X, Camera } from 'lucide-react';

const AdminDashboard = () => {
  const { user, turfs, addTurf, bookings, reviews } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddTurf, setShowAddTurf] = useState(false);
  const [newTurf, setNewTurf] = useState({
    name: '',
    location: '',
    price: '',
    image: '',
    amenities: [],
    availableHours: []
  });

  const adminBookings = bookings.filter(booking => 
    turfs.some(turf => turf.id === booking.turfId)
  );

  const totalRevenue = adminBookings
    .filter(booking => booking.status === 'confirmed')
    .reduce((sum, booking) => sum + booking.price, 0);

  const todayBookings = adminBookings.filter(booking => {
    const today = new Date().toDateString();
    return new Date(booking.date).toDateString() === today && booking.status === 'confirmed';
  });

  const availableAmenities = [
    'Floodlights', 'Parking', 'Changing Room', 'Water', 'Cafeteria', 'WiFi', 'Natural Grass'
  ];

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '17:00', '18:00', '19:00', '20:00', '21:00'
  ];

  const handleAddTurf = (e) => {
    e.preventDefault();
    
    if (newTurf.amenities.length === 0) {
      alert('Please select at least one amenity');
      return;
    }
    
    if (newTurf.availableHours.length === 0) {
      alert('Please select available hours');
      return;
    }

    const turf = {
      ...newTurf,
      price: parseInt(newTurf.price),
      image: newTurf.image || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg'
    };

    addTurf(turf);
    setShowAddTurf(false);
    setNewTurf({
      name: '',
      location: '',
      price: '',
      image: '',
      amenities: [],
      availableHours: []
    });
    alert('Turf added successfully!');
  };

  const handleAmenityChange = (amenity) => {
    setNewTurf(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleTimeSlotChange = (slot) => {
    setNewTurf(prev => ({
      ...prev,
      availableHours: prev.availableHours.includes(slot)
        ? prev.availableHours.filter(h => h !== slot)
        : [...prev.availableHours, slot]
    }));
  };

  const getBookingStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                Welcome back, {user?.name}! Manage your turfs and bookings
              </p>
            </div>
            <button
              onClick={() => setShowAddTurf(true)}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Turf</span>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="bg-emerald-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-emerald-600">{turfs.length}</div>
              <div className="text-emerald-700">Total Turfs</div>
            </div>
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{adminBookings.length}</div>
              <div className="text-blue-700">Total Bookings</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-green-600">₹{totalRevenue}</div>
              <div className="text-green-700">Total Revenue</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{todayBookings.length}</div>
              <div className="text-purple-700">Today's Bookings</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'overview', name: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
                { id: 'turfs', name: 'My Turfs', icon: <MapPin className="w-4 h-4" /> },
                { id: 'bookings', name: 'Bookings', icon: <Calendar className="w-4 h-4" /> },
                { id: 'reviews', name: 'Reviews', icon: <Star className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Business Overview</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Bookings */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                    <div className="space-y-3">
                      {adminBookings.slice(0, 5).map((booking) => {
                        const turf = turfs.find(t => t.id === booking.turfId);
                        return (
                          <div key={booking.id} className="flex justify-between items-center bg-white p-3 rounded">
                            <div>
                              <p className="font-medium text-gray-900">{turf?.name}</p>
                              <p className="text-sm text-gray-600">{booking.date} at {booking.time}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-emerald-600">₹{booking.price}</p>
                              <span className={`text-xs px-2 py-1 rounded-full ${getBookingStatusColor(booking.status)}`}>
                                {booking.status}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Top Performing Turfs */}
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Turfs</h3>
                    <div className="space-y-3">
                      {turfs.slice(0, 5).map((turf) => {
                        const turfBookings = adminBookings.filter(b => b.turfId === turf.id).length;
                        const turfRevenue = adminBookings
                          .filter(b => b.turfId === turf.id && b.status === 'confirmed')
                          .reduce((sum, b) => sum + b.price, 0);
                        
                        return (
                          <div key={turf.id} className="flex justify-between items-center bg-white p-3 rounded">
                            <div>
                              <p className="font-medium text-gray-900">{turf.name}</p>
                              <p className="text-sm text-gray-600">{turf.location}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-emerald-600">₹{turfRevenue}</p>
                              <p className="text-sm text-gray-600">{turfBookings} bookings</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Turfs Tab */}
            {activeTab === 'turfs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">My Turfs</h2>
                  <button
                    onClick={() => setShowAddTurf(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Turf</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {turfs.map((turf) => (
                    <div key={turf.id} className="bg-gray-50 rounded-lg overflow-hidden">
                      <img 
                        src={turf.image} 
                        alt={turf.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{turf.name}</h3>
                        <div className="flex items-center text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span className="text-sm">{turf.location}</span>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xl font-bold text-emerald-600">₹{turf.price}</span>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{turf.rating} ({turf.reviews})</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {turf.amenities.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-xs">
                              {amenity}
                            </span>
                          ))}
                          {turf.amenities.length > 3 && (
                            <span className="text-gray-500 text-xs px-2 py-1">
                              +{turf.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          <strong>Bookings:</strong> {adminBookings.filter(b => b.turfId === turf.id).length}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
                
                {adminBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No bookings yet</p>
                  </div>
                ) : (
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Turf
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Customer
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date & Time
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {adminBookings.map((booking) => {
                            const turf = turfs.find(t => t.id === booking.turfId);
                            return (
                              <tr key={booking.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">{turf?.name}</div>
                                    <div className="text-sm text-gray-500">{turf?.location}</div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div>
                                    <div className="text-sm font-medium text-gray-900">
                                      {booking.userDetails?.name || 'N/A'}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {booking.userDetails?.phone || 'N/A'}
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{booking.date}</div>
                                  <div className="text-sm text-gray-500">{booking.time}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-emerald-600">
                                  ₹{booking.price}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getBookingStatusColor(booking.status)}`}>
                                    {booking.status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
                
                {reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No reviews yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{review.turfName}</h3>
                            <p className="text-sm text-gray-600">by {review.userName}</p>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-400">
                          {new Date(review.date).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Turf Modal */}
      {showAddTurf && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Add New Turf</h3>
              <button
                onClick={() => setShowAddTurf(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddTurf} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Turf Name
                  </label>
                  <input
                    type="text"
                    value={newTurf.name}
                    onChange={(e) => setNewTurf({...newTurf, name: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={newTurf.location}
                    onChange={(e) => setNewTurf({...newTurf, location: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price per Hour (₹)
                  </label>
                  <input
                    type="number"
                    value={newTurf.price}
                    onChange={(e) => setNewTurf({...newTurf, price: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={newTurf.image}
                    onChange={(e) => setNewTurf({...newTurf, image: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newTurf.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="mr-2 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Hours
                </label>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => (
                    <label key={slot} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newTurf.availableHours.includes(slot)}
                        onChange={() => handleTimeSlotChange(slot)}
                        className="mr-2 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">{slot}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowAddTurf(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  Add Turf
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;