import React from 'react';
import { useApp } from '../context/AppContext';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import BookingPage from '../pages/BookingPage';
import FeaturesPage from '../pages/FeaturesPage';
import LoginPage from '../pages/LoginPage';
import UserDashboard from '../pages/UserDashboard';
import AdminDashboard from '../pages/AdminDashboard';
import GeminiChat from './GeminiChat';


export const Router = () => {
  const { currentPage, user } = useApp();

  const renderPage = () => {
    if (!user && ['dashboard', 'admin'].includes(currentPage)) {
      return <LoginPage />;
    }

    switch (currentPage) {
      case 'home':
        // return <HomePage />;
        return <GeminiChat />;
      case 'about':
        return <AboutPage />;
      case 'booking':
        return <BookingPage />;
      case 'features':
        return <FeaturesPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return user?.type === 'admin' ? <AdminDashboard /> : <UserDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <HomePage />;
        // 
    }
  };

  return renderPage();
};