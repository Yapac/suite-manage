import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 4000;

  app.use(bodyParser.json({ limit: '10mb' })); // adjust size
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();
  console.log(`🚀 Server ready at ${url}/graphql`);
}
bootstrap();
