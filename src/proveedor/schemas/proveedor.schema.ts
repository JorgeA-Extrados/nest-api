// import { Schema } from 'mongoose';
import mongoose, {Document, Types} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../../product/interfaces/product.interface';

export type ProveedorDocument = Proveedor & Document


@Schema()
export class Proveedor {
    
    @Prop({required: true})
    name: string

    @Prop({required: true})
    addres: string

    @Prop({required: true})
    phone: number

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
    product: Types.Array<Product>;

}

export const ProveedorSchema = SchemaFactory.createForClass(Proveedor)

// export const ProveedorSchema = new Schema({
//     name: {type:String, required: true},
//     addres: {type: String, required: true},
//     phone: {type: Number, required: true},
// })