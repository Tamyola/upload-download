require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/upldwn');

app.use('/upload', require('./routes/upload'));
app.use('/download', require('./routes/download'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

