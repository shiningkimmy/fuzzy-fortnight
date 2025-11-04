require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// DITO TAWAGIN YUNG MGA ROUTE FILES
//SAMPLE const authRoutes = require('./router/authRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

const { MONGO_URI, MONGO_DB_NAME, JWT_SECRET, JWT_EXPIRATION, PORT } = process.env;

if (!MONGO_URI || !MONGO_DB_NAME || !JWT_SECRET || !JWT_EXPIRATION) {
  console.error("Missing required environment variables.");
  process.exit(1); 
}

console.log(`JWT Secret: ${JWT_SECRET ? 'Loaded' : 'Not Loaded'}`);
console.log(`JWT Expiration: ${JWT_EXPIRATION ? 'Loaded' : 'Not Loaded'}`);

const connectDB = async () => {
  try {
  
    const connectOptions = {
      dbName: MONGO_DB_NAME, 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    
    await mongoose.connect(MONGO_URI, connectOptions);
    console.log('MongoDB Connected Successfully!');
    console.log(`Connected to database: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
 
}));
app.use(express.json({ limit: '10mb' })); // parse JSON bodies with size limit
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// DITO MAG REGISTER NG ROUTES
// SAMPLE app.use('/api/users', require('./routes/userRoutes'));

app.use('/auth', authRoutes);

app.get('/test', (req, res) => {
  if (mongoose.connection.readyState === 1) { // 1 means connected
    res.send('Server is running and MongoDB is connected!');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
  } else {
    res.status(500).send('Server is running, but MongoDB is not connected.');
    console.log('MongoDB connection state:', mongoose.connection.readyState);
  }
});

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const gracefulShutdown = async (signal) => {
  console.log(`${signal} received, closing MongoDB connection...`);
  await mongoose.connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0); // Exit process cleanly
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));