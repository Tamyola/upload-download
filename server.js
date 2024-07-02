require('dotenv').config()
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const setupSwagger = require("./swagger")

const app = express();

setupSwagger(app);
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/upldwn');

app.use('/upload', require('./routes/upload'));
app.use('/download', require('./routes/download'));


const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Express API',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/ayo-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Swagger docs are available at http://localhost:4000/api-docs');
});

