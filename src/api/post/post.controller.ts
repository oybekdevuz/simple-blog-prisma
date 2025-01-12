import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { CurrentUser } from '../../decorator/current-user';
import { User } from '@prisma/client';
import { IsUserGuard } from '../../guards/is-user.guard';

@ApiTags('Posts') // Swagger tag for grouping endpoints
@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @ApiBearerAuth() // Requires token
    @ApiOperation({ summary: 'Create a new post' })
    @ApiResponse({ status: 201, description: 'Post successfully created.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    @UseGuards(IsUserGuard)
    @Post()
    create(@Body() createPostDto: CreatePostDto, @CurrentUser() user: User) {
        return this.postService.create(createPostDto, user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve all posts of the authenticated user' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved user posts.' })
    @UseGuards(IsUserGuard)
    @Get('self')
    findAllSelf(@CurrentUser() user: User) {
        return this.postService.findAllSelf(user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve a specific post of the authenticated user' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved the post.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    @UseGuards(IsUserGuard)
    @Get('self/:id')
    findOneSelf(@Param('id') id: string, @CurrentUser() user: User) {
        return this.postService.findOneSelf(id, user);
    }

    @ApiOperation({ summary: 'Retrieve all posts' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved all posts.' })
    @Get()
    findAll() {
        return this.postService.findAll();
    }

    @ApiOperation({ summary: 'Retrieve a specific post by ID' })
    @ApiResponse({ status: 200, description: 'Successfully retrieved the post.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.postService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update a post' })
    @ApiResponse({ status: 200, description: 'Post successfully updated.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    @UseGuards(IsUserGuard)
    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updatePostDto: UpdatePostDto,
        @CurrentUser() user: User
    ) {
        return this.postService.update(id, updatePostDto, user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete a post' })
    @ApiResponse({ status: 200, description: 'Post successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Post not found.' })
    @UseGuards(IsUserGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() user: User) {
        return this.postService.remove(id, user);
    }
}
