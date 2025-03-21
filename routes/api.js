
const express = require('express');
const router = express.Router();
const Entry = require('../models/Entry');

// GET all entries
router.get('/entries', async (req, res, next) => {
  try {
    const entries = await Entry.find().sort({ createdAt: -1 });
    res.status(200).json(entries);
  } catch (error) {
    next(error);
  }
});

// POST new entry
router.post('/entries', async (req, res, next) => {
  try {
    const newEntry = new Entry({
      timestamp: req.body.timestamp || new Date(),
      description: req.body.description || 'No description provided'
    });

    const savedEntry = await newEntry.save();
    
    res.status(201).json({
      success: true,
      message: 'Entry added successfully',
      id: savedEntry._id,
      entry: savedEntry
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
