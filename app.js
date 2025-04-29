const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const uploadRoute = require('./routes/upload');

const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://research-frontend-two.vercel.app', 
    methods: ['GET', 'POST'],
    credentials: true,
  }));
  
  
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', uploadRoute);
app.get('/zaid',(req,res)=>{
    res.send({message:"hello it live"});

})

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
