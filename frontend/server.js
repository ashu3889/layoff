const express = require('express');
const app = express();
const PORT = process.env.PORT || 80;

app.get('/', (req, res) => {
  res.send('<h1>Hello from Frontend Container!</h1><p>API URL is: ' + process.env.API_URL + '</p>');
});

app.listen(PORT, () => {
  console.log(`Frontend running on port ${PORT}`);
});