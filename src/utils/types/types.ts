import type { Request } from 'express';

export type JwtPayload = {
  sub: number;
  role: string;
  name: string;
};
export interface RequestWithCookies extends Request {
  cookies: {
    access_token?: string;
    [key: string]: string | undefined;
  };
}

export interface UserFromJwt {
  id: number;
  name: string;
  email: string;
  role: {
    name: string;
  };
}
