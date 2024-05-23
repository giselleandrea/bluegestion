import { Request, Response } from 'express';
import { Product } from '../entities/Product';
import { Category } from '../entities/Category';

const createProduct = async (req: Request, res: Response) => {
    try {
        const {
            nameProduct,
            referenceProduct,
            amountProduct,
            description,
            stock,
            categoryId
        } = req.body;

        // Verificar si el producto ya existe
        const existingProduct = await Product.findOne({ 
            where: { nameProduct: nameProduct } 
        });
        if (existingProduct) {
            return res.status(400).json({ message: 'El Producto ya está en registrado' });
        }

        const newproduct = new Product();
        newproduct.nameProduct = nameProduct;
        newproduct.referenceProduct = referenceProduct;
        newproduct.amountProduct = amountProduct;
        newproduct.description = description;
        newproduct.stock = stock;
        newproduct.category = categoryId;
        await newproduct.save();

        console.log("Created successfully :3");
        res.status(201).json({ 
            success: true,
            message: 'Producto creado correctamente', 
            data: newproduct
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const {
            product_id,
            nameProduct,
            referenceProduct,
            amountProduct,
            description,
            stock,
            categoryId
        } = req.body;

        const existingProduct = await Product.findOne({ 
            where: { id: product_id }
        });

        if (existingProduct) {
            existingProduct.nameProduct = nameProduct;
            existingProduct.referenceProduct = referenceProduct;
            existingProduct.amountProduct = amountProduct;
            existingProduct.description = description;
            existingProduct.stock = stock;
            existingProduct.category = categoryId
            await existingProduct.save();

            console.log("Update successfully :3");
            res.status(201).json({ 
                success: true,
                message: 'Producto creado correctamente', 
                data: existingProduct
            });
        } else {
            res.status(400).json({
                success: true,
                message: "No existe product_id" 
            });    
        };
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getProduct = async (req: Request, res: Response) => {
    try {
        const product_id = parseInt(req.params.product_id); 
        
        const existingProduct = await Product.findOne({
            where: {id: product_id}
        });

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Not found for the specified product_id',
            });
        } else {
            res.status(200).json({
                success: true,
                data: existingProduct,
            }); 
        }; 
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getProducts = async (req: Request, res:Response) => {
    try {
        const allProducts = await Product.find({
            relations: ['category']
        });

        if (allProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Products found in the database',
            });
        }

        res.status(200).json({
            success: true,
            data: allProducts,
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getCategories = async (req: Request, res: Response) => {
    try {
        const allCategories = await Category.find({
            relations: ['category']
        });

        if (allCategories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Categories found in the database',
            });
        }

        res.status(200).json({
            success: true,
            data: allCategories,
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
}

export default {
    createProduct,
    updateProduct,
    getProduct,
    getProducts,
    getCategories
};
