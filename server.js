const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static('public'));

app.post('/upload', (req, res) => {
  const imgData = req.body.image.replace(/^data:image\/png;base64,/, "");
  const fileName = `uploads/${Date.now()}.png`;
  fs.writeFileSync(fileName, imgData, 'base64');
  console.log("Gambar disimpan:", fileName);
  res.send('OK');
});

app.listen(3000, () => {
  console.log('Server aktif di http://localhost:3000');
});
