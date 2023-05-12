import { Document } from 'mongoose';

export interface Proveedor extends Document {
    readonly name: string;
    readonly addres: string;
    readonly phone: number;
    readonly producto?: any;
}