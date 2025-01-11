import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from '../../decorator/current-user';
import { User } from '@prisma/client';
import { IsUserGuard } from '../../guards/is-user.guard';

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(IsUserGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
        return this.postService.create(createPostDto, user);
    }

    @UseGuards(IsUserGuard)
    @Get('self')
    findAllSelf(@CurrentUser() user: User) {
        return this.postService.findAllSelf(user);
    }

    @UseGuards(IsUserGuard)
    @Get('self/:id')
    findOneSelf(@Param('id') id: string, @CurrentUser() user: User) {
        return this.postService.findOneSelf(id, user);
    }
    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(id);
    }

    @UseGuards(IsUserGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @CurrentUser() user: User) {
        return this.postService.update(id, updatePostDto, user);
    }

    @UseGuards(IsUserGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() user: User) {
        return this.postService.remove(id, user);
    }
}
