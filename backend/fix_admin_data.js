import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

// Define Schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String
});

const settingsSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: mongoose.Schema.Types.Mixed
});

const User = mongoose.model('User', userSchema);
const Settings = mongoose.model('Settings', settingsSchema);

async function updateToAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB...');

    // 1. Update/Create the Admin User
    const adminUser = await User.findOneAndUpdate(
      { name: /admin/i }, // Look for any user with "admin" in name
      { 
        email: 'admin@gmail.com',
        password: 'admin123',
        name: 'HARITO ADMIN'
      },
      { upsert: true, new: true }
    );
    console.log('Admin User updated:', adminUser.email);

    // 2. Update the Portal Settings Email
    await Settings.findOneAndUpdate(
      { key: 'adminEmail' },
      { value: 'admin@gmail.com' },
      { upsert: true }
    );
    console.log('Portal Setting Email updated to admin@gmail.com');

    console.log('\nSUCCESS: Database is now synced with admin@gmail.com');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

updateToAdmin();
