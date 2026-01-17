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
    const productExist = await this.prisma.product.findUnique({
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
    });
    if (!product) {
      throw new NotFoundException("Il n'y a aucun produit avec cet id ");
    }

    return product;
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
