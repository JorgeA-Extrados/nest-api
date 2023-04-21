import mongoose, { Schema } from 'mongoose';

export const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    fullName: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    roles: { type: Array, default: ["user"] }
})