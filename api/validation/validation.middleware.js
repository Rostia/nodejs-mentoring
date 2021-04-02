function errorResponse(schemaErrors) {
    const errors = schemaErrors.map(({ path, message }) => ({ path, message }));

    return {
        status: 'failed',
        errors
    };
}

function validateSchema(schema) {
    return (req, res, next) => {
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
