import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  skip: number;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  take: number;
}
