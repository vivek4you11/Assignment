const express = require('express');
const router = express.Router();

// Load Validation
const validateItemsInput = require('../validation/items');

// Load Items Model
const Items = require('../models/Items');

// @route   GET api/v1/items
// @desc    Get all form items
// @access  Public
router.get('/', async (req, res) => {
  try {
    let item = await Items.find({});
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json(err);
  }
});

// @route   POST api/v1/items
// @desc    Submit or edit user items
// @access  Public
router.post('/:id', async (req, res) => {
  const { errors, isValid } = validateItemsInput(req.body);

  if (!isValid) {
    errors.success = false;
    return res.status(400).json(errors);
  }

  const userFields = {};
  if (req.body.name) userFields.name = req.body.name;
  if (req.body.field) userFields.field = req.body.field;
  if (req.body.value) userFields.value = req.body.value;

  try {
    let item = await Items.findOneAndUpdate({ id: req.params.id }, { $set: userFields }, { new: true });
    if (!item) {
      errors.success = false;
      errors.message = 'Resource not found!';
      return res.status(400).json(errors);
    }
    res.status(200).json(item);
  } catch (err) {
    res.status(404).json(err);
  }
});

module.exports = router;
