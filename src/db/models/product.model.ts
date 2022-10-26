import {Schema} from "mongoose";
import mongoose from "mongoose";
import {Cake} from "../../models/cake";

export const CakeSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    image: String,
    limit: {type: Number, required: false},
    category: String
});

export const ProductModel = mongoose.model<Cake>("cakes", CakeSchema);

