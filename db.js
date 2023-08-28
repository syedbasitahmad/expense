const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env

const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Handle connection errors
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Connection successful
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;
