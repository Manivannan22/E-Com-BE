// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const { v4: uuidv4 } = require('uuid');
// const db = require('./db'); 



// // Multer configuration for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads'); 
//   },
//   filename: (req, file, cb) => {
//     const extension = path.extname(file.originalname);
//     const filename = uuidv4() + extension; 
//     cb(null, filename);
//   }
// });

// const upload = multer({ storage });

// // Endpoint to handle file upload
// app.post('/upload', upload.single('image'), (req, res) => {
//   try {
//     const imagePath = req.file.path;
//     // Save imagePath to database
//     db.saveImagePath(imagePath); 
//     res.status(200).json({ message: 'Image uploaded successfully', imagePath });
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     res.status(500).json({ message: 'Failed to upload image' });
//   }
// });

