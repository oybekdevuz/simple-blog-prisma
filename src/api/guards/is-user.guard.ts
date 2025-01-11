import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';
import { config } from '../../config';

@Injectable()
export class IsUserGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
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
            user = await this.jwtService.verify(token, {
                secret: config.ACCESS_SECRET_KEY,
            });
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
