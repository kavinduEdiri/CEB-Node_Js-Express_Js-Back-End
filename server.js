// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./router');
const port = 3057;
const host = '127.0.0.1';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB URI
const uri = 'mongodb+srv://dewminichamasha13:ztI8VXTHZyteUqm5@cluster0.zaeos6o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
};

// Connect to MongoDB
mongoose.connect(uri, options)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Use router
app.use('/api', router);

// Start server
app.listen(port, host, () => {
  console.log(`Server is running on port ${port}`);
});
