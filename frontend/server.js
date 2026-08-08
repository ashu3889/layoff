const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 80;

// The backend URL using Docker's internal network DNS name
const BACKEND_URL = process.env.API_URL || 'http://backend:4000';

app.get('/', async (req, res) => {
  try {
    // Attempting to talk to the backend container
    const response = await fetch(BACKEND_URL);
    const backendData = await response.text();
    
    res.send(`
      <h1>Frontend Container</h1>
      <p>Successfully communicated with Backend!</p>
      <div style="background: #f4f4f4; padding: 10px; border-left: 4px solid green;">
        <strong>Backend Response:</strong> ${backendData}
      </div>
    `);
  } catch (error) {
    res.send(`
      <h1>Frontend Container</h1>
      <p style="color: red;">Failed to communicate with backend at ${BACKEND_URL}</p>
      <pre>${error.message}</pre>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}, targeting backend at ${BACKEND_URL}`);
});