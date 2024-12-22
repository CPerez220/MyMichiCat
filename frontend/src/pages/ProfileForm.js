import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/apiService';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/profiles', profile);
      navigate('/dashboard'); // Redirect to dashboard after successful creation
    } catch (err) {
      console.error('Error creating profile:', err);
      setError('Failed to create profile');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Profile</h1>
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
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;