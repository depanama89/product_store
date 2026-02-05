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
      skip: Number(dto.skip),
      take: Number(dto.take),
    });
  }

  async findOne(id: number) {
    const productCategory = await this.prisma.productCategory.findUnique({
      where: { id },
    });
    if (!productCategory || !productCategory.id) {
      throw new NotFoundException(`La categorie ${id} n'existe pas`);
    }
    return productCategory;
  }

  async update(id: number, dto: ProductCategoryDto) {
    await this.findOne(id);

    return this.prisma.productCategory.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    await this.prisma.productHasCategory.deleteMany({
      where: {
        productId: id,
      },
    });
    return this.prisma.productCategory.delete({
      where: {
        id,
      },
    });
  }
}
