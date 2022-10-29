import {Context} from "koa";
import {getAllProducts, getProduct, insertProduct} from "../../db/dal/product.dal";

import {createProductSchema, productIdSchema,} from "../../utils/validation/product.validations";
import {Cake} from "../../models/cake";

export const getProducts = async (ctx: Context) => {
  const products: Cake[] = await getAllProducts();
  ctx.ok(products);
};

export const getProductById = async (ctx: Context) => {
  const { error } = productIdSchema.validate({ name: ctx.params.id });
  if (error) {
    throw new Error(error.message);
  }
  const product: Cake = await getProduct(ctx.params.id);
  if (!product) {
    throw new Error("The product isn't exist");
  }
  ctx.ok(product);
};

export const addProduct = async (ctx: Context) => {
  let cake: Cake = ctx.request.body as Cake;
  const { error } = await createProductSchema.validate(cake);

  if (error) {
    throw new Error(error.message);
  }
  cake = await insertProduct(cake);

  if (!cake) {
    throw new Error("the cake is already exist");
  }
  ctx.ok(cake);
};
