const Profile = require('../models/Profile');

// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    // Fetch profiles belonging to the logged-in user
    const profiles = await Profile.find({ user: req.user.id });
    res.json(profiles);
  } catch (err) {
    console.error('Error fetching profiles:', err);
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

exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, description, image } = req.body;

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Ensure the profile belongs to the logged-in user
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    profile.name = name || profile.name;
    profile.description = description || profile.description;
    profile.image = image || profile.image;

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await Profile.findById(id);

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    // Ensure the profile belongs to the logged-in user
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // Use deleteOne instead of remove
    await profile.deleteOne();

    res.json({ message: 'Profile deleted successfully' });
  } catch (err) {
    console.error('Error deleting profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};