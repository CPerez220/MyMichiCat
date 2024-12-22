import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ProfileForm = () => {
  const { id } = useParams(); // For editing an existing profile
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageUpload = (e) => {
    setProfile({ ...profile, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call for saving data
    console.log('Profile saved:', profile);
    navigate('/dashboard'); // Redirect to dashboard
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Profile' : 'Add New Profile'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={profile.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Upload Image</label>
          <input type="file" onChange={handleImageUpload} className="block" />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;