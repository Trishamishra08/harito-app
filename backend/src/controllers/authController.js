import User from '../models/User.js';

/**
 * Register a new user/admin
 */
export const register = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: 'Name and phone number are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this phone number already exists.' });
    }

    const user = new User({ name, email, phone });
    await user.save();

    res.status(201).json({ 
      success: true, 
      message: 'Account created successfully. You can now login.',
      user: { name: user.name, phone: user.phone, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during registration.', error: error.message });
  }
};

/**
 * Mock Send OTP
 */
export const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required.' });
    }

    // Check if user exists
    const user = await User.findOne({ phone });
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please create an account first.' });
    }

    // In a real app, generate OTP and send via SMS
    const mockOtp = '123456';
    user.otp = mockOtp;
    await user.save();

    res.status(200).json({ 
      success: true, 
      message: `OTP sent to ${phone}. (Mock: ${mockOtp})`,
      testOtp: mockOtp // For easy testing
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during OTP request.', error: error.message });
  }
};

/**
 * Verify OTP
 */
export const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: 'Phone and OTP are required.' });
    }

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Simple hardcoded check for user provided OTP '123456'
    if (otp === '123456' || user.otp === otp) {
      // Clear OTP after use
      user.otp = undefined;
      await user.save();

      res.status(200).json({ 
        success: true, 
        message: 'Login successful!',
        token: 'mock-jwt-token-for-demo',
        user: { name: user.name, phone: user.phone, email: user.email }
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during verification.', error: error.message });
  }
};
