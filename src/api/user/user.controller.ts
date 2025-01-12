import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { IsUserGuard } from '../../guards/is-user.guard';
import { CurrentUser } from '../../decorator/current-user';
import { User } from '@prisma/client';

@ApiTags('Users') // Swagger group name
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    @Post('register')
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: 'User login' })
    @ApiResponse({ status: 200, description: 'Login successful.' })
    @ApiResponse({ status: 401, description: 'Invalid credentials.' })
    @Post('login')
    login(@Body() createUserDto: LoginDto) {
        return this.userService.login(createUserDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get current authenticated user information' })
    @ApiResponse({ status: 200, description: 'User information retrieved successfully.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @UseGuards(IsUserGuard)
    @Get('self')
    getSelfInfo(@CurrentUser() user: User) {
        return this.userService.getSelfInfo(user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Retrieve user information by ID' })
    @ApiResponse({ status: 200, description: 'User information retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @UseGuards(IsUserGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update user information by ID' })
    @ApiResponse({ status: 200, description: 'User information updated successfully.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 400, description: 'Validation error.' })
    @UseGuards(IsUserGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @CurrentUser() user: User) {
        return this.userService.update(id, updateUserDto, user);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete user account by ID' })
    @ApiResponse({ status: 200, description: 'User successfully deleted.' })
    @ApiResponse({ status: 404, description: 'User not found.' })
    @ApiResponse({ status: 401, description: 'Unauthorized access.' })
    @UseGuards(IsUserGuard)
    @Delete(':id')
    remove(@Param('id') id: string, @CurrentUser() user: User) {
        return this.userService.remove(id, user);
    }
}
