import { Request, Response } from 'express';
import { User } from '../entities/User';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = 'BLU3g35t10NuC3NtL4L'; 

const createUser = async (req: Request, res: Response) => {
    try {
        const { 
            name, 
            email,
            password, 
            document,
            typeDocumet,
            typeUserId        
        } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ 
            where: { email: email } 
        });
        if (existingUser) {
            return res.status(400).json({ message: 'El Email ya está en registrado' });
        }
    
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Crear un nuevo usuario
        const newUser = new User();
        newUser.name = name;
        newUser.password = hashedPassword ; // Guardar la contraseña encriptada
        newUser.document = document;
        newUser.email = email;
        newUser.typeDocumet = typeDocumet;
        newUser.typeUser = typeUserId;            
        // Guardar el usuario en la base de datos
        await newUser.save();
    
        res.status(201).json({ message: 'Usuario creado correctamente' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por nombre de usuario
        const user = await User.findOne({ 
            where: { email: email } 
        });

        // Verificar si el usuario existe
        if (!user) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }
    
        // Verificar la contraseña
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    
        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    
        // Enviar el token como respuesta
        res.json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

export default {
    login,
    createUser,
};