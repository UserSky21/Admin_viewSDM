const express = require('express');
const cors = require('cors');
const {Details} = require('./model'); // Adjust the path as necessary

const app = express();      
const PORT = 5000;
app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string

// API endpoint to get data
app.get('/alldata', async (req, res) => {
  try {
    const users = await Details.find();
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data'+ err.message });
  }
});

app.get('/specificdata', async (req, res) => {
    const type = req.query.type; // Get the type from query parameters
  try {
    const users = await Details.find({ service: type });
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data'+ err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});