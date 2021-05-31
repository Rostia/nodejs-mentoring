import { Request, Response, NextFunction } from 'express';
import winston from '../config/winston';
import CustomError from '../errors/custom.error';

function errorServerHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
    const {
        originalUrl,
        method
    } = req;
    const { message } = err;
    const statusCode = 500;

    console.log(req);

    if (err instanceof CustomError) {
        winston.error(`${method}: [${err.statusCode}] - ${message}. Params: ${JSON.stringify(err.params)}`);
    } else {
        winston.error(`${method}: [${statusCode}] - ${message} -> ${originalUrl}`);
    }

    res.status(statusCode).send('Handling error');
}

export default errorServerHandler;
