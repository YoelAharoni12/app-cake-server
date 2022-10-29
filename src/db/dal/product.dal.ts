import {Cake} from "../../models/cake";
import {ProductModel} from "../models/product.model";

export const getAllProducts = async (): Promise<Cake[]> => {
    return await ProductModel.find({}).exec();
};

export const getProduct = async (name: string): Promise<Cake> =>
  await ProductModel.findOne({ name }).exec();

export const insertProduct = async (
    productToAdd: Cake
): Promise<Cake> => {
    if (productToAdd._id === '') {
        delete productToAdd._id
    }
    if (await getProduct(productToAdd.name)) {
        return null;
    } else {
        return new ProductModel(productToAdd).save();
    }
};
