import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(config.PORT || 3000, () => {
        console.log(config.PORT);

    });
}
bootstrap();
