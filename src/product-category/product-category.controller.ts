import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryDto } from './dto/productCategory.dto';
import { QueryParamsDto } from 'src/utils/communsDto/queryParams.dto';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Post()
  create(@Body() dto: ProductCategoryDto) {
    return this.productCategoryService.create(dto);
  }

  @Get()
  findAll(@Query() dto: QueryParamsDto) {
    return this.productCategoryService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productCategoryService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ProductCategoryDto,
  ) {
    return this.productCategoryService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productCategoryService.remove(+id);
  }
}
