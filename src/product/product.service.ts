import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateProductDto } from './dto/create-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { ProductCreateInput } from 'generated/prisma/models';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async create(dto: ProductDto) {
    const createProduct = await this.prisma.product.create({
      data: { ...dto },
    });

    for (const categoryItem of dto.productCategories) {
      const categoryId = Number(categoryItem);
      const categoryExists = await this.prisma.productCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!categoryExists) {
        throw new NotFoundException(
          `Product Category with ID:${categoryId} not found`,
        );
      }

      await this.prisma.productHasCategory.create({
        data: {
          productId: createProduct.id,
          categoryId: categoryId,
        },
      });
    }
  }

  findAll() {
    return `This action returns all product`;
  }
  async createProduct(dto: ProductDto) {
    const productExist = await this.prisma.product.findFirst({
      where: { name: dto.name } as any,
    });

    if (productExist) {
      throw new BadRequestException('le produit existe deja');
    }

    return this.prisma.product.create({
      data: { ...dto },
    });
  }

  async getAllProduct() {
    return this.prisma.product.findMany();
  }
  async getOneProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        productHasCotegory: {
          include: {
            category: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException("Il n'y a aucun produit avec cet id ");
    }

    return product;
  }
  async updateProduct(id: number, dto: ProductDto) {
    // const product = await this.prisma.product.findUnique({
    //   where: { id: id },
    // });

    // if (!product) {
    //   throw new BadRequestException(
    //     "il n'y a aucun produit correspondant à cet ID",
    //   );
    // }
    await this.getOneProduct(id);

    await this.prisma.productHasCategory.deleteMany({
      where: {
        productId: id,
      },
    });

    for (const categoryItem of dto.productCategories) {
      const categoryId = Number(categoryItem);
      const categoryExists = await this.prisma.productCategory.findUnique({
        where: {
          id: categoryId,
        },
      });

      if (!categoryExists) {
        throw new NotFoundException(
          `Product Category with ID:${categoryId} not found`,
        );
      }
      await this.prisma.productHasCategory.create({
        data: {
          productId: id,
          categoryId: categoryId,
        },
      });
    }

    return this.prisma.product.update({
      where: { id: id },
      data: dto,
    });
  }

  async deleteProduct(id: number) {
    await this.getOneProduct(id);

    await this.prisma.productHasCategory.deleteMany({
      where: {
        productId: id,
      },
    });

    return this.prisma.product.delete({
      where: { id },
    });
  }

  update(id: number, dto: ProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
