import { Request, Response } from 'express';
import { Order } from '../entities/Order';
import { OrderProduct } from '../entities/OrderProduct';
import { Product } from '../entities/Product';

const createOrder = async (req: Request, res: Response) => {
    try {
        const {
            referenceOrder,
            statusOrder,
            totalAmount,
            userId,
            customerId,
            productIds,
        } = req.body;

        /* ejemplo body
        {
            "referenceOrder": "tu_referencia",
            "statusOrder": "tu_estado",
            "totalAmount": 100.50,
            "userId": "id_del_usuario",
            "customerId": "id_del_cliente",
            "productIds": [
                {"productId": "id_del_producto_1", "cant": 3},
                {"productId": "id_del_producto_2", "cant": 2},
                {"productId": "id_del_producto_3", "cant": 1}
            ]
        }
        */

        // Verificar si el Order ya existe
        const existingOrder = await Order.findOne({ 
            where: { referenceOrder: referenceOrder} 
        });
        if (existingOrder) {
            return res.status(400).json({ message: 'La Orden ya está en registrado' });
        }

        const newOrder = new Order();
        newOrder.referenceOrder = referenceOrder
        newOrder.statusOrder = statusOrder
        newOrder.totalAmount = totalAmount;
        newOrder.user = userId,
        newOrder.customer = customerId,
        await newOrder.save();

        for (const { productId, cant } of productIds) {
            const product = await Product.findOne({
                where: {id: productId }
            });
            if (!product) {
                return res.status(404).json({ message: `No se pudo encontrar el producto con el ID ${productId}` });
            }

            const newOrderProduct = new OrderProduct();
            newOrderProduct.order = newOrder;
            newOrderProduct.product = product;
            newOrderProduct.cant = cant
            newOrderProduct.dateOrder = new Date();
            await newOrderProduct.save();
        }

        console.log("Created successfully :3");
        res.status(201).json({ 
            success: true,
            message: 'Order creada correctamente', 
            data: newOrder.referenceOrder        
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getOrderProduct = async (req: Request, res: Response) => {
    try {
        const order_id = parseInt(req.params.order_id); 
        
        const existingOrder = await Order.findOne({
            where: {id: order_id},
            relations: ['customer']
        });

        if (!existingOrder) {
            return res.status(404).json({
                success: false,
                message: 'Not found for the specified order_id',
            });
        }

        const findOrderProduct = await OrderProduct.find({
            where: {order: existingOrder},
            relations: ['product']
        });

        const data = {
            existingOrder,
            orderProducts: findOrderProduct
        };

            res.status(200).json({
                success: true,
                data: data,
            });         
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getOrderProducts = async (req: Request, res: Response) => {
    try {
        const existingOrders = await Order.find({
            relations: ['customer']
        });

        if (!existingOrders || existingOrders.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No se encontraron órdenes',
            });
        }

        const ordersData = [];

        for (const existingOrder of existingOrders) {
            const findOrderProduct = await OrderProduct.find({
                where: { order: existingOrder },
                relations: ['product']
            });

            ordersData.push({
                order: existingOrder,
                orderProducts: findOrderProduct
            });
        }

        res.status(200).json({
            success: true,
            data: ordersData,
        });         
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    createOrder,
    getOrderProduct,
    getOrderProducts
};