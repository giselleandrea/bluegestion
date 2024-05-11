import { Request, Response } from 'express';
import { Branch } from '../entities/Branch';

const createBranch = async (req: Request, res: Response) => {
    try {
        const {
            nameBranch,
            phoneBranch,
            neighborhoodBranch,
            address,
            nameContact
        } = req.body;

        // Verificar si la sucursal ya existe
        const existingBranch = await Branch.findOne({ 
            where: { nameBranch: nameBranch } 
        });
        if (existingBranch) {
            return res.status(400).json({ message: 'La sucursal ya está en registrado' });
        }

        const newBranch = new Branch();
        newBranch.nameBranch = nameBranch;
        newBranch.phoneBranch = phoneBranch;
        newBranch.neighborhoodBranch = neighborhoodBranch;
        newBranch.address = address;
        newBranch.nameContact = nameContact;
        await newBranch. save();

        console.log("Created successfully :3");
        res.status(201).json({ 
            success: true,
            message: 'Sucursal creada correctamente', 
            data: newBranch
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getBranches = async (req: Request, res:Response) => {
    try {
        const allBranches = await Branch.find();

        if (allBranches.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Branches found in the database',
            });
        }

        res.status(200).json({
            success: true,
            data: allBranches,
        });
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const getBranch = async (req: Request, res: Response) => {
    try {
        const branch_id = parseInt(req.params.product_id); 
        
        const existingBranch = await Branch.findOne({
            where: {id: branch_id}
        });

        if (!existingBranch) {
            return res.status(404).json({
                success: false,
                message: 'Not found for the specified branch_id',
            });
        } else {
            res.status(200).json({
                success: true,
                data: existingBranch,
            }); 
        }; 
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    createBranch,
    getBranch,
    getBranches
};