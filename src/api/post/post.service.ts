import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../../prisma.service';
import { Post, User } from '@prisma/client';
import { IResponse } from '../../infrastructure/interfaces';

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {

    }
    async create(dto: CreatePostDto, user: User): Promise<IResponse<Post>> {

        const post = await this.prismaService.post.create({
            data: { ...dto, author: { connect: { id: user.id } } }
        });

        return { data: post, status_code: 201, message: "success" }
    }

    async findAll(): Promise<IResponse<Post[]>> {
        const posts = await this.prismaService.post.findMany({ where: { published: true }, include: { author: true } });
        return { data: posts, status_code: 200, message: "success" }
    }

    async findOne(id: string): Promise<IResponse<Post>> {
        const post = await this.prismaService.post.findUnique({ where: { id, published: true }, include: { author: true } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return { data: post, status_code: 200, message: "success" }
    }

    async findAllSelf(user: User): Promise<IResponse<Post[]>> {
        const posts = await this.prismaService.post.findMany({ where: { authorId: user.id }, include: { author: true } });
        return { data: posts, status_code: 200, message: "success" }
    }

    async findOneSelf(id: string, user: User): Promise<IResponse<Post>> {
        const post = await this.prismaService.post.findUnique({ where: { id, authorId: user.id }, include: { author: true } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        return { data: post, status_code: 200, message: "success" };
    }

    async update(id: string, updatePostDto: UpdatePostDto, user: User): Promise<IResponse<Post>> {
        const post = await this.prismaService.post.findUnique({ where: { id, authorId: user.id } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        const updatedPost = await this.prismaService.post.update({ data: updatePostDto, where: { id } });
        return { data: updatedPost, status_code: 200, message: "success" };
    }

    async remove(id: string, user: User): Promise<IResponse<Post>> {
        const post = await this.prismaService.post.findUnique({ where: { id, authorId: user.id } });
        if (!post) {
            throw new NotFoundException("Post not found")
        }
        const removedPost = await this.prismaService.post.delete({ where: { id, authorId: user.id } });
        return { data: removedPost, status_code: 200, message: "success" };
    }
}
