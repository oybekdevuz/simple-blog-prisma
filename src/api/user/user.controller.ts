import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login-user.dto';
import { IsUserGuard } from '../guards/is-user.guard';
import { CurrentUser } from '../common/decorator/current-user';
import { User } from '@prisma/client';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post("register")
    create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    @Post("login")
    login(@Body() createUserDto: LoginDto) {
        return this.userService.login(createUserDto);
    }

    @UseGuards(IsUserGuard)
    @Get('self')
    getSelfInfo(@CurrentUser() user: User) {
        return this.userService.getSelfInfo(user);
    }

    @UseGuards(IsUserGuard)
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(id);
    }

    @UseGuards(IsUserGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(IsUserGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(id);
    }
}
