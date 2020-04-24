const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');
 
const port = 5000;
const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use('/api/places' ,placesRoutes);
app.use('/api/users', usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if(res.headerSent) { return next(error); }

  res.status(error.code || 500)
    .json({message: error.message || 'Unknown error occurred!'});
});

mongoose
  .connect('mongodb+srv://marko:LdXEDuUqB0Osiznj@cluster0-rjt6t.mongodb.net/mern?retryWrites=true&w=majority')
  .then(() => {
    app.listen(port, () => { console.log(`listen on port: ${port}`) }); 
  })
  .catch(error => console.log(error));