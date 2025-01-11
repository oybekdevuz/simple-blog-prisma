import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule],
    controllers: [PostController],
    providers: [PostService, PrismaService],
})
export class PostModule { }
