import React, { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import api from '../services/apiService';

const ProfileForm = () => {
  const { id } = useParams(); // Get profile ID from the URL
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false); // Track if editing an existing profile

  useEffect(() => {
    // Only fetch profile data when editing
    if (id) {
      const fetchProfile = async () => {
        try {
          const response = await api.get(`/profiles/${id}`);
          setProfile(response.data); // Populate form with existing data
          setIsEditing(true); // Enable editing mode
        } catch (err) {
          console.error('Error fetching profile:', err);
          setError('Failed to load profile.');
        }
      };
      fetchProfile();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedProfile;
      if (isEditing) {
        // Update the profile
        const response = await api.put(`/api/profiles/${id}`, profile);
        updatedProfile = response.data;
      } else {
        // Create a new profile
        const response = await api.post('/api/profiles', profile);
        updatedProfile = response.data;
      }
      navigate('/dashboard', { state: { updatedProfile } }); // Pass updated profile back to dashboard
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/dashboard'); // Redirect to dashboard without saving
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Profile' : 'Add New Profile'}</h1>
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
            {isEditing ? 'Save Changes' : 'Create Profile'}
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

export default ProfileForm;