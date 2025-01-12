import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { PrismaService } from '../../../prisma.service';
import { JwtService } from '@nestjs/jwt';
import { JwtToken } from '../../../infrastructure/utils/jwt-token';

describe('UserController', () => {
  let controller: UserController;
      let userService: UserService;
  

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                UserService,
                JwtToken, // JwtService ni qo'shish
                JwtService,
                PrismaService, // PrismaService ni qo'shish
            ],
        }).compile();

        controller = module.get<UserController>(UserController);
        userService = module.get<UserService>(UserService);
    });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
