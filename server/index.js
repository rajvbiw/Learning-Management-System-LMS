const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const { sequelize } = require('./models');
const apiRoutes = require('./routes/api');

const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Serve Static Files in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html'));
  });
}

// Database connection and Server start
sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    // In production, you might not want to sync every time
    // But for development, it helps ensure schema matches models
    // sequelize.sync(); 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
