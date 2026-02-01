import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { DivesModule } from './dives/dives.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Désactivé en production, utiliser les migrations
        migrations: [__dirname + '/migrations/*{.ts,.js}'],
        migrationsRun: true, // Les migrations doivent être exécutées manuellement
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    DivesModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
