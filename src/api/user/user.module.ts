import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtToken } from '../../infrastructure/utils/jwt-token';
import { PrismaService } from '../../prisma.service';

@Module({
    imports: [JwtModule],
    controllers: [UserController],
    providers: [UserService, PrismaService, JwtToken],
})
export class UserModule { }
