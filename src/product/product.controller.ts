import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { QueryParamsDto } from 'src/utils/communsDto/queryParams.dto';
import { SearchQueryParamsDto } from 'src/utils/communsDto/searchQueryParams.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() data: ProductDto) {
    return this.productService.create(data);
  }

  @Get('/all')
  getAllProduct(@Query() dto: QueryParamsDto) {
    return this.productService.getAllProduct(dto);
  }
  @Get('allproduct')
  getSearchProductByparams(@Query() dto: QueryParamsDto) {
    return this.productService.findAll(dto);
  }

  @Get('search')
  getSearchProduct(@Query() dto: SearchQueryParamsDto) {
    return this.productService.search(dto);
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
