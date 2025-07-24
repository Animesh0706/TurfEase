import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { User, Shield, Mail, Lock, Phone, UserPlus } from 'lucide-react';

const LoginPage = () => {
  const { login, setCurrentPage } = useApp();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('user');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const scriptURL = "https://script.google.com/macros/s/AKfycbxWT6Z2Vhw3ol416ETLfbV73EXuyKi6Kxjd7H4p9kul8ikCJvInYC5agPuNfekV66etqw/exec"; 

    if (isLogin) {
      // LOGIN → GET Request
      try {
        const query = `?email=${encodeURIComponent(formData.email)}&password=${encodeURIComponent(formData.password)}&role=${userType}`;
        const response = await fetch(`${scriptURL}${query}`);
        const text = await response.text();

        if (text === "Login successful") {
          login(userType, {
            name: formData.name || formData.email.split('@')[0],
            email: formData.email
          });
          setCurrentPage("dashboard");
        } else if (text === "Role mismatch") {
          alert("You are trying to login as the wrong role.");
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    } else {
      // SIGNUP → POST Request
      try {
        const form = new URLSearchParams();
        form.append("role", userType);
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("phone", formData.phone);
        form.append("password", formData.password);

        const response = await fetch(scriptURL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: form.toString(),
        });

        const text = await response.text();
        if (text === "Signup successful") {
          alert("Signup successful! You can now log in.");
          setIsLogin(true);
        } else {
          alert("Signup failed: " + text);
        }
      } catch (error) {
        alert("Signup failed: " + error.message);
      }
    }
  };


  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <Header />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Join TurfEase'}
              </h2>
              <p className="mt-2 text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account and start booking'}
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
              <button
                type="button"
                onClick={() => setUserType('user')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === 'user'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <User className="w-4 h-4 mr-2" />
                Player
              </button>
              <button
                type="button"
                onClick={() => setUserType('admin')}
                className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${userType === 'admin'
                    ? 'bg-white text-emerald-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Turf Owner
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required={!isLogin}
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-semibold"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Toggle Login/Signup */}
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
              <div className="text-xs text-gray-500 space-y-1">
                <p><strong>Player:</strong> player@demo.com / password123</p>
                <p><strong>Turf Owner:</strong> owner@demo.com / password123</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LoginPage;