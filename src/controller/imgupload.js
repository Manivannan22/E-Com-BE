const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const { connect } = require('http2');

// const app = express();
// const port = 3000;
    
mongoose.connect('mongoose: //localhost:5000/imageUploadDB', {
  useNewUrlParser: true,
  useUndifiedTopology: true,
});
const db = mongoose.Connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const imageSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    mimeType: String,
    size: String,
    imagePath: String,
});

const Image = mongoose.model('image', imageSchema);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  try {
    const newImage = new Image ({
        filename: req.file.filename,
        originalName: req.file.originalname,
        mimeType: req.file.mimetype,
        size: req.file.size,
        imagePath: req.file.path,
    });

    await newImage.save();

    res.send('File uploaded!');
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Error uploading image');
  }

//   const imagePath = req.file.path;
//   console.log('Image uploaded:', imagePath);

//   res.send('File uploaded!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
