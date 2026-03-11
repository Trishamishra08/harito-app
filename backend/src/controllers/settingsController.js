import Settings from '../models/Settings.js';

export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.find({});
    const settingsMap = {};
    settings.forEach(s => {
      settingsMap[s.key] = s.value;
    });
    res.status(200).json(settingsMap);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching settings', error: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const updates = req.body; // e.g., { siteName: "New Name", adminEmail: "new@email.com" }
    
    const promises = Object.entries(updates).map(([key, value]) => {
      return Settings.findOneAndUpdate(
        { key },
        { value },
        { upsert: true, new: true }
      );
    });
    
    await Promise.all(promises);
    res.status(200).json({ success: true, message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating settings', error: error.message });
  }
};
