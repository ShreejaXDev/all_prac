const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connStr = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    console.log(`Connecting to MongoDB at: ${connStr.replace(/:([^:@]+)@/, ':****@')}`);
    const conn = await mongoose.connect(connStr);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    // Do not terminate server immediately so in-memory fallbacks / diagnostics remain available if offline
  }
};

module.exports = connectDB;
