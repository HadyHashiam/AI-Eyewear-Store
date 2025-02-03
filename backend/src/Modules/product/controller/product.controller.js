
const handlerFactory = require('../../handlersFactory');
const ApiError = require('../../../../utils/apiError');
const Product = require('../../../../models/product.Model');
const asyncHandler = require('express-async-handler');


exports.CreateProduct = handlerFactory.createOne(Product);


exports.GetALLProducts = asyncHandler(async (req, res, next) => {
  try {
    await handlerFactory.getAll(Product, "Products")(req, res, next);  // Call handler directly to fetch products and pagination data
    const { documents, paginationResult } = req;  // Extract documents and pagination data from req\    console.log(products)
    const sortedDocuments = documents.sort((a, b) => a.code - b.code);
    res.status(200).json({
      status: 'success',
      results: sortedDocuments.length,
      paginationResult,
      products: sortedDocuments,
    });
  } catch (err) {
    console.log(err);
    next(new ApiError('Failed to retrieve home data', 500));
  }
});


// Get a single Product
exports.GetSingleProduct = handlerFactory.getOne(Product);

// Update an Product
exports.UpdateProduct = asyncHandler(async (req, res, next) => {
  req.body.UpdatedBy = req.user._id;

  const Checkexist = await Product.findOne({
    name: req.body.name,
    _id: { $ne: req.params.id }
  });

  if (Checkexist) {
    return next(new ApiError(`Name of Product already exists`, 400));
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  if (!updatedProduct) {
    return next(new ApiError(`No Product found for this id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Product by id: ${req.params.id} Updated Successfully`,
    data: updatedProduct
  });
});


// Delete an Product
exports.DeleteProduct = asyncHandler(async (req, res, next) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id);

  if (!deletedProduct) {
    return next(new ApiError(`No Product  found for this id ${req.params.id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Product by id: ${req.params.id} Deleted Successfully`,
    data: deletedProduct
  });
});


