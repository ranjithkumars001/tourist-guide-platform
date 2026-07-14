require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const seedDestinations = require('./config/seeder');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // Connect to database
  await connectDB();

  // Seed default travel destinations
  await seedDestinations();

  // Start listening
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
};

startServer();
