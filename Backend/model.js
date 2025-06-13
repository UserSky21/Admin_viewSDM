const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://SDM:SDM123@cluster0.itxap30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Configure mongoose options
mongoose.set('strictQuery', false);

// Connect to MongoDB with improved error handling
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit process with failure
  }
};

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Connect to database
connectDB();

// Define schema and model
const details = new mongoose.Schema({
  name: String,
  email: String,
  number: String,
  service: String,
  message: String,
  requestDate: {
    type: Date,
    default: Date.now
  }
});

const Details = mongoose.model('Details', details);

module.exports = { Details };


