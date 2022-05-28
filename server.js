const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true })); // parses the request body.
app.use(express.json()); // allows a json object to be configured to be used in express
app.use(express.static('./Develop/public')); 

app.use('/api' ,apiRoutes);
app.use('/' ,htmlRoutes);

app.listen(PORT, function() {
    console.log(`App is listening on PORT: ${PORT}`);
});