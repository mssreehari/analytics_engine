const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const trackRoutes = require('./routes/trackRoutes');
const statsRoutes = require('./routes/statsRoutes');


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/track', trackRoutes);


app.use('/stats', statsRoutes);

// DB Connection
require('./config/db')();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
