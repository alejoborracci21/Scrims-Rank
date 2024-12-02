import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir cualquier subdominio de Vercel o localhost para desarrollo
      if (!origin || /^https:\/\/scrims-rank-.*\.alejoborracci21s-projects\.vercel\.app$/.test(origin) || origin === 'http://localhost:3000') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    credentials: true,
  });
  
  await app.listen(process.env.DB_PORT ?? 3000);

}
bootstrap();
