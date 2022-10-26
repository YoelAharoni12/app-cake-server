import {Context} from "koa";
import {deleteProductByName, getAllProducts, getProduct, insertProduct, updateFields,} from "../../db/dal/product.dal";

import {createProductSchema, productIdSchema, updateProductSchema,} from "../../utils/validation/product.validations";
import {logger} from "../../utils/logger.utils";
import {JoiError} from "../middleware/error-response/joi.error";
import {NotFoundError} from "../middleware/error-response/not-found.error";
import {BadRequest} from "../middleware/error-response/bad-request";
import {Cake} from "../../models/cake";

export const getProducts = async (ctx: Context) => {
  const products: Cake[] = await getAllProducts();
  ctx.ok(products);
};

export const getProductById = async (ctx: Context) => {
  const { error } = productIdSchema.validate({ name: ctx.params.id });
  if (error) {
    throw new JoiError(error);
  }
  const product: Cake = await getProduct(ctx.params.id);
  if (!product) {
    throw new NotFoundError("The product isn't exist");
  }
  ctx.ok(product);
};

export const addProduct = async (ctx: Context) => {
  let cake: Cake = ctx.request.body as Cake;
  const { error } = await createProductSchema.validate(cake);

  if (error) {
    throw new JoiError(error);
  }
  cake = await insertProduct(cake);

  if (!cake) {
    throw new BadRequest("the cake is already exist");
  }
  ctx.ok(cake);
};

export const deleteProduct = async (ctx: Context) => {
  const { error } = productIdSchema.validate({ name: ctx.params.id });
  if (error) {
    throw new JoiError(error);
  }
  if (!(await deleteProductByName(ctx.params.id))) {
    throw new NotFoundError("Couldn't find product to delete");
  }
  ctx.noContent();
};

export const updateProduct = async (ctx: Context) => {
  const name = ctx.params.id;
  const { error: nameValidationError } = productIdSchema.validate({
    name: ctx.params.id,
  });
  const fieldsToUpdate = ctx.request.body as Partial<Cake>;
  const { error: updateObjectValidationError } =
    updateProductSchema.validate(fieldsToUpdate);
  if (nameValidationError || updateObjectValidationError) {
    throw new JoiError(nameValidationError || updateObjectValidationError);
  }
  const product: Cake = await updateFields(name, fieldsToUpdate);
  if (!product) {
    throw new NotFoundError("Cant find specific product to update filed");
  }
  ctx.ok(product);
};


