import React from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../assets/images/default-avatar.png';

const AlumniCard = ({ alumni }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex items-center mb-4">
          <img 
            src={alumni.photo || defaultAvatar} 
            alt={alumni.name} 
            className="w-16 h-16 rounded-full object-cover mr-4"
          />
          <div>
            <h3 className="text-xl font-semibold">{alumni.name}</h3>
            <p className="text-gray-600">{alumni.course}, {alumni.graduationYear}</p>
          </div>
        </div>
        
        <div className="mb-4">
          {alumni.job && (
            <p className="text-gray-700">
              <span className="font-medium">Works as:</span> {alumni.job}
            </p>
          )}
          {alumni.location && (
            <p className="text-gray-700">
              <span className="font-medium">Location:</span> {alumni.location}
            </p>
          )}
        </div>
        
        {alumni.bio && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {alumni.bio}
          </p>
        )}
        
        <Link 
          to={`/alumni/${alumni._id}`} 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
};

export default AlumniCard;