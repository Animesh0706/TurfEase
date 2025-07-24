// AppContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

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
  const [user, setUser] = useLocalStorage('user', null);
  const [turfs, setTurfs] = useState([
    {
      id: 1,
      name: 'Green Valley Sports Complex',
      location: 'Downtown',
      price: 1500,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg',
      rating: 4.5,
      reviews: 128,
      amenities: ['Floodlights', 'Parking', 'Changing Room', 'Water'],
      availableHours: ['06:00', '07:00', '08:00', '17:00', '18:00', '19:00', '20:00']
    },
    {
      id: 2,
      name: 'Urban Football Arena',
      location: 'City Center',
      price: 2000,
      image: 'https://images.pexels.com/photos/1618200/pexels-photo-1618200.jpeg',
      rating: 4.8,
      reviews: 95,
      amenities: ['Floodlights', 'Parking', 'Changing Room', 'Cafeteria'],
      availableHours: ['06:00', '07:00', '08:00', '09:00', '17:00', '18:00', '19:00', '20:00', '21:00']
    },
    {
      id: 3,
      name: 'Riverside Sports Ground',
      location: 'Riverside',
      price: 1200,
      image: 'https://images.pexels.com/photos/1884574/pexels-photo-1884574.jpeg',
      rating: 4.2,
      reviews: 67,
      amenities: ['Natural Grass', 'Parking', 'Water', 'Cafeteria'],
      availableHours: ['07:00', '08:00', '09:00', '17:00', '18:00', '19:00']
    }
  ]);
  
  const [bookings, setBookings] = useLocalStorage('bookings', []);
  const [reviews, setReviews] = useLocalStorage('reviews', []);

  const login = (userType, userData) => {
    setUser({ type: userType, ...userData });
  };

  const logout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const addBooking = (booking) => {
    const newBooking = {
      ...booking,
      id: Date.now(),
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
    setBookings((prevBookings) => [...prevBookings, newBooking]);

    
    setTurfs((prevTurfs) =>
      prevTurfs.map((turf) => {
        if (turf.id === booking.turfId) {
          
          const updatedAvailableHours = turf.availableHours.filter(
            (hour) => hour !== booking.time
          );
          return { ...turf, availableHours: updatedAvailableHours };
        }
        return turf;
      })
    );
    // --- END NEW LOGIC ---
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
    
  }, []);

  const value = {
    currentPage,
    setCurrentPage,
    user,
    login,
    logout,
    turfs,
    setTurfs, // Make sure setTurfs is exposed if you need to manually update turfs elsewhere
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