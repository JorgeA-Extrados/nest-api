import { Schema } from 'mongoose';

export const ProveedorSchema = new Schema({
    name: {type:String, required: true},
    addres: {type: String, required: true},
    phone: {type: Number, required: true},
})