const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const keys = require('./config/keys');

const itemsRoute = require('./routes/items');

const app = express();

app.use(express.json());
app.use(cors());

// Connect to DB
mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Versioning
let version = 'v1';

// Define routes
app.use(`/api/${version}/items`, itemsRoute);

// Error Hanlding
app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ message: error.message });
});

app.listen(keys.PORT, () => {
  console.log(`Express server listening on ${keys.PORT}`);
});
