import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*', // Permite cualquier origen
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: false, // Cambia a `true` si usas cookies
  });
  await app.listen(3001);

}
bootstrap();
