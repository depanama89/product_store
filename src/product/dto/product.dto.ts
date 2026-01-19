import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  isBoolean,
  IsDecimal,
  IsInt,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';

export class ProductDto {
  @Length(3 - 60)
  @IsString()
  name: string;
  @IsDecimal()
  price: number;
  @Length(1, 200)
  @IsString()
  description: string;
  @IsBoolean()
  isAvailable: boolean;
  @Type(() => Number) // Force la conversion des éléments du tableau en nombres
  @IsNumber({}, { each: true })
  productCategories: string[];
}
