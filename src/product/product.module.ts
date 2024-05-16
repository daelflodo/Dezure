import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { Product } from "./entities/product.entity";
import { UserService } from "src/user/user.service";
import { User } from "src/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product,User])],
  controllers: [ProductController],
  providers: [ProductService,UserService],
})
export class ProductModule {}
