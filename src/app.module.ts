import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule],
})
export class AppModule {}
