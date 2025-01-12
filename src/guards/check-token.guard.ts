import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtToken } from '../infrastructure/utils/jwt-token';

@Injectable()
export class CheckExpToken implements CanActivate {
  constructor(
    private readonly jwtService: JwtToken,
  ) { }

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException("Token topilmadi");
    }
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw new UnauthorizedException("Token topilmadi");
    }
    let user;
    try {
      user = await this.jwtService.verifyAccess(token);
    } catch (error) {
      throw new UnauthorizedException("Token vaqti tugagan");
    }
    if (!user) {
      throw new UnauthorizedException("Token topilmadi");
    }

    return true;
  }
}
