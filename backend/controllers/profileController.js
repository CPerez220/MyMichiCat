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
    const profile = await Profile.create({ name, description, image });
    res.status(201).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};