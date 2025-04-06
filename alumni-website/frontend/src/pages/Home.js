import React from 'react';
import { Link } from 'react-router-dom';
import HeroImage from '../assets/images/college-hero.jpg';

const Home = () => {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="relative h-96 rounded-lg overflow-hidden mb-12">
        <img 
          src={HeroImage} 
          alt="College Campus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Our Alumni Network</h1>
            <p className="text-xl mb-6">Connecting graduates across generations</p>
            <Link 
              to="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8">Stay Connected</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Alumni Directory</h3>
            <p className="text-gray-600 mb-4">
              Find and connect with fellow alumni from your graduation year, department, or location.
            </p>
            <Link to="/alumni" className="text-blue-600 hover:underline">
              Browse Directory →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Upcoming Events</h3>
            <p className="text-gray-600 mb-4">
              Join reunions, networking events, and workshops organized by the alumni association.
            </p>
            <Link to="/events" className="text-blue-600 hover:underline">
              View Events →
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Latest News</h3>
            <p className="text-gray-600 mb-4">
              Stay updated with the latest happenings at your alma mater and in the alumni community.
            </p>
            <Link to="/news" className="text-blue-600 hover:underline">
              Read News →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-800 text-white py-12 rounded-lg mb-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Alumni Community</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-5xl font-bold mb-2">10,000+</h3>
              <p className="text-xl">Alumni Members</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">50+</h3>
              <p className="text-xl">Countries Represented</p>
            </div>
            <div>
              <h3 className="text-5xl font-bold mb-2">100+</h3>
              <p className="text-xl">Events Yearly</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;