import mongoose from 'mongoose';

export async function connectDB() {
  if (!process.env.MONGO_URI) {
    console.error(
      '\n✖ MONGO_URI is not set. Copy server/.env.example to server/.env and add your MongoDB connection string.\n'
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✔ MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`✖ MongoDB connection failed: ${err.message}`);
    process.exit(1);
  }
}
