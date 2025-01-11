import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {

    }
    create(dto: CreatePostDto, user: User) {
        return this.prismaService.post.create({
            data: {
                ...dto,
                author: { connect: { id: user.id } },
            }
        });
    }

    findAll() {
        return this.prismaService.post.findMany({ where: { published: false }, include: { author: true } });
    }

    async findOne(id: string) {
        const post = await this.prismaService.post.findUnique({ where: { id } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return this.prismaService.post.findUnique({ where: { id, published: false }, include: { author: true } });
    }

    findAllSelf(user: User) {
        return this.prismaService.post.findMany({ where: { authorId: user.id }, include: { author: true } });
    }

    async findOneSelf(id: string, user: User) {
        const post = await this.prismaService.post.findUnique({ where: { id, authorId: user.id } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return this.prismaService.post.findUnique({ where: { id, authorId: user.id }, include: { author: true } });
    }

    async update(id: string, updatePostDto: UpdatePostDto, user: User) {
        const post = await this.prismaService.post.findUnique({ where: { id, authorId: user.id } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return this.prismaService.post.update({ data: updatePostDto, where: { id } });
    }

    async remove(id: string, user: User) {
        const post = await this.prismaService.post.findUnique({ where: { id, authorId: user.id } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return this.prismaService.post.delete({ where: { id, authorId: user.id } });
    }
}
