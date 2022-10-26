import {Context} from "koa";
import {CartItem} from "../../models/cart-item.model";
import {cartItemsSchema} from "../../utils/validation/product.validations";
import {JoiError} from "../middleware/error-response/joi.error";
import {checkoutCart} from "../../db/dal/product.dal";

export const checkout = async (ctx: Context) => {
    const data: CartItem[] = ctx.request.body as CartItem[];
    const { error } = cartItemsSchema.validate(data);
    if (error) {
        throw new JoiError(error);
    }
    ctx.ok(await checkoutCart(data));
};