import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports:[
    TypeOrmModule.forFeature([User]),UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
