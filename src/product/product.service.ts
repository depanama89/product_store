import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findAll() {
    return `This action returns all product`;
  }
  async createProduct(data: any) {
    const productExist = await this.prisma.product.findFirst({
      where: { name: data.name } as any,
    });

    if (productExist) {
      throw new BadRequestException('le produit existe deja');
    }

    return this.prisma.product.create({
      data,
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
  async updateProduct(id: number, data: any) {
    const product = await this.prisma.product.findUnique({
      where: { id: id },
    });

    if (!product) {
      throw new BadRequestException(
        "il n'y a aucun produit correspondant à cet ID",
      );
    }

    return this.prisma.product.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteProduct(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new BadRequestException("Le produit n'existe pas ");
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
