import { Request, Response, NextFunction } from 'express';
import AuthService from '../secvices/auth.service';

const authService = new AuthService();

function auth(req: Request, res: Response, next: NextFunction): void {
    const {
        authorization
    } = req.headers;

    if (!authorization) {
        res.status(401).json('401 - Unauthorized Error');
    }

    if (authService.isCorrect(authorization)) {
        return next();
    }

    res.status(403).json('403 - Forbidden Error');
}

export default auth;
