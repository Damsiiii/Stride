const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema({
  src: {
    type: String,
    required: [true, 'Image source URL is required'],
    trim: true,
  },
  alt: {
    type: String,
    required: [true, 'Alternative text is required'],
    trim: true,
  },
  caption: {
    type: String,
    required: [true, 'Caption is required'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true,
  },
  aspect: {
    type: String,
    default: 'aspect-square',
    enum: ['aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[16/9]'],
  },
  order: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
