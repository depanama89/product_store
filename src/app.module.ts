import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ProductModule,
    UserModule,
    ProductCategoryModule,
    AuthModule,
    EmailModule,
  ],
})
export class AppModule {}
