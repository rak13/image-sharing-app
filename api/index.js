const express = require('express');
const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors')

dotenv.config();

// Import Auth Route
const authRoute = require('./routes/auth');

// Import User Route
const userRoute = require('./routes/users');

// Import Post Route
const postRoute = require('./routes/posts');


mongoose.connect(process.env.MONGO_URL, () => {
  console.log('Connected to MongoDB');
})

app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

// Mount Routes to paths
app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);


// Multer
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: imgStorage });

// Upload image to server and save to MongoDB database 
app.post('/api/upload', upload.single('file'), (req, res) => {
  try {
    return res.status(200).json('File uploaded!!!');
  } catch (error) {
    console.log(error);
  }
});


app.get('/gg', (req, res) => {
  try {
    return res.status(200).json('Yay!!!');
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 8800;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;