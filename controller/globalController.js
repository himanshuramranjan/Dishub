const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');
const AppFeatures = require('../utils/AppFeatures');

// Get All the docs
exports.getAll = Model => catchAsyncError(async (req, res, next) => {

    // apply the app features to get the desired o/p
    const features = new AppFeatures(Model, req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    
    const docs = await features.query;

    res.status(200).json({
        status: 'Success',
        result: docs.length,
        data: {
            docs
        }
    });
});

// Get a single doc
exports.getOne = Model => catchAsyncError(async (req, res, next) => {
    
    const doc = await Model.findById(req.params.id);

    if(!doc) {
        return next(new AppError(`No doc w/ Id: ${req.params.id} exist`, 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            doc
        }
    });
});

// Create a new doc
exports.createOne = Model => catchAsyncError(async (req, res, next) => {

    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: {
            doc
        }
    });
});

// Update the doc
exports.updateOne = Model => catchAsyncError(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if(!doc) {
        return next(new AppError(`No Doc w/ Id: ${req.params.id} exist`, 404));
    }

    res.status(200).json({
        status: 'Success',
        data: {
            doc
        }
    });
});

// Delete the doc
exports.deleteOne = Model => catchAsyncError(async (req, res, next) => {
    
    const doc = await Model.findByIdAndDelete(req.params.id);

    if(!doc) {
        return next(new AppError(`No Doc w/ Id: ${req.params.id} exist`, 404));
    }

    res.status(204).json({
        status: 'Success',
        message: 'Doc Deleted Successfully'
    });
});


