import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://scrims-rank-6qkx8pj8x-alejoborracci21s-projects.vercel.app/'], // Permitir solicitudes desde el frontend
    methods: 'GET,POST,PUT,DELETE,OPTIONS', // Métodos HTTP permitidos
    credentials: true, // Permitir cookies o encabezados con credenciales
  });
  
  await app.listen(process.env.DB_PORT ?? 3000);

}
bootstrap();
