import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Calendar, Clock, MapPin, Star, X, MessageSquare, Send } from 'lucide-react';

const UserDashboard = () => {
  const { user, bookings, cancelBooking, turfs, reviews, addReview } = useApp();
  const [activeTab, setActiveTab] = useState('bookings');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    comment: ''
  });

  const userBookings = bookings.filter(booking =>
    booking.userId === user?.id || booking.userId === user?.name
  );

  const upcomingBookings = userBookings.filter(booking =>
    booking.status === 'confirmed' && new Date(booking.date) >= new Date()
  );

  const pastBookings = userBookings.filter(booking =>
    booking.status === 'confirmed' && new Date(booking.date) < new Date()
  );

  const cancelledBookings = userBookings.filter(booking =>
    booking.status === 'cancelled'
  );

  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    const review = {
      turfId: selectedBooking.turfId,
      turfName: selectedBooking.turfName,
      userId: user.id || user.name,
      userName: user.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
      bookingId: selectedBooking.id
    };

    addReview(review);
    setShowReviewModal(false);
    setSelectedBooking(null);
    setReviewForm({ rating: 5, comment: '' });
    alert('Review submitted successfully!');
  };

  const openReviewModal = (booking) => {
    setSelectedBooking(booking);
    setShowReviewModal(true);
  };

  const getBookingStatus = (booking) => {
    const bookingDate = new Date(booking.date);
    const today = new Date();

    if (booking.status === 'cancelled') return 'cancelled';
    if (bookingDate < today) return 'completed';
    return 'upcoming';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const BookingCard = ({ booking }) => {
    const status = getBookingStatus(booking);
    const turf = turfs.find(t => t.id === booking.turfId);
    const hasReview = reviews.some(r => r.bookingId === booking.id);

    return (
      <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{booking.turfName}</h3>
            <div className="flex items-center text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{turf?.location}</span>
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{booking.time}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-emerald-600">₹{booking.price}</span>
          <div className="flex space-x-2">
            {status === 'upcoming' && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="px-4 py-2 text-sm text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Cancel
              </button>
            )}
            {status === 'completed' && !hasReview && (
              <button
                onClick={() => openReviewModal(booking)}
                className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-1"
              >
                <Star className="w-4 h-4" />
                <span>Review</span>
              </button>
            )}
            {hasReview && (
              <span className="px-4 py-2 text-sm text-green-600 bg-green-50 rounded-lg">
                Reviewed
              </span>
            )}
          </div>
        </div>
      </div>
    );
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
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your bookings and track your game history
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Calendar className="w-8 h-8 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-600">{upcomingBookings.length}</div>
              <div className="text-gray-600">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{pastBookings.length}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{cancelledBookings.length}</div>
              <div className="text-gray-600">Cancelled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{reviews.filter(r => r.userId === (user?.id || user?.name)).length}</div>
              <div className="text-gray-600">Reviews</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'bookings', name: 'All Bookings', count: userBookings.length },
                { id: 'upcoming', name: 'Upcoming', count: upcomingBookings.length },
                { id: 'history', name: 'History', count: pastBookings.length },
                { id: 'reviews', name: 'My Reviews', count: reviews.filter(r => r.userId === (user?.id || user?.name)).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                      ? 'border-emerald-500 text-emerald-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* All Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">All Bookings</h2>
                {userBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No bookings yet</p>
                    <p className="text-gray-400">Book your first turf to get started!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {userBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Upcoming Bookings Tab */}
            {activeTab === 'upcoming' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No upcoming bookings</p>
                    <p className="text-gray-400">Book a turf for your next game!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {upcomingBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Booking History</h2>
                {pastBookings.length === 0 ? (
                  <div className="text-center py-12">
                    <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No completed bookings</p>
                    <p className="text-gray-400">Your booking history will appear here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {pastBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
                {reviews.filter(r => r.userId === (user?.id || user?.name)).length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No reviews yet</p>
                    <p className="text-gray-400">Complete a booking to leave your first review</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews
                      .filter(r => r.userId === (user?.id || user?.name))
                      .map((review) => (
                        <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-900">{review.turfName}</h3>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < review.rating
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                    }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <p className="text-sm text-gray-400 mt-2">
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

      {/* Review Modal */}
      {showReviewModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900">Leave a Review</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-600">How was your experience at {selectedBooking.turfName}?</p>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1"
                    >
                      <Star
                        className={`w-8 h-8 ${star <= reviewForm.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Comment
                </label>
                <textarea
                  rows="4"
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Share your experience..."
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Review</span>
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

export default UserDashboard;