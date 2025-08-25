import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 4000);

  const url = await app.getUrl();
  console.log(`🚀 Server ready at ${url}/graphql`);
}
bootstrap();
