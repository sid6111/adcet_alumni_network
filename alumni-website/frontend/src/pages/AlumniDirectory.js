import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AlumniCard from '../components/AlumniCard';
import SearchFilter from '../components/SearchFilter';

const AlumniDirectory = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    graduationYear: '',
    course: '',
    location: ''
  });

  useEffect(() => {
    const fetchAlumni = async () => {
      try {
        const params = new URLSearchParams();
        if (filters.graduationYear) params.append('graduationYear', filters.graduationYear);
        if (filters.course) params.append('course', filters.course);
        if (filters.location) params.append('location', filters.location);

        const response = await axios.get(`/api/alumni?${params.toString()}`);
        setAlumni(response.data.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alumni:', err);
        setLoading(false);
      }
    };

    fetchAlumni();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Alumni Directory</h1>
      
      <SearchFilter 
        filters={filters} 
        onChange={handleFilterChange} 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {alumni.length > 0 ? (
          alumni.map(alum => (
            <AlumniCard key={alum._id} alumni={alum} />
          ))
        ) : (
          <div className="col-span-3 text-center py-12">
            <p className="text-xl">No alumni found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlumniDirectory;