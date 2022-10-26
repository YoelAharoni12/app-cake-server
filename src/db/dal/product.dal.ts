import {Cake} from "../../models/cake";
import mongoose from "mongoose";
import {ProductModel} from "../models/product.model";
import {CartItem} from "../../models/cart-item.model";
import {BadRequest} from "../../http/middleware/error-response/bad-request";
import {NotFoundError} from "../../http/middleware/error-response/not-found.error";

export const getAllProducts = async (): Promise<Cake[]> => {
    return await ProductModel.find({}).exec();
};

export const getProduct = async (name: string): Promise<Cake> =>
  await ProductModel.findOne({ name }).exec();

export const deleteProductByName = async (name: string): Promise<boolean> =>
  (await ProductModel.deleteOne({ name }).exec()).deletedCount === 1;

export const insertProduct = async (
  productToAdd: Cake
): Promise<Cake> => {
  return (await getProduct(productToAdd.name))
    ? null
    : new ProductModel(productToAdd).save();
};

export const updateFields = async (
  name: string,
  updateProduct: Partial<Cake>
): Promise<Cake> =>
  ProductModel.findOneAndUpdate({ name }, updateProduct, { new: true }).exec();

export const checkoutCart = async (
  cartItems: CartItem[]
): Promise<Cake[]> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const products: Cake[] = await Promise.all(
      cartItems.map(async (item: CartItem) => {
        const product: Cake = await getProduct(item.name);
        if (!product) {
          throw new NotFoundError("product is not exists");
        }
        if (!(product.limit - item.amount < 0)) {
          let limit = product.limit - item.amount;
          return ProductModel.findOneAndUpdate(
            { name: item.name },
            { limit },
            { session, new: true }
          ).exec();
        } else {
          throw new BadRequest(
            "You try to take over the limit of product"
          );
        }
      })
    );

    await session.commitTransaction();
    return products;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  }
};
