const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();const app = express();
const signupRoute = require('./routes/signup')
const loginRoute = require('./routes/login')

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
app.use(cors())
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => console.log('Server started'));

mongoose.connect(MONGODB_URI)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));
// app.use('/', propertyRoutes);
// app.use('/', userRoutes);
// app.use((req, res, next) => {
//   console.log('Headers:', req.headers);
//   next();
// });
app.use('/', signupRoute);
app.use('/', loginRoute);