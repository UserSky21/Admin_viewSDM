const express = require('express');
const cors = require('cors');
const {Details} = require('./model'); // Adjust the path as necessary

const app = express();      
const PORT = 5000;

// Configure CORS and CSP headers
app.use(cors());
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://admin-view-sdm.vercel.app http://localhost:5000"
  );
  next();
});

app.use(express.json());

// Replace with your MongoDB connection string

// API endpoint to get data
app.get('/alldata', async (req, res) => {
  try {
    const users = await Details.find();
    res.json(users);
  } catch (err) {
    console.error('Error fetching all data:', err);
    res.status(500).json({ error: 'Failed to fetch data: ' + err.message });
  }
});

app.get('/specificdata', async (req, res) => {
  const type = req.query.type;
  try {
    const users = await Details.find({ service: type });
    res.json(users);
  } catch (err) {
    console.error('Error fetching specific data:', err);
    res.status(500).json({ error: 'Failed to fetch data: ' + err.message });
  }
});

// Endpoint for exporting data
app.get('/export-data', async (req, res) => {
  try {
    const { interval } = req.query;
    if (!interval || !['daily', 'weekly', 'monthly'].includes(interval)) {
      return res.status(400).json({ error: 'Invalid interval specified' });
    }

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
        startDate = new Date(0);
    }

    const data = await Details.find({
      requestDate: { $gte: startDate }
    });

    if (!data || data.length === 0) {
      return res.status(404).json({ error: 'No data found for the specified interval' });
    }

    // Set headers for CSV download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=export-${interval}-${new Date().toISOString().split('T')[0]}.csv`);

    // Create CSV content
    const csvContent = [
      // Headers
      ['Name', 'Email', 'Phone', 'Service', 'Message', 'Request Date'].join(','),
      // Data rows
      ...data.map(item => [
        `"${(item.name || '').replace(/"/g, '""')}"`,
        `"${(item.email || '').replace(/"/g, '""')}"`,
        `"${(item.number || '').replace(/"/g, '""')}"`,
        `"${(item.service || '').replace(/"/g, '""')}"`,
        `"${(item.message || '').replace(/"/g, '""')}"`,
        `"${new Date(item.requestDate).toISOString()}"`
      ].join(','))
    ].join('\n');

    res.send(csvContent);
  } catch (err) {
    console.error('Export error:', err);
    res.status(500).json({ error: 'Failed to export data: ' + err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
