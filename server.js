const express = require('express');

const morgan = require('morgan');

const dotenv = require('dotenv');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');

// Route files
const test = require('./routes/test');
const ingredient = require('./routes/ingredient');


// Load env vars
dotenv.config({ path: './config/config.env' });

// Database Connection
connectDB();

const app = express();

app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

// Mount routers
app.use('/api/v2/test', test);
app.use('/api/v2/ingredient', ingredient);

// Error handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});

// Handle Unhandled rejections
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});