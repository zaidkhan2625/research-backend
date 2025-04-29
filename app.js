const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uploadRoute = require('./routes/upload');
const Company = require('./models/Company');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000', 'https://your-frontend-url.com'],
    methods: ['GET', 'POST'],
    credentials: true,
  }));
  
const url="mongodb+srv://zaidkhan262523:1234Khan@cluster0.ewljkrr.mongodb.net/research";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected successfully'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

app.use('/api', uploadRoute);
app.get('/zaid',async(req,res)=>{
    res.send({message:"hello it live"});

})

app.listen(3002, () => console.log(`Server running on port 3002`));
