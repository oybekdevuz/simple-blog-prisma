import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { LoginDto } from './dto/login-user.dto';
import { JwtToken } from '../../infrastructure/utils/jwt-token';
import { PrismaService } from '../../prisma.service';
import { BcryptEncryption } from '../../infrastructure/utils/bcript';
import { IResponse, LoginResponse } from '../../infrastructure/interfaces';


@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtToken
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (user) {
            throw new BadRequestException("User Already exists")
        }
        const hashed_pass = await BcryptEncryption.encrypt(dto.password);
        dto.password = hashed_pass;
        return await this.prisma.user.create({ data: dto })
    }

    async login(dto: LoginDto): Promise<IResponse<LoginResponse>> {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (!user) {
            throw new BadRequestException("Email or password incorrect")
        }
        const compare_pass = await BcryptEncryption.compare(dto.password, user.password)

        if (!compare_pass) {
            throw new BadRequestException("Email or password incorrect")
        }
        const token = await this.jwtService.generateToken(user)
        const data: LoginResponse = {
            id: user.id,
            name: user.name,
            token

        }
        return { data, message: "Success", status_code: 200 }
    }


    getSelfInfo(user: User) {
        return this.prisma.user.findUnique({ where: { id: user.id } });
    }

    findOne(id: string) {
        return this.prisma.user.findUnique({ where: { id: id } });
    }

    async update(id: string, updateUserDto: UpdateUserDto, currentUser: User) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new BadRequestException("User not found")
        }
        if (currentUser.id !== user.id) {
            throw new ForbiddenException("Forbidden")
        }
        if (updateUserDto.password) {
            const hashed_pass = await BcryptEncryption.encrypt(updateUserDto.password);
            updateUserDto.password = hashed_pass;
        }
        return this.prisma.user.update({ data: updateUserDto, where: { id } });
    }

    async remove(id: string, currentUser: User) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new BadRequestException("User not found")
        }
        if (currentUser.id !== user.id) {
            throw new ForbiddenException("Forbidden")
        }

        return this.prisma.user.delete({ where: { id } });
    }
}
