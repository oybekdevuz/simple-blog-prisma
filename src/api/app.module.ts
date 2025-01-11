import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
    imports: [ConfigModule.forRoot(), UserModule, PostModule],
})
export class AppModule { }
