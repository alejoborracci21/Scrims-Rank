import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['https://scrims-rank.onrender.com', 'http://localhost:3000', 'https://scrims-rank.vercel.app'], // Permite cualquier origen
    methods: 'GET,POST,PUT, PATCH, DELETE,OPTIONS',
    credentials: false, // Cambia a `true` si usas cookies
  });
  await app.listen(process.env.DB_PORT ?? 3000);

}
bootstrap();
