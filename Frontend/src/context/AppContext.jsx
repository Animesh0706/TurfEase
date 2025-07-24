import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const [turfs, setTurfs] = useState([
    {
      id: 1,
      name: 'Bayside Sports PVT LTD',
      location: 'Bandra',
      price: 1500,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      rating: 4.5,
      reviews: 128,
      amenities: ['Floodlights', 'Parking', 'Changing Room', 'Water'],
      availableHours: ['06:00', '07:00', '08:00', '17:00', '18:00', '19:00', '20:00']
    },
    {
      id: 2,
      name: 'Sonic Sports Construction',
      location: 'Bandra',
      price: 2000,
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
      rating: 4.8,
      reviews: 95,
      amenities: ['Floodlights', 'Parking', 'Changing Room', 'Cafeteria'],
      availableHours: ['06:00', '07:00', '08:00', '09:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    },
    {
      id: 3,
      name: 'Goalster sports arena',
      location: 'Bandra',
      price: 1200,
      image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
      rating: 4.2,
      reviews: 67,
      amenities: ['Natural Grass', 'Parking', 'Water'],
      availableHours: ['07:00', '08:00', '09:00', '17:00', '18:00', '19:00']
    }
  ]);
  
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);

  const login = (userType, userData) => {
    setUser({ type: userType, ...userData });
    localStorage.setItem('user', JSON.stringify({ type: userType, ...userData }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setCurrentPage('home');
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
    setBookings([...bookings, newBooking]);
  };

  const cancelBooking = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' }
        : booking
    ));
  };

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toISOString()
    };
    setReviews([...reviews, newReview]);
    
    // Update turf rating
    const turfReviews = [...reviews, newReview].filter(r => r.turfId === review.turfId);
    const avgRating = turfReviews.reduce((sum, r) => sum + r.rating, 0) / turfReviews.length;
    
    setTurfs(turfs.map(turf => 
      turf.id === review.turfId 
        ? { ...turf, rating: Math.round(avgRating * 10) / 10, reviews: turfReviews.length }
        : turf
    ));
  };

  const addTurf = (turf) => {
    const newTurf = {
      ...turf,
      id: Date.now(),
      rating: 0,
      reviews: 0
    };
    setTurfs([...turfs, newTurf]);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const value = {
    currentPage,
    setCurrentPage,
    user,
    login,
    logout,
    turfs,
    setTurfs,
    bookings,
    addBooking,
    cancelBooking,
    reviews,
    addReview,
    addTurf
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};