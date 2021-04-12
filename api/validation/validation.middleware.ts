import { Request, Response, NextFunction } from 'express';
import { Schema, ValidationErrorItem } from 'joi';

function errorResponse(schemaErrors: Array<ValidationErrorItem>) {
    const errors = schemaErrors.map(({ path = '', message = '' }) => ({ path, message }));

    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema: Schema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (!error?.isJoi) {
            return next();
        }

        res.status(400).json(errorResponse(error.details));
    };
}

export default validateSchema;
