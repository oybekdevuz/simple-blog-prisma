import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import { JwtToken } from '../infrastructure/utils/jwt-token';

@Injectable()
export class IsUserGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtToken,
        private prismaService: PrismaService
    ) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new UnauthorizedException("Unauthorized");
        }
        const [bearer, token] = authHeader.split(" ");

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("Unauthorized");
        }
        let user: User | null;
        try {
            user = await this.jwtService.verifyAccess(token);
        } catch (error) {
            console.log(error);

            throw new UnauthorizedException("Token time expired")
        }
        if (!user) {
            throw new UnauthorizedException("Token time expired");
        }
        const foundUser = await this.prismaService.user.findUnique({ where: { id: user.id } });

        if (!foundUser) {
            throw new UnauthorizedException("Unauthorized");
        }
        req.user = foundUser
        return true;
    }
}
