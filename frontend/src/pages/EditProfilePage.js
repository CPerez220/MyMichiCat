import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/apiService';

const EditProfilePage = () => {
  const { id } = useParams(); // Get profile ID from the URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`/profiles/${id}`);
        setProfile(response.data); // Prepopulate the form with the profile data
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(''); // Remove error message, no need to display it
      }
    };
    fetchProfile();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/profiles/${id}`, profile);
      navigate('/dashboard', { state: { updatedProfile: response.data } }); // Pass the updated profile back to the dashboard
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard'); // Redirect back to the dashboard without saving
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {profile.name ? `Editing "${profile.name}" profile` : 'Edit Profile'}
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Image URL</label>
          <input
            type="text"
            name="image"
            value={profile.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex space-x-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleGoBack}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;