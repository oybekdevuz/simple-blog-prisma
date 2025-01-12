import { NestFactory } from '@nestjs/core';
import { AppModule } from './api/app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    app.enableCors({
        origin: "*",
    });

    app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe());

    const swaggerPass = config.SWAGGER_PASSWORD
    app.use(
      ['/api/docs'],
      basicAuth({
        challenge: true,
        users: { login: swaggerPass },
      }),
    );

    const swagger = new DocumentBuilder()
    .setTitle('Simple Blog site')
    .setDescription('REST API Documentation')
    .setVersion('1.0.0')
    .addTag('Nestjs, postgreSQL, Prisma')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, swagger);
    SwaggerModule.setup('/api/docs', app, document);

    await app.listen(config.PORT || 3000, () => {
        console.log(config.PORT);

    });
}
bootstrap();
