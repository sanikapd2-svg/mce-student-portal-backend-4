const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const achievementRoutes = require('./routes/achievements');

// Import middleware
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
<<<<<<< HEAD
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
=======
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

<<<<<<< HEAD
// CORS configuration
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:5173'],
=======
// ✅ Dynamic CORS (Render + Vercel + localhost)
const allowedOrigins = [
  'http://localhost:8080',
  'http://localhost:5173',
  process.env.FRONTEND_URL // e.g. https://mce-portal.vercel.app
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MCE Student Portal API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/achievements', achievementRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

<<<<<<< HEAD
// Error handling middleware (must be last)
=======
// Error handling middleware
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
<<<<<<< HEAD
    const conn = await mongoose.connect(process.env.MONGODB_URI);
=======
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5003;

const startServer = async () => {
  await connectDB();
<<<<<<< HEAD
  
=======
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📚 MCE Student Portal API ready for students!`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  });
};

<<<<<<< HEAD
// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
=======
// Handle unhandled errors
process.on('unhandledRejection', (err) => {
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
  console.log('Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

<<<<<<< HEAD
// Handle uncaught exceptions
=======
>>>>>>> 4196db086f90d65e153c57dc43a3f59383bc6702
process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception:', err.message);
  process.exit(1);
});

startServer();

module.exports = app;
