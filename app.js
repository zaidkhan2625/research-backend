const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uploadRoute = require('./routes/upload');
const Company = require('./models/Company');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3001', 'https://your-frontend-url.com'],
    methods: ['GET', 'POST'],
    credentials: true,
  }));
  
const url="mongodb+srv://zaidkhan262523:1234Khan@cluster0.ewljkrr.mongodb.net/research";
mongoose.connect(url);

app.use('/api', uploadRoute);
app.get('/zaid',async(req,res)=>{
    res.send({message:"hello it live"});

})

app.listen(3002, () => console.log(`Server running on port 3002`));
