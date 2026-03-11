/**
 * Static Admin Credentials
 */
const STATIC_ADMIN = {
  email: 'admin@gmail.com',
  password: 'admin123',
  name: 'Harito Admin'
};

/**
 * Login with Static Credentials
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Check against static credentials
    if (email === STATIC_ADMIN.email && password === STATIC_ADMIN.password) {
      return res.status(200).json({ 
        success: true, 
        message: 'Login successful!',
        token: 'harito-static-token-' + Date.now(),
        user: { name: STATIC_ADMIN.name, email: STATIC_ADMIN.email }
      });
    } else {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error during login.', error: error.message });
  }
};

/**
 * Placeholder for registration (Disabled)
 */
export const register = async (req, res) => {
  res.status(403).json({ message: 'Registration is disabled. Use static credentials.' });
};

// Compatibility exports
export const sendOtp = login;
export const verifyOtp = login;
