import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Criters Rank API')  // Título de la API
  .setDescription('The Criters Rank API description')  // Descripción de la API
  .setVersion('1.0')  // Versión de la API
  .build();  // Puedes agregar más configuraciones si es necesario

  const document = SwaggerModule.createDocument(app, config);

  // Ruta donde estará accesible la documentación de la API
  SwaggerModule.setup('api', app, document);

  app.enableCors({
    origin: ['https://scrims-rank.onrender.com', 'http://localhost:3000', 'https://scrims-rank.vercel.app'], // Permite cualquier origen
    methods: 'GET,POST,PUT, PATCH, DELETE,OPTIONS',
    credentials: false, // Cambia a `true` si usas cookies
  });
  await app.listen(3001);

}
bootstrap();
