import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtToken } from '../../infrastructure/utils/jwt-token';

@Module({
    imports: [JwtModule],
    controllers: [PostController],
    providers: [PostService, PrismaService, JwtToken],
})
export class PostModule { }
