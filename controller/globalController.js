const catchAsyncError = require('../utils/catchAsyncError');
const AppError = require('../utils/AppError');
const AppFeatures = require('../utils/AppFeatures');

// add Params to the req body
exports.addParams = (req, res, next) => {
    
    // add postId to the req.body of creating comment
    if(req.params.postId) req.body.post = req.params.postId;

    // add Logged In creator to the req body
    req.body.creator = req.creator.id;

    next();
}

// get All the docs
exports.getAll = Model => catchAsyncError(async (req, res, next) => {

    // filters out comments for a given post
    let filter = {};
    if(req.params.postId) filter = { post : req.params.postId};

    // apply the app features to get the desired o/p
    const features = new AppFeatures(Model.find(filter), req.query)
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

// get a single doc
exports.getOne = (Model, populateOpt) => catchAsyncError(async (req, res, next) => {
    
    let query = Model.findById(req.params.id);

    // check if virutal field need to be populated
    if(populateOpt) query.populate(populateOpt);

    const doc = await query;

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

// create a new doc
exports.createOne = Model => catchAsyncError(async (req, res, next) => {

    const doc = await Model.create(req.body);

    res.status(201).json({
        status: 'Success',
        data: {
            doc
        }
    });
});

// update the doc
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

// delete the doc
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


