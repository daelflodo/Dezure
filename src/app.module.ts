import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as joi from 'joi';

import { UserModule } from './user/user.module';
import { dataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: joi.object({
        PORT: joi.number().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USERNAME: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_DATABASE: joi.string().required(),
        HASH_SALT: joi.number().required(),
        JWT_SECRET: joi.string().required(),
        JWT_EXPIRE: joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({...dataSourceConfig}),
    UserModule,
    AuthModule,
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
