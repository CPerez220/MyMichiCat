import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const [profiles, setProfiles] = useState([]);

  // Simulate fetching profiles from an API
  useEffect(() => {
    // Replace with actual API call
    const fetchedProfiles = [
      { id: 1, name: 'Whiskers', description: 'A playful tabby cat' },
      { id: 2, name: 'Mittens', description: 'A shy black cat' },
    ];
    setProfiles(fetchedProfiles);
  }, []);

  const handleDelete = (id) => {
    // Replace with actual API delete call
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link
        to="/profile/new"
        className="px-4 py-2 bg-blue-600 text-white rounded-md mb-4 inline-block"
      >
        + Add New Profile
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            className="p-4 bg-white shadow-md rounded-md flex justify-between items-center"
          >
            <div>
              <h2 className="text-lg font-semibold">{profile.name}</h2>
              <p className="text-gray-600">{profile.description}</p>
            </div>
            <div className="flex space-x-2">
              <Link
                to={`/profile/${profile.id}`}
                className="px-3 py-1 bg-yellow-400 text-white rounded-md"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(profile.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;