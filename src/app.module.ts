import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose'
import { ProveedorModule } from './proveedor/proveedor.module';

@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb://localhost/products-nest-tutorial'), ProveedorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
