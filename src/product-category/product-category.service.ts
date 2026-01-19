import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductCategoryDto } from './dto/productCategory.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryParamsDto } from 'src/utils/communsDto/queryParams.dto';

@Injectable()
export class ProductCategoryService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: ProductCategoryDto) {
    const productCategoryExists = await this.prisma.productCategory.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (productCategoryExists) {
      throw new ConflictException(`La categorie ${dto.name} existe déjà`);
    }
    const productCategory = await this.prisma.productCategory.create({
      data: { ...dto },
    });
    return productCategory;
  }

  findAll(dto: QueryParamsDto) {
    return this.prisma.productCategory.findMany({
      orderBy: {
        name: 'asc',
      },
      skip: dto.skip,
      take: dto.take,
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} productCategory`;
  }

  update(id: number, dto: ProductCategoryDto) {
    return `This action updates a #${id} productCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} productCategory`;
  }
}
