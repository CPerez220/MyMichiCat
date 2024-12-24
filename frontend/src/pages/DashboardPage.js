import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../services/apiService';

const DashboardPage = () => {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Access navigation state for updated profiles

  useEffect(() => {
    // Fetch profiles initially
    const fetchProfiles = async () => {
      try {
        const response = await api.get('/api/profiles'); // Added the `/api` prefix
        setProfiles(response.data);
      } catch (err) {
        console.error('Error fetching profiles:', err.response?.data || err.message);
        setError('Failed to fetch profiles');
      }
    };    

    fetchProfiles();
  }, []);

  useEffect(() => {
    if (location.state?.updatedProfile) {
      const updatedProfile = location.state.updatedProfile;
      setProfiles((prevProfiles) =>
        prevProfiles.map((profile) =>
          profile._id === updatedProfile._id ? updatedProfile : profile
        )
      );
    }
  }, [location.state]);  
  
  const handleDelete = async (id) => {
    try {
      await api.delete(`/api/profiles/${id}`); // Added the `/api` prefix
      setProfiles(profiles.filter((profile) => profile._id !== id));
    } catch (err) {
      console.error('Error deleting profile:', err.response?.data || err.message);
      setError('Failed to delete profile');
    }
  };  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={() => navigate('/profile/new')}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Create New Profile
      </button>
      {profiles.length === 0 ? (
        <p>No profiles found. Create your first profile!</p>
      ) : (
        <ul>
          {profiles.map((profile) => (
            <li key={profile._id} className="p-4 bg-gray-100 mb-2 rounded-md">
              <h2 className="font-bold">{profile.name}</h2>
              <p>{profile.description}</p>
              <div className="mt-2 flex space-x-2">
              <button
                onClick={() => navigate(`/profile/${profile._id}/qrcode`, { state: { profile } })}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                QR Code
              </button>
                <button
                  onClick={() => navigate(`/profile/${profile._id}`, { state: { profile } })}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(profile._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;