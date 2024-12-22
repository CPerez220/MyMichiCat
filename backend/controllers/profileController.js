const Profile = require('../models/Profile');

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new profile
exports.createProfile = async (req, res) => {
  const { name, description, image } = req.body;

  try {
    if (!name || !description) {
      return res.status(400).json({ message: 'Name and description are required' });
    }

    const profile = await Profile.create({
      user: req.user.id, // Ensure req.user is set if profiles are tied to users
      name,
      description,
      image,
    });

    res.status(201).json(profile);
  } catch (err) {
    console.error('Error creating profile:', err); // Log the exact error
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};