const fs = require('fs');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// Load models
const Items = require('./models/Items');

// Connect to DB
mongoose.connect(keys.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const items = JSON.parse(fs.readFileSync(`${__dirname}/_data/items.json`, 'utf-8'));

// Import Data into DB
const importData = async () => {
  try {
    await Items.create(items);

    console.log('Data Imported...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await Items.deleteMany();

    console.log('Data Destroyed...');
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
