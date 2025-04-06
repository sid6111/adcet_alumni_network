const User = require('../models/User');

// Get all alumni
exports.getAllAlumni = async (req, res, next) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete queryObj[el]);

    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    let query = User.find(JSON.parse(queryStr)).select('-password');

    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    // Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const alumni = await query;
    const total = await User.countDocuments(JSON.parse(queryStr));

    res.status(200).json({
      success: true,
      count: alumni.length,
      total,
      data: alumni
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Get single alumni
exports.getAlumni = async (req, res, next) => {
  try {
    const alumni = await User.findById(req.params.id).select('-password');
    if (!alumni) {
      return res.status(404).json({
        success: false,
        message: 'Alumni not found'
      });
    }

    res.status(200).json({
      success: true,
      data: alumni
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};

// Update alumni profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, graduationYear, course, job, location, bio } = req.body;
    
    const updatedProfile = {
      name,
      graduationYear,
      course,
      job,
      location,
      bio
    };

    if (req.file) {
      updatedProfile.photo = req.file.filename;
    }

    const alumni = await User.findByIdAndUpdate(req.user.id, updatedProfile, {
      new: true,
      runValidators: true
    }).select('-password');

    res.status(200).json({
      success: true,
      data: alumni
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: err.message
    });
  }
};