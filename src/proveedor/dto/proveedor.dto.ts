import { IsArray } from "class-validator";

export class CreateProveedorDTO {
    readonly name: string;
    readonly addres: string;
    readonly phone: number;
    @IsArray()
    readonly product?: string[];
}