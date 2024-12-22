import React, { useEffect, useState } from 'react';
import api from '../services/apiService';

const DashboardPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await api.get('/profiles');
        setProfiles(response.data); // Set profiles from API response
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to fetch profiles');
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {profiles.map((profile) => (
          <li key={profile._id} className="p-4 bg-gray-100 mb-2 rounded-md">
            <h2 className="font-bold">{profile.name}</h2>
            <p>{profile.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardPage;