import path from 'path';
import {fileURLToPath} from 'url';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller.js';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'authapi',
        password: '',
        database: 'auth_api',
        entities: [
          './**/*.entity.{js, ts}'
      ],
        synchronize: true,
      }),
    UsersModule,
    AuthModule,
    ProductsModule
    ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})

export class AppModule {}
