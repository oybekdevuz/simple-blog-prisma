import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from '../post.controller';
import { PostService } from '../post.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { User } from '@prisma/client';
import { IResponse } from '../../../infrastructure/interfaces';
import { PrismaService } from '../../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../../../infrastructure/utils/jwt-token';

describe('PostController', () => {
    let controller: PostController;
    let postService: PostService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PostController],
            providers: [
                PostService,
                JwtToken,
                JwtService,
                PrismaService,
            ],
        }).compile();

        controller = module.get<PostController>(PostController);
        postService = module.get<PostService>(PostService);
    });

    it('should create a new post when given valid CreatePostDto and authenticated user', async () => {
        const createPostDto: CreatePostDto = {
            title: 'Test Post',
            content: 'This is a test post content',
        };
        const user: User = {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            password: 'Password',
        };
        const expectedResult: IResponse<{ id: string; title: string; content: string; published: boolean; authorId: string }> = {
            data: { id: '1', ...createPostDto, authorId: user.id, published: false }, // 'published' maydoni qo'shildi
            status_code: 201,
            message: 'success',
        };
        // Mocking postService.create method
        jest.spyOn(postService, 'create').mockResolvedValue(expectedResult);

        const result = await controller.create(createPostDto, user);

        // Tekshiruvlar
        expect(postService.create).toHaveBeenCalledWith(createPostDto, user);
        expect(result).toEqual(expectedResult);
    });

    it('should return all posts for the authenticated user when calling findAllSelf', async () => {
        const user: User = {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            password: 'Password',
        };
        const expectedResult: IResponse<{ id: string; title: string; content: string; published: boolean; authorId: string; author: { name: string; id: string; email: string; password: string } }[]> = {//+
            data: [
                { id: '1', title: 'Post 1', content: 'Content 1', published: true, authorId: user.id, author: user },
                { id: '2', title: 'Post 2', content: 'Content 2', published: false, authorId: user.id, author: user },
            ],
            status_code: 200,
            message: 'success',
        };

        jest.spyOn(postService, 'findAllSelf').mockResolvedValue(expectedResult);

        const result = await controller.findAllSelf(user);

        expect(postService.findAllSelf).toHaveBeenCalledWith(user);
        expect(result).toEqual(expectedResult);
    });
});
