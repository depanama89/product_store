import {
  IsBoolean,
  IsEmail,
  isEmail,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class AuthDto {
  @IsString()
  @Length(3 - 60)
  name: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsStrongPassword()
  @Length(3 - 60)
  password: string;
}
