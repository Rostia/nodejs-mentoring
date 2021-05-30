import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const {
    JWT_SECRET
} = process.env;

function auth(req: Request, res: Response, next: NextFunction): void {
    const {
        authorization
    } = req.headers;

    if (!authorization) {
        res.status(401).json('401 - Unauthorized Error');
    }

    try {
        jwt.verify(authorization, JWT_SECRET);

        return next();
    } catch (error) {
        res.status(403).json('403 - Forbidden Error');
    }
}

export default auth;
