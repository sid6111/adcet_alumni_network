const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const Resource = require('../models/Resource');

// @route   GET /api/resources
// @desc    Get all resources
// @access  Public
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 }).populate('createdBy', 'name email');
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/resources/:id
// @desc    Get resource by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('createdBy', 'name email');
    
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }
    
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(500).send('Server error');
  }
});

// @route   POST /api/resources
// @desc    Create a resource
// @access  Private
router.post('/', protect, async (req, res) => {
  const { title, description, category, link, isFeatured } = req.body;

  try {
    const newResource = new Resource({
      title,
      description,
      category,
      link,
      isFeatured,
      createdBy: req.user.id
    });

    const resource = await newResource.save();
    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/resources/:id
// @desc    Update a resource
// @access  Private
router.put('/:id', protect, async (req, res) => {
  const { title, description, category, link, isFeatured } = req.body;

  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Make sure user is resource creator or admin
    if (resource.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, category, link, isFeatured } },
      { new: true }
    );

    res.json(resource);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE /api/resources/:id
// @desc    Delete a resource
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    // Make sure user is resource creator or admin
    if (resource.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await resource.remove();
    res.json({ message: 'Resource removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Resource not found' });
    }
    res.status(500).send('Server error');
  }
});

module.exports = router;