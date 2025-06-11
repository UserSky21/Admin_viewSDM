// Mock data for client requests
const mockClientRequests = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    serviceType: 'Web Development',
    message: 'I need a new e-commerce website for my business.',
    timestamp: '2023-07-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Alice Smith',
    email: 'alice@example.com',
    phone: '+1 (555) 234-5678',
    serviceType: 'Cybersecurity',
    message: 'Looking for a security audit for our systems.',
    timestamp: '2023-07-14T09:15:00Z',
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    phone: '+1 (555) 345-6789',
    serviceType: 'Machine Learning',
    message: 'We need an ML solution for data classification.',
    timestamp: '2023-07-13T14:45:00Z',
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '+1 (555) 456-7890',
    serviceType: 'Web Development',
    message: 'I need a portfolio website for my photography business.',
    timestamp: '2023-07-12T11:20:00Z',
  },
  {
    id: '5',
    name: 'Michael Wilson',
    email: 'michael@example.com',
    phone: '+1 (555) 567-8901',
    serviceType: 'Cybersecurity',
    message: 'Need help with implementing zero trust architecture.',
    timestamp: '2023-07-11T16:30:00Z',
  },
  {
    id: '6',
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    phone: '+1 (555) 678-9012',
    serviceType: 'Machine Learning',
    message: 'Looking for a recommendation system for our e-commerce platform.',
    timestamp: '2023-07-10T13:10:00Z',
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock function to get client requests
 export const getClientRequests = async () => {
  try {
    const response = await fetch('http://localhost:5000/alldata'); // Adjust port if needed

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // This will be an array of users

    // You can now use this data in your frontend state, UI, etc.
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

