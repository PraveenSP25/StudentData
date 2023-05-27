import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import chalk = require('chalk');
import rateLimit from 'express-rate-limit';

import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    });
    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60,
        max: 1000, // 1000 requests per windowMs
        message:
          '⚠️  Too many requests created from this IP, please try again after an hour',
      }),
    );

    const options = new DocumentBuilder()
      .setTitle('Student API')
      .setDescription('API for managing students')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/', app, document, {
      swaggerOptions: { docExpansion: 'none', port: 4000 },
    });

    Logger.log('Mapped {/, GET} Swagger API route', 'RouterExplorer');

    await app.listen(4000);

    process.env.NODE_ENV !== 'production'
      ? Logger.log(
          `🚀  Server ready at http://localhost:${chalk
            .hex('#DEADED')
            .bold(`${4000}`)}`,
          'Bootstrap',
          false,
        )
      : Logger.log(
          `🚀  Server is listening on port ${chalk
            .hex('#87e8de')
            .bold(`${4000}`)}`,
          'Bootstrap',
          false,
        );
  } catch (error) {
    Logger.error(
      `❌  Error starting server - ${error}`,
      '',
      'Bootstrap',
      false,
    );
    process.exit();
  }
}

bootstrap().catch((e) => {
  Logger.error(`❌  Error starting server - ${e}`, '', 'Bootstrap', false);
  throw e;
});
