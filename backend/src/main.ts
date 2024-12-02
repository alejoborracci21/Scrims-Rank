import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || /^https:\/\/.*\.vercel\.app$/.test(origin)) {
        // Permite solicitudes desde cualquier subdominio de vercel.app
        callback(null, true);
      } else {
        // Bloquea cualquier otro origen
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });
  
  await app.listen(process.env.DB_PORT ?? 3000);

}
bootstrap();
