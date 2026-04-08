import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCookie from '@fastify/cookie';
import helmet from '@fastify/helmet';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { join } from 'path';

const MAX_AVATAR_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: {
        level: 'info',
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Underwwwater API')
    .setDescription('The underwwwater API description')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('dives')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customCssUrl: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui.css',
    ],
    customJs: [
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-bundle.js',
      'https://cdn.jsdelivr.net/npm/swagger-ui-dist@5/swagger-ui-standalone-preset.js',
    ],
  });

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.register(fastifyMultipart, {
    limits: {
      fileSize: MAX_AVATAR_SIZE_BYTES,
    },
  });

  await app.register(fastifyStatic, {
    root: join(process.cwd(), 'uploads'),
    prefix: '/uploads/',
    decorateReply: false,
  });

  const fastifyInstance = app.getHttpAdapter().getInstance();
  fastifyInstance.addHook('onSend', async (request, reply, payload) => {
    if (request.url.startsWith('/uploads/')) {
      reply.header('Cross-Origin-Resource-Policy', 'cross-origin');
    }
    return payload;
  });

  await app.register(fastifyCookie);
  await app.register(helmet, {
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [`'self'`],
        styleSrc: [`'self'`, `'unsafe-inline'`, 'https://cdn.jsdelivr.net'],
        imgSrc: [`'self'`, 'data:', 'validator.swagger.io'],
        scriptSrc: [`'self'`, `'unsafe-inline'`, 'https://cdn.jsdelivr.net'],
        frameSrc: [`'self'`, 'https://vercel.live'],
      },
    },
  });

  //ajoute des headers de sécurité

  await app.listen(process.env.PORT ?? 3000, () => {
    Logger.log(`Application is running on port: ${process.env.PORT ?? 3000}`);
  });
}

bootstrap().catch((err) => {
  Logger.error(err);
  process.exit(1);
});
