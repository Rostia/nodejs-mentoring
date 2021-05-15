import { Request, Response, NextFunction } from 'express';

function routerLoger(req: Request, res: Response, next: NextFunction): void {
    const {
        method,
        originalUrl,
        params
    } = req;

    console.log(`${method}: ${originalUrl}`);
    console.log(`Params: ${JSON.stringify(params)}`);

    next();
}

export default routerLoger;
