import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../entities/User';

const JWT_SECRET = 'BLU3g35t10NuC3NtL4L';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log(authHeader)
    console.log("Token recibido:", token);

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, user: any) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido' });
        }

        req.user = user as User;
        next();
    });
};

export default authenticateToken;