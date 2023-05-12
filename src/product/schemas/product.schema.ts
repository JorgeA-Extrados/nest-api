// import mongoose, { Schema } from 'mongoose';
import mongoose, {Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';




export type ProductDocument = Product & Document


@Schema()
export class Product {
    @Prop({required: true})
    name: string

    @Prop({required: true})
    description: string

    @Prop({required: true})
    imageURL: string

    @Prop({required: true})
    price: number

    @Prop({default: Date.now})
    createdAt: Date

    @Prop({required: true, ref: 'Proveedor'})
    proveedor: mongoose.Schema.Types.ObjectId
}

export const ProductSchema = SchemaFactory.createForClass(Product)

// export const ProductSchema = new Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     imageURL: { type: String, required: true },
//     price: { type: Number, required: true },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     proveedor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Proveedor'
//     }
// });