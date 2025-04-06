import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-blue-600">AlumniConnect</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/alumni" className="text-gray-700 hover:text-blue-600">Alumni</Link>
            <Link to="/events" className="text-gray-700 hover:text-blue-600">Events</Link>
            <Link to="/news" className="text-gray-700 hover:text-blue-600">News</Link>
            <Link to="/donate" className="text-gray-700 hover:text-blue-600">Donate</Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;