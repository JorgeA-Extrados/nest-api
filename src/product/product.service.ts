import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
@Injectable()
export class ProductService {

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }
    
    // async getProducts(): Promise<Product[]> {
    //     const products = await this.productModel.find()
    //         .populate({ path: 'proveedor', model: 'Proveedor' })
    //         .exec();
    //     return products;
    // }

    async getProductsPaginate(paginationDto: PaginationDto): Promise<Product[]> {
        const { cantidad, pagina } = paginationDto
        const offset = (pagina -1 ) * cantidad
        const productsPaginate = await this.productModel.find()
            .limit(cantidad)
            .skip(offset)
            .select('-__v')
            .populate({ path: 'proveedor', model: 'Proveedor' })
            .exec();
        return productsPaginate;
    }

    async getProduct(productID: string): Promise<Product> {
        const product = await this.productModel.findById(productID)
            .populate({ path: 'proveedor', model: 'Proveedor' })
            .exec();
        return product;
    }

    async createProduct( createProductDTO: CreateProductDTO): Promise<Product> {
        const product = new this.productModel(createProductDTO);
        return await product.save();
    }

    async deleteProduct(productID: string): Promise<Product> {
        const deleteProduct = await this.productModel.findByIdAndDelete(productID);
        return deleteProduct;
    }

    async updateProduct(productID, createProductDTO: CreateProductDTO): Promise<Product> {
        const updateProduct = await this.productModel.findByIdAndUpdate(productID, createProductDTO, { new: true });
        return updateProduct;
    }

    async calculoIVA(productID: string) {
        const calculoIVA = await this.productModel.findById((productID));
        const IVA = (calculoIVA.price * 21) / 100 
        const PriceIVA = calculoIVA.price + IVA;

        return {
            IVA,
            PriceIVA
        }
    }

}
