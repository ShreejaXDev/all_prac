const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const loggerMiddleware = require('./middleware/logger');
const validateContentType = require('./middleware/validateContentType');
const { authMiddleware } = require('./middleware/auth');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandler');

const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');

// Load Environment Variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Enable CORS for frontend communication
app.use(cors());

// 2. Body Parser Middleware
app.use(express.json());

// 3. Custom Request Logging Middleware (Practical 4 requirement)
app.use(loggerMiddleware);

// 4. Content-Type Header Validation Middleware for POST/PUT (Practical 4 requirement)
app.use(validateContentType);

// 5. Auth Middleware (Extracts JWT token if present)
app.use(authMiddleware);

// 6. Define REST API Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Base route test
app.get('/', (req, res) => {
  res.json({
    message: 'ITUE301 Advanced Web Development Frameworks - Task Manager REST API Server',
    status: 'Running',
    endpoints: ['/api/tasks', '/api/auth/register', '/api/auth/login', '/api/auth/me']
  });
});

// 7. Undefined Route 404 Handler
app.use(notFoundHandler);

// 8. Global Error Handling Middleware (MUST BE DEFINED LAST IN PIPELINE)
app.use(globalErrorHandler);

// Connect to MongoDB Atlas and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 Express REST Server running on http://localhost:${PORT}`);
    console.log(`====================================================`);
  });
});

module.exports = app;
