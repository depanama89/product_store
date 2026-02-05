import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtPayload, RequestWithCookies, UserFromJwt } from 'src/utils/types';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    const jwtsSecret = config.get<string>('JWT_SECRET');
    if (!jwtsSecret) {
      throw new Error('Jwt is undefined');
    }

    const secret: string = jwtsSecret;
    super({
      jwtFromRequest: (req: RequestWithCookies) => {
        if (!req || !req.cookies || !req.cookies['access_token']) {
          return null;
        }
        return req.cookies.access_token;
      },
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<UserFromJwt> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
