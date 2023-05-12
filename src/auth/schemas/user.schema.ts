
import {Document} from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    fullName: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: ["user"] })
    roles: string[];

}

export const UserSchema = SchemaFactory.createForClass(User)

// export const UserSchema = new Schema({
//     email: { type: String, required: true, unique: true };
//     password: { type: String, required: true, select: false },
//     fullName: { type: String, required: true },
//     isActive: { type: Boolean, default: true },
//     roles: { type: Array, default: ["user"] }
// })