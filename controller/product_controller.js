const ProductModel = require('../model/productModel');


// get Products all from mongodb using get call
async function getAllProduct(req, res) {
    try {
        const getAllProduct = await ProductModel.find({});
        res.status(200).json(getAllProduct);
    } catch (error) {
        console.log(error);  
        res.status(500).json({ message: error });
    }
}


// get particular product from mongodb using productID
async function getProductById(req, res) {
    try {
        const getProductById = await ProductModel.findById(req.params.id);
        console.log(getProductById == null, 'nullllsss');

        if (getProductById == null) return res.sendStatus(400)

        return res.status(200).json(getProductById);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

//  create product And save data to mongodb using post call 
async function createProduct(req, res) {
    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

}

// update product to mongodb using patch call 
async function updateProduct(req, res) {
    try {
        const updateProductById = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
        if (!updateProductById) return res.status(404).json({ message: `can not find any product with this ID ${req.params.id}` });

        const updatedProduct = await ProductModel.findById(req.params.id);
        res.status(201).json(updatedProduct);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}

// delect product in mongodb using product id 
async function delectProduct(req, res) {
    try {
        const deleteProductById = await ProductModel.findByIdAndDelete(req.params.id, req.body);
        if (!deleteProductById) return res.status(404).json({ message: `can not find any product with this ID ${req.params.id}` });

        // const Product = await ProductModel.findById(req.params.id);
        res.status(200).json({ message: 'successfully deleted the product' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
}



module.exports = { getAllProduct, getProductById, createProduct, updateProduct, delectProduct }