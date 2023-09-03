const express = require('express');
const cors = require('cors');

// Add http headers, small layer of security
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5050;

// Require .env files for environment variables
require('dotenv').config();

// Enable req.body middleware
app.use(express.json());

// Initialize HTTP Headers middleware
app.use(helmet());

// Enable CORS 
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

const userRoutes = require("./routes/users");
const chartsRoutes = require('./routes/charts');
const logsRoutes = require('./routes/logs');

// Routes
app.use('/users', userRoutes);
app.use('/charts', chartsRoutes);
app.use('/logs', logsRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});