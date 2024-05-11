import { Request, Response } from 'express';
import { Customer } from '../entities/Customer';

const createCustomer = async (req: Request, res: Response) => {
    try {
        const {
            nameCustomer,
            phoneCustomer,
            neighborhoodCustomer,
            address,
            email,
            branchId
        } = req.body;

        // Verificar si el cliente ya existe
        const existingCustomer = await Customer.findOne({ 
            where: { nameCustomer: nameCustomer } 
        });
        if (existingCustomer) {
            return res.status(400).json({ message: 'El Cliente ya está en registrado' });
        }

        const newCustomer = new Customer();
        newCustomer.nameCustomer = nameCustomer;
        newCustomer.phoneCustomer = phoneCustomer;
        newCustomer.neighborhoodCustomer = neighborhoodCustomer;
        newCustomer.address = address;
        newCustomer.email = email;
        newCustomer.branch = branchId;
        await newCustomer.save();

        console.log("Created successfully :3");
        res.status(201).json({ 
            success: true,
            message: 'Customer creado correctamente', 
            data: newCustomer
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor'});
    }
};

const getCustomer = async (req: Request, res: Response) => {
    try {
        const customer_id = parseInt(req.params.Customer_id); 
        
        const existingCustomer = await Customer.findOne({
            where: {id: customer_id}
        });

        if (!existingCustomer) {
            return res.status(404).json({
                success: false,
                message: 'Not found for the specified customer_id',
            });
        } else {
            res.status(200).json({
                success: true,
                data: existingCustomer,
            }); 
        }; 
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getCustomers = async (req: Request, res:Response) => {
    try {
        const allCustomers = await Customer.find();

        if (allCustomers.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No allCustomers found in the database',
            });
        }

        res.status(200).json({
            success: true,
            data: allCustomers,
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


export default {
    createCustomer,
    getCustomer,
    getCustomers
};