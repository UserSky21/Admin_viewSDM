// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock function to get client requests
 export const getClientRequests = async () => {
  try {
    const response = await fetch('https://admin-view-sdm.vercel.app/alldata'); // Adjust port if needed

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

