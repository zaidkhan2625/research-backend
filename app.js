const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uploadRoute = require('./routes/upload');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001', 'https://your-frontend.vercel.app']
  }));
  
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', uploadRoute);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
