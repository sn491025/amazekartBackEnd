const express = require('express');
const app = express();
const unless = require('express-unless');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;
const ProductModel = require('./model/productModel');
const auth = '';
const error = '';

// auth.authenticateToken.unless = unless;

// app.use(
//     auth.authenticateToken.unless({
//         path: [
//             { url: "/auth/signin", methods: ["POST"] },
//             { url: "/auth/signup", methods: ["POST"] },
//         ],
//     })
// );

app.use(express.json());

// app.use(errors.errorHandler);


// get Products from mongodb using get call
app.get('/products', async (req, res) => {
    try {
        const getAllProduct = await ProductModel.find({});
        res.status(200).json(getAllProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
});

// get particular product from mongodb using productID
app.get('/product/:id', async (req, res) => {
    try {
        const getProductById = await ProductModel.findById(req.params.id);
        res.status(200).json(getProductById);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
})


//  create product And save data to mongodb using post call 
app.post('/createProduct', async (req, res) => {

    try {
        const product = await ProductModel.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error })
    }

});


// update product to mongodb using patch call 
app.patch('/product/:id', async (req, res) => {
    try {
        const updateProductById = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
        if (!updateProductById) return res.status(404).json({ message: `can not find any product with this ID ${req.params.id}` });

        const updatedProduct = await ProductModel.findById(req.params.id);
        res.status(201).json(updatedProduct);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
})



// delect product in mongodb using product id 
app.delete('/product/:id', async (req, res) => {
    try {
        const deleteProductById = await ProductModel.findByIdAndDelete(req.params.id, req.body);
        if (!deleteProductById) return res.status(404).json({ message: `can not find any product with this ID ${req.params.id}` });

        // const Product = await ProductModel.findById(req.params.id);
        res.status(200).json({ message: 'successfully deleted the product' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
})







mongoose.connect('mongodb+srv://amazekart:amazekart491025@amazekartcluster.lgwncn0.mongodb.net/authentication?retryWrites=true&w=majority')
    .then(() => {
        console.log('connect to mongoose');
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })

