const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config({ debug: false });
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const seedUsers = require('./seed/seedUsersProd');
const rateLimit = require('express-rate-limit');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');


const app = express();
const PORT = process.env.PORT;

app.set('trust proxy', 1);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(helmet());

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    message: 'Trop de tentatives de connexion, veuillez réessayer dans 10 minutes.',
    code: 'TOO_MANY_LOGIN_ATTEMPTS'
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/auth/login', loginLimiter);

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'API User Management',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});


app.use((err, req, res, next) => {
  console.error('❌ Express Error:', err);
  res.status(err.status || 500).json({
    message: process.env.NODE_ENV === 'production'
        ? 'Une erreur interne est survenue.'
        : err.message,
    error: process.env.NODE_ENV === 'production'
        ? undefined
        : err.stack
  });
});

// Démarrage serveur
async function connectMongoDB() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI not set in env');
    }
    await mongoose.connect(process.env.MONGODB_URI);
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    return false;
  }
}
async function startServer() {
  try {
    const mongoConnected = await connectMongoDB();
    if (!mongoConnected) process.exit(1);
    await seedUsers();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Server start error:', error.message);
    process.exit(1);
  }
}
startServer();