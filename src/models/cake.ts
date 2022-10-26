import * as mongoose from "mongoose";

export interface Cake extends mongoose.Document {
    _id: string
    name: string;
    description: string;
    price: number;
    image: string;
    limit?: number;
    category: string
}


