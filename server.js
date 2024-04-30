const express = require('express');
const app = express();
const upload = require('./upload');
const download = require('./download');

app.use('/upload', upload);
app.use('/download', download);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
