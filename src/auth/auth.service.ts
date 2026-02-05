import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { UserRoles } from 'src/utils/const';
import { EmailService } from 'src/email/email.service';
import { SignInDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private emailService: EmailService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}
  async signUp(dto: AuthDto) {
    const userExists = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (userExists) {
      throw new ConflictException(`Cet utilisateur ${dto.name} existe déjà`);
    }

    const hashedPassword = await argon.hash(dto.password);

    const userRole = await this.prisma.role.findUnique({
      where: {
        name: UserRoles.USER,
      },
    });

    if (!userRole) {
      throw new Error("C'est role n'existe pas ");
    }

    const randomToken = Math.floor(Math.random() * 100000).toString();

    const newUser = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        isActive: false,
        roleId: userRole.id,
        token: randomToken,
      },
    });

    return this.emailService.sendConfirmation(randomToken, newUser.email);
  }

  async confirmAccount(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        token,
      },
    });

    if (!user || !user.id) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActive: true,
        token: null,
      },
    });
  }

  async signIn(dto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
      },
    });

    if (!user || !user.id) {
      throw new NotFoundException('User not found');
    }

    const passwordMatches = await argon.verify(user.password, dto.password);
    if (!passwordMatches) {
      throw new BadRequestException('Problem with your credentials');
    }

    user.password = '';
    return this.generateToken(user.id, user.role.name, user.name);
  }

  generateToken(userId: number, userRole: string, name: string) {
    const payload: JwtPayload = {
      sub: userId,
      role: userRole,
      name,
    };
    const token = this.jwtService.sign(payload, {
      secret: this.config.get('JWT_SECRET'),
    });

    return token;
  }
  // findAll() {
  //   return `This action returns all auth`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }

  // update(id: number, dto: AuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
