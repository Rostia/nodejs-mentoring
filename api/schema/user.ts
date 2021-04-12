import Joi from 'joi';
import { password } from '../validation/custom';

console.log(password);

const schema = Joi.object({
    login: Joi.string().email().required(),
    password: Joi.string().custom(password).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

export default schema;
