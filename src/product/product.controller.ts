import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query } from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";
import { ProductService } from './product.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Controller('product')
export class ProductController {

    constructor(private productService: ProductService) {}
    
    //Autenticado con el rol de administrador
    @Post('/create')
    @Auth(ValidRoles.admin)
    async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
        const product = await this.productService.createProduct(createProductDTO)        
        return res.status(HttpStatus.OK).json({
            message: 'El producto se creo correctamente',
            product
        })
    }

    //Sin autenticar cualquiera puede acceder
    // @Get('/')
    // async getProducts(@Res() res) {
    //     const products = await this.productService.getProducts();
    //     return res.status(HttpStatus.OK).json({
    //         products
    //     })
    // }

    //Sin autenticar pero si debe estar logeado generando un token
    @Get('/:productID')
    @Auth()
    async getProduct(@Res() res, @Param('productID') productID) {
        const product = await this.productService.getProduct(productID)
        if (!product) throw new NotFoundException('El producto no existe')
        return res.status(HttpStatus.OK).json(product)
    }
    

    @Get()
    async getProductsPaginate(@Res() res, @Query() paginationDto: PaginationDto) {
        console.log(paginationDto);
        
        const productsPaginate = await this.productService.getProductsPaginate(paginationDto)
        return res.status(HttpStatus.OK).json({
            message: 'Producto paginado',
            productsPaginate
        })
    }

    @Delete('/delete')
    @Auth(ValidRoles.admin)
    async deleteProduct(@Res() res, @Query('productID') productID) {
        const productDelete = await this.productService.deleteProduct(productID)
        if (!productDelete) throw new NotFoundException('El producto no existe')
        return res.status(HttpStatus.OK).json({
            message: 'Producto eliminado correctamente',
            productDelete
        })
    }

    @Put('/update')
    @Auth(ValidRoles.admin)
    async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
        const productUpdate = await this.productService.updateProduct(productID, createProductDTO);
        if (!productUpdate) throw new NotFoundException('El producto no existe')
        return res.status(HttpStatus.OK).json({
            message: 'Producto fue editado correctamente',
            productUpdate
        })
    }

    @Get('/calculoIVA/:productID')
    async calculoIVA(@Res() res, @Param('productID') productID) {
        const calculoIva = await this.productService.calculoIVA(productID)
        return res.status(HttpStatus.OK).json({
            message: 'Calculo del IVA',
            calculoIva
        })
    }
}
