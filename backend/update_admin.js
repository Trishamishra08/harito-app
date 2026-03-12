import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI;

// Import models using the project's structure if possible, or define simply
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
}, { collection: 'users' });

const settingsSchema = new mongoose.Schema({
  key: String,
  value: mongoose.Schema.Types.Mixed
}, { collection: 'settings' });

const User = mongoose.model('User', userSchema);
const Settings = mongoose.model('Settings', settingsSchema);

async function run() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');

    const users = await User.find({});
    console.log('--- Users ---');
    users.forEach(u => console.log(`Name: ${u.name}, Email: ${u.email}, Password: ${u.password}`));

    const settings = await Settings.find({});
    console.log('\n--- Settings ---');
    settings.forEach(s => console.log(`${s.key}: ${s.value}`));

    // Now let's try to update them specifically
    console.log('\nUpdating...');
    
    // Update the user with your email to admin@gmail.com
    const res1 = await User.updateMany(
      { email: 'trishamishra@gmail.com' },
      { $set: { email: 'admin@gmail.com', password: 'admin123' } }
    );
    console.log(`Updated users: ${res1.modifiedCount}`);

    // Update the settings key
    const res2 = await Settings.updateOne(
      { key: 'adminEmail' },
      { $set: { value: 'admin@gmail.com' } },
      { upsert: true }
    );
    console.log(`Updated settings key 'adminEmail': ${res2.modifiedCount || res2.upsertedCount ? 'YES' : 'No change'}`);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
