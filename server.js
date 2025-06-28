const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// storage config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(express.static('public'));

// upload endpoint
app.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file) return res.send('Upload gagal!');
  res.send(`Upload sukses! Disimpan sebagai: ${req.file.filename}`);
});

// route utama
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
