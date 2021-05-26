const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//Init middleware
app.use(express.json({ extended: false }));

connectDB();

if(process.env.NODE_ENV !== 'production'){
  //Set static folder
  app.get('/', (req, res) => res.json({msg:'Welcome to the contact keeper app..'}));
}

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/logs', require('./routes/logs'));
app.use('/api/techs', require('./routes/techs'));
app.use('/api/auth', require('./routes/auth'));

//Serve static assets in production
if(process.env.NODE_ENV === 'production'){
  //Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'client', 'build')));
}

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => `Server started on port ${PORT}`);