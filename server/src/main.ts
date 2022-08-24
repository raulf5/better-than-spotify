import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //DEFINIMOS UN PREFIJO PARA LA API
  app.enableCors();
  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT || 4321);
}
bootstrap();
