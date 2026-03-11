import User from '../models/User.js';

/**
 * Login with Database Credentials
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email });

    if (user && user.password === password) {
      return res.status(200).json({ 
        success: true, 
        message: 'Login successful!',
        token: 'hirato-auth-token-' + Date.now(),
        user: { id: user._id, name: user.name, email: user.email }
      });
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

/**
 * Update Admin Profile (Email, Name, Password)
 */
export const updateProfile = async (req, res) => {
  try {
    const { userId, email, name, password, newEmail } = req.body;
    
    // Prioritize finding by ID, fallback to email
    let user;
    if (userId) {
      user = await User.findById(userId);
    } else {
      user = await User.findOne({ email });
    }
    
    if (!user) {
      return res.status(404).json({ message: 'Admin user not found.' });
    }

    if (name) user.name = name;
    if (newEmail) user.email = newEmail;
    if (password) user.password = password;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully!',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating profile.', error: error.message });
  }
};

/**
 * Registration (Disabled)
 */
export const register = async (req, res) => {
  res.status(403).json({ message: 'Registration is disabled.' });
};

// Compatibility exports
export const sendOtp = login;
export const verifyOtp = login;
