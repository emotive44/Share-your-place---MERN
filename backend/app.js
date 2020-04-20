const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');
 
const port = 5000;
const app = express();

app.use('/api/places' ,placesRoutes);


app.listen(port, () => { console.log(`listen on port: ${port}`) });