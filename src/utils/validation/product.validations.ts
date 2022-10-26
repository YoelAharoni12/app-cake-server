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
export const updateProductSchema = Joi.object(productSchema).fork(
    Object.keys(productSchema),
    (schema) => schema.optional()
);
export const productIdSchema = Joi.object({name: productSchema.name});
const cartSchema = {
    name: Joi.string().required().only(),
    amount: Joi.number().positive().required(),
};
export const cartItemsSchema = Joi.array()
    .unique("name")
    .items(Joi.object(cartSchema));
