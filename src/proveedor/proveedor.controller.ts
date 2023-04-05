import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';
import { ProveedorService } from './proveedor.service';
import { CreateProveedorDTO } from './dto/proveedor.dto';

@Controller('proveedor')
export class ProveedorController {

    constructor(private proveedorService: ProveedorService) { }
    
    @Post('/create')
    async createProveedor(@Res() res, @Body() createProveedorDTO: CreateProveedorDTO) {
        const proveedor = await this.proveedorService.createProveedor(createProveedorDTO)        
        return res.status(HttpStatus.OK).json({
            message: 'El proveedor se creo correctamente',
            proveedor
        })
    }

    @Get('/')
    async getProveedores(@Res() res) {
        const proveedores = await this.proveedorService.getProveedores();
        return res.status(HttpStatus.OK).json({
            proveedores
        })
    }

    @Get('/:proveedorID')
    async getProduct(@Res() res, @Param('proveedorID') proveedorID) {
        const proveeedor = await this.proveedorService.getProveedor(proveedorID)
        if (!proveeedor) throw new NotFoundException('El proveedor no existe')
        return res.status(HttpStatus.OK).json(proveeedor)
    }

    @Delete('/delete')
    async deleteProveedor(@Res() res, @Query('proveedorID') proveedorID) {
        const proveedorDelete = await this.proveedorService.deleteProveedor(proveedorID)
        if (!proveedorDelete) throw new NotFoundException('El proveedor no existe')
        return res.status(HttpStatus.OK).json({
            message: 'Proveedor eliminado correctamente',
            proveedorDelete
        })
    }

    @Put('/update')
    async updateProveedor(@Res() res, @Body() createProveedorDTO: CreateProveedorDTO, @Query('proveedorID') proveedorID) {
        const proveedorUpdate = await this.proveedorService.updateProveedor(proveedorID, createProveedorDTO);
        if (!proveedorUpdate) throw new NotFoundException('El proveedor no existe')
        return res.status(HttpStatus.OK).json({
            message: 'El Proveedor fue editado correctamente',
            proveedorUpdate
        })
    }
}
