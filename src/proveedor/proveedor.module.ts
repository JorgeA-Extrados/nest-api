import { Module } from '@nestjs/common';
import { ProveedorController } from './proveedor.controller';
import { ProveedorService } from './proveedor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProveedorSchema } from './schemas/proveedor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'Proveedor', schema: ProveedorSchema}
    ])
  ],
  controllers: [ProveedorController],
  providers: [ProveedorService]
})
export class ProveedorModule {}
