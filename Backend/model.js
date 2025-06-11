const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb+srv://SDM:SDM123@cluster0.itxap30.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema and model
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


