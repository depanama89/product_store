import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: ProductDto) {
    return this.productService.createProduct(data);
  }

  @Get('/all')
  getAllProduct() {
    return this.productService.getAllProduct();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.getOneProduct(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any) {
    return this.productService.updateProduct(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.deleteProduct(+id);
  }
}
