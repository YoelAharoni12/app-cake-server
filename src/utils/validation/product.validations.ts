import Joi from "joi";

const productSchema = {
    _id: Joi.string().optional().allow(''),
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().required(),
    limit: Joi.number(),
    category: Joi.string().required()
};

export const createProductSchema = Joi.object(productSchema)
export const productIdSchema = Joi.object({name: productSchema.name});
