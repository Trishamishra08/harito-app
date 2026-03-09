import User from '../models/User.js';

/**
 * Register a new user/admin
 */
export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists.' });
    }

    const user = new User({ name, email, phone, password });
    await user.save();

    res.status(201).json({ 
      success: true, 
      message: 'Account created successfully. You can now login.',
      user: { name: user.name, email: user.email, phone: user.phone || '' }
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ success: false, message: 'Server error during registration.', error: error.message });
  }
};

/**
 * Login with Email and Password
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please register first.' });
    }

    // Basic password check (Replace with bcrypt if available)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Login successful!',
      token: 'mock-jwt-token-' + Date.now(),
      user: { name: user.name, email: user.email, phone: user.phone || '' }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

// Compatibility exports to avoid breaking other routes until updated
export const sendOtp = login;
export const verifyOtp = login;

