import React from 'react';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-emerald-400 mb-4">TurfEase</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              Your ultimate solution for quick, hassle-free turf bookings and real-time availability. 
              Making sports accessible for everyone.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-400 hover:text-emerald-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Book Turf</a></li>
              <li><a href="#" className="text-gray-300 hover:text-emerald-400 transition-colors">Features</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">Thadomal Shahani Engineering College, Bandra</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">+91 80800 55453</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-gray-300">info@turfease.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 TurfEase. All rights reserved. Made with ❤️ by VisionX.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;