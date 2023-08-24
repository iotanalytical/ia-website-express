const express = require('express');

// cors package prevents CORS errors when using client side API calls
const cors = require('cors');

// Add http headers, small layer of security
const helmet = require('helmet');

// Create Express app and also allow for app PORT to be optionally specified by an environment variable
const app = express();
const PORT = process.env.PORT || 8080;

// Require .env files for environment variables (keys and secrets)
require('dotenv').config();

// Enable req.body middleware
app.use(express.json());

// Initialize HTTP Headers middleware
app.use(helmet());

// Enable CORS (with additional config options required for cookies)
app.use(
  cors({
    origin: true,
    credentials: true
  })
);


const dataRoutes = require('./routes/data');

app.use('/api', dataRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});