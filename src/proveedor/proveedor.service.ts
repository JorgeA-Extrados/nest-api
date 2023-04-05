
import { Model } from 'mongoose';
import { Proveedor } from './interfaces/proveedor.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CreateProveedorDTO } from './dto/proveedor.dto';

@Injectable()
export class ProveedorService {

    constructor(@InjectModel('Proveedor') private readonly proveedorModel: Model<Proveedor>) { }
    
    async getProveedores(): Promise<Proveedor[]> {
        const proveedores = await this.proveedorModel.find();
        return proveedores;
    }

    async getProveedor(proveedorID: string): Promise<Proveedor> {
        const proveedor = await this.proveedorModel.findById(proveedorID);
        return proveedor;
    }

    async createProveedor( createProveedorDTO: CreateProveedorDTO): Promise<Proveedor> {
        const proveedor = new this.proveedorModel(createProveedorDTO);
        return await proveedor.save();
    }

    async deleteProveedor(proveedorID: string): Promise<Proveedor> {
        const deleteProveedor = await this.proveedorModel.findByIdAndDelete(proveedorID);
        return deleteProveedor;
    }

    async updateProveedor(proveedorID, createProveedorDTO: CreateProveedorDTO): Promise<Proveedor> {
        const updateProveedor = await this.proveedorModel.findByIdAndUpdate(proveedorID, createProveedorDTO, { new: true });
        return updateProveedor;
    }
}
