import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`🚀 Server ready at ${url}/graphql`);
}
bootstrap();
