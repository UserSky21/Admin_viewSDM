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



// API endpoint to get data
app.get('/alldata', async (req, res) => {
  try {
    const users = await Details.find();
    res.json(users);

  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch data'+ err.message });
  }
});


// New endpoint for exporting data
app.get('/export-data', async (req, res) => {
  try {
    const { interval } = req.query; // 'daily', 'weekly', or 'monthly'
    const now = new Date();
    let startDate;

    // Calculate start date based on interval
    switch (interval) {
      case 'daily':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'weekly':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'monthly':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      default:
        startDate = new Date(0); // All time
    }

    const data = await Details.find({
      requestDate: { $gte: startDate }
    });

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=export-${interval}-${new Date().toISOString().split('T')[0]}.csv`);

    // Create CSV content
    const csvContent = [
      // Headers
      ['Name', 'Email', 'Phone', 'Service', 'Message', 'Request Date'].join(','),
      // Data rows
      ...data.map(item => [
        `"${item.name}"`,
        `"${item.email}"`,
        `"${item.number}"`,
        `"${item.service}"`,
        `"${item.message.replace(/"/g, '""')}"`,
        `"${new Date(item.requestDate).toISOString()}"`
      ].join(','))
    ].join('\n');

    res.send(csvContent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to export data: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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
