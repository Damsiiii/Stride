const express = require('express');
const GalleryItem = require('../models/GalleryItem');

const router = express.Router();

// Get all gallery items (ordered)
router.get('/', async (req, res) => {
  try {
    const { all } = req.query;
    // If 'all=true' is passed, fetch inactive ones too (for admin), otherwise only active ones
    const filter = all === 'true' ? {} : { isActive: true };
    const items = await GalleryItem.find(filter).sort({ order: 1, createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single gallery item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new gallery item
router.post('/', async (req, res) => {
  const item = new GalleryItem(req.body);
  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a gallery item
router.put('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a gallery item
router.delete('/:id', async (req, res) => {
  try {
    const item = await GalleryItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Gallery item not found' });
    }
    res.json({ message: 'Gallery item deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
