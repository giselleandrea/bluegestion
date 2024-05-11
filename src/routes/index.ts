import express, { Request, Response } from "express";

const router = express.Router();

router.get('/test', (req, res)  => {
    console.log('Holiiii')
    res.send('Hi!!')
});

export default router;

import userRoutes from './user.routes';
import productRoutes from './product.routes';
import branchRoutes from './branch.routes';
import customerRoutes from './customer.routes';
import orderRoutes from './order.routes';

export {
    userRoutes,
    productRoutes,
    branchRoutes,
    customerRoutes,
    orderRoutes
};